import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QL_TIEP_CD_COMPONENTS } from './components';
import { TtktFormModule } from '../../../shared/form-module/ttkt-form.module';
import { SharedModule } from '../../../shared/shared.module';
import { ChitietSoTheodoiTiepnhanComponent } from './components/ql-sosach-bc-form/so-theodoi-tiepnhan-form/chitiet-so-theodoi-tiepnhan/chitiet-so-theodoi-tiepnhan.component';
import { ChitietBcTonghopComponent } from './components/ql-sosach-bc-form/bc-tonghop-kq-form/chitiet-bc-tonghop/chitiet-bc-tonghop.component';
import { ChitietBcTonghopKqLiveComponent } from './chitiet-bc-tonghop-kq-live/chitiet-bc-tonghop-kq-live.component';
import { ChitietSoTheodoiTiepnhanLiveComponent } from './chitiet-so-theodoi-tiepnhan-live/chitiet-so-theodoi-tiepnhan-live.component';
import { SoTheodoiTiepCdComponent } from './so-theodoi-tiep-cd/so-theodoi-tiep-cd.component';
import { ChiTietSoTheodoiTiepCdComponent } from './chi-tiet-so-theodoi-tiep-cd/chi-tiet-so-theodoi-tiep-cd.component';
import { ChiTietSoTheodoiTiepCdLiveComponent } from './chi-tiet-so-theodoi-tiep-cd-live/chi-tiet-so-theodoi-tiep-cd-live.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    // ReactiveFormsModule,
    // NguiAutoCompleteModule,
    // TtktFormModule
  ],
  declarations: [
    ...QL_TIEP_CD_COMPONENTS,
    ChitietSoTheodoiTiepnhanComponent,
    ChitietBcTonghopComponent,
    ChitietSoTheodoiTiepnhanLiveComponent,
    ChitietBcTonghopKqLiveComponent,
    SoTheodoiTiepCdComponent,
    ChiTietSoTheodoiTiepCdComponent,
    ChiTietSoTheodoiTiepCdLiveComponent,
  ],
  exports: [
    ...QL_TIEP_CD_COMPONENTS
  ]
})
export class QLTiepCDSharedModule { }
