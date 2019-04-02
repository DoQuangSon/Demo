import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoiSoTheodoiChitietService } from '../../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-theodoi-chitiet/noi-so-theodoi-chitiet.service';
import { groupBy } from 'lodash';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../../../constants/message.constants';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'ttkt-ds-so-theodoi-donvi-form',
  templateUrl: './ds-so-theodoi-donvi-form.component.html',
  styleUrls: ['./ds-so-theodoi-donvi-form.component.scss'],
})
export class DsSoTheodoiDonviFormComponent implements OnInit {
  @Input() typeAccount: string;
  @ViewChild('thongBaoModal') public thongBaoModal: ModalDirective;

  dsSoTheoDoidvForm: FormGroup;
  soTheoDoiId: any;
  data: any = {};
  dataTable: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private noiSoTheodoiChitietService: NoiSoTheodoiChitietService,
    private timeBuilder: TimeBuilderService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.dsSoTheoDoidvForm = this.fb.group({
      search: [''],
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.soTheoDoiId = params['id'];
      }
      this.getInfoSoChiTietTaiDonVi();
    });
  }

  getInfoSoChiTietTaiDonVi() {
    this.noiSoTheodoiChitietService.getThongTinSoChiTietTaiDonVi(this.soTheoDoiId).subscribe(res => {
      this.data = res;
      this.getDataToTable(res);
    }, err => {
      this.alertService.error(MESS_QL_BAOCAO_TTKT.ERROR_GET_THONG_TIN_SO_THEODOI_CHITIET);
    });
  }

  getDataToTable(res) {
    const dataTable = res.soChiTietTaiDvDTOs;
    let groupData: any = groupBy(dataTable, (el: any) => (el.dmPhanLoaiDtId));
    groupData = Object.keys(groupData).map(key => {
      return [Number(key), groupData[key]];
    });
    console.log(groupData);
    for (const item of groupData) {
      const _el: any = {};
      _el.dmPhanLoaiDtId = item[1][0].dmPhanLoaiDtId;
      _el.tenDanhMuc = item[1][0].tenDanhMucPhanLoaiDt;
      _el.children = [];
      for (const element of item[1]) {
        element.dviID = element.doiTuongTTKTId;
        _el.children.push(element.doiTuongTTKTS);
      }
      this.dataTable.push(_el);
    }
    console.log(this.dataTable);
  }

    chiTietSoTheoDoidv(id, doiTuongTTKTId) {
        if (this.typeAccount === 'TW') {
            this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tw/so-theo-doi-chi-tiet/ds-so-theodoi-dv/' + this.soTheoDoiId + '/chitiet-so-theodoi-dv/' + `${doiTuongTTKTId},${this.soTheoDoiId}`]);
        } else {
            this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tinh/so-theodoi-chitiet/ds-so-theodoi-dv/' + this.soTheoDoiId + '/chitiet-so-theodoi-dv/' + `${doiTuongTTKTId},${this.soTheoDoiId}`]);
        }
    }

    onThongBao() {
        this.thongBaoModal.show();
    }

    onBack() {
        this.location.back();
    }

    printMau02(doiTuongTTKTId, type) {
        this.noiSoTheodoiChitietService.printMauBaoCao02(this.soTheoDoiId, doiTuongTTKTId, type);
    }
}
