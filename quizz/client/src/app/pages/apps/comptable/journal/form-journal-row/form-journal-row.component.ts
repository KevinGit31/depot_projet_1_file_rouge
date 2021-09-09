import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/account';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { JournalRow } from 'src/app/core/models/journal-row';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalPrevRowService } from 'src/app/core/services/vdg-service/jr-prev.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { formInputTxt } from '../journal.data';

@Component({
  selector: 'app-form-journal-row',
  templateUrl: './form-journal-row.component.html',
  styleUrls: ['./form-journal-row.component.scss']
})
export class FormJournalRowComponent implements OnInit {

  @Input()
  jr: JournalRow;

  journalRowForm: FormGroup;
  txt;

  submitted: boolean;

  accounts: Account[];
  currentFy: Fiscalyear;

 backUrl= "";

  constructor(private router: Router, 
    private fyService: FyService, private formBuilder: FormBuilder, 
    private jrService: JournalRowService, private nsService: NsService, 
    private compteService: CompteService, private jrPrevService: JournalPrevRowService,) {
    this.txt = formInputTxt.find((item) => item.action == 'create')
    console.log(this.txt)
  }

  ngOnInit() {
    const { data, action,backUrl } = history.state
    if (history.state) {
      console.log(history.state)
      this.backUrl = backUrl;
    }
    this.journalRowForm = this.formBuilder.group({
      dateOperation: ['', [Validators.required]],
      label: ['', [Validators.required]],
      debit: ['', [Validators.required]],
      credit: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
    if (action)
      this.txt = formInputTxt.find((item) => item.action == action)



    this.currentFy = this.fyService.currentFy();

    this.compteService.getAllSub(this.nsService.currentNs().id).subscribe((accounts) => {
      this.accounts = accounts;
      /*if(this.account && this.account.account){
        this.selectAccount = this.accounts.find((account) => account.id == this.account.account.id);
        this.accountForm.patchValue({
          label: this.account.label,
          number1: this.splitNumber()
        });
      }*/
      if (data){
        this.setJournalRowForm(data);
        this.jr = data;
      }
      
    });
  }

  setJournalRowForm(data) {

    this.journalRowForm.patchValue({
      dateOperation: data.dateOperation,
      debit:data.debit,
      credit:data.credit,
      label: data.label,
      amount: data.amount
    });
  }

  get journalRowFormCtl() {
    return this.journalRowForm.controls;
  }

  crudJr() {
    this.submitted = true;

    if (this.journalRowForm.invalid) {
      return;
    }

    let jr = new JournalRow()
    jr.namespace = this.nsService.currentNs()

    if (this.txt.action == 'update') {
      jr = this.jr;
    }

    if (this.journalRowForm.valid) {
      console.log(this.journalRowForm.get('amount').value)
      jr.amount = this.journalRowForm.get('amount').value;
      jr.dateOperation = this.journalRowForm.get('dateOperation').value;
      jr.label = this.journalRowForm.get('label').value;
      jr.debit = this.journalRowForm.get('debit').value;
      jr.credit = this.journalRowForm.get('credit').value;

      if(this.backUrl=='apps/journal-prev'){
        this.jrPrevService.post(jr).subscribe(() => {
          this.router.navigate([this.backUrl])
        })
      }else{
        this.jrService.post(jr).subscribe(() => {
          this.router.navigate([this.backUrl])
        })
      }
    }
  }

  close() {
    this.router.navigate([this.backUrl])
  }

}
