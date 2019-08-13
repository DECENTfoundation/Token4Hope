import { Decimal } from "decimal.js";
import * as Hapi from "hapi";
import { inject, injectable } from "inversify";
import { OrganizationType } from "../../models/constants/OrganizationType";
import { ChainEntity } from "../../models/entities/ChainEntity";
import { Family } from "../../models/entities/Family";
import { Organization } from "../../models/entities/Organization";
import { ChainAccountDto } from "../../models/transfer-objects/ChainAccountDto";
import { ChainAccountListDto } from "../../models/transfer-objects/ChainAccountListDto";
import { PaymentOperationService } from "../blockchain/operations/PaymentOperationService";

@injectable()
export class ChainAccountService {
    @inject(PaymentOperationService)
    private blockchain: PaymentOperationService;

    public async getAllChainAccountsWithBallance(request: Hapi.Request) {
        const families = Family.findAll();
        const stores = Organization.findAll({ where: { role: OrganizationType.Store } });
        const charity = Organization.findAll({ where: { role: OrganizationType.Charity } });

        const [charityResults, storeResults, familyResults] = await Promise.all([
            this.getOrganizationChainAccountDtos(request, charity),
            this.getOrganizationChainAccountDtos(request, stores),
            this.getFamilyChainAccountDtos(request, families),
        ]);

        return new ChainAccountListDto({
            accounts: [...charityResults, ...storeResults, ...familyResults],
            charityTokens: this.countBalance(charityResults).toString(),
            familyTokens: this.countBalance(familyResults).toString(),
            storeTokens: this.countBalance(storeResults).toString(),
        });
    }

    private countBalance(list: ChainAccountDto[]): string {
        return list.reduce((acc, entity) => new Decimal(acc).add(entity.balance).toString(), "0");
    }

    private async getOrganizationChainAccountDtos(request: Hapi.Request, list: PromiseLike<Organization[]>): Promise<ChainAccountDto[]> {
        const entities = await list;
        const result = entities.map((entity) => this.getChainAccountDto(request, entity.chainEntity));
        return Promise.all(result);
    }

    private async getFamilyChainAccountDtos(request: Hapi.Request, list: PromiseLike<Family[]>): Promise<ChainAccountDto[]> {
        const entities = await list;
        const result = entities.map((entity) => this.getChainAccountDto(request, entity.chainEntity));
        return Promise.all(result);
    }

    private async getChainAccountDto(request: Hapi.Request, entity: ChainEntity): Promise<ChainAccountDto> {
        const balance = await this.blockchain.getBalance(request, entity);
        const result = {
            account: entity.name,
            balance: balance.toString(),
            chainName: entity.chainName,
        };
        return new ChainAccountDto(result);
    }
}
