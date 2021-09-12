import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QcmSession } from '../models/qcm-session';

const baseUrl = environment.api_url

@Injectable({
  providedIn: 'root'
})
export class QcmSessionService {

  constructor(private http: HttpClient) { }

    getAll() {
        let url=baseUrl+"api/qcm-session"
        return this.http.get<QcmSession[]>(url);
    }

    createQcmSession(qcmsession:QcmSession) {
        let url=baseUrl+"api/qcm-session"
        return this.http.post<any>(url,qcmsession);
    }

    updateQcmSession(qcmsession: QcmSession) {
        let url=baseUrl+"api/qcm-session/"+qcmsession.id
        return this.http.put<QcmSession[]>(url,qcmsession);
    }

    deleteQcmSession(qcmsession: QcmSession) {
        let url=baseUrl+"api/qcm-session/"+qcmsession.id
        return this.http.delete<QcmSession[]>(url);
    }
}
