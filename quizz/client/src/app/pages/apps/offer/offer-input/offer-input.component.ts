import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IOffer } from '../offer-list/IOffer';
import { Contrat } from 'src/app/core/models/contrat/contrat';
import { Offer } from 'src/app/core/models/offre/offre';
import { Company } from 'src/app/core/models/company/company';
import { Contact } from 'src/app/core/models/contact/contact';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { Typecontact } from 'src/app/core/models/typecontact/typecontact';
import { Profil } from 'src/app/core/models/profil/profil';
import { ProfilSection } from 'src/app/core/models/profil-section/profil-section';

@Component({
  selector: 'app-offer-input',
  templateUrl: './offer-input.component.html',
  styleUrls: ['./offer-input.component.scss']
})
export class OfferInputComponent implements OnInit {

  validationform: FormGroup;
  submit: boolean;
  selectTypeContrat= [{text:'CDD',id:0}, {text:'CDI',id:1}, {text:'MISSION',id:2}, {text:'AUTRES',id:3}];
  offer:IOffer;
  profil: Profil;

  constructor(private _router: Router, public formBuilder: FormBuilder, private offerService: OfferService) { }

  ngOnInit() {

    this.validationform = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      job: [''],
      salary: [''],
      nbrPost: [''],
      typeContrat: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      descriptionContrat: [''],
      name: ['', Validators.required],
      nip: [''],
      address: ['', Validators.required],
      contact: ['', Validators.required],
    });

    this.submit = false;
    this.offer = new Offer;
  }

  get form() {
    return this.validationform.controls;
  }

  validSubmit() {
    console.log("validSubmit")
    this.submit = true;

    if(this.validationform.valid){
      let contrat = new Contrat;
      let company = new Company;
      let contact = new Contact;
      let typeContact = new Typecontact
      let profil = new Profil
      let profilsection = new ProfilSection

      contrat.type = this.validationform.get('typeContrat').value
      contrat.startDate = this.validationform.get('startDate').value
      contrat.endDate= this.validationform.get('endDate').value
      contrat.description = this.validationform.get('descriptionContrat').value

      company.name = this.validationform.get('name').value
      company.nip = this.validationform.get('nip').value
      company.address= this.validationform.get('address').value

      typeContact.info = this.validationform.get('contact').value

      company.contact.phones = [typeContact ]

      

      // Affectation formulaire à l'Interface
      this.offer.title = this.validationform.get('title').value
      this.offer.description = this.validationform.get('description').value
      this.offer.job = this.validationform.get('job').value
      this.offer.salary = this.validationform.get('salary').value
      this.offer.nbrPost = this.validationform.get('nbrPost').value
      this.offer.company = company
      this.offer.contrat = contrat
      this.offer.profil = this.profil

      console.log("Succes")
      this.submit = false;
      console.log(this.offer)
      
      this.offerService.create(this.offer).subscribe((data)=>{
        console.log(data)
        this._router.navigate(['/apps/offer-list']);
      });
    }
  }


  back(){
    console.log("back")
    this._router.navigate([`/apps/offer-list`])
  }

  setProfil(event){
    this.profil = event;
  }

}
