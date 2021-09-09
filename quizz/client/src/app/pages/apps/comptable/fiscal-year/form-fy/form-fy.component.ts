import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';

@Component({
  selector: 'app-form-fy',
  templateUrl: './form-fy.component.html',
  styleUrls: ['./form-fy.component.scss']
})
export class FormFyComponent implements OnInit {

  @Input()
  fy: Fiscalyear;
  @Input()
  txt: any = {};

  haveForm: boolean;
  haveDeleteForm: boolean;
  formAction: String;

  @Output()
  fyFormEvent = new EventEmitter<string>();

  submitted: boolean;

  constructor(private formBuilder: FormBuilder, 
    private nsService: NsService,
    private modalService: NgbModal,
     private fyService: FyService) {
    this.submitted = false;
  }

  fyForm: FormGroup;

  ngOnInit() {

    if (this.fy) {
      this.fyForm = this.formBuilder.group({
        name: [this.fy.name, [Validators.required]],
        startDate: [this.fy.startDate, [Validators.required]],
        endDate: [this.fy.endDate, [Validators.required]],
      });
    } else {
      this.fyForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      });
    }
    console.log(this.txt)
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
  

  crudFy() {
    this.submitted = true;

    if (this.fyForm.invalid) {
      return;
    }

    let fy = new Fiscalyear()
    fy.namespace = this.nsService.currentNs()

    if (this.txt.action == 'update') {
      fy = this.fy;
    }

    if (this.fyForm.valid) {
      fy.name = this.fyForm.get('name').value;
      fy.startDate = this.fyForm.get('startDate').value;
      fy.endDate = this.fyForm.get('endDate').value;

      this.fyService.post(fy).subscribe(() => {
        this.callFyFormEvent('creer')
      })
    }
  }

  callFyFormEvent(value: string) {
    this.cleanForm()
    this.fyFormEvent.emit(value);
  }

  close() {
    this.callFyFormEvent('annuler')
  }

  get fyFormCtl() {
    return this.fyForm.controls;
  }

  // Effacer le formulaire
  cleanForm() {
    this.fyForm.patchValue({ name: '', startDate: '',endDate:'' })
  }

}