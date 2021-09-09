import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOffer } from 'src/app/pages/apps/offer/offer-list/IOffer';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  listUrl="/api/v1/offre"


  constructor(private _http:HttpClient) { }

  list(){
    let url = environment.api_url+this.listUrl;
    return this._http.get(url);
  }

  get(id:number){
    let url = `${environment.api_url}${this.listUrl}/${id}`;
    return this._http.get(url);
  }

  create(body:IOffer){
    let url = `${environment.api_url}${this.listUrl}`;
    return this._http.post(url,body);
  }

  update(body:IOffer){
    let url = `${environment.api_url}${this.listUrl}`;
    return this._http.put(url,body);
  }

  delete(id:number){
    let url = `${environment.api_url}${this.listUrl}/${id}`;
    return this._http.delete(url);
  }
}
