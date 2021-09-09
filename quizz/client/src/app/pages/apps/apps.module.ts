import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { AppsRoutingModule } from './apps-routing.module';

import { EmailModule } from './email/email.module';
import { TasksModule } from './tasks/tasks.module';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarComponent } from './calendar/calendar.component';
import { NsComponent } from './ns/ns.component';
import { NsFormInputComponent } from './ns/ns-form-input/ns-form-input.component';
import { WidgetModule } from 'src/app/shared/widgets/widget.module';
import { HttpClientModule } from '@angular/common/http';
import { TablesRoutingModule } from '../ui/tables/tables-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { OfferModule } from './offer/offer.module';
import { ComptableModule } from './comptable/comptable.module';
import { AnalyseModule } from './analyse/analyse.module';


@NgModule({
    declarations: [CalendarComponent,NsComponent,NsFormInputComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule,
        FullCalendarModule,
        AppsRoutingModule,
        UIModule,
        EmailModule,
        OfferModule,
        TasksModule,
        NgSelectModule,
        WidgetModule,
        ComptableModule,
        AnalyseModule
    ],
    exports:[AnalyseModule]
})

export class AppsModule { }
