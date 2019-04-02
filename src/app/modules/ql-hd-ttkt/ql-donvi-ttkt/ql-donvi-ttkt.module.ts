import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QlDonviTtktTinhModule } from './ql-donvi-ttkt-tinh/ql-donvi-ttkt-tinh.module';
import { QlDonviTtktTwModule } from './ql-donvi-ttkt-tw/ql-donvi-ttkt-tw.module';
import { QLDonViTTKTRoutingModule } from './ql-donvi-ttkt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLDonViTTKTRoutingModule
  ],
  declarations: []
})
export class QlDonviTtktModule { }
