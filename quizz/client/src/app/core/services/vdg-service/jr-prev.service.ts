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

export class JournalPrevRowService {


    href = 'http://localhost:8080';
    apiUrl = '/api/v1/journal-prev'

    public _tS: TableState

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
        requestUrl = `${this.href}${this.apiUrl}?sort=${_tS.sortColumn}&order=${_tS.sortDirection}&page=${_tS.page}&size=${_tS.pageSize}&fyId=${_tS.fyId}&nsId=${_tS.nsId}`
        return this._http.get<any>(requestUrl);
    }

    getByNsidFyidMonth(month: number, _tS?: TableState): Observable<any> {
        let requestUrl;
        if (_tS) {
            this._tS = _tS;
            if (this._tS.page > 0)
                this._tS.page = this._tS.page - 1;
        }
        requestUrl = `${this.href}${this.apiUrl}/month?month=${month}&fyId=${_tS.fyId}&nsId=${_tS.nsId}`
        console.log(requestUrl)
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation des informations du grand livre */
    getLedgerSolde(nsId: number, fyId: number, subAccountId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/ledger/solde?nsId=${nsId}&fyId=${fyId}&subAccountId=${subAccountId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation des informations du grand livre */
    getAccountSolde(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/banq-account/solde?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }


    /**Récuperation des informations du grand livre */
    getLedger(nsId: number, fyId: number, subAccountId: number, month: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/ledger?nsId=${nsId}&fyId=${fyId}&subAccountId=${subAccountId}&month=${month}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation de la balance*/
    getBalance(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/balance?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation du compte de résultat*/
    getResultat(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/resultat?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }


    /**Récuperation du compte de résultat*/
    getResultatByNs(nsId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/resultat/months?nsId=${nsId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation du compte de résultat*/
    getBilan(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/bilan?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation des comptes passif*/
    getBilanPassifDetail(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/bilan-detail/passif?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récuperation des comptes actif*/
    getBilanActifDetail(nsId: number, fyId: number) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/bilan-detail/actif?nsId=${nsId}&fyId=${fyId}`
        return this._http.get<any>(requestUrl);
    }

    /**Récupération des soldes des classes */
    getAccountsSolde(nsId: number, fyId: number,accountId:string) {
        let requestUrl;
        requestUrl = `${this.href}${this.apiUrl}/accounts?nsId=${nsId}&fyId=${fyId}&accountId=${accountId}`
        return this._http.get<any>(requestUrl);
    }
}

