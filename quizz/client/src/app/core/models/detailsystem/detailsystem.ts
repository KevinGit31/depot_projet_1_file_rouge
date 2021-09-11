export class Detailsystem {
    id:number;
    createBy:String;
    updateBy:String;
    reportBy:String;
    createDate:Date;
    updateDate:Date;
    reportDate:Date;


    constructor(){
        this.id=0;
        this.createBy='';
        this.updateBy='';
        this.reportBy='';
        this.createDate= new Date;
        this.updateDate= new Date;
        this.reportDate= new Date;
    }
}
