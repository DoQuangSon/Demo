import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoiSoTonghopKqService } from '../../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-tonghop-kq/noi-so-tonghop-kq.service';
import { TIME_OPTIONS } from '../../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { NoiDmPhanLoaiTieuThucService } from '../../../../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import { sortBy } from 'lodash';

@Component({
    selector: 'ttkt-chitiet-so-tonghop-kq-form',
    templateUrl: './chitiet-so-tonghop-kq-form.component.html',
    styleUrls: ['./chitiet-so-tonghop-kq-form.component.scss']
})
export class ChitietSoTonghopKqFormComponent implements OnInit {
  @Input() typeAccount: string;
  @Input()
  set data(data: any) {
    if (data) {
      this.soTongHop = data;
      this.mappingSoChiTiet();
    }
  }
  @Input() passData = false;
  @Input() title = 'Sổ tổng hợp kết quả';
  soTongHop: any;

  listDmTieuThucMapping: Array<any> = [];
  constructor(
    private location: Location,
    private baoCao: NoiSoTonghopKqService,
    private router: ActivatedRoute,
    private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService
  ) { }

  now: Date = new Date();

  get OPTIONS() {
    return TIME_OPTIONS;
  }

  ngOnInit() {
    this.router.params.subscribe(pm => {
      // get id -> call api get data
      if (!this.passData) {
        this.baoCao.getSoTHKQTTKTById(pm.id).subscribe(res => {
          this.soTongHop = res;
          this.mappingSoChiTiet();
        });
      }
    });
  }

  mappingSoChiTiet() {
    this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(0, 100) // this.pageSize)
    .subscribe(data => {
      this.listDmTieuThucMapping = data.content.map(el => {
        el.children = this.soTongHop.soChiTiet ? this.soTongHop.soChiTiet.filter(req => req.dmPhanLoaiTtId == el.id) : [];
      });
      this.listDmTieuThucMapping = data.content.filter(req => !req.parentId);
      this.listDmTieuThucMapping = this.listDmTieuThucMapping.map(item => {
        item.child = data.content.filter(req => req.parentId == item.id);

        return item;
      });
      this.listDmTieuThucMapping.forEach(el => el.children = sortBy(el.children, ['theOrder']));

      console.log(this.listDmTieuThucMapping);
      console.log(this.soTongHop.soChiTiet);
    });
  }

  onBack() {
    this.location.back();
  }

  printExcel() {
      this.router.queryParams.subscribe(res => this.baoCao.printMauBaoCao03_DotXuat(res.fromDate, 2));
  }

}
