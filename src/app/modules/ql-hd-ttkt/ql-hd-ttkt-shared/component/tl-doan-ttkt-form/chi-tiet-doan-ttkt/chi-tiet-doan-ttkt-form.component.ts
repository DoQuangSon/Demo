import {Component, OnInit, ViewChild, Input, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {MYDATEPICKER_VI_OPTIONS} from '../../../../../../constants/index';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {TimeBuilderService} from '../../../../../../services/helper/time-builder.service';
import {TLD_STT} from '../../../../../../constants/status.constants';
import {Location} from '@angular/common';
import {uniqBy as LD_uniqBy, groupBy} from 'lodash';
import {FileResourceService} from '../../../../../../services/helper/file-resource.service';
import {FILE} from '../../../../../../constants/api-file.constants';
import {COMMON_SUCCESS_MESS, COMMON_ERROR_MESS} from '../../../../../../constants/message.constants';
import {QUAN_LY_DOAN} from '../../../../../../constants/message.constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {TempService} from '../tao-moi-doan-ttkt/temp.service';
import {AlertService} from '../../../../../../services/api/alert.service';
import {ThanhLapDoanService} from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import {DmCanCuService} from '../../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import {PhanLoaiDtService} from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import {NoiDmTinhHuyenService} from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import {PaginationService} from '../../../../../../services/helper/pagination.service';
import {TldCommonService} from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import {ThanhlapdoanCommonMethodService} from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/thanhlapdoan-common-method.service';
import {ModalDuyetComponent} from '../modal-list/modal-duyet/modal-duyet.component';
import {ModalGuiComponent} from '../modal-list/modal-gui/modal-gui.component';
import {AuthService} from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-chi-tiet-doan-ttkt-form',
  templateUrl: './chi-tiet-doan-ttkt-form.component.html',
  styleUrls: ['./chi-tiet-doan-ttkt-form.component.scss']
})
export class ChiTietDoanTtktFormComponent implements OnInit {
  // list modal
  modalDuyet: BsModalRef;
  modalGui: BsModalRef;

  // input
  @Input() typeAccount: string = '';
  @Input() tldId: number;
  @Input() quyetDinhTTKT: boolean;
  // modal dsThanhVien

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  disabled: boolean = false;
  // setting multiselect
  showKB: any;
  donViPhoiHop: string;
  noiDungTT: string;
  noiDungKT: string;
  noiDungTTDaChon: any = [];
  noiDungKTDaChon: any = [];
  donViPhoiHopDaChon: any = [];

  duyet: boolean = false;
  isOwnerTw: boolean = false;
  tldoanForm: FormGroup;

  // modal chon don vi
  typeModalDV: string;
  titleModalDV: string;
  tenDonVi: string;
  diaChi: string;

  // Rework
  cacDonViPhoiHop: any = [];
  soLanDieuChinh: any;
  currentDieuChinhObj: any;
  cacDonViChuTri: any = [];
  cacCanCu: any = [];

  cacNoiDungTT: any = [];
  cacNoiDungTT2: any = [];
  cacNoiDungKT: any = [];
  dsThanhVien: any[] = [];
  dsTinh: any = [];
  groupContent: any[] = [];
  tableContent: any[] = [];
  listDviDsDoanTTKT: any[] = [];
  listDviDoiTuong: any = [];
  listLoaiHinhDonVi: any = [];
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  listDcChon: any[] = [];
  readOnly: boolean;
  tlDoanId: any;

  statusChuaDuyet: Boolean = true;
  isChuaDieuChinh: Boolean = false;

  currentIndex: number;

  // Check có phải trang quyết định ko
  isQuyetDinh: boolean = false;

  // Boolean disabled page
  isSaved: boolean = true;
  isEdit: boolean = false;
  tenChucDanh: string;
  isHideEdit: boolean = false;

  // File
  @ViewChild('fileQdDieuChinh') fileInputRef1: ElementRef;
  @ViewChild('fileLienQuan') fileInputRef2: ElementRef;
  @ViewChild('fileQuyetDinh') fileInputRef3: ElementRef;
  taiLieuLienQuan: any = [];
  fileQdDieuChinh: any = [];
  fileQdThanhLap: any = [];
  tenFileQdDieuChinh: any;
  tenFileQuyetDinh: any;
  tenFileTaiLieuLienQuan: any;
  urlFileDownload: any;

  // Location:
  locationType: string = '';

  listQuanHuyen: any = [];

  isDaGuiTinh: boolean = false;
  isDuyetDieuChinh: boolean = false;
  isCanEdit: boolean = true;

