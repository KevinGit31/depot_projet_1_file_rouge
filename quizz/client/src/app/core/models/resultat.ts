import { Account } from "./account";

export class Resultat {
    solde:number;
    account: Account 

    constructor(){
        this.solde = 0;
        this.account = new Account;
    }
}