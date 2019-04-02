import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { KHTTKTRoutingModule } from './kh-ttkt-routing.module';
import { HDTTKTTINHModule } from './kh-ttkt-tinh/hd-ttkt-tinh.module';
import { KHTTKTRedirectComponent } from './kh-ttkt-redirect.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    KHTTKTRoutingModule,
  ],
  declarations: [
    KHTTKTRedirectComponent
  ]
})
export class KHTTKTModule { }
