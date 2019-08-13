import { ExposeError, ExposeLoading } from "../../utils/expose";

import { Account } from "./Account";

export interface AccountState extends ExposeError, ExposeLoading {
    data?: Account;
    editAccountSuccess?: boolean;
}
