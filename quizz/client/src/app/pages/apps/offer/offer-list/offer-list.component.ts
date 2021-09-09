import { Component, OnInit } from '@angular/core';

import { EStatus } from '../../../../core/models/estatus/estatus';
import { ETypecontrat } from '../../../../core/models/etypecontrat/etypecontrat';
import { OfferService } from 'src/app/core/services/offer/offer.service';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})

/**
 * Project-list component - handling project-list with sidebar and content
 */
export class OfferListComponent implements OnInit {

  EStatus: EStatus;
  Etypecontrat: ETypecontrat;
  offers: any;
  offer: any;
  closeModal: string;

  constructor(private _OfferService: OfferService, private modalService: NgbModal) { }

  ngOnInit() {
    this._fetchData();
  }

  /**
   * Fetches the Projects data
   */
  private _fetchData() {
    console.log("fetch data")
    this._OfferService.list().subscribe((offers)=>{
      this.offers = offers;
    })
  }

  triggerModal(content, offer) {
    this.offer = offer;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(this.closeModal);
      this._OfferService.delete(offer.id).subscribe((message)=>{
        console.log(message);
        this._fetchData();
      })
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
