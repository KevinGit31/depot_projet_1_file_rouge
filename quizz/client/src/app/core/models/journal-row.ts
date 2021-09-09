
import { Ns } from "src/app/pages/apps/ns/models/ns";
import { Account } from "./account";

export class JournalRow {
    id:number;
    label:string;
    dateOperation:Date;
    debit:Account;
    credit:Account;
    amount:number;
    namespace:Ns
}