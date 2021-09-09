import { Ns } from "src/app/pages/apps/ns/models/ns";
import { Category } from "./category";

export class Account {
    id:number;
    label:string;
    labelBilan:string;
    number:string;
    category:Category;
    namespace:Ns
    account:Account

}