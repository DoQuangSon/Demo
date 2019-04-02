import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QlBaocaoTtktTwModule } from './ql-baocao-ttkt-tw/ql-baocao-ttkt-tw.module';
import { QlBaocaoTtktTinhModule } from './ql-baocao-ttkt-tinh/ql-baocao-ttkt-tinh.module';
import { QLBaoCaoTTKTRoutingModule } from './ql-baocao-ttkt-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QLBaoCaoTTKTRoutingModule
  ],
  declarations: []
})
export class QLBaoCaoTTKTModule { }
