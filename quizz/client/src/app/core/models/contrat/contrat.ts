import { ETypecontrat } from "../etypecontrat/etypecontrat";

export class Contrat {
    id:number;
    type:ETypecontrat;
    startDate:Date;
    endDate:Date;
    description:String;


    constructor(){
        this.id=0;
        this.type=ETypecontrat.AUTRE
        this.startDate = new Date;
        this.endDate = new Date;
        this.description='';
    }
}
