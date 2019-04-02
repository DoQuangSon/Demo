import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { ThamquyenGqKnComponent } from './thamquyen-gq-kn/thamquyen-gq-kn.component';
import { ThamquyenGqTcComponent } from './thamquyen-gq-tc/thamquyen-gq-tc.component';
import { ThamquyenGqKnpaComponent } from './thamquyen-gq-knpa/thamquyen-gq-knpa.component';
import { SharedModule } from '../../../shared/shared.module';
import { TtktFormModule } from '../../../shared/form-module/ttkt-form.module';
import { GiaiquyetDtFormComponent } from './giaiquyet-dt-form.component';
import { DialogLSTiepCDComponent } from './dialog-ls-tiep-cd/dialog-ls-tiep-cd.component';
import { PrintToCaoCanBoComponent } from './print-to-cao-can-bo/print-to-cao-can-bo.component';
import { PopUpPrintComponent } from './pop-up-print/pop-up-print.component';
import { PopUpPrintMau05Component } from './pop-up-print-mau05/pop-up-print-mau05.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    // TtktFormModule
  ],
  declarations: [
    GiaiquyetDtFormComponent,
    ThamquyenGqKnComponent,
    ThamquyenGqTcComponent,
    ThamquyenGqKnpaComponent,
    DialogLSTiepCDComponent,
    PrintToCaoCanBoComponent,
    PopUpPrintComponent,
    PopUpPrintMau05Component
  ],
  exports: [
    GiaiquyetDtFormComponent
  ],
  entryComponents: [
    DialogLSTiepCDComponent
  ],
  providers: [
    // BsModalService,
  ]
})
export class GiaiquyetDtFormModule { }
