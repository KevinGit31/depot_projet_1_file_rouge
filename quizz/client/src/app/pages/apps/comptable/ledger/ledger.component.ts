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
import { tableSource } from './ledger.data';
moment.locale('fr')

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  months = moment.months().reverse();
  year: string;

  currentFy: Fiscalyear;
  currentNs: Ns;
  tableSource: TableAdvanced = tableSource;

  ledger: Ledger

  selected: Account;
  isSelected:Boolean;

  accounts: Account[]

  tableSourceMonths = [];

  constructor(private nsService: NsService, private jrService: JournalRowService, private fyService: FyService, private compteService: CompteService) { }

  ngOnInit() {
    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
    this.ledger = new Ledger;
    this.year = moment(this.currentFy.startDate).format("YYYY")

    this.compteService.getAllSub(this.nsService.currentNs().id).subscribe((accounts) => {
      this.accounts = accounts;
    });

    this.months.forEach(element => {
      let tableSource: TableAdvanced = new TableAdvanced;
      tableSource.setProperties(this.tableSource)
      this.tableSourceMonths.push(tableSource)
    });
  }

  getSolde() {
    
    this.jrService.getLedgerSolde(this.currentNs.id, this.currentFy.id, this.selected.id).subscribe((ledger: Ledger) => {
      this.ledger = ledger;
    });
     
    this.getData()

  }

  getColor() {
    if (this.ledger.solde > 0)
      return '#43d39e';
    else if (this.ledger.solde == 0)
      return '#CCCCCC';
    else
      return '#ff5C75';
  }

  getTableSourceByMonth(month, index) {
    index = 12 - (index + 1)
    this.tableSourceMonths[index].title = month + " - " + this.year;
    return this.tableSourceMonths[index]
  }

  _fetchDataByMonth(month, index) {
    index = 12 - (index + 1)
    this.tableSourceMonths[index].ts.nsId = this.currentNs.id
    this.tableSourceMonths[index].ts.fyId = this.currentFy.id
    this.tableSourceMonths[index].title = month + " - " + this.year;
    this.tableSourceMonths[index].headers.map((head)=>{if(head.merge){head.merge.id=this.selected.id} return head}) 
    if (this.selected!=undefined){
      this.jrService.getLedger(this.currentNs.id, this.currentFy.id, this.selected.id, index).subscribe((data) => {
        this.tableSourceMonths[index].data = data;
      })
    }
      
  }

  fetchDataEventHandle(month, index) {
    this._fetchDataByMonth(month, index)
  }


  getData(){
    this.months.forEach((month,index) => {
      this.fetchDataEventHandle(month, index)
    }); 
  }

}
