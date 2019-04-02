import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiepCDModule } from './tiep-cd/tiep-cd.module';
import { QlTiepCdRouting } from './ql-tiep-cd-routing.module';
import { DanhsachDtComponent } from './danhsach-dt/danhsach-dt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DataTableModule } from 'angular2-datatable';
import { QLSosachBcTWModule } from './ql-sosach-bc/ql-sosach-bc-tw/ql-sosach-bc-tw.module';
import { QLSosachBcTINHModule } from './ql-sosach-bc/ql-sosach-bc-tinh/ql-sosach-bc-tinh.module';
import { TracuuLichsuCongdanComponent } from './tracuu-lichsu-congdan/tracuu-lichsu-congdan.component';
import { QLTiepCDSharedModule } from './ql-tiep-cd-shared/ql-tiep-cd-shared.module';
import { ChitietDtComponent } from './danhsach-dt/chitiet-dt/chitiet-dt.component';
import { GiaiquyetDtFormModule } from './giaiquyet-dt-form/giaiquyet-dt-form.module';
import { GiaiquyetDtComponent } from './giaiquyet-dt/giaiquyet-dt.component';

@NgModule({
  imports: [
    CommonModule,
    QlTiepCdRouting,
    SharedModule,
    GiaiquyetDtFormModule,
    FormsModule,
    ReactiveFormsModule,
    QLTiepCDSharedModule
  ],
  declarations: [
    DanhsachDtComponent,
    TracuuLichsuCongdanComponent,
    ChitietDtComponent,
    GiaiquyetDtComponent,
  ],
  exports: [
    DanhsachDtComponent,
  ]
})
export class QLTiepCDModule { }
