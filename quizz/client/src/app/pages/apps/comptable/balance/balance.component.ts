import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { Ledger } from 'src/app/core/models/ledger';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../ns/models/ns';
import * as moment from 'moment';
import 'moment/locale/fr'
import { TableAdvanced } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
import { tableSource } from './balance.data';
import { Balance } from 'src/app/core/models/balance';
import { RouterModule } from '@angular/router';
const ClassList = [
  { number: "1", label: "Capitaux" },
  { number: "2", label: "Immobilisations" },
  { number: "3", label: "Stocks et en-cours" },
  { number: "4", label: "Tiers" },
  { number: "5", label: "Financiers" },
  { number: "6", label: "Charges" },
  { number: "7", label: "Produits" },
  { number: "8", label: "Spéciaux" },
]
moment.locale('fr')

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  currentFy: Fiscalyear;
  currentNs: Ns;
  tableSource: TableAdvanced = tableSource;

  tableDetail = [
    { name: "Class", id: "class" },
    { name: "Comptes", id: "comptes" },
    { name: "Sous somptes", id: "sous_comptes" },
  ]
  data: any;
  accounts: Account[]

  classList = ClassList

  constructor(
    private nsService: NsService, 
    private jrService: JournalRowService, 
    private fyService: FyService, 
    private compteService: CompteService) { }

  ngOnInit() {
    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();

    console.log(tableSource)

    this.getBalance()
    this.getRefAccount()
  }

  /**Appel du service balance */
  getBalance() {
    this.jrService.getBalance(this.currentNs.id, this.currentFy.id).subscribe((balance) => {
      this.data = this.solde(balance);
      this.setDataTable(this.data);

      console.log(this.data)
    });
  
  }

  getRefAccount(){
    this.compteService.getAllRef(this.currentNs.id).subscribe((accounts)=>{
      this.accounts = accounts;
    })
  }

  handleChange(event) {

    console.log(event.target.value)
    switch (event.target.value) {
      case "class":
        this.classList = ClassList
        break;
      case "comptes":
        this.classList = this.accounts
        break;
      case "sous_comptes":
        this.classList = []
        this.setDataTable(this.data);
        break;
    }

    if (this.classList.length) {
      let balance = this.data

      let list = []

      this.classList.forEach(item => {
        let row = new Balance;
        row.number = item.number
        row.label = item.label
        row.credit = 0
        row.debit = 0

        balance.forEach(b => {
          if (b.number.startsWith(item.number)) {
            row.credit = parseFloat(row.credit.toFixed(2)) + b.credit;
            row.debit = parseFloat(row.debit.toFixed(2)) + b.debit;
          }
        });
        row.setSolde();
        list.push(row)
      });
      this.setDataTable(list);

    }

  }

  setDataTable(data) {
    this.tableSource.data = data;
    this.tableSource.dataTotal = this.soldeTotal(this.tableSource.data);
  }

  /**
   * Calcul des soldes débiteur et créditeur
   */
  solde(balance) {

    let newbalance = []
    balance.forEach(element => {
      let b = new Balance
      newbalance.push(b)
      b.label = element.label
      b.number = element.number
      b.credit = element.credit
      b.debit = element.debit
      b.setSolde();
    });
    return newbalance

  }

  soldeTotal(balance) {
    let total = new Balance
    balance.forEach(element => {
      total.credit = parseFloat(total.credit.toFixed(2)) + element.credit
      total.debit = parseFloat(total.debit.toFixed(2)) + element.debit
      total.soldeCredit = parseFloat(total.soldeCredit.toFixed(2)) + element.soldeCredit
      total.soldeDebit = parseFloat(total.soldeDebit.toFixed(2)) + element.soldeDebit
    });
    return total
  }
}
