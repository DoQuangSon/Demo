import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QlDonviTTKTTINHRoutingModule } from './ql-donvi-ttkt-tinh-routing.module';
import { QLDonViTTKTTinhComponent } from './ql-donvi-ttkt.component';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt/ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QlDonviTTKTTINHRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    QLDonViTTKTTinhComponent
  ]
})
export class QlDonviTtktTinhModule { }
