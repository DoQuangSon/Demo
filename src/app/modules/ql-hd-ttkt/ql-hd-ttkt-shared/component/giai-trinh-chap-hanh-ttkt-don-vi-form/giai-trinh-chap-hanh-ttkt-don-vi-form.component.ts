import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NoiSoTheodoiChitietService} from '../../../../../services/api/noi-ql-baocao-ttkt/noi-so-theodoi-chitiet/noi-so-theodoi-chitiet.service';
import {TimeBuilderService} from '../../../../../services/helper/time-builder.service';
import {AlertService} from '../../../../../services/api/alert.service';
import {MESS_QL_BAOCAO_TTKT} from '../../../../../constants/message.constants';
import { groupBy } from 'lodash';

@Component({
  selector: 'ttkt-giai-trinh-chap-hanh-ttkt-don-vi-form',
  templateUrl: './giai-trinh-chap-hanh-ttkt-don-vi-form.component.html',
  styleUrls: ['./giai-trinh-chap-hanh-ttkt-don-vi-form.component.scss']
})
export class GiaiTrinhChapHanhTtktDonViFormComponent implements OnInit {

    @Input() typeAccount: string;
    @ViewChild('thongBaoModal') public thongBaoModal: ModalDirective;

    dsDonViForm: FormGroup;
    thanhLapDoanID: any;
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
        this.dsDonViForm = this.fb.group({
            search: [''],
        });
        this.route.params.subscribe(params => {
            if (params['thanhLapDoanID']) {
                this.thanhLapDoanID = params['thanhLapDoanID'];
            }
            this.getInfoSoChiTietTaiDonVi();
        });
    }

    getInfoSoChiTietTaiDonVi() {
        this.noiSoTheodoiChitietService.getThongTinSoChiTietTaiDonVi(this.thanhLapDoanID).subscribe(res => {
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
        // if (this.typeAccount === 'TW') {
        //     this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tw/so-theo-doi-chi-tiet/ds-so-theodoi-dv/' + this.thanhLapDoanID + '/chitiet-so-theodoi-dv/' + `${doiTuongTTKTId},${this.thanhLapDoanID}`]);
        // } else {
        //     this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tinh/so-theodoi-chitiet/ds-so-theodoi-dv/' + this.thanhLapDoanID + '/chitiet-so-theodoi-dv/' + `${doiTuongTTKTId},${this.thanhLapDoanID}`]);
        // }
    }

    goToChapNhanGiaiTrinhForm(doiTuongTTKTID) {
        this.router.navigate(['ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/giai-trinh-chap-hanh-ttkt-tw', this.thanhLapDoanID, 'chap-nhan-giai-trinh', doiTuongTTKTID]);
    }

    onThongBao() {
        this.thongBaoModal.show();
    }

    onBack() {
        this.location.back();
    }

}
