import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { JournalPrevComponent } from './journal-prev/journal-prev.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';


const routes: Routes = [
    {
        path: 'journal-prev',
        component: JournalPrevComponent,
        data:{
            title:'Le journal de prévision',
        }
    },
    {
        path: 'budget',
        component: ViewBudgetComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyseRoutingModule { }
