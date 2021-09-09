import { DecimalPipe } from '@angular/common';
import { flatten } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Table } from '../../ui/tables/advanced/advanced.model';

import { Ns } from './models/ns';
import { formDeleteTxt, tableSource } from './ns.data';
/*import { FormAccountDisplay } from '../comptable/form/form-account/form-account.component';
import { TableDataRow } from '../comptable/table/table.component';*/

@Component({
  selector: 'app-ns',
  templateUrl: './ns.component.html',
  styleUrls: ['./ns.component.css'],
  providers: [NsService, DecimalPipe]
})
export class NsComponent implements OnInit {

  tableSource = tableSource
  modalNs: Ns;
  haveForm: boolean;
  haveDeleteForm: boolean;
  formAction: String;

  getAllSubscription: Subscription;
  tables$: Observable<Table[]>;

  allNs: Ns[];
  currentNs: Ns;

  // Initialisation des textes de form-delete
  txt = formDeleteTxt;

  constructor(
    private nsService: NsService,
    private modalService: NgbModal) {
    //this.tables$ = service.tables$;

  }

  ngOnInit(): void {
    this.tableSource = tableSource;
    console.log(this.tableSource)
    this._fetchData()
    this._fetchAllData();

    if (!this.currentNs) {
      this.currentNs = this.nsService.currentNs();
    }

  }

  /**
   * Open Event Modal
   * @param content modal content
   * @param event calendar event
   */
  openModal(content: any, event?: any) {
    this.haveForm = true;
    this.formAction = 'create'
    this.modalService.open(content);
  }

  actionsEventHandle($event, content) {
    console.log($event)
    switch ($event.info.action) {
      case 'update':
        this.haveForm = true;
        this.formAction = $event.info.action
        this.modalNs = $event.data;
        this.modalService.open(content);
        break;
      case 'copy':
        this.haveForm = true;
        this.formAction = $event.info.action
        this.modalNs = $event.data;
        this.modalNs.id = null;
        this.modalService.open(content);
        break;
      case 'delete':
        this.haveDeleteForm = true;
        this.modalNs = $event.data;
        this.modalService.open(content);
        break;
    }
    this._fetchData();
  }

  callNsFormEvent(event) {
    this.haveForm = false;
    this.haveDeleteForm = false;
    this.modalService.dismissAll();
    this._fetchData();
  }

  callDeleteEvent($event) {
    console.log($event)
    this.nsService.delete($event).subscribe((data)=>{
        console.log(data)
        this.callNsFormEvent(data)
    });
  }


  _fetchData() {
    this.nsService.getSortOrder(this.tableSource.ts).subscribe((data) => {
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

  _fetchAllData() {
    this.nsService.getAll().subscribe(data => {
      this.allNs = data;
    })
  }

  // Choix de l'espace de travail
  selectNs(event) {
    this.nsService.setCurrentNs(event)
  }

  fetchDataEventHandle() {
    this._fetchData();
  }

}
