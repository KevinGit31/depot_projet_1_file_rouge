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
import { tableSource } from './graphique.data';
import { Balance } from 'src/app/core/models/balance';
import { Router, RouterModule } from '@angular/router';
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
  selector: 'app-graphique',
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.scss']
})
export class GraphiqueComponent implements OnInit {

  months = moment.months();

  allNs: Ns[];
  allFy: Fiscalyear[];
  currentNs: Ns;
  all: any[];
  allRatio: any[];

  constructor(
    private _router: Router,
    private nsService: NsService,
    private jrService: JournalRowService,
    private fyService: FyService,
    private compteService: CompteService) { }

  ngOnInit() {
    this.currentNs = this.nsService.currentNs();
    this._fetchAllData();
    this._fetchAllFyData();
    this.fetchAllSoldeData();
  }

  _fetchAllData() {
    this.nsService.getAll().subscribe(data => {
      this.allNs = data;
    })
  }

  /**Récuperation des exercices fiscaux */
  _fetchAllFyData() {
    this.fyService.getAll(this.nsService.currentNs().id).subscribe(data => {
      this.allFy = data;
    })
  }

  /** get Solde */
  fetchAllSoldeData() {
    this.jrService.getResultatByNs(this.nsService.currentNs().id).subscribe(data => {
      this.all = data;

      console.log(this.all)

      this.all.map(element => {
        this.months.forEach((item, index) => {

          let notExit = false;
          element.resultatsSolde.map(subItem => {
            if (subItem.mois == index + 1) {
              notExit = true;
            }
            subItem.ratio = 0
            return subItem
          })
          if (!notExit) {
            element.resultatsSolde.push({ mois: index + 1, solde: 0,affaire:0 })
          }
        })
        element.resultatsSolde.sort(function (a, b) {
          return a.mois - b.mois;
        });
        return element
      });

      this.allRatio = this.all;
      this.allRatio.map(element => {
      
        for(let i=0,j=1;i<element.resultatsSolde.length-1;i++,j++){
          let sj = element.resultatsSolde[j].solde?element.resultatsSolde[j].solde:1;
          let si = element.resultatsSolde[i].solde?element.resultatsSolde[i].solde:1;
          element.resultatsSolde[j].ratio = (sj - si ) / si ;
        };
         
        return element
      });
  
    })
  }

  // Choix de l'espace de travail
  selectNs(event) {
    this.nsService.setCurrentNs(event)
    this._fetchAllFyData();
    this.fetchAllSoldeData();
  }


  getSum(data) {
    let solde = 0
    data.forEach(element => {
      solde = solde + element.solde
    });

    return solde
  }

  getSumPrev(data){
    let solde = 0
    data.forEach(element => {
      solde = solde + element.soldeprev
    })
    return solde
  }

  getSumRt(data) {
    let solde = 0
    let affaire = 0
    data.forEach(element => {
      solde = solde + element.solde
      affaire =  affaire + element.affaire
    });

    return (solde/affaire*100)
  }

  getColor(solde) {
    let color = ''
    if (solde == 0) {
      color = ''
    } else if (solde > 0) {
      color = 'debit-color'
    }
    else {
      color = 'credit-color'
    } return color;
  }

  getBudget(data,index){
    let year = moment(data.fy.endDate).year()
    let month :number = parseInt(index);
    this._router.navigate([`/apps/budget`], {queryParams:{year:year,month:month}})
  }

}
