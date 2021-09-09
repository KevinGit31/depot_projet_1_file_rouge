import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../../../ns/models/ns';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})
export class FormAccountComponent implements OnInit {

  @Input()
  account: Account;
  @Input()
  txt: any = {};

  @Output()
  accountFormEvent = new EventEmitter<string>();

  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private nsService: NsService, private compteService: CompteService) {
    this.submitted = false;
  }

  accountForm: FormGroup;

  ngOnInit() {

    if (this.account) {
      this.accountForm = this.formBuilder.group({
        name: [this.account.label, [Validators.required]],
        number: [this.account.number],
      });
    } else {
      this.accountForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        number: [''],
      });
    }
    console.log(this.txt)
  }

  crudAccount() {
    this.submitted = true;

    if (this.accountForm.invalid) {
      return;
    }

    let account = new Account()
    account.namespace = this.nsService.currentNs()

    if (this.txt.action == 'update') {
      account = this.account;
    }

    if (this.accountForm.valid) {
      account.label = this.accountForm.get('name').value;
      account.number = this.accountForm.get('number').value;

      this.compteService.post(account).subscribe(() => {
        this.callAccountFormEvent('creer')
      })
    }
  }

  callAccountFormEvent(value: string) {
    this.cleanForm()
    this.accountFormEvent.emit(value);
  }

  close() {
    this.callAccountFormEvent('annuler')
  }

  get accountFormCtl() {
    return this.accountForm.controls;
  }

  // Effacer le formulaire
  cleanForm() {
    this.accountForm.patchValue({ name: '', number: '' })
  }

}
