import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../ns/models/ns';
import { formDeleteTxt, formInputTxt, tableSource } from './fiscal-year.data';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent implements OnInit {

  currentNs: Ns;

  tableSource = tableSource
  modalFiscal: Fiscalyear;
  haveForm: boolean;
  haveDeleteForm: boolean;
  formAction: String;

  // Initialisation des textes de form-delete
  txt = formDeleteTxt;
  txtInput;

  allFy: Fiscalyear[];
  currentFy: Fiscalyear;

  constructor(private nsService: NsService, private fyService: FyService, private modalService: NgbModal) { }

  ngOnInit() {

    this.currentNs = this.nsService.currentNs();
    this._fetchData();
    this._fetchAllData();
    if (!this.currentFy) {
      this.currentFy = this.fyService.currentFy();
    }
  }

  _fetchData() {
    this.tableSource.ts.nsId = this.currentNs.id
    console.log(this.tableSource.ts)
    this.fyService.getSortOrder(this.tableSource.ts).subscribe((data) => {
      console.log(data)
      this.tableSource.data = data.content;
      //this.tableSource = tableSource;
      this.tableSource.ts.totalItems = data.totalElements
      this.tableSource.ts.pageSize = data.size
      this.tableSource.ts.page = data.number + 1
      this.tableSource.ts.startIndex = (this.tableSource.ts.page - 1) * this.tableSource.ts.pageSize;
      this.tableSource.ts.endIndex = (this.tableSource.ts.page - 1) * this.tableSource.ts.pageSize + this.tableSource.ts.pageSize;
      if (this.tableSource.ts.endIndex > this.tableSource.ts.totalItems) {
        this.tableSource.ts.endIndex = this.tableSource.ts.totalItems;
      }
      if (this.tableSource.ts.endIndex != 0) {
        this.tableSource.ts.startIndex = this.tableSource.ts.startIndex + 1;
      }
    })
  }

  callFormEvent(event) {
    this.haveForm = false;
    this.haveDeleteForm = false;
    this.modalService.dismissAll();
    this._fetchData();
  }


  /**Récuperation des exercices fiscaux */
  _fetchAllData() {
    this.fyService.getAll(this.nsService.currentNs().id).subscribe(data => {
      this.allFy = data;
    })
  }

  callDeleteEvent($event) {
    if ($event) {
      this.fyService.delete($event).subscribe((data) => {
        this.callFormEvent(data)
      });
    } else {
      this.modalService.dismissAll();
    }
  }


  actionsEventHandle($event, content) {
    console.log($event)
    switch ($event.info.action) {
      case 'update':
        this.haveForm = true
        this.formAction = $event.info.action
        this.modalFiscal = $event.data;
        this.txtInput = formInputTxt.find((item) => item.action == $event.info.action)
        this.modalService.open(content);
        break;
      case 'copy':
        this.haveForm = true
        this.formAction = $event.info.action
        this.modalFiscal = $event.data;
        this.modalFiscal.id = null;
        this.txtInput = formInputTxt.find((item) => item.action == $event.info.action)
        this.modalService.open(content);
        break;
      case 'delete':
        this.haveDeleteForm = true;
        this.modalFiscal = $event.data;
        this.modalService.open(content);
        break;
    }
    this._fetchData();
  }

  fetchDataEventHandle() {
    this._fetchData();
  }

   // Choix de l'espace de travail
   selectFy(event) {
    this.fyService.setCurrentFy(event)
  }

  /**
  * Open Event Modal
  * @param content modal content
  * @param event calendar event
  */
  openModal(content: any, event?: any) {
    this.haveForm = true;
    this.formAction = 'create'
    this.modalFiscal= new Fiscalyear
    this.txtInput = formInputTxt.find((item)=>item.action=='create')
    this.modalService.open(content);
  }
}
