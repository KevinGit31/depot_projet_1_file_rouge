import { Contact } from "../contact/contact";

export class Company {
    id:number;
    name:String;
    nip:String;
    address:String;
    contact:Contact;


    constructor(){
        this.id=0
        this.name='';
        this.nip='';
        this.address='';
        this.contact = new Contact;
    }
}
