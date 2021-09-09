import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Ns } from '../models/ns';
import { formText } from './ns-form.data';

@Component({
  selector: 'app-ns-form-input',
  templateUrl: './ns-form-input.component.html',
  styleUrls: ['./ns-form-input.component.scss']
})
export class NsFormInputComponent implements OnInit {

  // Créer un espace de travail
  formCreateNs: FormGroup;
  submitted: boolean;
  texts: any;

  @Input()
  ns: Ns
  @Input()
  formAction: string

  @Output()
  nsFormEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private nsService: NsService) {
    this.submitted = false;
  }

  ngOnInit() {
    
    if(this.formAction){
      this.texts = formText.find((item)=>item.action==this.formAction).texts
      console.log(this.texts)
    }
   
    if (this.ns) {
      this.formCreateNs = this.formBuilder.group({
        name: [this.ns.name, [Validators.required]],
        description: [this.ns.description],
      });
    } else {
      this.formCreateNs = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
      });
      this.ns = new Ns;
    }

  }

  /**
    * Créer un espace de travail
    * @returns 
    */
  createNewNs() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formCreateNs.invalid) {
      return;
    }

    if (this.formCreateNs.valid) {
      this.ns.name = this.formCreateNs.get('name').value;
      // tslint:disable-next-line: no-shadowed-variable
      this.ns.description = this.formCreateNs.get('description').value;

      this.nsService.post(this.ns).subscribe(()=>{
        this.callNsFormEvent('creer')
      });
    }
  }

  callNsFormEvent(value: string) {
    this.nsFormEvent.emit(value);
  }

  close() {
    this.callNsFormEvent('annuler')
  }

  /**
* Returns the form
*/
  get createForm() {
    return this.formCreateNs.controls;
  }
}
