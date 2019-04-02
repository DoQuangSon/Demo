import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KHTTKTRedirectComponent } from './kh-ttkt-redirect.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KHTTKTRedirectComponent,
      },
      {
        path: 'trung-uong',
        loadChildren: './trung-uong/hd-ttkt-tw.module#HDTTKTTWModule',
        data: {
          preload: true
        }
      },
      {
        path: 'tinh',
        loadChildren: './kh-ttkt-tinh/hd-ttkt-tinh.module#HDTTKTTINHModule',
        data: {
          preload: true
        }
      }
    ]
  }
];

export const KHTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
