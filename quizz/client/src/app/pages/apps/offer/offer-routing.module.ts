import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferListComponent } from './offer-list/offer-list.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { OfferInputComponent } from './offer-input/offer-input.component';

const routes: Routes = [
    {
        path: 'offer-list',
        component: OfferListComponent,
    },
    {
        path: 'offer-detail',
        component: ProjectdetailComponent
    },
    {
        path: 'create-offer',
        component:OfferInputComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
