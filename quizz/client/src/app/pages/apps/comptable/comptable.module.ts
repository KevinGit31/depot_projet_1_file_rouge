import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptableRoutingModule } from './comptable-routing.module';
import { CompteComponent } from './compte/compte.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widgets/widget.module';
import { FormAccountComponent } from './compte/form-account/form-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubaccountComponent } from './compte/form-subaccount/form-subaccount.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FiscalYearComponent } from './fiscal-year/fiscal-year.component';
import { FormFyComponent } from './fiscal-year/form-fy/form-fy.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxMaskModule } from 'ngx-mask';
import { FormRoutingModule } from '../../ui/form/form-routing.module';
import { JournalComponent } from './journal/journal.component';
import { FormJournalRowComponent } from './journal/form-journal-row/form-journal-row.component';
import { LedgerComponent } from './ledger/ledger.component';
import { BilanComponent } from './bilan/bilan.component';
import { BalanceComponent } from './balance/balance.component';
import { ResultatComponent } from './resultat/resultat.component';
import { GraphiqueComponent } from './graphique/graphique.component';

@NgModule({
  declarations: [
    CompteComponent, 
    FormAccountComponent, 
    FormSubaccountComponent, 
    FiscalYearComponent, 
    FormFyComponent, 
    JournalComponent,
    FormJournalRowComponent, 
    LedgerComponent,
    BilanComponent,
    BalanceComponent,
    ResultatComponent,
    GraphiqueComponent
  ],
  imports: [
    CommonModule,
    ComptableRoutingModule,
    UIModule,
    WidgetModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
  ]
})
export class ComptableModule { }
