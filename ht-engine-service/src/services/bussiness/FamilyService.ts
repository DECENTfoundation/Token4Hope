import { Account } from "dcorejs-sdk";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import { ChainEntity } from "../../models/entities/ChainEntity";

import { Family } from "../../models/entities/Family";
import { User } from "../../models/entities/User";
import { PaymentDto } from "../../models/transfer-objects/PaymentDto";
import { AuthIdentityPolicy } from "../../plugins/auth";
import { Throw } from "../../utils/error/Throw";
import { Payload } from "../../utils/payload";
import { PaymentOperationService } from "../blockchain/operations/PaymentOperationService";
import { ChainTransactionService } from "./ChainTransactionService";

@injectable()
export class FamilyService {

    @inject(PaymentOperationService)
    private blockchain: PaymentOperationService;

    @inject(ChainTransactionService)
    private chainTransactionService: ChainTransactionService;

    public async updateFamilyWithChainData(chainEntity: ChainEntity, account: Account): Promise<ChainEntity> {
        return await chainEntity.update({ chainId: account.id.objectId });
    }

    public async payInStore(request: Hapi.Request, user: User): Promise<PaymentDto> {
        const payload = request.payload as Payload;

        const family = await Family.authenticate(
            AuthIdentityPolicy.CardNumber,
            { ...payload, password: payload.pin },
        );

        const balance = await this.blockchain.getBalance(request, family.chainEntity);

        if (balance.cmp(payload.amount) < 0) {
            Throw.notEnoughFunds(User.name);
        }

        const transactionResult = await this.blockchain.transfer(
            request,
            family.chainEntity,
            user.organization.chainEntity,
            payload.amount,
        );

        await this.chainTransactionService.log(transactionResult, user);

        const familyBalance = await this.blockchain.getBalance(request, family.chainEntity);
        return new PaymentDto({
            receiverAddress: user.organization.chainEntity.chainName,
            remainingBalance: familyBalance.toString(),
            senderAddress: family.chainEntity.chainName,
        });
    }
}
