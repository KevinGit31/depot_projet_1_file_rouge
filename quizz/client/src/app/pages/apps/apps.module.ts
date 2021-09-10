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
import { WidgetModule } from 'src/app/shared/widgets/widget.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    declarations: [CalendarComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule,
        FullCalendarModule,
        AppsRoutingModule,
        UIModule,
        EmailModule,
        TasksModule,
        NgSelectModule,
        WidgetModule,
    ],
})

export class AppsModule { }
