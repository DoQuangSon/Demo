import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tinh',
    loadChildren: './ql-doan-ttkt-tinh/ql-doan-ttkt-tinh.module#QLDoanTTKTTinhModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tw',
    loadChildren: './ql-doan-ttkt-tw/ql-doan-ttkt-tw.module#QLDoanTTKTTwModule',
    data: {
      preload: true
    }
  }
];

export const QLDoanTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
