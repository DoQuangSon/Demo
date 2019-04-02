import {Component, OnInit, ViewChild} from '@angular/core';
import {NoiDtTocaoService} from '../../../../services/api/noi-dtTocao/noi-dt-tocao.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimeBuilderService} from '../../../../services/helper/time-builder.service';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-print-to-cao-can-bo',
  templateUrl: './print-to-cao-can-bo.component.html',
  styleUrls: ['./print-to-cao-can-bo.component.scss']
})
export class PrintToCaoCanBoComponent implements OnInit {

  @ViewChild('modalMauDon') modalMauDon: ModalDirective;

  date: Date = new Date();
  loaiMauDonForm: FormGroup;
  loaiMauDon: any = {
    id: 0,
    title: ''
  };

  onSubmitCheckMauDonValid = false;
  myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  public ngayBanHanh: any;
  public ngayNhanDon: any;

  constructor(
    private noiDtTocaoService: NoiDtTocaoService,
    private builder: FormBuilder,
    private timeBuilder: TimeBuilderService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.date.setHours(0, 0, 0, 0);
    this.loaiMauDonForm = this.builder.group({
      coQuanCapTren: [''],
      dvBanHanh: ['', Validators.required],
      tenNguoiTC: ['', Validators.required],
      tenNguoiChuyenDon: [''],
      lyDoKhongThuLy: ['', Validators.required],
      canCuPhapLy: ['', Validators.required],
      dvVietTat: ['', Validators.required],
      chucVuNguoiKy: ['', Validators.required],
      so: ['', Validators.required],
      ngayBanHanh: ['', Validators.required],
      ngayNhanDon: ['', Validators.required],
      guiDonKhieuNaiDen: ['', Validators.required],
      diaChiNguoiKhieuNai: ['', Validators.required],
      khieuNaiVeViec: ['', Validators.required],
    });
  }

  closeModalMauDon() {
    this.modalMauDon.hide();
  }

  printMauDon(type) {
    if (this.loaiMauDonForm.invalid) {
      this.alertService.error('Bạn phải điền đầy đủ thông tin');
      return;
  }
      // type =1 in pdf , type =2 in word
    this.onSubmitCheckMauDonValid = true;
    if (this.loaiMauDonForm.valid) {
      const mauDon12: any = {};
      mauDon12.coQuanCapTren = (this.loaiMauDonForm.controls.coQuanCapTren.value || '').trim();
      mauDon12.dvBanHanh = (this.loaiMauDonForm.controls.dvBanHanh.value || '').trim();
      mauDon12.tenNguoiTC = (this.loaiMauDonForm.controls.tenNguoiTC.value || '').trim();
      mauDon12.tenNguoiChuyenDon = (this.loaiMauDonForm.controls.tenNguoiChuyenDon.value || '').trim();
      mauDon12.lyDoKhongThuLy = (this.loaiMauDonForm.controls.lyDoKhongThuLy.value || '').trim();
      mauDon12.canCuPhapLy = (this.loaiMauDonForm.controls.canCuPhapLy.value || '').trim();
      mauDon12.dvVietTat = (this.loaiMauDonForm.controls.dvVietTat.value || '').trim();
      mauDon12.chucVuNguoiKy = (this.loaiMauDonForm.controls.chucVuNguoiKy.value || '').trim();
      mauDon12.so = (this.loaiMauDonForm.controls.so.value || '').trim();
      mauDon12.guiDonKhieuNaiDen = (this.loaiMauDonForm.controls.guiDonKhieuNaiDen.value || '').trim();
      mauDon12.diaChiNguoiKhieuNai = (this.loaiMauDonForm.controls.diaChiNguoiKhieuNai.value || '').trim();
      mauDon12.khieuNaiVeViec = (this.loaiMauDonForm.controls.khieuNaiVeViec.value || '').trim();
      mauDon12.ngayBanHanh = this.loaiMauDonForm.value.ngayBanHanh;
      mauDon12.ngayNhanDon = this.loaiMauDonForm.value.ngayNhanDon;

      this.noiDtTocaoService.printDonTuChoi(mauDon12, type);
    }
  }

  openModalMauDon() {
    this.onSubmitCheckMauDonValid = false;
    this.loaiMauDonForm.reset();
    this.loaiMauDon.title = 'Mẫu số 12';
    this.loaiMauDonForm.patchValue({
      ngayBanHanh: this.date,
      ngayNhanDon: this.date
    });
    this.modalMauDon.show();
  }

}
