import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { groupBy } from 'lodash';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants';
import { NoiSoTheodoiChitietService } from '../../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-theodoi-chitiet/noi-so-theodoi-chitiet.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { TldCommonService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { LOAIHINH_TTKT_NAME } from '../../../../../../../constants/thanh-lap-doan.constants';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../../../constants/message.constants';
import { NoiDmPhanLoaiTieuThucService } from '../../../../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'ttkt-chitiet-so-theodoi-donvi-form',
  templateUrl: './chitiet-so-theodoi-donvi-form.component.html',
  styleUrls: ['./chitiet-so-theodoi-donvi-form.component.scss']
})
export class ChitietSoTheodoiDonviFormComponent implements OnInit {
  @Input() typeAccount: string;
  @ViewChild('updateMau02Modal') updateMau02Modal: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  thongTinChiTietDvForm: FormGroup;
  updateMau02Form: FormGroup;
  option: any;
  title: any;
  // titleNoiDung: any;
  icon_ModalHeader: string;
  luu = false;
  duyet = false;
  data: any = {};
  dataKQThucHien: any = [];
  danhSachbbQdVPHC: any = [];
  listDmTieuThucMapping: Array<any> = [];
  dsTieuThuc: any = [];

  // Modal edit KQThucHien
  // index1: number;
  // index2: number;
  currentItem: any;
  isCollapseDirective = false;
  dmPhanLoaiTieuThuc: any;
  searchHistory = false;
  now = new Date();
  paramArray: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private noiSoTheodoiChitietService: NoiSoTheodoiChitietService,
    private alertService: AlertService,
    private tldCommon: TldCommonService,
    private timeBuilder: TimeBuilderService,
    private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService
  ) { }

  ngOnInit() {
    this.thongTinChiTietDvForm = this.fb.group({
      id: [''],
      soVanBanChuyenCQ: [''],
      ngayChuyenCQ: [''],
      ndVanBanChuyenCQ: [''],
      fromYear: [this.now.getFullYear()],
      fromMonth: [(this.now.getMonth() + 1)]
    });
    this.updateMau02Form = this.fb.group({
      tenNoiDung: [''],
      soPhatSinh: [''],
      ghiChu: ['']
    });
    this.route.params.subscribe(params => {
      this.paramArray = params.id.split(',');
      this.getThongTinChungSoChiTiet(this.paramArray[0], this.paramArray[1]);
    });
  }
  listPhanLoaiTieuThuc;

  getAllDmPhanLoaiTT(dsTieuThuc: Array<any>) {
    // @Todo: Tree no paging
    this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(0, 100)
      .subscribe(data => {
        this.dmPhanLoaiTieuThuc = data;
        this.listPhanLoaiTieuThuc = cloneDeep(data);
        this.mappingData(this.dmPhanLoaiTieuThuc, dsTieuThuc);
      }, err => {
      });
  }
  mappingData(data, dsTieuThuc) {
    this.listDmTieuThucMapping = data.content
      .sort((a, b) => a.theOrder - b.theOrder)
      .map(el => {
        el.children = dsTieuThuc.filter(req => req.dmPhanLoaiTtId == el.id);
      });
    this.listDmTieuThucMapping = data.content.filter(req => !req.parentId);
    this.listDmTieuThucMapping = this.listDmTieuThucMapping.map(item => {
      item.child = data.content.filter(req => req.parentId == item.id);
      return item;
    });
  }

  getTenLoaiHinhTTKT(loaiHinhId) {
    let tenLoaiHinh = '';
    for (const item of LOAIHINH_TTKT_NAME) {
      if (Number(loaiHinhId) === Number(item.id)) {
        tenLoaiHinh = item.name;
      }
    }
    return tenLoaiHinh;
  }

  soDTOorigin: any = {};
  getThongTinChungSoChiTiet(doiTuongTTKTId, thanhLapDoanId) {
    this.noiSoTheodoiChitietService.getSoTheoDoiChiTietTaiDonVi(doiTuongTTKTId, thanhLapDoanId).subscribe(res => {
      this.data = res;
      this.soDTOorigin = res.so02DTO;
      this.patchValueTablebbQdVPHC(res);
      this.patchValueVanBanChuyenCQ(res.vbChuyenCqDtDTO);
      this.getDataKQThucHien(res);
    }, err => {
      this.alertService.error(MESS_QL_BAOCAO_TTKT.ERROR_GET_SO_THEODOI_CHITIET_DONVI);
    });
  }

  getDataKQThucHien(res) {
    this.dsTieuThuc = res.so02DTO ? res.so02DTO.soChiTietDTOS ? res.so02DTO.soChiTietDTOS : [] : [];
    this.dsTieuThuc = this.dsTieuThuc.filter(el => el.dmTieuThucId != 99999);  // ẩn Số tiền xử phạt VPHC phải thu
    this.dsTieuThuc.sort((a, b) => a.theOrder - b.theOrder);
    this.getAllDmPhanLoaiTT(this.dsTieuThuc);
    let groupData: any = groupBy(this.dsTieuThuc, (el: any) => (el.dmPhanLoaiTtId));
    groupData = Object.keys(groupData).map(key => {
      return [Number(key), groupData[key]];
    });
    for (const item of groupData) {
      const _el: any = {};
      _el.dmPhanLoaiTtId = item[1][0].dmPhanLoaiTtId;
      _el.tenPhanLoai = item[1][0].tenPhanLoaiTt;
      _el.children = [];
      for (const element of item[1]) {
        _el.children.push(element);
      }
      this.dataKQThucHien.push(_el);
    }
  }

  patchValueTablebbQdVPHC(res) {
    this.danhSachbbQdVPHC = res.bbQdVPHCDTOS;
  }

  // PatchValue văn bản chuyển cơ quan điều tra
  patchValueVanBanChuyenCQ(res) {
    this.thongTinChiTietDvForm.patchValue({
      soVanBanChuyenCQ: res.soVanBan,
      ngayChuyenCQ: this.timeBuilder.fromString(res.ngayVanBan).toTimeDatePickerValue(),
      ndVanBanChuyenCQ: res.chuyenVe
    });
  }

  // changeSumValue(ketKuanTTKT, soLieuDieuChinh) {
  //   this.updateMau02Form.patchValue({
  //     soThucHien: Number(ketKuanTTKT) + Number(soLieuDieuChinh)
  //   });
  // }

  // Mở modal edit KQThucHien
  editKQThucHien(item: any) {
    this.currentItem = item; // this.dataKQThucHien[i].children[j];
    // this.index1 = i;
    // this.index2 = j;
    this.updateMau02Form.patchValue({
      tenNoiDung: this.currentItem.tenTieuThuc,
      soPhatSinh: 0,
      ghiChu: this.currentItem.ghiChu
    });
    if (this.currentItem.soThucHien == 0) {
      this.updateMau02Form.controls.soPhatSinh.disable();
    } else {
      this.updateMau02Form.enable();
    }
    this.updateMau02Modal.show();

  }

  // update/save KQThucHien
  saveEditKQThucHien() {
    const formValue = this.updateMau02Form.value;
    this.currentItem.tenTieuThuc = formValue.tenNoiDung;
    this.currentItem.soLieuDieuChinh = this.currentItem.soLieuDieuChinh + (formValue.soPhatSinh ? formValue.soPhatSinh : 0);
    this.currentItem.soLuyKe = this.currentItem.soLuyKe + (formValue.soPhatSinh ? formValue.soPhatSinh : 0);
    let soThucHien = this.currentItem.soKetLuan - this.currentItem.soLuyKe;
    if (soThucHien < 0) {
      this.currentItem.soThucHien = 0;
    } else {
      this.currentItem.soThucHien = soThucHien;
    }
    this.currentItem.ghiChu = formValue.ghiChu;
    this.updateMau02Modal.hide();
  }

  saveChiTietSoDTO(data) {
    const soDTO: any = this.soDTOorigin;
    const soDTOArray: any = [];
    console.log(soDTO);
    for (const element of soDTO.soChiTietDTOS) {
      const soChiTiet = this.saveSoChiTietDTO(element, data);
      soDTOArray.push(soChiTiet);
    }
    return soDTOArray;
  }

  saveSoChiTietDTO(element, data) {
    console.log(element, data);
    // debugger
    for (const item of data) {
      for (const el of item.children) {
        let _el: any = {};
        if (element.dmTieuThucId === el.dmTieuThucId) {
          _el = element;
          _el.soKetLuan = el.soKetLuan;
          _el.soLieuDieuChinh = el.soLieuDieuChinh;
          _el.soThucHien = el.soThucHien;
          return _el;
        }
      }
    }
  }

  saveVBChuyenCqDtDTO(formValue) {
    const vbDTO: any = {};
    vbDTO.id = this.data.vbChuyenCqDtDTO.id;
    vbDTO.dsDvDcTTKTId = this.data.vbChuyenCqDtDTO.dsDvDcTTKTId;
    vbDTO.ngayVanBan = this.timeBuilder.fromTimeDatePicker(formValue.ngayChuyenCQ).setUTC().toISOString();
    vbDTO.soVanBan = formValue.soVanBanChuyenCQ;
    vbDTO.chuyenVe = formValue.ndVanBanChuyenCQ;
    return vbDTO;
  }

  // Send data lên server
  onSubmit() {
    const formValue = this.thongTinChiTietDvForm.value;
    const formBody: any = this.data;
    // formBody.so02DTO = this.soDTOorigin;
    // console.log('data can save', this.dataKQThucHien);
    // console.log(formBody.so02DTO.soChiTietDTOS);
    // formBody.so02DTO.soChiTietDTOS = this.saveChiTietSoDTO(this.dataKQThucHien);
    formBody.vbChuyenCqDtDTO = this.saveVBChuyenCqDtDTO(formValue);
    this.noiSoTheodoiChitietService.saveSoTheoDoiChiTietTaiDonVi(formBody).subscribe(res => {
      this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_SO_THEODOI_CHITIET_DONVI);
      this.luu = true;
    }, err => {
      this.alertService.error(MESS_QL_BAOCAO_TTKT.ERROR_SAVE_SO_THEODOI_CHITIET_DONVI);
    });
  }

  showModalUpdate() {
    this.updateMau02Modal.show();
  }

  onBack() {
    this.location.back();
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.duyetModal.hide();
    this.alertService.success('Đã duyệt sổ theo dõi chi tiết tại đơn vị');
    this.luu = false;
  }

  xemLichSu() {
    const searchValue = this.thongTinChiTietDvForm.value;
    if (searchValue.fromMonth == this.now.getMonth() + 1 && searchValue.fromYear == this.now.getFullYear()) {
      this.getThongTinChungSoChiTiet(this.paramArray[0], this.paramArray[1]);
      this.searchHistory = false;
    } else {
      this.searchHistory = true;
      this.noiSoTheodoiChitietService.xemLichSu(searchValue.fromYear, searchValue.fromMonth, this.data.vbChuyenCqDtDTO.dsDvDcTTKTId).subscribe(res => {
        console.log('soChiTietDTOS', res);
        this.mappingData(this.dmPhanLoaiTieuThuc, res.soChiTietDTOS);
      }, err => {
        this.listDmTieuThucMapping = [];
      });
    }
  }

  printSo02(type) {
      const formValue = this.thongTinChiTietDvForm.value;
      const formBody: any = this.data;
      formBody.vbChuyenCqDtDTO = this.saveVBChuyenCqDtDTO(formValue);
      // console.log(formBody);
      const data = this.thongTinChiTietDvForm.value;
      this.route.params.subscribe(params => {
          this.paramArray = params.id.split(',');
          data.ngayChuyenCQ = this.timeBuilder.fromTimeDatePicker(data.ngayChuyenCQ).setUTC().toISOString();
          // this.noiSoTheodoiChitietService.printMauBaoCao02(this.paramArray[1], this.paramArray[0], type,
          //     data.soVanBanChuyenCQ, data.ngayChuyenCQ, data.ndVanBanChuyenCQ);
          this.noiSoTheodoiChitietService.printMauBaoCao02_Cach2(formBody, this.listPhanLoaiTieuThuc.content, type);
      });
  }

}
