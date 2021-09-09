import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';


@Component({
  selector: 'app-form-subaccount',
  templateUrl: './form-subaccount.component.html',
  styleUrls: ['./form-subaccount.component.scss']
})
export class FormSubaccountComponent implements OnInit {
  @Input()
  account: Account;
  @Input()
  txt: any = {};

  @Output()
  accountFormEvent = new EventEmitter<string>();

  selectAccount: Account;

  submitted: boolean;

  accounts: Account[]

  constructor(private formBuilder: FormBuilder, private nsService: NsService, private compteService: CompteService) {
    this.submitted = false;
  }

  accountForm: FormGroup;

  ngOnInit() {

    if (this.account) {
      this.accountForm = this.formBuilder.group({
        account: ['', [Validators.required]],
        number0: ['', [Validators.required]],
        label: ['', [Validators.required]],
        number1: ['', [Validators.required]],
      });

    } else {
      this.accountForm = this.formBuilder.group({
        account: ['', [Validators.required]],
        number0: ['', [Validators.required]],
        label: ['', [Validators.required]],
        number1: ['', [Validators.required]],
      });
    }
    console.log(this.txt)
    this.compteService.getAllRef(this.nsService.currentNs().id).subscribe((accounts) => {
      this.accounts = accounts;
      if(this.account && this.account.account){
        this.selectAccount = this.accounts.find((account) => account.id == this.account.account.id);
        this.accountForm.patchValue({
          label: this.account.label,
          number1: this.splitNumber()
        });
      }
    });
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

      if(this.selectAccount){
        account.labelBilan = this.selectAccount.labelBilan
      }

      account.category = this.accountForm.value.account.category
      account.account = this.accountForm.value.account
      account.label = this.accountForm.value.label

      account.number = this.getNumberFormat(this.accountForm.value.number0, this.accountForm.value.number1);
      this.compteService.post(account).subscribe(
        (data) => this.onSuccess(data),
        (error) => console.log(error)
      );

    }
  }

  onSuccess(data: any) {
    this.callAccountFormEvent('creer')
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
    this.accountForm.patchValue({ account:'',label: '', number0:'',number1: '' })
  }
  //Separer les numeros
  splitNumber(){
    return this.account.number.split('-')[1];
  }

  // Recherche un compte par son id
  getSelectValue(accounts: any, id: number) {
    return accounts.find((acc: any) => acc.id == id)
  }

  getNumberFormat(number0: string, number1: string) {
    var str = "" + number1
    var pad = "0000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return number0 + "-" + ans;
  }


  change(event) {

    this.selectAccount = event;
    if (this.selectAccount) {
      this.accountForm.patchValue({
        number0: this.selectAccount.number
      });
    }

    console.log(this.selectAccount)
  }


}
