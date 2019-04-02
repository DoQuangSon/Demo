import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { LOAIHINHTTKT, KEHOACH_OPTIONS, QUY } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { NoiPhanloaiDoituongService } from '../../../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { KeHoachBhxhTinhService } from '../../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-capnhat-kh-bhxh-tinh',
  templateUrl: './capnhat-kh-bhxh-tinh.component.html',
  styleUrls: ['./capnhat-kh-bhxh-tinh.component.scss']
})
export class CapNhatKHBHXHTinhComponent implements OnInit {
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('modalDonVi') modalDonVi: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('modalHoan') modalHoan: ModalDirective;

  isCollapseDirective: boolean = false;
  capNhatkeHoachBHXHTinhForm: FormGroup;
  options: any;
  kh_option: any;
  thucte_option: any;
  thongbaoLuuKH: string;
  chuaLuuKH = 'btn btn-primary';
  daLuuKH = 'btn btn-success';
  hiddenDuyet: Boolean = true;
  editForm: FormGroup;
  loaiHinhDonVi: string;
  tenDonViDuocChon: string;
  indexDonViDuocChon: any;
  dmTinhHuyenId: any;
  loaiDoiTuongs: any[] = [];
  id: any;
  tienDo: any;
  keHoachNam: any;
  currentDieuChinh: any;
  keHoach: any = {};
  account: any = {};
  tableContent: any[] = [];
  loaiHinhTTKTs: any[] = LOAIHINHTTKT;
  donViForm: FormGroup;

  formBody: any = {};
  resData: any = {};
  luu: boolean = false;

