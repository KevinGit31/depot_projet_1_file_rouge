import { Pipe, PipeTransform } from '@angular/core';
import { OfferListComponent } from './offer-list.component';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): any {
    let rep;
    console.log(value)
    switch (value) {
      case "NEW":
        rep = "Nouveau"
        break;
      case "VALID":
        rep = "Valide"
        break
      case "EXPIRED":
        rep = "Expirée"
        break;
      default:
        rep = "Expirée"
    }
    return rep;
  }

}
