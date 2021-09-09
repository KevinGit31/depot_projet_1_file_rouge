import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { formText } from 'src/app/pages/apps/ns/ns-form-input/ns-form.data';
import { DeleteFormText } from './form-delete';


@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.scss']
})
export class FormDeleteComponent implements OnInit {

  // Créer un espace de travail
  formDelete: FormGroup;
  submitted: boolean;
  texts: any;

  @Input()
  item:any
  @Input()
  itemField:string
  @Input()
  formAction: string

  @Input()
  txt: DeleteFormText

  @Output()
  formEvent = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder, private nsService: NsService) {
    this.submitted = false;
    if(!this.txt){
      this.txt = new DeleteFormText
    }
  }

  ngOnInit() {

    if (this.formAction) {
      this.texts = formText.find((item) => item.action == this.formAction).texts
      console.log(this.texts)
    }
    this.formDelete = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  /**
    * Créer un espace de travail
    * @returns 
    */
  delete() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formDelete.invalid) {
      return;
    }

    if (this.formDelete.valid) {
      console.log("Delete - start") 
      this.callNsFormEvent(this.item.id) 
    }
  }

  callNsFormEvent(value: number) {
    this.formEvent.emit(value);
  }

  close() {
    this.callNsFormEvent(0)
  }

  match(){
    if(this.item[this.itemField]==this.formDelete.value.name){
      return true;
    }
    return false;
  }

  /**
* Returns the form
*/
  get deleteForm() {
    return this.formDelete.controls;
  }
}

