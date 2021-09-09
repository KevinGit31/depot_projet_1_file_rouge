import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import {Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { TableState } from 'src/app/shared/widgets/table-advanced/table-advanced.model';


@Injectable({
    providedIn: 'root'
})

export class CompteService {

    href = 'http://localhost:8080';
    apiUrl = '/api/v1/accounts'

    public _tS: TableState = {
        sortColumn: "name",
        sortDirection: 'asc',
        searchTerm: '',
        page: 1,
        pageSize: 2,
        startIndex: 1,
        endIndex: 10,
        totalItems: 0,
        nsId:0,
        fyId:0,
        option: ''
    };

    constructor(protected _http: HttpClient) {
    }

    get page() { return this._tS.page; }
    get pageSize() { return this._tS.pageSize; }
    get searchTerm() { return this._tS.searchTerm; }
    get startIndex() { return this._tS.startIndex; }
    get endIndex() { return this._tS.endIndex; }
    get totalRecords() { return this._tS.totalItems; }

    getAll(): Observable<any> {
        const requestUrl = `${this.href}${this.apiUrl}/all`
        return this._http.get<any>(requestUrl);
    }

    getAllRef(nsId:number): Observable<any> {
        const requestUrl = `${this.href}${this.apiUrl}/all-ref?nsId=${nsId}`
        return this._http.get<any>(requestUrl);
    }

    getAllSub(nsId:number): Observable<any> {
        const requestUrl = `${this.href}${this.apiUrl}/all-sub?nsId=${nsId}`
        return this._http.get<any>(requestUrl);
    }

    // Créer plusieurs comptes
    postAll(body: any): Observable<any> {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}/all`;
        console.log(requestUrl)
        return this._http.post<any>(requestUrl, body)
    }

    // Créer un compte
    post(body: any) {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}`;
        console.log(requestUrl)
        return this._http.post<any>(requestUrl, body);
    }

    // Modifier un compte
    put(body: any): Observable<any> {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}`;
        return this._http.put<any>(requestUrl, body)
    }

    // Supprimer un compte
    delete(id: number) {
        const requestUrl = `${this.href}${this.apiUrl}/${id}`;
        return this._http.delete<any>(requestUrl)
    }

    getSortOrder(_tS?:TableState): Observable<any> {
        let requestUrl;
        if(_tS){
            this._tS=_tS;
            if(this._tS.page>0)
            this._tS.page = this._tS.page -1;
        }
        requestUrl = `${this.href}${this.apiUrl}?sort=${_tS.sortColumn}&order=${_tS.sortDirection}&page=${_tS.page}&size=${_tS.pageSize}&id=${_tS.nsId}&query=${_tS.searchTerm}&option=${_tS.option}`
        return this._http.get<any>(requestUrl);
    }
}
