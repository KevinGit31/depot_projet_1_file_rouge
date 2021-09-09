import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { GraphiqueComponent } from './graphique/graphique.component';
import { BilanComponent } from './bilan/bilan.component';

import { CompteComponent } from './compte/compte.component';
import { FiscalYearComponent } from './fiscal-year/fiscal-year.component';
import { FormJournalRowComponent } from './journal/form-journal-row/form-journal-row.component';
import { JournalComponent } from './journal/journal.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ResultatComponent } from './resultat/resultat.component';

const routes: Routes = [
    {
        path: 'comptes-ref',
        component: CompteComponent,
        data:{
            title:'Les comptes de references',
            btncreate:'Créer un compte',
            typeAccount:'acc'
        }
    },
    {
        path: 'comptes-sub',
        component: CompteComponent,
        data:{
            title:'Les sous comptes',
            btncreate:'Créer un sous compte',
            typeAccount:'sub'
        }
    },
    {
        path: 'fiscal-year',
        component: FiscalYearComponent,
        data:{
            title:'L\'execices fical',
        }
    },
    {
        path: 'journal',
        component: JournalComponent,
        data:{
            title:'Le journal',
        }
    },
    {
        path: 'jr-create',
        component:FormJournalRowComponent,
        data:{
            title:'Le journal',
        }
    },
    {
        path: 'ledger',
        component: LedgerComponent,
        data:{
            title:'Le grand livre',
        }
    },
    {
        path: 'balance',
        component: BalanceComponent,
        data:{
            title:'La balance',
        }
    },
    {
        path: 'resultat',
        component: ResultatComponent,
        data:{
            title:'Le resultat',
        }
    },
    {
        path: 'bilan',
        component: BilanComponent,
        data:{
            title:'Le bilan',
        }
    },
    {
        path: 'graphique',
        component: GraphiqueComponent,
        data:{
            title:'Graphique',
        }
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComptableRoutingModule { }
