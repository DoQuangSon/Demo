import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcTiepCdComponent } from './tc-tiep-cd/tc-tiep-cd.component';
import { TiepCdRouting } from './tiep-cd-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TienHanhTiepCdComponent } from '../tiep-cd/tc-tiep-cd/tien-hanh-tiep-cd/tien-hanh-tiep-cd.component';
import { LsTiepCdComponent } from '../ls-tiep-cd/ls-tiep-cd.component';
import { ChitietLsTiepCdComponent } from '../ls-tiep-cd/chitiet-ls-tiep-cd/chitiet-ls-tiep-cd.component';
import { DtTiepCdComponent } from './dt-tiep-cd/dt-tiep-cd.component';
import { SharedModule } from '../../../shared/shared.module';
import { TtktFormModule } from '../../../shared/form-module/ttkt-form.module';
import { QLTiepCDSharedModule } from '../ql-tiep-cd-shared/ql-tiep-cd-shared.module';
import { LichTiepCdComponent } from './lich-tiep-cd/lich-tiep-cd.component';
import { DialogDieuChinhComponent } from './dt-tiep-cd/dialog-dieu-chinh/dialog-dieu-chinh.component';

@NgModule({
  imports: [
    CommonModule,
    TiepCdRouting,
    SharedModule,
    FormsModule,
    // ReactiveFormsModule,
    QLTiepCDSharedModule,
    // ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    // TtktFormModule
  ],
  declarations: [
    LichTiepCdComponent,
    TcTiepCdComponent,
    TienHanhTiepCdComponent,
    LsTiepCdComponent,
    ChitietLsTiepCdComponent,
    DtTiepCdComponent,
    DialogDieuChinhComponent
  ],
  entryComponents: [
    DialogDieuChinhComponent
  ],
  exports: [
  ],
  providers: [
    // BsModalService,
  ]
})
export class TiepCDModule { }
