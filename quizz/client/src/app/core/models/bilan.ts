export class Bilan {
    
    actif:number;
    passif:number;

    constructor(){
        this.actif = 0;
        this.passif = 0;
    }
}

export class IBilan {
    label: string;
    number: string;
    prime: string;
    second: string;
    sold: number = 0;
}