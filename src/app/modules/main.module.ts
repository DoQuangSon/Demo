import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { ViewAllNotificationComponent } from './components/view-all-notification/view-all-notification.component';
import { QLHeThongTTKTModule } from './ql-hethong-ttkt/ql-hethong-ttkt.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    FooterModule,
    SideMenuModule
  ],
  declarations: [
    HomeLayoutComponent,
    MainLayoutComponent,
  ]
})
export class MainModule { }