  currentIndex1: number;
  currentIndex2: number;
  typeModalDV: string;
  index: number;
  readOnly: Boolean = true;
  titleModalDV: string;
  formHoanTTKT: FormGroup;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: true,
  };

  constructor(
    private fb: FormBuilder,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private noiAccountService: NoiAccountService,
    private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
    private timeBuilderService: TimeBuilderService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private alertService: AlertService,
    private keHoachBHXHTinh: KeHoachBhxhTinhService,
    private auth: AuthService
  ) { }

  optionNam: any[] = [];

  danhSachLoaiHinhTTKT = LOAIHINHTTKT;
  danhSachQuy: any[] = QUY;

  isXemLyDoHoan = false;

  ngOnInit() {
    this.creatDonviForm();
    this.dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
    const year = (new Date()).getFullYear();
    for (let i = year; i < year + 20; i++) {
      this.optionNam.push(i);
    }
    this.account = this.auth.currentUser;

    this.noiPhanloaiDoituongService.getAllDoituong({ page: 0, size: 20 })
      .subscribe(res => {
        this.loaiDoiTuongs = res['content'];
      }, err => { });
    this.capNhatkeHoachBHXHTinhForm = this.fb.group({
      nam: [1],
      dotXuat: [0],
      quy: [0],
      loaiHinhDv: [0],
      options: [''],
      tuNgay: [''],
      denNgay: [''],
      tenDonVi: [''],
      khNam: [''],
      ngayLap: [''],
      tenKh: [''],
      soKH: []
    });
    this.thongbaoLuuKH = this.chuaLuuKH;
    this.editForm = this.builder.group({
      loaiHinhTTKTInForm: [''],
      quyKeHoachInForm: [''],
      lydocapnhatInForm: ['']
    });
    this.kh_option = KEHOACH_OPTIONS.kehoach;
    this.thucte_option = KEHOACH_OPTIONS.thucte;
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.getKeHoach();
      }
    });
    this.formHoanTTKT = this.fb.group({
      ngayHoanTTKT: ['', [Validators.required]],
      lyDoHoanTTKT: ['', [Validators.required]]
    });
  }
  creatDonviForm() {
    this.donViForm = this.fb.group({
      quy: ['', Validators.required],
      loaiHinhTTKT: ['', Validators.required],
      lydo: ['', Validators.required]
    });
  }
  getKeHoach() {
    this.keHoachBHXHTinh.getKeHoachWithLiveData(this.id)
      .subscribe(res => {
        this.tienDo = res.tienDo;
        this.keHoachNam = res.keHoachYear;
        this.currentDieuChinh = res.currentDieuChinh;
        this.keHoach = res;
        this.capNhatkeHoachBHXHTinhForm.patchValue({
          khNam: res.keHoachYear,
          ngayLap: this.timeBuilderService.fromString(res.ngayQuyetDinhTaoKeHoach).toTimeDatePickerValue(),
          tenKh: res.tenKeHoach,
          soKH: res.soQuyetDinhTaoKeHoach,
          soQuyetdinhDc: res.soQuyetDinhDieuChinh,
          lyDo: res.lyDoDieuChinh
        });
        for (const el of res.tinhDuKiens) {
          const kh: any = {};
          kh.id = el.dmPhanLoaiDtId;
          kh.tenDanhMuc = el.tenDanhMucPhanLoaiDt;
          const listChildren: any[] = [];
          const children: any = {};
          if (el.doiTuongTTKTDTO !== null) {
            children.diaChi = el.doiTuongTTKTDTO.diaChi || '';
            children.dmPhanLoaiDtId = el.doiTuongTTKTDTO.dmPhanLoaiDtId || '';
            children.dmTinhHuyenId = el.doiTuongTTKTDTO.dmTinhHuyenId || '';
            children.id = el.doiTuongTTKTDTO.id || '';
            children.maSuDungLaoDong = el.doiTuongTTKTDTO.maSuDungLaoDong || '';
            children.maThu = el.doiTuongTTKTDTO.maThu || '';
            children.quyMo = el.doiTuongTTKTDTO.quyMo;
            children.tenDoiTuong = el.doiTuongTTKTDTO.tenDoiTuong || '';
            children.loaiHinhTTKT = el.loaiHinhTTKT || '';
            children.quyTrongKeHoach = el.quyTrongKeHoach || '';
            children.tinhDuKienLiveDTO = el.tinhDuKienLiveDTO || '';
            listChildren.push(children);
            kh.children = listChildren;
            if (this.tableContent.length > 0) {
              const index = this.tableContent.findIndex(item => {
                return item.id === el.dmPhanLoaiDtId;
              });
              if (index !== -1) {
                (<any[]>this.tableContent[index].children).push(children);
              } else {
                this.tableContent.push(kh);
              }
            } else {
              this.tableContent.push(kh);
            }
          }
        }
      }, err => { });
  }
  getQuy(id) {
    const q = this.danhSachQuy.find(el => {
      return el.id === Number(id);
    });
    return q;
  }
  getLoaiHinh(id) {
    const lh = this.loaiHinhTTKTs.find(el => {
      return el.id === Number(id);
    });
    return lh;
  }

  closeEditForm() {
    this.editModal.hide();
  }

  generate() {
    const formValue = this.capNhatkeHoachBHXHTinhForm.value;
    this.formBody = this.keHoach;
    this.formBody.actived = true;
    this.formBody.createBy = {
      'id': this.keHoach.createById
    };
    this.formBody.soQuyetDinhTaoKeHoach = formValue.soKH;
    this.formBody.keHoachYear = formValue.khNam;
    this.formBody.id = this.keHoach.id;
    this.formBody.isOwnerTW = false;
    this.formBody.status = this.keHoach.status;
    this.formBody.createDateTime = this.keHoach.createDateTime;
    this.formBody.tenKeHoach = formValue.tenKh;
    this.formBody.ngayQuyetDinhTaoKeHoach = this.timeBuilderService.fromTimeDatePicker(formValue.ngayLap).setUTC().toISOString() || '';
    this.formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
    this.formBody.isDaDuocDieuChinh = false;
    this.formBody.tinhDuKiens = this.getTinhDuKien();
    return this.formBody;
  }

  getTinhDuKien() {
    const tinhDuKiens: any[] = [];
    this.tableContent.forEach(el => {
      const doiTuongTTKT: any[] = el.children;
      doiTuongTTKT.forEach(element => {
        const dukien: any = {};
        dukien.dmPhanLoaiDtId = el.id;
        dukien.loaiHinhTTKT = element.loaiHinhTTKT;
        dukien.quyTrongKeHoach = element.quyTrongKeHoach;
        dukien.doiTuongTTKTId = element.id;
        dukien.tenDanhMucPhanLoaiDt = element.tenDoiTuong;
        tinhDuKiens.push(dukien);
      });
    });
    return tinhDuKiens;
  }

  luuKH() {
    if (this.capNhatkeHoachBHXHTinhForm.valid) {
      this.formBody = this.generate();
      this.noiKehoachDuthaoService.updateNewKhDuthao(this.formBody)
        .subscribe(res => {
          this.resData = res;
          this.hiddenDuyet = false;
          this.luu = true;
          this.alertService.success('Cập nhật thành công');
        }, err => { });
    }
  }

  changeOption() {
    this.options = this.capNhatkeHoachBHXHTinhForm.value.options;
    if (this.options === '1') {
      this.capNhatkeHoachBHXHTinhForm.patchValue({
        quy: 0,
      });
    } else if (this.options === '2') {
      this.capNhatkeHoachBHXHTinhForm.patchValue({
        tuNgay: 0,
        denNgay: 0
      });
    }
  }

  // show modal sua, xoa don vi
  editDonVi(type, index, index2) {
    this.donViForm.reset();
    this.currentIndex1 = index;
    this.currentIndex2 = index2;
    const currentItem = this.tableContent[index];
    const children = currentItem.children[index2];
    this.typeModalDV = type;
    this.index = index;
    this.donViForm.patchValue({
      loaiHinhTTKT: Number(children.loaiHinhTTKT),
      quy: Number(children.quyTrongKeHoach)
    });
    if (type === 'delete') {
      this.readOnly = true;
      this.titleModalDV = 'Xóa đơn vị này?';
    } else {
      this.readOnly = false;
      this.titleModalDV = 'Chi tiết đơn vị';
    }
    this.modalDonVi.show();
  }
  saveDonVi() {
    const formValue = this.donViForm.value;
    if (this.typeModalDV === 'delete') {
      this.tableContent[this.currentIndex1].children.splice(this.currentIndex2, 1);
      if (this.tableContent[this.currentIndex1].children.length === 0) {
        this.tableContent.splice(this.currentIndex1, 1);
      }
      this.modalDonVi.hide();
    } else {
      if (this.donViForm.valid) {
        this.tableContent[this.currentIndex1].children[this.currentIndex2].loaiHinhTTKT = formValue.loaiHinhTTKT;
        this.tableContent[this.currentIndex1].children[this.currentIndex2].quyTrongKeHoach = formValue.quy;
        this.modalDonVi.hide();
      }
    }
  }
  xemLyDoHoan(data) {
    this.formHoanTTKT.patchValue({
      lyDoHoanTTKT: data.lyDoHoan,
      ngayHoanTTKT: this.timeBuilderService.fromString(data.ngayHoan).toTimeDatePickerValue()
    });
    this.modalHoan.show();
  }

  onSubmitDuyet() {

  }


}
