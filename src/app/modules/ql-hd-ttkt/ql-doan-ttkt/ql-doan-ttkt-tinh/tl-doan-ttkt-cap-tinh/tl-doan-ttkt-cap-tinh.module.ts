import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaoMoiDoanTtktComponent } from './tao-moi-doan-ttkt/tao-moi-doan-ttkt.component';
import { ChiTietDoanTtktComponent } from './chi-tiet-doan-ttkt/chi-tiet-doan-ttkt.component';
import { TlDoanTtktCapTinhComponent } from './tl-doan-ttkt-cap-tinh.component';
import { TLDOANTTKTCAPTINHRoutingModule } from './tl-doan-ttkt-cap-tinh-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    TLDOANTTKTCAPTINHRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    TlDoanTtktCapTinhComponent,
    TaoMoiDoanTtktComponent,
    ChiTietDoanTtktComponent
  ]
})
export class TlDoanTtktCapTinhModule { }
