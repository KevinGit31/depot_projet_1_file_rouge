import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { JournalRow } from 'src/app/core/models/journal-row';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../ns/models/ns';
import { formDeleteTxt, tableSource } from './journal.data';
import * as moment from 'moment';
import 'moment/locale/fr'
import { TableAdvanced } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
moment.locale('fr')


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  months = moment.months();
  year: string;

  currentFy: Fiscalyear;
  currentNs: Ns;

  // Table sources
  tableSource: TableAdvanced = tableSource;
  tableSourceMonths = [];
  modalJournalRow = new JournalRow
  haveDeleteForm: boolean;
  txt = formDeleteTxt;

  constructor(private router: Router, private modalService: NgbModal, private nsService: NsService, private fyService: FyService, private jrService: JournalRowService) { }

  ngOnInit() {

    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
    this.year = moment(this.currentFy.startDate).format("YYYY")

    //this._fetchData();
    this.months.forEach(element => {
      let tableSource: TableAdvanced = new TableAdvanced;
      tableSource.setProperties(this.tableSource)
      this.tableSourceMonths.push(tableSource)

      console.log(this.tableSourceMonths)
    });

  }

  _fetchData() {
    this.tableSource.ts.nsId = this.currentNs.id
    this.tableSource.ts.fyId = this.currentFy.id
    console.log(this.tableSource.ts)
    this.jrService.getSortOrder(this.tableSource.ts).subscribe((data) => {
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

  _fetchDataByMonth(month, index) {
    index = 12-(index+1)
    this.tableSourceMonths[index].ts.nsId = this.currentNs.id
    this.tableSourceMonths[index].ts.fyId = this.currentFy.id
    this.tableSourceMonths[index].title = month + " - " + this.year;
    console.log(this.tableSource.ts)
    this.jrService.getByNsidFyidMonth(index, this.tableSource.ts).subscribe((data) => {

      this.tableSourceMonths[index].data = data;
    })
  }

  getTableSourceByMonth(month, index) {
    index = 12-(index+1)
    this.tableSourceMonths[index].title = month + " - " + this.year;
    return this.tableSourceMonths[index]
  }

  callFormEvent(event) {
    this.haveDeleteForm = false;
    this.modalService.dismissAll();

    this.months.forEach((month, index) => {
      this._fetchDataByMonth(month, index)
    });
  }


  /**Récuperation des exercices fiscaux */
  _fetchAllData() {
    /*this.fyService.getAll(this.nsService.currentNs().id).subscribe(data => {
      this.allFy = data;
    })*/
  }

  callDeleteEvent($event) {
    if ($event) {
      this.jrService.delete($event).subscribe((data) => {
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
        /*this.haveForm = true
        this.formAction = $event.info.action
        this.modalFiscal = $event.data;
        this.txtInput = formInputTxt.find((item) => item.action == $event.info.action)
        this.modalService.open(content);*/
        this.router.navigate(['apps/jr-create'], { state: { 
          action: $event.info.action, 
          data: $event.data ,
          backUrl: 'apps/journal'
        } })
        break;

      case 'copy':
        /*this.haveForm = true
        this.formAction = $event.info.action
        this.modalFiscal = $event.data;
        this.modalFiscal.id = null;
        this.txtInput = formInputTxt.find((item) => item.action == $event.info.action)
        this.modalService.open(content);*/
        this.router.navigate(['apps/jr-create'], { state: { 
          action: $event.info.action, 
          data: $event.data ,
          backUrl: 'apps/journal'
        } })
        break;
      case 'delete':
        this.haveDeleteForm = true;
        this.modalJournalRow = $event.data;
        this.modalService.open(content);
        break;
    }
    //this._fetchData();
  }

  fetchDataEventHandle(month, index) {
    console.log(index)
   
    this._fetchDataByMonth(month, index)
  }

  // Choix de l'espace de travail
  selectFy(event) {
    /*this.fyService.setCurrentFy(event)*/
  }

  /**
  * Open Event Modal
  * @param content modal content
  * @param event calendar event
  */
  openModal(content: any, event?: any) {
    /*this.haveForm = true;
    this.formAction = 'create'
    this.modalJournalRow= new Fiscalyear
    this.txtInput = formInputTxt.find((item)=>item.action=='create')
    this.modalService.open(content);*/
  }

  inputJournalRow() {
    console.log('create')
    this.router.navigate(['apps/jr-create'], { state: { 
      backUrl: 'apps/journal'
    } })
  }
}
