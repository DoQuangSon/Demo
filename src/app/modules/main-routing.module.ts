import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ViewAllNotificationComponent } from './components/view-all-notification/view-all-notification.component';

const routes: Routes = [{
  path: '',
  component: HomeLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    children: [
      {
        path: '',
        loadChildren: 'app/modules/home/home.module#HomeModule',
        data: {
          preload: true
        }
      },
      
    ]
  }],
},
{
  path: 'ql-hethong-ttkt',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    children: [
      {
        path: '',
        loadChildren: 'app/modules/ql-hethong-ttkt/ql-hethong-ttkt.module#QLHeThongTTKTModule',
        data: {
          preload: true
        }
      }
    ]
  }]
},
{
  path: 'ql-tiep-cd',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    children: [
      {
        path: '',
        loadChildren: 'app/modules/ql-tiep-cd/ql-tiep-cd.module#QLTiepCDModule',
        data: {
          preload: true
        }
      }
    ]
  }]
},
{
  path: 'ql-hd-ttkt',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    children: [
      {
        path: '',
        loadChildren: 'app/modules/ql-hd-ttkt/ql-hd-ttkt.module#QLHDTTKTModule',
        data: {
          preload: true
        }
      }
    ]
  }]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
