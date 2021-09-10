import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { FormQcmComponent } from './qcm/form-qcm/form-qcm.component';
import { QcmComponent } from './qcm/qcm.component';
import { FormQuestionComponent } from './question/form-question/form-question.component';
import { QuestionComponent } from './question/question.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user',component:UsersComponent},
  { path: 'user/create',component:FormUserComponent},
  { path: 'user/update',component:FormUserComponent},
  { path: 'user/delete',component:FormDeleteComponent},
  { path: 'qcm',component:QcmComponent},
  { path: 'qcm/create',component:FormQcmComponent},
  { path: 'qcm/update',component:FormQcmComponent},
  { path: 'qcm/delete',component:FormDeleteComponent},
  { path: 'question',component:QuestionComponent},
  { path: 'question/create',component:FormQuestionComponent},
  { path: 'question/update',component:FormQuestionComponent},
  { path: 'question/delete',component:FormDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