  isNewestDieuChinh: boolean = true;

  isTldKetThuc: boolean;

  dieuChinh: boolean = false;
  luu: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private builder: FormBuilder,
    private alertService: AlertService,
    private tlDoanService: ThanhLapDoanService,
    private timeBuilder: TimeBuilderService,
    private noiDmCanCu: DmCanCuService,
    private phanLoaiDvi: PhanLoaiDtService,
    private dmTinhHuyen: NoiDmTinhHuyenService,
    private pagination: PaginationService,
    private location: Location,
    private tldCommon: TldCommonService,
    private fileResource: FileResourceService,
    private modalService: BsModalService,
    private commonMethodTld: ThanhlapdoanCommonMethodService,
    private auth: AuthService,
    private tempservice: TempService
  ) {
  }

  ngOnInit() {
    this.checkTLDKetThuc();
    this.getSoLanDieuChinh();
    this.tldoanForm = this.commonMethodTld.taoTLDForm();
    this.getListDvChuTri();
    this.getDmCanCu();
    this.getDmNoiDungTTKT();
    this.getCurrentDieuChinh(this.tldId, 'first');
    if (this.router.url.indexOf('qd-ttkt') > -1) {
      this.isQuyetDinh = true;
    }
    if (this.router.url.indexOf('tw') > -1) {
      this.isOwnerTw = true;
    } else {
      this.isOwnerTw = false;
    }
    if (this.typeAccount === 'TW') {
      this.locationType = 'Chọn tỉnh';
    } else {
      this.locationType = 'Chọn huyện';
    }
    this.tempservice.getvalue().subscribe(e => {
      if (e != 0) {
        this.showKB = e;
      }
      if (e == null) {
        this.showKB = '';
      }
    });
  }

  checkTLDKetThuc() {
    this.tlDoanService.checkTLDKetThuc(this.tldId).subscribe(res => {
      this.isTldKetThuc = res;
    }, err => {
    });
  }

  getAllTinhHuyen() {
    if (this.typeAccount === 'TW') {
      this.dmTinhHuyen.getAllDmTinhHuyen(0, 1000).subscribe(res => {
        this.dsTinh = res.content;
      }, err => {
      });
    } else {
      const dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
      this.dmTinhHuyen.getDsHuyenByTinh(dmTinhHuyenId).subscribe(res => {
        if (res.length) {
          this.dsTinh = res;
        } else {
          this.dsTinh = [];
        }
      }, err => {
      });
    }
  }

  getSoLanDieuChinh() {
    this.tlDoanService.getSoLanDieuChinhThanhLapDoanById(this.tldId).subscribe(res => {
      this.soLanDieuChinh = res;
      if (res) {
        this.soLanDieuChinh = this.soLanDieuChinh.reverse();
        this.soLanDieuChinh.forEach((el, index) => {
          if (el.currentDieuChinh === 0 || this.soLanDieuChinh.length === 1 || !el.ngayDieuChinh) {
            el.soLanDieuChinh = 'Chưa bị điều chỉnh';
            el.timeDieuChinh = '';
          } else {
            el.soLanDieuChinh = `Điều chỉnh lần ${index}`;
            if (el.ngayDieuChinh) {
              el.timeDieuChinh = new Date(el.ngayDieuChinh);
            }
          }
        });
      }
    }, err => {
      this.soLanDieuChinh = [];
    });
  }

  // tslint:disable-next-line:member-ordering
  chuaDieuChinh: boolean = true;

  getCurrentDieuChinh(id, first?, select?) {
    this.tlDoanService.getThanhLapDoanById(id).subscribe(res => {
      this.currentDieuChinhObj = res;
      this.isOwnerTw = res.isOwnerTw ? true : false;
      this.tlDoanId = res.id;
      this.donViPhoiHopDaChon = this.patchValueDvPhoiHop(res);
      if (res.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_DIEU_CHINH) {
        this.isDuyetDieuChinh = true;
      }
      if (res.isDaGuiTinh) {
        this.isDaGuiTinh = res.isDaGuiTinh;
      }
      if (res.status === TLD_STT.STATUS_THANH_LAP_DOAN_DA_DUOC_DUYET_DIEU_CHINH || res.status === TLD_STT.STATUS_THANH_LAP_DOAN_DA_DUOC_DUYET_TAO_MOI) {
        this.duyet = true;
      } else {
        this.duyet = false;
      }

      this.getFileList(res);
      this.patchValueTlDoan(res, first);

      const listDv = res.dsDvDcTTKTS;
      listDv.forEach(el => {
        if(el.moreInfo !== null && el.moreInfo.status != null){
          this.isHideEdit = true;
        }
      })
    }, err => {
    });
  }

  getFileList(res) {
    if (res.fileTaiLieuLienQuan) {
      this.taiLieuLienQuan = JSON.parse(res.fileTaiLieuLienQuan);
    } else {
      this.taiLieuLienQuan = [];
    }
    if (res.fileQuyetDinhThanhLap) {
      this.fileQdThanhLap = JSON.parse(res.fileQuyetDinhThanhLap);
    } else {
      this.fileQdThanhLap = [];
    }
    if (res.fileQuyetDinhDieuChinh) {
      this.fileQdDieuChinh = JSON.parse(res.fileQuyetDinhDieuChinh);
    } else {
      this.fileQdDieuChinh = [];
    }
  }

  downLoadFile(str, i?) {
    let arrayFile: any = [];
    str === 'lienQuan' ? arrayFile = this.taiLieuLienQuan : arrayFile = this.fileQdThanhLap;
    if (str === 'dieuChinh') {
      arrayFile = this.fileQdDieuChinh;
    }
    this.fileResource.downloadFile(arrayFile[i].url).subscribe(blob => {
      this.fileResource.saveFile(blob, arrayFile[i].fileName);
    }, err => {
    });
  }

  getDmCanCu() {
    this.noiDmCanCu.getDmCanCuTTKT(0, 1000).subscribe(res => {
      this.cacCanCu = res.content;
    }, err => {
    });
  }

  getDmNoiDungTTKT() {
    this.noiDmCanCu.getDmNoiDungTTKTByActiveTrue().subscribe(res => {
      this.cacNoiDungTT = res.content;
      this.cacNoiDungTT.map(el => {
        el.text = el.tenNoiDung;
      });
      this.cacNoiDungTT2 = this.tldCommon.getListDmTTKTngSelect(res, 1);
      this.cacNoiDungKT = this.tldCommon.getListDmTTKTngSelect(res, 2);
    });
  }

  getListDvChuTri() {
    this.noiDmCanCu.getDmDviCtri().subscribe(res => {
      this.cacDonViChuTri = res.content;
      this.cacDonViPhoiHop = res.content;
      this.cacDonViPhoiHop.filter(el => el.type === 0).map(el => {
        el.text = el.tenDonViChuTriPhoiHop;
      });
    }, err => {
    });
  }

  patchValueTlDoan(res, edit?) {
    this.patchValueForm(res, edit);
    this.patchValueTableDvDcTTKTS(res);
    this.patchValueTableDsDoan(res);
  }

  patchValueForm(res, edit?) {
    if (this.typeAccount === 'TW' || this.isQuyetDinh) {
      this.getListTinhHuyenTrongKeHoach(this.tldoanForm.value.dotXuat);
    } else {
      this.getAllTinhHuyen();
    }
    this.dsTinh.push({id: res.phamViId, tenTinhHuyen: res.tenTinhHuyen});

    this.tldoanForm.patchValue({
      ngayDieuChinh: this.timeBuilder.fromString(res.ngayDieuChinh).toTimeDatePickerValue(),
      soQDdieuChinh: res.soQuyetDinhDieuChinh,
      lyDoDieuChinh: res.lyDoDieuChinh,
      lanDieuChinh: res.id,
      soQd: res.soQuyetDinh,
      tenQd: res.tenQuyetDinh,
      ngay: this.timeBuilder.fromString(res.ngayQuyetDinh).toTimeDatePickerValue(),
      ngayCongBo: this.timeBuilder.fromString(res.ngayCongBo).toTimeDatePickerValue(),
      coQuan: res.coQuanBanHanh,
      thoiHan: res.thoiHanThucHien,
      donViChuTri: res.donViCTriId,
      donViPhoiHop: this.patchValueDvPhoiHop(res),
      canCu: res.dmCanCuTTKTId,
      nguoiKyQd: res.nguoiKyQuyetDinh,
      quyetDinhThanhLap: (this.fileQdThanhLap[0] || {}).fileName,
      fileQdDieuChinh: (this.fileQdDieuChinh[0] || {}).fileName,
      taiLieuLienQuan: '',
      dotXuat: res.isTrongKeHoach === true ? 'true' : 'false',
      chonNoiDung: res.isNoiDungThanhTra ? 'thanhTra' : 'kiemTra',
      chonDvPhoiHop: res.dvPhoiHops.length > 0 ? 'lienNganh' : 'khongLienNganh',
      ngayBatDau: this.timeBuilder.fromString(res.ngayBatDau).toTimeDatePickerValue(),
      ngayKetThuc: this.timeBuilder.fromString(res.ngayKetThuc).toTimeDatePickerValue(),
      noiDungTTKT: this.tldCommon.patchValuenoiDungTTKTS(res, this.cacNoiDungKT),
      noiDungTTTT: this.tldCommon.patchValuenoiDungTTKTS(res, this.cacNoiDungTT),
      phamVi: res.phamViId,
    }, {emitEvent: false});
    this.tenChucDanh = res.tenChucDanh;
    // if (this.typeAccount === 'TW' || this.isQuyetDinh) {
    //   this.getListTinhHuyenTrongKeHoach(this.tldoanForm.value.dotXuat);
    // } else {
    //   this.getAllTinhHuyen();
    // }
  }

  getListTinhHuyenTrongKeHoach(isTrongKeHoach) {
    const date = new Date();
    this.tlDoanService.getListScopeOfYear(true, isTrongKeHoach === 'true', date.getUTCFullYear(), null).subscribe(res => {
      if (res.length) {
        this.dsTinh = res;
      } else {
        this.dsTinh = [];
      }
    }, err => {
    });
  }

  patchValueDvPhoiHop(res) {
    const listDvi = res.dvPhoiHops;
    const listPhoiHop: any = [];
    for (const item of listDvi) {
      for (const el of this.cacDonViPhoiHop) {
        if (item.dmCTriPHopId === el.id) {
          listPhoiHop.push(el);
        }
      }
    }
    return listPhoiHop;
  }

  patchValueTableDsDoan(res) {
    this.dsThanhVien = res.danhSachDoans;
  }

  patchValueTableDvDcTTKTS(res) {
    this.tableContent.splice(0, this.tableContent.length);
    const tableContent = res.dsDvDcTTKTS;
    const groupContent: any = groupBy(tableContent, (el: any) => (el.dmPhanLoaiDtId));
    this.groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    for (const item of this.groupContent) {
      // Patch value to table content
      const _el: any = {};
      _el.dmPhanLoaiDtId = item[1][0].dmPhanLoaiDtId;
      _el.tenDanhMuc = item[1][0].tenDanhMucPhanLoaiDt;
      _el.thanhLapDoanId = item[1][0].thanhLapDoanId;
      _el.children = [];
      for (const element of item[1]) {
        element.doiTuongTTKT.noiDungTTKTS = element.noiDungKTS;
        if (this.isEdit) {
          element.doiTuongTTKT.elementId = element.id;
        }
        _el.children.push(element.doiTuongTTKT);
      }
      this.tableContent.push(_el);
    }
    this.tableContent = this.tldCommon.getNoiDungTTKTName(this.tableContent);
  }

  changeLanDieuChinh() {
    const selectedId = this.tldoanForm.value.lanDieuChinh;
    if (selectedId < this.tldId) {
      this.isNewestDieuChinh = false;
    } else {
      this.isNewestDieuChinh = true;
    }
    this.getCurrentDieuChinh(selectedId, 'no', 'select');
  }

  dieuChinhQD(status) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chinh-sua', this.tldId]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chinh-sua', this.tldId]);
    }
  }

  // cap nhat gia tri multi select
  refreshValueDVPH(value: any): void {
    this.donViPhoiHop = value;
  }

  refreshValueNDTT(value: any): void {
    this.noiDungTT = value;
  }

  refreshValueNDKT(value: any): void {
    this.noiDungKT = value;
  }

  onDuyet() {
    let id: number;
    this.statusChuaDuyet ? id = this.tldId : id = this.tlDoanId;
    this.modalService.onHidden.subscribe((reason: string) => {
      if (this.modalDuyet.content.isDuyet) {
        this.afterDuyet();
      }
    });
    this.modalDuyet = this.modalService.show(ModalDuyetComponent);
    this.modalDuyet.content.id = id;
  }

  afterDuyet() {
    this.duyet = true;
    this.statusChuaDuyet = false;
    this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
    this.modalDuyet.content.isDuyet = false;
  }

  onGui() {
    this.modalGui = this.modalService.show(ModalGuiComponent);
    this.modalGui.content.guiModalForm.patchValue({
      inputSend: this.tldoanForm.value.phamVi
    });
    this.modalGui.content.dsTinh = this.dsTinh;
    this.modalGui.content.id = this.tlDoanId;
    this.modalGui.content.typeAccount = this.typeAccount;
  }
}
