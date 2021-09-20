import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FlatpickrModule } from 'angularx-flatpickr';

import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';


import { WidgetModule } from '../shared/widgets/widget.module';
import { UsersComponent } from './users/users.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { QcmComponent } from './qcm/qcm.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { FormQuestionComponent } from './question/form-question/form-question.component';
import { AnswerRowComponent } from './question/answer-row/answer-row.component';
import { FormQcmComponent } from './qcm/form-qcm/form-qcm.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuestionRowComponent } from './qcm/question-row/question-row.component';
import { QuizzQcmComponent } from './quizz-qcm/quizz-qcm.component';
import { QuizzWizardComponent } from './quizz-wizard/quizz-wizard.component';
import { ArchwizardModule } from 'angular-archwizard';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
     UsersComponent, 
     FormUserComponent,
      FormDeleteComponent, 
      QcmComponent, 
      QuestionComponent, 
      AnswerComponent,
       FormQuestionComponent,ScoreComponent ,
        AnswerRowComponent, FormQcmComponent, QuestionRowComponent, QuizzQcmComponent, QuizzWizardComponent],
  imports: [
    NgSelectModule,
    CommonModule,
    FormsModule,
    NgbAlertModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    UIModule,
    WidgetModule,
    ArchwizardModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
