import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DndDropEvent } from 'ngx-drag-drop';
import { ProfilSection } from 'src/app/core/models/profil-section/profil-section';
import { Profil } from 'src/app/core/models/profil/profil';

@Component({
  selector: 'app-offer-profil',
  templateUrl: './offer-profil.component.html',
  styleUrls: ['./offer-profil.component.scss']
})
export class OfferProfilComponent implements OnInit {

  validationform: FormGroup;
  
  @Input()
  profil:Profil

  @Output()
  profilEventEmit = new EventEmitter<Profil>()

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    if(!this.profil){
      this.profil = new Profil;
    }
    this.validationform = this.formBuilder.group({
      profil_title: ['', Validators.required],
      profil_desc: ['', Validators.required]
    });
  }

    /**
   * On task drop event
   */
     onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
      if (filteredList && event.dropEffect === 'move') {
        let index = event.index;
  
        if (typeof index === 'undefined') {
          index = filteredList.length;
        }
  
        filteredList.splice(index, 0, event.data);
      }
    }
  
    /**
     * on dragging task
     * @param item item dragged
     * @param list list from item dragged
     */
    onDragged(item: any, list: any[]) {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }


  validSubmit(){
    let ps = new ProfilSection;

    ps.title=this.validationform.get('profil_title').value;
    ps.description=this.validationform.get('profil_desc').value;

    this.profil.sections.push(ps);
    this.validationform.setValue({profil_title:'',profil_desc: ''})
    this.profilEventEmit.emit(this.profil)
  }

  delete(ps:ProfilSection){
    this.profil.sections = this.profil.sections.filter((_ps)=>_ps!=ps);
  }

  update(ps:ProfilSection){
    this.profil.sections = this.profil.sections.filter((_ps)=>_ps!=ps);
    this.validationform.setValue({profil_title:ps.title,profil_desc: ps.description})
  }
}
