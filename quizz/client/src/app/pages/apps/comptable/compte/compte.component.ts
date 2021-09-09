import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'protractor';
import { Account } from 'src/app/core/models/account';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../ns/models/ns';
import { formDeleteTxt, formInputTxt, tableSourceCompte } from './compte.data';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  title: String;
  currentNs: Ns;

  btncreate:string;

  typeAccount: string;

  tableSource = tableSourceCompte;

  // Initialisation des textes de form-delete
  txt = formDeleteTxt;
  txtInput;

  modalAccount: Account
  haveForm: boolean;
  haveSubForm: boolean;
  haveDeleteForm: boolean;
  formAction: String;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private nsService: NsService, private compteService: CompteService) {
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(d => { 
        this.title = d.title; 
        this.typeAccount = d.typeAccount;
        this.btncreate = d.btncreate;
    });

    this.currentNs = this.nsService.currentNs();
    this._fetchData()
  }

  _fetchData() {
    this.tableSource.ts.option = this.typeAccount
    this.tableSource.ts.nsId = this.currentNs.id
    this.compteService.getSortOrder(this.tableSource.ts).subscribe((data) => {
      console.log( data.content)
      this.tableSource.data = data.content;
      //this.tableSource = tableSource;

      if (this.currentNs)
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

  actionsEventHandle($event, content) {
    console.log($event)
    switch ($event.info.action) {
      case 'update':
        this.setHaveForm();
        this.formAction = $event.info.action
        this.modalAccount = $event.data;
        this.txtInput = formInputTxt.find((item)=>item.action==$event.info.action)
        this.modalService.open(content);
        break;
      case 'copy':
        this.setHaveForm();
        this.formAction = $event.info.action
        this.modalAccount = $event.data;
        this.modalAccount.id = null;
        this.txtInput = formInputTxt.find((item)=>item.action==$event.info.action)
        this.modalService.open(content);
        break;
      case 'delete':
        this.haveDeleteForm = true;
        this.modalAccount = $event.data;
        this.modalService.open(content);
        break;
    }
    this._fetchData();
  }

  openModal(content: any, event?: any) {
    this.setHaveForm()
    this.formAction = 'create'
    this.modalAccount= new Account
    this.txtInput = formInputTxt.find((item)=>item.action=='create')
    this.modalService.open(content);
  }

  callFormEvent(event) {
    this.haveForm = false;
    this.haveSubForm = false;
    this.haveDeleteForm = false;
    this.modalService.dismissAll();
    this._fetchData();
  }

  fetchDataEventHandle() {
    this._fetchData();
  }

  callDeleteEvent($event) {
    if ($event) {
      this.compteService.delete($event).subscribe((data) => {
        this.callFormEvent(data)
      });
    } else {
      this.modalService.dismissAll();
    }
  }

  //Traitement de l'affichage des formes 
  setHaveForm(){
    if(this.typeAccount=="acc"){
      this.haveForm = true;
    }else{
      this.haveSubForm= true;
    }
  }

}


export class TableDataRow {
  option: string
  data?: any

  constructor(option: string, data?: any) {
    this.option = option;
    this.data = data
  }
}

