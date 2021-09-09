import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widgets/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxMaskModule } from 'ngx-mask';
import { FormRoutingModule } from '../../ui/form/form-routing.module';
import { AnalyseRoutingModule} from './analyse-routing.module';
import { JournalPrevComponent } from './journal-prev/journal-prev.component';
import { BudgetComponent } from './budget/budget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartBudgetComponent } from './chart-budget/chart-budget.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';


@NgModule({
  declarations: [
    JournalPrevComponent,
    BudgetComponent,
    ChartBudgetComponent,
    ViewBudgetComponent,
  ],
  imports: [
    CommonModule,
    AnalyseRoutingModule,
    UIModule,
    WidgetModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
  ],
  exports:[
    BudgetComponent,
  ]
})
export class AnalyseModule { }
