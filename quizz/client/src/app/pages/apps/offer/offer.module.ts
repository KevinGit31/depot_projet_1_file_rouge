import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../../shared/ui/ui.module';

import { ProjectRoutingModule } from './offer-routing.module';
import { NgbTabsetModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { OfferListComponent } from './offer-list/offer-list.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { StatusPipe } from './offer-list/status.pipe';
import { OfferInputComponent } from './offer-input/offer-input.component';
import { OfferProfilComponent } from './offer-profil/offer-profil.component';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        ProjectRoutingModule,
        NgbTabsetModule,
        NgbTooltipModule,
        NgbProgressbarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    declarations: [OfferListComponent, ProjectdetailComponent, StatusPipe, OfferInputComponent, OfferProfilComponent],
})

export class OfferModule { }
