import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Qcm } from '../models/qcm';

const baseUrl = environment.api_url

@Injectable({
  providedIn: 'root'
})
export class QcmService {

  constructor(private http: HttpClient) { }

    getAll() {
        let url=baseUrl+"api/qcm"
        return this.http.get<Qcm[]>(url);
    }

    createQcm(qcm:Qcm) {
        let url=baseUrl+"api/qcm"
        return this.http.post<Qcm[]>(url,qcm);
    }

    updateQcm(qcm: Qcm) {
        let url=baseUrl+"api/qcm/"+qcm.id
        return this.http.put<Qcm[]>(url,qcm);
    }

    deleteQcm(qcm: Qcm) {
        let url=baseUrl+"api/qcm/"+qcm.id
        return this.http.delete<Qcm[]>(url);
    }
}
