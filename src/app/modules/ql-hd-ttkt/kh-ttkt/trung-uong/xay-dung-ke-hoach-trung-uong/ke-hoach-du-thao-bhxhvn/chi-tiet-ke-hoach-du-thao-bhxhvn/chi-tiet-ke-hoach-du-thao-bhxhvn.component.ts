import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '../../../../../../../../../node_modules/@angular/router';
import { STATUS } from '../../../../../../../constants/status.constants';
import { FormGroup, FormBuilder } from '../../../../../../../../../node_modules/@angular/forms';
import { COMMON_SUCCESS_MESS, MESS_TAO_KH_TW } from '../../../../../../../constants/message.constants';
import { ModalDirective } from '../../../../../../../../../node_modules/ngx-bootstrap';
import { Router } from '../../../../../../../../../node_modules/@angular/router';
import { NoiKehoachDuthaoService } from '../../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { KeHoachToanNganhService } from '../../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AlertService } from '../../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-chi-tiet-ke-hoach-du-thao-bhxhvn',
  templateUrl: './chi-tiet-ke-hoach-du-thao-bhxhvn.component.html',
  styleUrls: ['./chi-tiet-ke-hoach-du-thao-bhxhvn.component.scss']
})
export class ChiTietKeHoachDuThaoBhxhvnComponent implements OnInit {

  keHoachId: any;
  kehoach: any;
  public listKeHoach: any[] = [];
  keHoachNam: any;
  currentDieuChinh: any;
  dieuchinh: any;
  lanDieuChinh: any[] = [];
  maxDieuChinh: any;
  listLichSu: any[];
  soLSChinhSua: number;
  isDisableLS: boolean;
  isDuyet: boolean = false;
  isCapNhat: boolean = false;
  isHideCapNhat: boolean = false;
  duyetKehoachForm: FormGroup;
  listUpdate: any;
  hideTrangThai: boolean = true;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  constructor(private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private route: ActivatedRoute,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
    private fb: FormBuilder,
        private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.keHoachId = params['id'];
    });
    this.getKeHoach();
    this.getListLichSu();
    this.duyetKehoachForm = this.fb.group({
      id: ['']
    });
  }
  initData() {
    this.isDuyet = false;
    this.isHideCapNhat = false;
    this.isCapNhat = false;
  }
  getKeHoach() {
    this.noiKehoachDuthaoService.getById(this.keHoachId)
      .subscribe(res => {
        this.kehoach = res;
        this.listKeHoach = res.chiTietKhTWSet;
        this.keHoachNam = res.keHoachYear;
        this.getStatus(res.status);
      }, err => {
      });
  }
  getListLichSu() {
    this.keHoachToanNganhService.getLSDaGiaoKHBHXH(this.keHoachId).subscribe(
      data => {
        this.listLichSu = data;
        this.soLSChinhSua = this.listLichSu.length;
        if (this.listLichSu.length > 0) {
          this.isDisableLS = false;
        } else {
          this.isDisableLS = true;
        }
      }
    );
  }
  getStatus(stt: number) {
    if (stt === STATUS.STATUS_KHDUTHAO_TW_TAO_KH) {
      this.isDuyet = true;
    }
  }
  goToCapNhat() {
    this.isCapNhat = true;
    this.isHideCapNhat = true;
    this.isDuyet = false;
    this.router.navigate(['ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach/edit/', this.keHoachId, 'capnhat']);
  }
  onLuu() {
    this.isDuyet = true;
    this.isCapNhat = false;
    this.isHideCapNhat = false;
    this.keHoachToanNganhService.twTaoKeHoachDuThao(this.kehoach)
      .subscribe(() => {
        this.alertService.success(COMMON_SUCCESS_MESS.THEM_MOI);
      }, err => {
        this.alertService.error(MESS_TAO_KH_TW.ERROR_CHECK_TW_DA_TAO_KH);
      });
  }
  getDataUpdate(data) {
    this.kehoach.chiTietKhTWSet = data;
  }
  onDuyet() {
    this.duyetModal.show();
    this.duyetKehoachForm.patchValue({
      id: this.kehoach.id,
    });
  }
  duyet() {
    const formValue = this.duyetKehoachForm.value;
    this.keHoachToanNganhService.twDuyetKeHoachDuKien(formValue.id)
    .subscribe(res => {
      this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
    }, err => {
    });
    this.duyetModal.hide();
    this.initData();
  }
  troLai() {
    this.router.navigate(['ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/']);
  }

  printPDF() {
    this.keHoachToanNganhService.printKeHoachDuThaoByID(this.keHoachId).subscribe(res => {
      const file = this.keHoachToanNganhService.loadPdf(res);
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, err => { console.log('in bị lỗi'); }, );
  }
}
