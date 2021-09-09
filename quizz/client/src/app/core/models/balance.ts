export class Balance {
    
    id: number;
    label: string;
    number: string;
    credit: number;
    debit: number;
    soldeCredit: number;
    soldeDebit: number;

    constructor(){
        this.credit=0;
        this.debit=0;
        this.soldeCredit=0;
        this.soldeDebit=0;
    }

    setSolde() {
        if (this.debit >= this.credit) {
            this.soldeDebit = this.debit - this.credit
            this.soldeCredit = 0;
        } else {
            this.soldeDebit = 0
            this.soldeCredit = this.credit - this.debit;
        }
    }
}