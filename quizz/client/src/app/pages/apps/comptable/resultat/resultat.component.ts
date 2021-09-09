import { Component, OnInit } from '@angular/core';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { Ns } from '../../ns/models/ns';;
import 'moment/locale/fr'
import { TableAdvanced } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
import { tableSourceCharge, tableSourceProduit } from './resultat.data';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Resultat } from 'src/app/core/models/resultat';


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {

  currentFy: Fiscalyear;
  currentNs: Ns;

  resultat: Resultat = new Resultat;

  tableSourceCharge: TableAdvanced = tableSourceCharge;
  tableSourceProduit: TableAdvanced = tableSourceProduit;

  constructor(private nsService: NsService, private jrService: JournalRowService, private fyService: FyService, private compteService: CompteService) { }

  ngOnInit(): void {
    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
   
    this.getProductSolde();
    this.getChargeSolde();
    this.getResultat();

  }

  getColor() {
    if (this.resultat.solde > 0)
      return '#43d39e';
    else if (this.resultat.solde == 0)
      return '#CCCCCC';
    else
      return '#ff5C75';
  }

  getStatus(){
    if(this.resultat.solde >= 0)
      return "Gain";
    return "Perte"
  }

  getProductSolde() {
    this.jrService.getAccountsSolde(this.currentNs.id, this.currentFy.id, "PRODUIT").subscribe((resultat) => {
      this.tableSourceProduit.data = resultat;
    })
  }

  getChargeSolde() {
    this.jrService.getAccountsSolde(this.currentNs.id, this.currentFy.id, "CHARGE").subscribe((resultat) => {
      this.tableSourceCharge.data = resultat;
    })
  }

  getResultat() {
    this.jrService.getResultat(this.currentNs.id, this.currentFy.id).subscribe((resultat) => {
      this. resultat = resultat;
    })
  }

}
