import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { TableState } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
import { Ns } from 'src/app/pages/apps/ns/models/ns';
import { CookieService } from './cookie.service';


@Injectable({
    providedIn: 'root'
})

export class NsService {

    href = 'http://localhost:8080';
    apiUrl = '/api/v1/ns'
    _currentNs: Ns;

    public _tS: TableState

    constructor(protected _http: HttpClient, private cookieService: CookieService) {
    }

    /**
    * Returns the current user
    */
    public currentNs(): Ns {
        this._currentNs = JSON.parse(this.cookieService.getCookie('currentNs'));
        return this._currentNs;
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

    // Créer plusieurs espace de travail
    postAll(body: any): Observable<any> {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}/all`;
        console.log(requestUrl)
        return this._http.post<any>(requestUrl, body)
    }

    // Créer un espace de travail
    post(body: any) {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}`;
        console.log(requestUrl)
        return this._http.post<any>(requestUrl, body);
    }

    // Modifier un espace de travail
    put(body: any): Observable<any> {
        console.log(body)
        const requestUrl = `${this.href}${this.apiUrl}`;
        return this._http.put<any>(requestUrl, body)
    }

    // Supprimer un espace de travail
    delete(id: number) {
        const requestUrl = `${this.href}${this.apiUrl}/${id}`;
        return this._http.delete<any>(requestUrl)
    }

    getSortOrder(_tS?: TableState): Observable<any> {
        let requestUrl;
        if (_tS) {
            this._tS = _tS;
            if (this._tS.page > 0)
                this._tS.page = this._tS.page - 1;
        }
        requestUrl = `${this.href}${this.apiUrl}?sort=${_tS.sortColumn}&order=${_tS.sortDirection}&page=${_tS.page}&size=${_tS.pageSize}&query=${_tS.searchTerm}`
        return this._http.get<any>(requestUrl);
    }

    public setCurrentNs(ns: Ns) {
        this.cookieService.setCookie('currentNs', JSON.stringify(ns),1);
        this.cookieService.deleteCookie('currentFy');
    }
}
