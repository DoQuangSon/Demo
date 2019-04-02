
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { cloneDeep } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';
import { NoiDmChutriPhoiHopService } from '../../../../../../services/api/danh-muc/noi-dmChutriPhoihop/noi-dm-chutri-phoi-hop.service';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import {
  DIEU_CHINH_DETAIL, LOAIHINHTTKT, QUY, CHECK_LOAIHINH_TTKT, TRANG_THAI_KH
} from '../../../../../../constants/ke-hoach-ttkt.constants';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';
@Component({
  selector: 'ttkt-list-ke-hoach-bhxh-vn-table',
  templateUrl: './list-ke-hoach-bhxh-vn-table.component.html',
  styleUrls: ['./list-ke-hoach-bhxh-vn-table.component.scss']
})
export class ListKeHoachBhxhVnTableComponent implements OnInit, OnChanges {

  @ViewChild('modalEdit') modalEdit: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  @ViewChild('modalHoan') modalHoan: ModalDirective;
  @Output() updateListKH = new EventEmitter();
  @Input() public listKeHoach: any;
  @Input() public isDieuChinh: Boolean = false;
  @Input() public emitIsSua: boolean;
  @Input() public duyet: Boolean = false;
  @Input() public type: any;
  @Input() isTao: boolean = false;
  @Input() hideTrangThai: boolean = false;
  @Input() excel: boolean;
  @Input() isxoa: boolean = false;
  @Input() khDuThao: boolean = false;
  @Input() hiddeDotXuat = false;
  @Input() hideDelete: boolean;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: true,
  };
  public tinhThanh: any[] = [];
  public dieuChinh: any[] = DIEU_CHINH_DETAIL;
  public quy: any[] = QUY;
  public donViChuTri: any[] = [];
  public donViPhoiHop: any[] = [];
  editListKehoachForm: FormGroup;
  formHoanTTKT: FormGroup;
  allQuy: any[] = [];
  optionQuy = QUY;
  loaiHinhTTKT: any[] = LOAIHINHTTKT;
  listDonViPhoiHop: any;
  selectedDonViPhoiHop: any;
  selectedHoan: any;
  validLoaiHinh: boolean = false;
  isSua: boolean;
  isThemMoi: boolean;
  isXoa: boolean;
  isXemLyDoHoan: boolean;
  indexSelected: any;
  tmp: any[] = [];

  listKeHoachFormArray: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public formService: FormService,
    private noiDmChutriPhoiHopService: NoiDmChutriPhoiHopService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private alertService: AlertService,
    private timeBuilderService: TimeBuilderService,
    private helper: UtilsService
  ) { }

  ngOnInit() {
    this.listDonViPhoiHop = [];
    this.noiDmTinhHuyenService.getDanhSachTinhThanh()
      .subscribe(res => {
        this.tinhThanh = res;
      }, err => {
      });
    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihopByType(0, 100)
      .subscribe(res => {
        this.donViChuTri = res['content'];
      }, err => {
      });
    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihop(0, 10)
      .subscribe(res => {
        this.donViPhoiHop = res['content'];
        for (const i of this.donViPhoiHop) {
          this.listDonViPhoiHop.push(
            {
              'text': i.tenDonViChuTriPhoiHop,
              'id': i.id
            }
          );
        }
        this.loadListKeHoach();
      }, err => { }
      );
    this.editListKehoachForm = this.fb.group({
      id: [''],
      dmTinhHuyenId: ['', Validators.required],
      listDmTinhHuyenId: [],
      dvChutri: ['', Validators.required],
      dvPhoihop: [''],
      quyThucHien: [this.helper.getQuyHienTai(), Validators.required],
      loaiHinhTTKT: [1, Validators.required]
    });
    this.formHoanTTKT = this.fb.group({
      ngayHoanTTKT: ['', [Validators.required]],
      lyDoHoanTTKT: ['', [Validators.required]]
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadListKeHoach();
  }

  loadListKeHoach() {
    if (this.listKeHoach && Array.isArray(this.listKeHoach) && this.listKeHoach.length > 0) {
      this.listKeHoachFormArray = this.listKeHoach;
      this.allQuy = this.listKeHoach;
      this.sortData();
      for (let i = 0; i < this.allQuy.length; i++) {
        this.getDonViPhoiHop(this.allQuy[i]);
      }
    }
  }
  sortData() {
    this.allQuy.sort((item1, item2) => item1.quyThucHien - item2.quyThucHien);
  }
  edit(id) {
    this.isSua = true;
    this.isThemMoi = false;
    this.isXoa = false;
    const dvPhoiHop = [];
    const keHoach = this.listKeHoach.find(el => el.id === id);
    for (let i = 0; i < keHoach.phoiHopTwDTOS.length; i++) {
      if (keHoach.phoiHopTwDTOS[i].id) {
        dvPhoiHop.push(
          {
            id: keHoach.phoiHopTwDTOS[i].dmCTriPHopId,
            text: keHoach.phoiHopTwDTOS[i].tenDonViChuTriPhoiHop
          }
        );
      } else {
        for (let j = 0; j < this.donViPhoiHop.length; j++) {
          if (keHoach.phoiHopTwDTOS[i].dmCTriPHopId === this.donViPhoiHop[j].id) {
            dvPhoiHop.push(
              {
                id: keHoach.phoiHopTwDTOS[i].dmCTriPHopId,
                text: this.donViPhoiHop[j].tenDonViChuTriPhoiHop
              });
          }
        }
      }
    }
    if (keHoach.phoiHopTwDTOS) {
      this.validLoaiHinh = true;
    }
    this.editListKehoachForm.reset();
    this.editListKehoachForm.patchValue({
      id: id,
      dmTinhHuyenId: keHoach.dmTinhHuyenId,
      quyThucHien: keHoach.quyThucHien,
      dvChutri: keHoach.donViChuTriId,
      dvPhoihop: dvPhoiHop,
      loaiHinhTTKT: keHoach.loaiHinhTTKT
    });
    this.changeLoaiHinh();
    // replace tinh
    this.mapTinhThanhKhongTrongKH(keHoach.dmTinhHuyenId);
    this.modalEdit.show();
  }

  delete(id) {
    this.isSua = false;
    this.isThemMoi = false;
    this.isXoa = true;
    const dvPhoiHop = [];
    const keHoach = this.listKeHoach.find(el => {
      return el.id === id;
    });
    for (let i = 0; i < keHoach.phoiHopTwDTOS.length; i++) {
      if (keHoach.phoiHopTwDTOS[i].id) {
        dvPhoiHop.push(
          {
            id: keHoach.phoiHopTwDTOS[i].dmCTriPHopId,
            text: keHoach.phoiHopTwDTOS[i].tenDonViChuTriPhoiHop
          }
        );
      } else {
        for (let j = 0; j < this.donViPhoiHop.length; j++) {
          if (keHoach.phoiHopTwDTOS[i].dmCTriPHopId === this.donViPhoiHop[j].id) {
            dvPhoiHop.push(
              {
                id: keHoach.phoiHopTwDTOS[i].dmCTriPHopId,
                text: this.donViPhoiHop[j].tenDonViChuTriPhoiHop
              });
          }
        }
      }
    }
    if (keHoach.phoiHopTwDTOS) {
      this.validLoaiHinh = true;
    }
    this.editListKehoachForm.reset();
    this.editListKehoachForm.patchValue({
      id: id,
      dmTinhHuyenId: keHoach.dmTinhHuyenId,
      quyThucHien: keHoach.quyThucHien,
      dvChutri: keHoach.donViChuTriId,
      dvPhoihop: dvPhoiHop,
      loaiHinhTTKT: keHoach.loaiHinhTTKT
    });
    this.changeLoaiHinh();
    this.mapTinhThanhKhongTrongKH(keHoach.dmTinhHuyenId);
    this.modalEdit.show();
  }

  onThemMoi() {
    this.isSua = false;
    this.isThemMoi = true;
    this.isXoa = false;
    this.editListKehoachForm.reset();
    console.log(this.editListKehoachForm.value);
    // set default 
    this.editListKehoachForm.patchValue({
      quyThucHien: this.helper.getQuyHienTai(),
      loaiHinhTTKT: 1
    })
    this.changeLoaiHinh();
    // replace tinh
    this.mapTinhThanhKhongTrongKH();
    this.modalEdit.show();
  }

  tinhThanhKhongTrongKH: Array<any> = [];
  mapTinhThanhKhongTrongKH(dmTinhHuyenId?: any) {
    this.tinhThanhKhongTrongKH = this.tinhThanh.filter(res => {
      return this.listKeHoach.findIndex(kh => {
        return kh.trongKeHoach && kh.dmTinhHuyenId == res.id;
      }) === -1 || (dmTinhHuyenId && res.id == dmTinhHuyenId);
    });
  }

  luuThemMoi() {
    this.tmp = this.listKeHoach;
    if (this.editListKehoachForm.valid) {
      let listDmTinhHuyen = this.editListKehoachForm.value.listDmTinhHuyenId;
      for (let item of listDmTinhHuyen) {
        this.addDonViToTable(item.id);
      }
    } else {
      console.log(this.formService.getErrorList(this.editListKehoachForm));
      this.alertService.error('Bạn cần nhập đầy đủ thông tin');
      return;
    }
  }

  addDonViToTable(dmTinhHuyenId: any) {
    let data: any = {};
    let selectedDonViPhoiHop = [];
    const formValue = this.editListKehoachForm.value;

    if (this.selectedDonViPhoiHop) {
      for (const i of this.selectedDonViPhoiHop) {
        selectedDonViPhoiHop.push({ dmCTriPHopId: i.id });
      }
    } else {
      selectedDonViPhoiHop = [];
    }

    data.id = this.tmp.length + 1;
    data.phoiHopTwDTOS = selectedDonViPhoiHop;
    data.donViChuTriId = Number(formValue.dvChutri);
    data.dmTinhHuyenId = Number(dmTinhHuyenId);
    data.quyThucHien = Number(formValue.quyThucHien);
    data.loaiHinhTTKT = Number(formValue.loaiHinhTTKT);
    data.trongKeHoach = true;
    data.status = null;
    data = this.replaceDuplicateData(data);
    this.tmp.push(data);

    this.excel = true;
    this.listKeHoach = cloneDeep(this.tmp);
    this.loadListKeHoach();
    this.modalEdit.hide();
    this.updateListKH.emit(this.listKeHoach);
  }
  onSubmitEdit() {
    // this.formService.touchAllInput(this.editListKehoachForm);
    if (this.editListKehoachForm.invalid) {
      console.log(this.formService.getErrorList(this.editListKehoachForm));
      this.alertService.error('Bạn cần nhập đầy đủ thông tin');
      return;
    }
    let selectedDonViPhoiHop = [];
    const data: any = {};
    const formValue = this.editListKehoachForm.value;
    const keHoach = this.listKeHoach.find(el => el.id === formValue.id);
    const index = this.listKeHoach.findIndex(el => el.id === formValue.id);
    const quy = this.getQuy(formValue.quyThucHien);
    const tinh = this.getTinhHuyen(formValue.dmTinhHuyenId);
    if (this.selectedDonViPhoiHop) {
      for (const i of this.selectedDonViPhoiHop) {
        selectedDonViPhoiHop.push({
          dmCTriPHopId: i.id
        });
      }
    } else {
      selectedDonViPhoiHop = [];
    }

    data.id = keHoach.id;
    data.phoiHopTwDTOS = selectedDonViPhoiHop;
    data.keHoachDuThaoId = keHoach.keHoachDuThaoId;
    data.donViChuTriId = Number(formValue.dvChutri);
    data.dmTinhHuyenId = tinh.id;
    data.quyThucHien = quy.id;
    data.loaiHinhTTKT = formValue.loaiHinhTTKT;
    data.trongKeHoach = true;
    data.status = null;
    this.listKeHoach[index] = data;
    this.loadListKeHoach();
    this.modalEdit.hide();
    this.updateListKH.emit(this.listKeHoach);
  }
  getQuy(id) {
    return this.optionQuy.find(el => el.id == parseInt(id));
  }
  getLoaiHinhTTKT(id) {
    return this.loaiHinhTTKT.find(el => el.id == id);
  }
  getTinhHuyen(id) {
    return this.tinhThanh.find(el => el.id == id);
  }
  getChitriPhoiHop(id) {
    return this.donViChuTri.find(el => el.id == id);
  }
  refreshValueDVPH(value: any): void {
    this.selectedDonViPhoiHop = value;
  }
  getDonViPhoiHop(item) {
    let matchKeHoach = [];
    if (this.donViPhoiHop.length !== 0) {
      for (let i = 0; i < item.phoiHopTwDTOS.length; i++) {
        for (let j = 0; j < this.donViPhoiHop.length; j++) {
          if (item.phoiHopTwDTOS[i].dmCTriPHopId) {
            if (item.phoiHopTwDTOS[i].dmCTriPHopId === this.donViPhoiHop[j].id) {
              matchKeHoach.push('  ' + this.donViPhoiHop[j].tenDonViChuTriPhoiHop);
            }
          } else {
            matchKeHoach = item.phoiHopTwDTOS;
          }
        }
      }
      item.convertDonViPhoiHop = matchKeHoach;
    }
  }
  changeLoaiHinh() {
    const value = Number(this.editListKehoachForm.value.loaiHinhTTKT);
    if (value === CHECK_LOAIHINH_TTKT.TTLN || value === CHECK_LOAIHINH_TTKT.KTLN) {
      this.validLoaiHinh = true;
      this.editListKehoachForm.controls['dvPhoihop'].setValidators(Validators.required);
      this.editListKehoachForm.controls['dvPhoihop'].updateValueAndValidity();
    } else {
      this.validLoaiHinh = false;
      this.editListKehoachForm.controls['dvPhoihop'].setValidators(null);
      this.editListKehoachForm.controls['dvPhoihop'].updateValueAndValidity();
      this.selectedDonViPhoiHop = [];
    }
  }
  replaceDuplicateData(data) {
    const dmTinhHuyenId = data.dmTinhHuyenId;
    if (this.tmp.length !== 0) {
      for (const i in this.tmp) {
        if (dmTinhHuyenId === this.tmp[i].dmTinhHuyenId) {
          this.tmp[i].donViChuTriId = data.donViChuTriId;
          this.tmp[i].loaiHinhTTKT = data.loaiHinhTTKT;
          this.tmp[i].quyThucHien = data.quyThucHien;
          this.tmp[i].phoiHopTwDTOS = data.phoiHopTwDTOS;
          return data = [];
        }
      }
    }
    return data;
  }
  hoanTTKT(data) {
    this.isXemLyDoHoan = false;
    this.selectedHoan = data;
    this.formHoanTTKT.reset();
    this.modalHoan.show();
  }
  xemLyDoHoan(data) {
    this.isXemLyDoHoan = true;
    this.formHoanTTKT.patchValue({
      lyDoHoanTTKT: data.lyDoHoan,
      ngayHoanTTKT: this.timeBuilderService.fromString(data.ngayHoan).toTimeDatePickerValue()
    });
    this.modalHoan.show();
  }
  huyHoanTTKT(data) {
    data.status = 2;
    data.isHoan = false;
  }
  acceptHoanTTKT() {
    const formValue = this.formHoanTTKT.value;
    this.selectedHoan.isHoan = true;
    this.selectedHoan.lyDoHoan = formValue.lyDoHoanTTKT;
    this.selectedHoan.ngayHoan = this.timeBuilderService.convertDateUTC(formValue.ngayHoanTTKT);
    this.selectedHoan.status = 1;
    this.modalHoan.hide();
  }

  suaDonViTTKT(item) {
    this.edit(item.id);
  }

  xoaDonViTTKT(item) {
    this.delete(item.id);
  }

  acceptDelete() {
    this.listKeHoach.splice(this.indexSelected, 1);
    this.loadListKeHoach();
    this.modalEdit.hide();
    this.updateListKH.emit(this.listKeHoach);
  }

  getStatusName(code: number) {
    let status = '';
    for (const trangThai of TRANG_THAI_KH) {
      if (code === trangThai.code) {
        status = trangThai.name;
      }
    }
    return status;
  }
}
