import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert.service';

@Injectable({   providedIn: 'root' })
export class ThanhlapdoanCommonMethodService {

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) { }

  creatDonviForm() {
    let form: FormGroup;
    return form = this.fb.group({
      // dotXuat: [''],
      tenDvi: ['', Validators.required],
      maThu: [''],
      noiDungTT: [''],
      noiDungKT: [''],
      maSDLD: ['']
    });
  }

  creatFormThanhVien() {
    return this.fb.group({
      hoTen_InForm: ['', Validators.required],
      chucVu_InForm: ['', Validators.required],
      donVi_InForm: [''],
      kieuChucVu: ['']
    });
  }

  creatFormThemDonVi() {
    let form: FormGroup;
    return form = this.fb.group({
      phamVi: [],
      loaiHinh: ['', Validators.required],
      searchName: [''],
      maDonVi: [''],
      quanHuyen: ['', Validators.required],
      noiDungTT: ['', Validators.required],
      noiDungKT: ['', Validators.required]
    });
  }

  taoTLDForm() {
    let form: FormGroup;
    return form = this.fb.group({
      soQd: ['', Validators.required],
      tenQd: ['', Validators.required],
      ngay: ['', Validators.required],
      ngayCongBo: [''],
      coQuan: ['', Validators.required],
      thoiHan: ['', Validators.required],
      donViChuTri: ['', Validators.required],
      donViPhoiHop: [''],
      canCu: ['', Validators.required],
      nguoiKyQd: ['', Validators.required],
      loaiHinh: [''],
      dotXuat: ['', Validators.required],
      fileQuyetDinh: ['', Validators.required],
      quyetDinhThanhLap: [''],
      taiLieuLienQuan: [''],
      chonNoiDung: ['', Validators.required],
      chonDvPhoiHop: ['', Validators.required],
      listNoiDungTT: [''],
      listNoiDungKT: [''],
      ngayBatDau: ['', Validators.required],
      ngayKetThuc: ['', Validators.required],
      phamVi: ['', Validators.required],
      lanDieuChinh: '',
      ngayDieuChinh: '',
      soQDdieuChinh: '',
      fileQdDieuChinh: '',
      fileQdDieuChinhObj: '',
      lyDoDieuChinh: '',
      noiDungTT: [''],
      noiDungKT: [''],
      noiDungTTKT: [''],
      noiDungTTTT: [''],
    });
  }

  // Get tên cho nội dung thanh tra kiểm tra trong ng-select khi edit
  getTextContentForNoiDungTTKT(currentItem) {
    (currentItem.noiDungTT || []).map(el => {
      if (el.dmNoiDungTTKTId) {
        el.id = el.dmNoiDungTTKTId;
      }
      if (!el.text) {
        el.text = el.tenNoiDungTTKT;
      }
    });
    (currentItem.noiDungKT || []).map(el => {
      if (el.dmNoiDungTTKTId) {
        el.id = el.dmNoiDungTTKTId;
      }
      if (!el.text) {
        el.text = el.tenNoiDungTTKT;
      }
    });
    return currentItem;
  }
}
