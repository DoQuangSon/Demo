import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap';
import { Location } from '@angular/common';
import { AlertService } from '../../../../../services/api/alert.service';
import { NoiBaoCaoTongHopService } from '../../../../../services/api/noi-ql-baocao-ttkt/noi-bao-cao-tong-hop/noi-bao-cao-tong-hop.service';
import { TIME_OPTIONS } from '../../../../../constants/tiep-cong-dan.constants';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../constants/message.constants';
import { AuthService } from '../../../../../auth/auth.service';
import { FormService } from '../../../../../shared/form-module/form.service';
import {MYDATEPICKER_VI_OPTIONS} from '../../../../../constants';

@Component({
  selector: 'ttkt-taomoi-bao-cao-tong-hop-tw',
  templateUrl: './taomoi-bao-cao-tong-hop-tw.component.html',
  styleUrls: ['./taomoi-bao-cao-tong-hop-tw.component.scss']
})
export class TaomoiBaoCaoTongHopTwComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('guiModal') public guiModal: ModalDirective;

  creatBCTongHopTwForm: FormGroup;
  displayKQ: Boolean = false;
  options: any;
  quy_option: any;
  thang_option: any;
  luyKe_option: any;

  luuDieuChinh: boolean;
  luuSua: boolean;
  luuTao: boolean;
  sua: boolean;
  gui: boolean;
  duyet: boolean;
  // saved: boolean;
  noiDungBaoCao: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private auth: AuthService,
    private baoCao: NoiBaoCaoTongHopService,
    private formService: FormService
  ) { }

  // quyOptions: Array<any>;
  // @Todo: change
  typeAccount: any;
  soTongHop: any;

  ngOnInit() {
    this.setButton('tao');
    let now = new Date();
    this.creatBCTongHopTwForm = this.fb.group({
      tenBc: ['', Validators.required],
      soBc: ['', Validators.required],
      quy: [''],
      ngayLap: [''],
      thang: [now.getMonth() + 1, Validators.required],
      luyKe_tungay: [''],
      luyKe_denngay: [''],
      nam: [now.getFullYear(), Validators.required],
      options: ['']
    });
    // this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
    this.luyKe_option = TIME_OPTIONS.luyKe;
  }

  changeOption() {
    this.options = this.creatBCTongHopTwForm.value.options;
    if (this.options === '1') {
      this.creatBCTongHopTwForm.patchValue({
        thang: 0, luyKe_tuThang: 0, luyKe_denThang: 0
      });
    } else if (this.options === '2') {
      this.creatBCTongHopTwForm.patchValue({
        thang: 0, luyKe_tuThang: 0, luyKe_denThang: 0
      });
    } else {
      this.creatBCTongHopTwForm.patchValue({
        thang: 0, luyKe_tuThang: 0, luyKe_denThang: 0
      });
    }
  }

  offAllButton() {
    this.luuDieuChinh = false;
    this.luuSua = false;
    this.luuTao = false;
    this.sua = false;
    this.gui = false;
    this.duyet = false;
    // this.saved = false;
  }

  setButton(key) {
    if (key === 'tao') {
      this.offAllButton();
      this.luuTao = true;
    } else if (key === 'sua') {
      this.offAllButton();
      this.luuSua = true;
    } else if (key === 'dieuchinh') {
      this.offAllButton();
      this.luuDieuChinh = true;
      this.gui = true;
    }
  }

  onLuuTaoSua(key) {
    this.formService.touchAllInput(this.creatBCTongHopTwForm);
    if (this.creatBCTongHopTwForm.invalid) {
      return;
    }
    const formValue = this.creatBCTongHopTwForm.value;
    this.baoCao.searchDataByMonth(formValue).subscribe(req => {//sure new 
      this.soTongHop = req;
      formValue.content = this.soTongHop;
      this.baoCao.saveSoTHKQ(formValue).subscribe((res: any) => {
        this.noiDungBaoCao = res;

        this.sua = true;
        this.duyet = true;
        if (key === 'tao') {
          this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_BC_TONGHOP);
        } else {
          this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_EDIT_BC_TONGHOP);
        }

        // redirect to chi tiet
        if (this.auth.accountType == 'tw') {
          this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop/chitiet', res.id]);
        } else {
          this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh/chitiet-bc-tonghop-tinh', res.id]);
        }
      });
    });



    // if (key === 'tao') {
    //   this.offAllButton();
    //   this.sua = true;
    //   this.duyet = true;
    //   // this.saved = true;
    //   this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_BC_TONGHOP);
    //   //call api
    // } else {
    //   this.offAllButton();
    //   this.sua = true;
    //   this.duyet = true;
    //   // this.saved = true;
    //   this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_EDIT_BC_TONGHOP);
    // }
  }

  onSua() {
    this.setButton('sua');
  }

  onLuuDieuChinh() {
    this.offAllButton();
    this.luuTao = true;
    // this.duyet = true;
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.offAllButton();
    this.gui = true;
    this.luuDieuChinh = true;
    this.duyetModal.hide();
    this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_DUYET_BC_TONGHOP);
  }

  showTongHopKQ() {
    console.log('dd');
    let formValue = this.creatBCTongHopTwForm.value;
    if (!formValue.nam || !formValue.thang) {
      this.alertService.error('Vui lòng chọn tháng và năm');
      return;
    }
    this.displayKQ = true;

    this.baoCao.searchDataByMonth(formValue).subscribe(req => {
      this.soTongHop = req;
    });
  }

  onBack() {
    this.location.back();
  }
}
