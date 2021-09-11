import { Company } from "../company/company";
import { Contrat } from "../contrat/contrat";
import { Detailsystem } from "../detailsystem/detailsystem";
import { EStatus } from "../estatus/estatus";
import { Profil } from "../profil/profil";

export class Offer {

    id:number;
    title:String;
    publishdate:Date;
    refreshdate:Date;
    number:String;
    contrat:Contrat;
    description:String;
    status:EStatus;
    company:Company;
    job:String;
    salary:number;
    nbrPost:number;
    profil:Profil;
    detailSys:Detailsystem;


    constructor(){
        this.id=0
        this.title='';
        this.publishdate=new Date;
        this.refreshdate=new Date;
        this.number='';
        this.contrat = new Contrat;
        this.description = '';
        this.status = EStatus.NEW;
        this.company = new Company;
        this.job = '';
        this.salary= 0;
        this.nbrPost=0;
        this.profil = new Profil;
        this.detailSys = new Detailsystem;
    }
}
