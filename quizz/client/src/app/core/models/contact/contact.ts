import { Typecontact } from "../typecontact/typecontact";

export class Contact {

    id:number;
    phones:Typecontact[];

    constructor(){
        this.id=0
        this.phones=[];
    }
}
