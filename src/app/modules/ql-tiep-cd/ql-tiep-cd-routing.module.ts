import { TracuuLichsuCongdanComponent } from './tracuu-lichsu-congdan/tracuu-lichsu-congdan.component';
import { ChitietLsTiepCdComponent } from './ls-tiep-cd/chitiet-ls-tiep-cd/chitiet-ls-tiep-cd.component';
import { DanhsachDtComponent } from './danhsach-dt/danhsach-dt.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaiquyetDtComponent } from './giaiquyet-dt/giaiquyet-dt.component';
import { ChitietDtComponent } from './danhsach-dt/chitiet-dt/chitiet-dt.component';
import { SoTheodoiTiepnhanFormComponent } from './ql-tiep-cd-shared/components/ql-sosach-bc-form/so-theodoi-tiepnhan-form/so-theodoi-tiepnhan-form.component';
import { ChitietSoTheodoiTiepnhanComponent } from './ql-tiep-cd-shared/components/ql-sosach-bc-form/so-theodoi-tiepnhan-form/chitiet-so-theodoi-tiepnhan/chitiet-so-theodoi-tiepnhan.component';
import { BcTonghopKqFormComponent } from './ql-tiep-cd-shared/components/ql-sosach-bc-form/bc-tonghop-kq-form/bc-tonghop-kq-form.component';
import { BcKetquaToannganhComponent } from './ql-sosach-bc/ql-sosach-bc-tw/bc-ketqua-toannganh/bc-ketqua-toannganh.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'tiep-cd',
      },
      {
        path: 'tiep-cd',
        loadChildren: 'app/modules/ql-tiep-cd/tiep-cd/tiep-cd.module#TiepCDModule',
        data: {
          preload: true
        }
      },
      {
        path: 'gq-kt',
        children: [
          {
            path: '',
            redirectTo: 'giai-quyet-don-thu'
          },
          {
            path: 'giai-quyet-don-thu',
            component: GiaiquyetDtComponent
          },
          {
            path: 'danh-sach-don-thu',
            children: [
              {
                path: '',
                component: DanhsachDtComponent,
              },
              {
                path: 'chi-tiet/:id',
                component: ChitietDtComponent
              }
            ]
          },
          {
            path: 'tra-cuu-lich-su-cong-dan',
            component: TracuuLichsuCongdanComponent
          },
        ]
      },
      {
        path: 'ql-sosach-bc-tw',
        loadChildren: './ql-sosach-bc/ql-sosach-bc-tw/ql-sosach-bc-tw.module#QLSosachBcTWModule',
        data: {
          preload: true
        }
      },
      {
        path: 'ql-sosach-bc-tinh',
        loadChildren: './ql-sosach-bc/ql-sosach-bc-tinh/ql-sosach-bc-tinh.module#QLSosachBcTINHModule',
        data: {
          preload: true
        }
      }
    ]
  },
];

export const QlTiepCdRouting: ModuleWithProviders = RouterModule.forChild(routes);
