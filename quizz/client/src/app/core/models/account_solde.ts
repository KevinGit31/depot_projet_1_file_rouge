
import { Account } from "./account";

export class AccountSolde {
    account:Account
    solde: number

    constructor(){
        this.account = new Account;
        this.solde = 0;
    }
}