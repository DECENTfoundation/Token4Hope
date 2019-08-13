import { Decimal } from "decimal.js";
import * as Hapi from "hapi";
import { injectable } from "inversify";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { BlockChainAccount, BlockchainSymbol } from "../../../plugins/blockchain";
import { BaseRepositoryService } from "../base/BaseRepositoryService";
import { Converter } from "../base/Converter";

@injectable()
export class PaymentRepositoryService extends BaseRepositoryService {

    public getAccountBalance(
        owner: BlockChainAccount | string,
        request: Hapi.Request,
        symbols?: Array<BlockchainSymbol | string>,
    ): Observable<Decimal> {

        const options = this.getOptionsUsingRequest(request);

        if (_.isNil(symbols)) {
            symbols = [options.symbol];
        }

        return this.getBalance(owner, symbols, request).pipe(
            map(([asset, value]) => {
                return new Decimal(Converter.satoshiToDecimal(value, options.precision));
            }),
        );
    }
}
