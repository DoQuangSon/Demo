import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailQdTtktBhxhVnComponent } from './detail-qd-ttkt-bhxh-vn/detail-qd-ttkt-bhxh-vn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QdTtktBhxhVnComponent } from './qd-ttkt-bhxh-vn.component';
import { QLDOANTTKTTINHRoutingModule } from './qd-ttkt-tinh-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLDOANTTKTTINHRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    QdTtktBhxhVnComponent,
    DetailQdTtktBhxhVnComponent,
  ]
})
export class QdTtktTinhModule { }
