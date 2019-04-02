import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderModule } from '../components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    SharedModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
