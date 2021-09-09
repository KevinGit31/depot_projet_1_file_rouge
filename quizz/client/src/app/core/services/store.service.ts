import { Injectable } from '@angular/core';
import { Ns } from 'src/app/pages/apps/ns/models/ns';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentNs:Ns;

  constructor() {}

}
