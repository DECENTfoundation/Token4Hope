import * as Boom from "boom";
import { Decimal } from "decimal.js";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import * as Long from "long";
import { Op, WhereOptions } from "sequelize";
import { EntityKeyError } from "../../models/constants/EntityKeyError";
import { TransactionDirection } from "../../models/constants/TransactionDirection";
import { ChainEntity } from "../../models/entities/ChainEntity";
import { TransferOperation } from "../../models/entities/TransferOperation";
import { ErrorEvent } from "../../models/events/ErrorEvent";
import { TransactionDto } from "../../models/transfer-objects/TransactionDto";
import { TransactionListDto } from "../../models/transfer-objects/TransactionListDto";
import { Payload } from "../../utils/payload";
import { Converter } from "../blockchain/base/Converter";
import { AccountRepositoryService } from "../blockchain/repositories/AccountRepositoryService";
import { PaymentRepositoryService } from "../blockchain/repositories/PaymentRepositoryService";
import { CursorVariable } from "../constants/CursorVariable";
import { PaginationCursor } from "./common/PaginationCursor";
import { ParsedStoreTransaction } from "./common/ParsedStoreTransaction";

@injectable()
export class TransactionService {
    @inject(AccountRepositoryService)
    private blockchain: AccountRepositoryService;

    @inject(PaymentRepositoryService)
    private payment: PaymentRepositoryService;

    public async getTransactionList(request: Hapi.Request): Promise<TransactionListDto> {
        const { chainAccountName } = request.params as Payload;
        const { limit = 2 } = request.query as Payload;
        const chainEntity = await ChainEntity.findOne({ where: { chainName: chainAccountName } });
        const blockchainConfig = this.blockchain.getOptionsUsingRequest(request);

        if (_.isNil(chainEntity)) {
            throw Boom.notFound<ErrorEvent<EntityKeyError>>(
                null, { key: EntityKeyError.NotFound, entity: ChainEntity.name },
            );
        }

        await this.blockchain.exists(chainAccountName, request);
        const currentBalance = await this.payment.getAccountBalance(chainAccountName, request).toPromise();

        const operations = await TransferOperation.findAll({ where: { ...this.getWhere(request, chainEntity) }, limit: limit + 1 });
        const resultOperations = _.take(operations, limit);

        const transfers = this.parseTransactions(chainEntity, resultOperations, blockchainConfig.precision);

        const cursors: PaginationCursor = {};
        if (operations.length > limit) {
            cursors.next = this.encodeCursor({ from: _.last(resultOperations).id });
        }

        const changes = this.getTokenChanges(transfers);
        return new TransactionListDto({
            balance: currentBalance.toString(),
            cursors,
            tokensReceived: changes.tokenReceived,
            tokensSent: changes.tokensSent,
            transactions: transfers,
        });
    }

    private cursorWhere(request: Hapi.Request): WhereOptions<TransferOperation> {
        const { cursor } = request.query as Payload;

        if (!_.isNil(cursor)) {
            const decodedCursor = this.decodeCursor(cursor) as Payload;
            return { id: { [Op.lt]: decodedCursor.from } };
        }
        return {};
    }

    private timeWhere(request: Hapi.Request): WhereOptions<TransferOperation> {
        const { to, from } = request.query as Payload;

        if (!_.isNil(to) && !_.isNil(from)) {
            return {
                blockTimestamp: {
                    [Op.gte]: new Date(from),
                    [Op.lte]: new Date(to),
                },
            };
        }
        return {};
    }

    private getWhere(request: Hapi.Request, chainEntity: ChainEntity): WhereOptions<TransferOperation> {
        const basicWhere = {
            [Op.or]: [{
                fromAddress: chainEntity.chainId,
            }, {
                toAddress: chainEntity.chainId,
            },
            ],
        };

        return {
            ...basicWhere,
            ...this.cursorWhere(request),
            ...this.timeWhere(request),
        };
    }

    private getTokenChanges(list: TransactionDto[]): { tokensSent: string, tokenReceived: string } {
        return list.reduce((acc, tx) => {
            if (_.isEqual(tx.direction, TransactionDirection.Out)) {
                return {
                    ...acc,
                    tokensSent: new Decimal(acc.tokensSent).add(tx.amount).toString(),
                };
            }
            return {
                ...acc,
                tokenReceived: new Decimal(acc.tokenReceived).add(tx.amount).toString(),
            };
        }, {
                tokenReceived: "0",
                tokensSent: "0",
            });
    }

    private parseTransactions(account: ChainEntity, txs: TransferOperation[], assetPrecision: number): TransactionDto[] {
        return txs.map((tx) => this.getTransactionDto(account, tx, assetPrecision));
    }

    private parseStoreTransaction(
        account: ChainEntity,
        tx: TransferOperation,
        assetPrecision: number,
    ): ParsedStoreTransaction {
        const txBase = {
            amount: Converter.satoshiToDecimal(Long.fromString(tx.amount), assetPrecision),
            timestamp: tx.blockTimestamp.toISOString(),
        };
        if (_.isEqual(tx.fromAddress, account.chainId)) {
            return {
                ...txBase,
                account: tx.toEntity ? tx.toEntity.name : null,
                accountChainName: tx.toEntity ? tx.toEntity.chainName : tx.toAddress,
                direction: TransactionDirection.Out,
                found: !_.isNull(tx.toEntity),
            };
        }
        if (_.isEqual(tx.toAddress, account.chainId)) {
            return {
                ...txBase,
                account: tx.fromEntity ? tx.fromEntity.name : null,
                accountChainName: tx.fromEntity ? tx.fromEntity.chainName : tx.fromAddress,
                direction: TransactionDirection.In,
                found: !_.isNull(tx.fromEntity),
            };
        }
        throw Error("unmatched transaction");
    }

    private getTransactionDto(account: ChainEntity, tx: TransferOperation, assetPrecision: number): TransactionDto {
        return new TransactionDto(this.parseStoreTransaction(account, tx, assetPrecision));
    }

    private encodeCursor(cursor: object): string {
        return Buffer.from(JSON.stringify(cursor)).toString(CursorVariable.BufferEncoding);
    }

    private decodeCursor(cursor: string): object {
        return JSON.parse(Buffer.from(cursor, CursorVariable.BufferEncoding).toString(CursorVariable.StringEncoding));
    }
}
