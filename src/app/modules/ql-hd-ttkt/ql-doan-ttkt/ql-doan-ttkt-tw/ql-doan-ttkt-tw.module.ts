import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QLDoanTTKTTWRoutingModule } from './ql-doan-ttkt-tw-routing.module';
import { TlDoanTTKTTwModule } from './tl-doan-ttkt-tw/tl-doan-ttkt-tw.module';
import { TienhanhTTKTTwModule } from './tienhanh-ttkt-tw/tienhanh-ttkt-tw.module';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        QLDoanTTKTTWRoutingModule,
    ],
    declarations: [ ]
})
export class QLDoanTTKTTwModule { }
