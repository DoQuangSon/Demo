import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QdTtktBhxhVnComponent } from '../qd-ttkt-bhxh-vn/qd-ttkt-bhxh-vn.component';
import { DetailQdTtktBhxhVnComponent } from './detail-qd-ttkt-bhxh-vn/detail-qd-ttkt-bhxh-vn.component';

const routes: Routes = [
  {
    path: '',
    component: QdTtktBhxhVnComponent
  },
  {
    path: 'detail-qd-ttkt-bhxh-vn/:id',
    component: DetailQdTtktBhxhVnComponent
  }
];
export const QLDOANTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
