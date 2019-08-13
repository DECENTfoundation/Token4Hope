import * as Boom from "boom";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { injectable } from "inversify";

import { AccountKeyError } from "../../../models/constants/AccountKeyError";
import { ErrorEvent } from "../../../models/events/ErrorEvent";
import { BlockchainPassportDto } from "../../../models/transfer-objects/BlockchainPassportDto";
import { lazyInject } from "../../../plugins/assembly/decorators";
import { AuthFactory, AuthScope } from "../../../plugins/auth";
import { BlockchainPassport } from "../../../plugins/blockchain";
import { Metadata } from "../../../utils/payload";

@injectable()
export abstract class BaseAuthScopeService implements AuthScope {

    @lazyInject("Factory<Auth>")
    protected authFactory: AuthFactory;

    protected adminScope: string;
    protected scopes: string[];
    protected artifacts: Metadata;
    protected credentials: Metadata;
    protected secret: string;

    public async isAdmin(throwable: boolean = true): Promise<boolean> {
        return this.is(this.adminScope, throwable);
    }

    public async is(scopes: string | string[], throwable: boolean = true): Promise<boolean> {
        const result = !_.isEmpty((_.isArray(scopes) ? scopes : [scopes]).map((scope) => _.includes(this.scopes, scope)).filter(Boolean));
        if (!result && throwable) {
            throw Boom.unauthorized();
        }
        return result;
    }

    public async unlockPassport(name: string | BlockchainPassport): Promise<BlockchainPassportDto> {
        const owner = _.isString(name) ? { name } : { ...name };
        const active = _.first((this.artifacts.activePassports || []).filter(($: BlockchainPassport) => $.name === owner.name));
        if (_.isNil(active)) {
            throw Boom.notFound<ErrorEvent<AccountKeyError>>(
                null, { key: AccountKeyError.MissingBlockchain },
            );
        }

        return BlockchainPassportDto.parse({ ...owner, ...active }).unlock(this.secret);
    }

    protected initialize(source: Hapi.Request) {
        this.artifacts = source.auth.artifacts as Metadata;
        this.credentials = source.auth.credentials as Metadata;
        this.scopes = this.credentials.scope;
        this.secret = this.authFactory(source).getOptions().secret;
    }
}
