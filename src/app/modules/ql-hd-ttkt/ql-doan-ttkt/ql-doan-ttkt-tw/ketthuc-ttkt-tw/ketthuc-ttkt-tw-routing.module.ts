import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KetthucTtktTwComponent } from './ketthuc-ttkt-tw.component';
import { BaoCaoTtktTwComponent } from './bao-cao-ttkt-tw/bao-cao-ttkt-tw.component';
import { KetquaTtktComponent } from '../tienhanh-ttkt-tw/ketqua-ttkt/ketqua-ttkt.component';
import {GiaiTrinhChapHanhTtktTwComponent} from './giai-trinh-chap-hanh-ttkt-tw/giai-trinh-chap-hanh-ttkt-tw.component';
import {GiaiTrinhChapHanhTtktDonViTwComponent} from './giai-trinh-chap-hanh-ttkt-tw/giai-trinh-chap-hanh-ttkt-don-vi-tw/giai-trinh-chap-hanh-ttkt-don-vi-tw.component';
import {ChapNhanGiaiTrinhDonViTtktFormComponent} from '../../../ql-hd-ttkt-shared/component/giai-trinh-chap-hanh-ttkt-don-vi-form/chap-nhan-giai-trinh-don-vi-ttkt-form/chap-nhan-giai-trinh-don-vi-ttkt-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'ket-thuc'
      },
      {
        path: 'ket-thuc',
        component: KetthucTtktTwComponent
      },
      {
        path: 'bao-cao-ttkt-tw',
        children: [
          {
            path: '',
            component: BaoCaoTtktTwComponent,
          },
          {
            path: ':id/bao-cao-ket-qua',
            component: KetquaTtktComponent
          }
        ]
      },
      {
        path: 'ket-luan-ttkt-tw',
        children: [
          {
            path: '',
            component: BaoCaoTtktTwComponent,
          },
          {
            path: ':id/ket-luan-ttkt',
            component: KetquaTtktComponent
          }
        ]
      },
      {
          path: 'giai-trinh-chap-hanh-ttkt-tw',
          children: [
              {
                  path: '',
                  component: GiaiTrinhChapHanhTtktTwComponent
              },
              {
                  path: ':thanhLapDoanID',
                  component: GiaiTrinhChapHanhTtktDonViTwComponent
              },
              {
                  path: ':thanhLapDoanID/chap-nhan-giai-trinh/:doiTuongTTKTID',
                  component: ChapNhanGiaiTrinhDonViTtktFormComponent
              }
          ]
      }
    ]
  }
];
export const KTDoanTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
