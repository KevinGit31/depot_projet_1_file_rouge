import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { QcmComponent } from './qcm/qcm.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user',component:UsersComponent},
  { path: 'user/create',component:FormUserComponent},
  { path: 'user/update',component:FormUserComponent},
  { path: 'user/delete',component:FormDeleteComponent},
  { path: 'qcm',component:QcmComponent},
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'other', loadChildren: () => import('./other/other.module').then(m => m.OtherModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
