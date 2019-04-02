import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatesService } from './../../../../../services/api/state.service';
import { NoiAccountService } from './../../../../../services/api/noi-account/noi-account.service';
import { AlertService } from './../../../../../services/api/alert.service';
import { SoTheodoiKetluanService } from '../../../../../services/api/so-theodoi-ketluan/so-theodoi-ketluan.service';
import { COMMON_SUCCESS_MESS, COMMON_ERROR_MESS } from '../../../../../constants/message.constants';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-capnhat-sotheodoi',
  templateUrl: './capnhat-sotheodoi.component.html',
  styleUrls: ['./capnhat-sotheodoi.component.scss']
})
export class CapNhatSoTheoDoiComponent implements OnInit {
  @ViewChild('modalEdit') public modalEdit: ModalDirective;

  formEdit: FormGroup;
  donViSelected: any;
  indexSelected: number;
  account: any = {};
  tenDoan: any;
  thanhLapDoanId: any;
  isLuu: boolean;
  isCapNhat: boolean;
  hasKetLuan: boolean;
  tmp: any;
  soKetLuan: any[] = [];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private soTheodoiKetluanService: SoTheodoiKetluanService,
    private auth: AuthService,
    private noiAccountService: NoiAccountService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.account = this.auth.currentUser;
    
    this.formEdit = this.builder.group({
      thoiHanThucHien: [''],
      lamViecTrucTiep: [''],
      raVanBan: [''],
      ketThuc: [''],
      soQD: [''],
      kiemTraKetThuc: [''],
      ketThucTheoDoi: [''],
      ghiChu: [''],
      isTheoDoi: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.thanhLapDoanId = params['id'];
        this.hasKetLuan = params['hasKetLuan'];
        this.tenDoan = params['tenDoan'];
        this.getChiTietDoan();
      }
    });
    this.isCapNhat = true;
  }
  onCapNhat() {
    this.isCapNhat = false;
    this.isLuu = true;
  }
  edit(data) {
    this.tmp = data;
    this.formEdit.reset();
    this.formEdit.patchValue({
      thoiHanThucHien: data.thoiHanThucHien,
      isTheoDoi: data.dangTheoDoi,
      ketThucTheoDoi: data.ketThucTheoDoi,
      lamViecTrucTiep: data.donDocLamViecTrucTiep,
      raVanBan: data.donDocRaVanBan,
      ketThuc: data.donDocKetThuc,
      soQD: data.qDinhKiemTraSoQd,
      kiemTraKetThuc: data.qDinhKiemTraKetThuc,
      ghiChu: data.ghiChu
    });
    this.modalEdit.show();
  }
  luuEdit() {
    const formValue = this.formEdit.value;
    this.tmp.thoiHanThucHien = formValue.thoiHanThucHien;
    this.tmp.dangTheoDoi = formValue.isTheoDoi;
    this.tmp.ketThucTheoDoi = formValue.ketThucTheoDoi;
    this.tmp.donDocLamViecTrucTiep = formValue.lamViecTrucTiep;
    this.tmp.donDocRaVanBan = formValue.raVanBan;
    this.tmp.donDocKetThuc = formValue.ketThuc;
    this.tmp.qDinhKiemTraSoQd = formValue.soQD;
    this.tmp.qDinhKiemTraKetThuc = formValue.kiemTraKetThuc;
    this.tmp.ghiChu = formValue.ghiChu;

    this.modalEdit.hide();
  }
  luuCapNhat() {
    this.isLuu = false;
    this.isCapNhat = true;
    this.soTheodoiKetluanService.capNhatSoTheoDoiKetLuan(this.soKetLuan)
      .subscribe(res => {
        this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
      }, err => {
        this.isLuu = true;
        this.isCapNhat = false;
        this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
      });
  }

  getChiTietDoan() {
    this.soTheodoiKetluanService.getById(this.thanhLapDoanId, this.hasKetLuan)
      .subscribe(res => {
        this.soKetLuan = res;
      }, err => { });
  }
  closeCapNhat() {
    this.router.navigate(['/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tinh/danhsach-sotheodoi-ttkt']);
  }
}
