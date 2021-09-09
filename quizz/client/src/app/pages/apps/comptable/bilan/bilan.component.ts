import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { Fiscalyear } from 'src/app/core/models/fiscalyear'; import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { tableSourceActif, tableSourcePassif } from './bilan.data';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../ns/models/ns';
import * as moment from 'moment';
import 'moment/locale/fr'
import { TableAdvanced } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
import { Bilan } from 'src/app/core/models/bilan';
moment.locale('fr')

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {

  currentFy: Fiscalyear;
  currentNs: Ns;

  bilan: Bilan;

  allFy: Fiscalyear[];

  tableSourceActif: TableAdvanced = tableSourceActif;
  tableSourcePassif: TableAdvanced = tableSourcePassif;

  constructor(private nsService: NsService, private jrService: JournalRowService, private fyService: FyService, private compteService: CompteService) { }

  ngOnInit() {
    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
    this.bilan = new Bilan();

    this.getBilan();
    this.getBilanPassifDetail();
    this.getBilanActifDetail();
    this.getfyServiceAll();
  }

  getColor(number) {
    if (number > 0)
      return '#43d39e';
    else if (number == 0)
      return '#CCCCCC';
    else
      return '#ff5C75';
  }

  getBilan() {
    this.jrService.getBilan(this.currentNs.id, this.currentFy.id).subscribe((bilan) => {
      this.bilan = bilan;
      console.log(bilan)
    })
  }

  getBilanPassifDetail() {
    this.jrService.getBilanPassifDetail(this.currentNs.id, this.currentFy.id).subscribe((data) => {
      this.tableSourcePassif.data = data;
    })
  }

  getBilanActifDetail() {
    this.jrService.getBilanActifDetail(this.currentNs.id, this.currentFy.id).subscribe((data) => {
      this.tableSourceActif.data = data;
    })
  }

  getfyServiceAll() {
  this.fyService.getAll(this.nsService.currentNs().id).subscribe(data => {
    this.allFy = data;
  })
}

  // Choix de l'espace de travail
  selectFy(event) {
    this.fyService.setCurrentFy(event)
    this.getBilan();
    this.getBilanPassifDetail();
    this.getBilanActifDetail();
  }

}
