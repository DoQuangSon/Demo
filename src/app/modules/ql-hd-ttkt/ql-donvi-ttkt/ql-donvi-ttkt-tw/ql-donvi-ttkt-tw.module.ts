import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QlDonviTTKTTWRoutingModule } from './ql-donvi-ttkt-tw-routing.module';
import { QLDonViTTKTTWComponent } from './ql-donvi-ttkt-tw.component';
import { ChitietDsDonviQlComponent } from './chitiet-ds-donvi-ql/chitiet-ds-donvi-ql.component';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt/ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QlDonviTTKTTWRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    QLDonViTTKTTWComponent,
    ChitietDsDonviQlComponent
  ]
})
export class QlDonviTtktTwModule { }
