import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FILE } from '../../../../../../constants/api-file.constants';
import { COMMON_ERROR_MESS, QUAN_LY_DOAN } from '../../../../../../constants/message.constants';
import { STATUS_HD_TAI_DVI } from '../../../../../../constants/status.constants';
import { TITLE_MODAL } from '../../../../../../constants/tien-hanh-ttkt.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { groupBy, uniqBy as LD_uniqBy } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TienHanhTtktService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { TldCommonService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { DmCanCuService } from '../../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { ModalLuuComponent } from '../../tl-doan-ttkt-form/modal-list/modal-luu/modal-luu.component';
import { DmHanhviService } from '../../../../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
import { ModalVphcFormComponent } from '../../modal-vphc-form/modal-vphc-form.component';
import { ModalQdxpVphcFormComponent } from '../../modal-qdxp-vphc-form/modal-qdxp-vphc-form.component';
import { AuthService } from '../../../../../../auth/auth.service';
import { NAME_LOAIHINH_TTKT } from '../../../../../../constants/thanh-lap-doan.constants';

@Component({
  selector: 'ttkt-chitiet-hd-donvi-form',
  templateUrl: './chitiet-hd-donvi-form.component.html',
  styleUrls: ['./chitiet-hd-donvi-form.component.scss']
})
export class ChitietHdDonviFormComponent implements OnInit {
  modalLuu: BsModalRef;
  @ViewChild('huyHoanModal') huyHoanModal: ModalDirective;
  @ViewChild('modalThemDonVi') modalThemDonVi: ModalDirective;
  @ViewChild('modalNoiDungTTKT') modalNoiDungTTKT: ModalDirective;
  @ViewChild('modalNoiDungKienNghi') modalNoiDungKienNghi: ModalDirective;
  @ViewChild('hoan') hoan: ModalDirective;
  // @ViewChild('modalVPHC') public modalVPHC: ModalDirective;
  @ViewChild(ModalVphcFormComponent) modalVPHC: ModalVphcFormComponent;
  @ViewChild(ModalQdxpVphcFormComponent) modalQDXP: ModalQdxpVphcFormComponent;
  @ViewChild('modalChiTietTTKTHistories') public modalChiTietTTKTHistories: ModalDirective;
  @ViewChild('modalKetThucTienHanh') public modalKetThucTienHanh: ModalDirective;

  @Input() tldId: number;
  @Input() dvttktId: number;
  @Input() typeAccount: string;
  isTW = false;
  validateLH = false;
  formThongTin: FormGroup;
  // errsoCongVan: boolean = false;
  // errcoQuanTC: boolean = false;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  hoanForm: FormGroup;
  messagedanger: any;
  tenCanBo: any = [];
  firstValue: any = [];
  firstValue2: any = [];
  typeModal = '';
  strTT: string;
  strKT: string;
  isTT: boolean;
  isTTKT: boolean;
  // noiDungThanhTra: any[] = [];
  // luuBienBan: boolean = false;
  // isThemMoi: boolean = true;
  isHaveBaoCao: boolean;
  chiTiet: any;
  currentDvi: any;
  listCanBo: any;
  // isEdit: boolean;

  showModalVPHC: Boolean;
  showModalQDXP: Boolean;

  tableTTKTS: any = [
    {
      id: 1,
      loaiHinh: 'thanh tra',
    },
    {
      id: 2,
      loaiHinh: 'kiểm tra',
    }
  ];
  isSearching = false;
  chitietHdDonviForm: FormGroup;
  noiDungForm: FormGroup;

  // Pagination
  currentPage = 0;
  pageSize = 10;
  pager: any = {};

  // Table noi dung TTKT
  indexTable: number;
  isCurrentNoiDung = false;
  formThemDonVi: FormGroup;

  bienBan_VPHC_QDXP: any = [];
  bienBanVPHC: any = [];
  bienBanQDXP: any = [];
  numberBBVPHC: number = 0;
  numberBBQDXP: number = 0;
  listNdSelect: any = [];
  get listDonVi(): FormArray {
    return this.formThemDonVi.get('listDonVi') as FormArray;
  }

  listDviDoiTuong: any = [];
  listDcChon: any = [];
  currentIndex: number;
  currentIndex1: number;
  currentIndex2: number;
  title: string = '';
  closeBtn: string = 'Đóng';
  iconButtonSave: string = 'fa fa-floppy-o';
  colorButtonSave: string = 'btn btn-primary';

  public VPHC: any = {
    id: 'BIEN_BAN',
    title: 'Lập biên bản VPHC',
    subTitle: 'Biên bản ',
    name: 'Tên biên bản',
  };
  // listBienBanVPHC: any = [];
  // listQDBienBanVPHC: any = [];
  // currentModalVPHC: any;
  // invalidFormArray: boolean = false;
  //
  // bienBanVPHCIndex: number;

  // Modal Kiến nghị
  noiDungKienNghi: any = [
    {
      id: 1,
      value: true,
      name: 'Kiến nghị từ đơn vị'
    },
    {
      id: 2,
      value: false,
      name: 'Kiến nghị từ đoàn thanh tra'
    }
  ];
  kienNghiForm: FormGroup;
  listNoiDungKienNghi: any = [];
  kienNghiModalType: any;
  kienNghiIndex: number;

  biHoan = false;
  isLuu = false;
  tienHanhTTKTId: number;
  isNoiDungThanhTra: Boolean = false;

  // file
  @ViewChild('fileInputHoan') fileInputHoan: ElementRef;
  @ViewChild('fileInput') fileInputRef: ElementRef;
  @ViewChild('fileBbVPHC') fileInputVPHC: ElementRef;
  @ViewChild('fileChinhSua') fileInputChinhSua: ElementRef;
  linkFile: any;
  tenFileBBLamViec: any;
  tenFileHoanTTKT: any;

  // Check xem đơn vị có phải cơ sở khám chữa bệnh ko
  isCsKhamChuaBenh = false;

  // Bảng nội dung TTKT
  tableContent1: any = [];
  tableContent2: any = [];
  // listLoaiHinhDonVi1: any = [];
  // listLoaiHinhDonVi2: any = [];
  // listLoaiHinhDonVi3: any = [];

  // Modal thongBaoKetThuc
  @ViewChild('modalThongBaoKetThuc') modalThongBaoKetThuc: ModalDirective;
  thongBaoKetThucForm: FormGroup;
  thongBaoKetThucFormSubmited = false;
  // get chi tiet tiến hành
  chiTietTienHanh: any;
  showNoiDungTTKTS = false;
  // listSelect: Array<Object> = [];
  // isActiveBtn: boolean;
  // Thanh tra kiểm tra histories
  chiTietHistoriesForm: FormGroup;
  soLanDieuChinhList: any = [];
  chiTietHistoriesList: any = [];
  isLichSuCoSoKhamChuaBenh: boolean;

  // Modal nội dung TTKT
  isHaveHistories: boolean = false;

  isShowNdKiemTra: boolean = false;
  isShowNdTT: boolean = false;
  isShowCskcb: boolean = false;

  // Allow action edit, save ...
  allowEdit: boolean = false;

  isDaKetThuc: boolean = false;

  errorMsg: any = COMMON_ERROR_MESS;

  // Tình trạng của tiến hành
  listHoatDongStatus: any = [
    {
      status: STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DA_KET_THUC,
      name: 'Đã kết thúc'
    },
    {
      status: STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DANG_TIEN_HANH,
      name: 'Đang tiến hành'
    },
    {
      status: STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_HOAN_TTKT,
      name: 'Hoãn'
    }
  ];
  sumTableContent1: any = {};
  sumTableContent2: any = {};
  sumTableKiemTra: any = {};
  sumTableCSKCB: any = {};
  hoanId: any;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private timeBuilder: TimeBuilderService,
    private tienHanhService: TienHanhTtktService,
    private tldService: ThanhLapDoanService,
    private tldCommon: TldCommonService,
    private pagination: PaginationService,
    private danhMucService: DmCanCuService,
    private alertService: AlertService,
    private fileResource: FileResourceService,
    private location: Location,
    private modalService: BsModalService,
    public formService: FormService,
    public dmHanhviService: DmHanhviService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.creatFormThongTin();
    this.creatChiTietDviForm();
    this.creatFormThemDonVi();
    this.creatEditNDForm();
    this.creatFormKienNghi();
    this.getDvDcTtkt(this.dvttktId);
    this.creatHoanForm();
    this.creatHistoriesForm();
    this.creatThongBaoKetThucForm();
    this.isTW = this.typeAccount === 'TW';
  }

  creatFormThongTin() {
    this.formThongTin = this.fb.group({
      ngay_InForm: [''],
      soCongVan_InForm: [''],
      coQuanTC_InForm: [''],
      thucHienQdSo_InForm: [''],
      ngayBanHanhQd_InForm: [''],
      nguoiRaQd_InForm: [''],
      tenCuocTT_InForm: [''],
      ngayTienHanhTT_InForm: [],
      ngayKetLuanTT_InForm: [''],
      truongDoanTT_InForm: ['']
    });
  }

  creatChiTietDviForm() {
    this.chitietHdDonviForm = this.fb.group({
      tenQD: [''],
      loaihinhTtkt: [''],
      tinh: [''],
      noidungThanhtra: [''],
      tenDonvi: [''],
      noidungKiemtra: [''],
      loaihinhDonvi: ['', Validators.required],
      tinhtrang: [''],
      tuNgay: ['', Validators.required],
      denNgay: ['', Validators.required],
      ngayLapBienBan: [(new Date()), Validators.required],
      fileBienBan: ['', Validators.required],
      haveFileBBLamViec: [false],
      nguoiLapBBLv: ['', Validators.required],
      nguoiDaiDienCoQuan: ['', Validators.required],
      listCanBo: ['', Validators.required]
    });
  }

  creatFormThemDonVi() {
    this.formThemDonVi = this.fb.group({
      listDonVi: this.fb.array([]),
      loaiHinh: ['']
    });
  }

  creatEditNDForm() {
    this.noiDungForm = this.fb.group({
      noiDungTTKT: [''],
      soLuotNguoiViPham: ['', Validators.required],
      soTienViPham: [''],
      soSoViPham: [''],
      soLuotNguoiChapHanh: [''],
      soTienChapHanh: [''],
      soSoChapHanh: [''],
      soLuotNguoiChenhLech: [''],
      soTienChenhLech: [''],
      soSoChenhLech: [''],
      cskcbXuatToan: [''],
      cskcbChuaChapNhanTT: [''],
      cskcbTcBsVuotTranVq: [''],
      cskcbGiaoVaXoat: [''],
      cskcbKhac: [''],
      cskcbChapNhanCuaDv: [''],
      lyDo: [''],
      file: [''],
      fileObj: [''],
      fileName: ['']
    });
  }

  creatFormKienNghi() {
    this.kienNghiForm = this.fb.group({
      noiDungKienNghi: ['', Validators.required],
      isKienNghiTuDonVi: ['', Validators.required],
      ghiChu: ''
    });
  }

  creatHoanForm() {
    this.hoanForm = this.fb.group({
      fileDinhKem: [''],
      lyDoHoanTTKT: ['', [Validators.required, this.formService.nospaceValidator]],
      ngayKy: ['', Validators.required],
      nguoiKy: ['', [Validators.required, this.formService.nospaceValidator, Validators.maxLength(50)]],
      soBienBan: ['', [Validators.required, this.formService.nospaceValidator, Validators.maxLength(50)]],
      // tienHanhTTKTId: ['', Validators.required]
    });
  }

  creatHistoriesForm() {
    this.chiTietHistoriesForm = this.fb.group({
      noiDungViPham: [''],
      soLanChinhSua: [''],
      soLuotNguoiViPham: [''],
      soTienViPham: [''],
      soSoViPham: [''],
      soLuotNguoiChapHanh: [''],
      soTienChapHanh: [''],
      soSoChapHanh: [''],
      soLuotNguoiChenhLech: [''],
      soTienChenhLech: [''],
      soSoChenhLech: [''],
      cskcbXuatToan: [''],
      cskcbChuaChapNhanTT: [''],
      cskcbTcBsVuotTranVq: [''],
      cskcbGiaoVaXoat: [''],
      cskcbKhac: [''],
      cskcbChapNhanCuaDv: [''],
      lyDo: [''],
      file: [''],
      fileName: ['']
    });
  }

  creatThongBaoKetThucForm() {
    this.thongBaoKetThucForm = this.fb.group({
      soCongVan: ['', Validators.required],
      ngayLapThongBao: [''],
      doiTuongTTKT: ['', Validators.required],
      quyetDinhSo: [''],
      ngayBanHanhQD: [''],
      nguoiQuyetDinhTTKT: [''],
      tenTTKT: [''],
      ngayTienHanhTTKT: [''],
      ngayCongBoTTKT: [''],
      truongDoanTTKT: ['']
    });
  }

  huyHoan() {
    this.tienHanhService.huyHoanTTKT(this.hoanId).subscribe(res => {
      this.biHoan = false;
      this.alertService.success('Hủy hoãn thành công');
      this.getDvDcTtkt(this.dvttktId);
      this.tableTTKTS = [
        {
          id: 1,
          loaiHinh: 'thanh tra',
        },
        {
          id: 2,
          loaiHinh: 'kiểm tra',
        }
      ];
    }, err => {
      this.alertService.error(COMMON_ERROR_MESS.LOI_CHUNG);
    });
    this.huyHoanModal.hide();
  }

  getChiTietThanhLapDoan(id) {
    this.tldService.getThanhLapDoanById(id).subscribe(res => {
      this.chiTiet = res;
      if (res.bbBcKetLuans.length > 0) {
        this.isHaveBaoCao = (!res.bbBcKetLuans[0].isBienBanKetLuan);
      }
      this.isNoiDungThanhTra = res.isNoiDungThanhTra;
      this.patchValueChiTietHoatDong(res);
      if (res.isNoiDungThanhTra && this.isTTKT) {
        this.isNoiDungThanhTra = true;
      } else if (res.isNoiDungThanhTra && this.isTT) {
        this.isNoiDungThanhTra = true;
        this.tableTTKTS = this.tableTTKTS.splice(0, 1);
      } else if (res.isNoiDungThanhTra && !this.isTT) {
        this.isNoiDungThanhTra = false;
        this.tableTTKTS = this.tableTTKTS.splice(1, 1);
      } else {
        this.isNoiDungThanhTra = false;
        this.tableTTKTS = this.tableTTKTS.splice(1, 1);
      }
      this.checkShowTableNoiDung(res);
      this.getDsCanBoTTKT(res.danhSachDoans);
    }, err => { });
  }


  checkShowTableNoiDung(res) {
    if (res.loaiHinhTTKT == NAME_LOAIHINH_TTKT.THANH_TRA || res.loaiHinhTTKT == NAME_LOAIHINH_TTKT.THANH_TRA_LIEN_NGANH) { //Thanh tra
      for (const item of res.dsDvDcTTKTS) {
        if (Number(this.dvttktId) === Number(item.id)) {
          item.noiDungKTS.forEach(el => {
            if (el.loaiHinh == NAME_LOAIHINH_TTKT.THANH_TRA) {
              this.isShowNdTT = true;
            }
            if (el.loaiHinh == NAME_LOAIHINH_TTKT.KIEM_TRA) {
              this.isShowNdKiemTra = true;
            }
          })
        }
      }
      // res.noiDungTTKTS.forEach(el => {
      //   if (el.loaiHinh == NAME_LOAIHINH_TTKT.THANH_TRA) {
      //     this.isShowNdTT = true;
      //   }
      //   if (el.loaiHinh == NAME_LOAIHINH_TTKT.KIEM_TRA) {
      //     this.isShowNdKiemTra = true;
      //   }
      // })
    }
    if (res.loaiHinhTTKT == NAME_LOAIHINH_TTKT.KIEM_TRA || res.loaiHinhTTKT == NAME_LOAIHINH_TTKT.KIEM_TRA_LIEN_NGANH) {
      this.isShowNdKiemTra = true;
      for (const item of res.dsDvDcTTKTS) {
        if (Number(this.dvttktId) === Number(item.id)) {
          if (item.dmPhanLoaiDtId == 2) {
            this.isShowCskcb = true;
          } else {
            this.isShowCskcb = false;
          }
        }
      }
    }
  }

  // Xem lại chi tiết tiến hành tại đơn vị đc TTKT
  getDvDcTtkt(id) {
    this.tienHanhService.getByDvTtktId(id).subscribe(res => {
      console.log(res);
      this.chiTietTienHanh = res;
      if (Number(res.status) === Number(STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DA_KET_THUC)) {
        this.isDaKetThuc = true;
      }
      (res.bbQdVPHCS || []).forEach(el => {
        if (el.fileDinhKem) {
          el.fileDinhKem = this.fileResource.getFileObj(el.fileDinhKem);
        }
      });
      if (res.chiTietTTKTS || res.bbQdVPHCS || res.ndKienNghis) {
        this.showNoiDungTTKTS = true;
      }
      if (res.bienBanLv) {
        this.patchValueChiTietTienHanh(res);
        this.patChValueChiTietTTKTS(res.chiTietTTKTS);
        this.bienBan_VPHC_QDXP = res.bbQdVPHCS;
        this.bienBanVPHC = res.bbQdVPHCS.filter(el => el.isBienBanVPHC) || [];
        this.bienBanQDXP = res.bbQdVPHCS.filter(el => !el.isBienBanVPHC) || [];
        this.numberBBVPHC = this.bienBanVPHC.length;
        this.numberBBQDXP = this.bienBanQDXP.length;
        this.listNoiDungKienNghi = res.ndKienNghis;
      }
      if (res.id) {
        this.isLuu = true;
      }
      this.getChiTietThanhLapDoan(this.tldId);
    }, err => { });
  }

  // Patch Value chi tiết của thành lập đoàn
  patchValueChiTietHoatDong(res) {
    this.getChiTietDvi(res, this.dvttktId);
    if (this.currentDvi.moreInfo !== null && this.currentDvi.moreInfo.status !== STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_HOAN_TTKT) {
      this.biHoan = false;
    } else {
      this.biHoan = true;
      this.hoanId = this.currentDvi.moreInfo.bbHoanDTO.id;
    }
    this.chitietHdDonviForm.patchValue({
      tenQD: res.tenQuyetDinh, // Ask later
      loaihinhTtkt: this.tldCommon.getLoaiHinhName(res.loaiHinhTTKT), // Ask later
      tinh: res.tenTinhHuyen,
      tenDonvi: this.currentDvi.doiTuongTTKT.tenDoiTuong,
      noidungThanhtra: this.tldCommon.getNoiDungTTKT(this.currentDvi, true),
      noidungKiemtra: this.tldCommon.getNoiDungTTKT(this.currentDvi, false),
      tuNgay: this.currentDvi.moreInfo.ngayBatDauTienHanh ? this.timeBuilder.fromString(this.currentDvi.moreInfo.ngayBatDauTienHanh).toTimeDatePickerValue() : this.timeBuilder.fromString(this.date).toTimeDatePickerValue(),
      denNgay: this.currentDvi.moreInfo.ngayKetThucTienHanh ? this.timeBuilder.fromString(this.currentDvi.moreInfo.ngayKetThucTienHanh).toTimeDatePickerValue() : this.timeBuilder.fromString(res.ngayKetThuc).toTimeDatePickerValue(),
      loaihinhDonvi: this.currentDvi.tenDanhMucPhanLoaiDt,
      tinhtrang: this.getStatusName((this.chiTietTienHanh || {}).status) || 'Chưa tiến hành'
    });
    this.strTT = this.chitietHdDonviForm.value.noidungThanhtra;
    this.strKT = this.chitietHdDonviForm.value.noidungKiemtra;
    if (this.strTT != '' && this.strKT != '') {
      this.isTTKT = true;
    } else if (this.strTT != '') {
      this.isTT = true;
    } else if (this.strKT != '') {
      this.isTT = false;
    }

  }
  getStatusName(status) {
    for (const item of this.listHoatDongStatus) {
      if (Number(item.status) === Number(status)) {
        return item.name;
      }
    }
  }
  // kiểm tra loại hình ttkt
  checkLoaiHinhTTKT() {
    if (this.chitietHdDonviForm.value.loaihinhTtkt === 'Thanh tra liên ngành' || this.chitietHdDonviForm.value.loaihinhTtkt === 'Thanh tra') {
      return true;
    } else {
      return false;
    }
  }
  // Patch Value chi tiết của tiến hành form
  patchValueChiTietTienHanh(res) {
    this.linkFile = this.fileResource.getFileObj(res.bienBanLv.fileBienBanLamViec);
    this.chitietHdDonviForm.patchValue({
      tuNgay: this.timeBuilder.fromString(res.ngayBatDau).toTimeDatePickerValue(),
      denNgay: this.timeBuilder.fromString(res.ngayKetThuc).toTimeDatePickerValue(),
      listCanBo: this.getListCanBo(res.canBoTTKTS),
      ngayLapBienBan: res.bienBanLv.ngayKy,
      fileBienBan: (this.fileResource.getFileObj(res.bienBanLv.fileBienBanLamViec) || {}).fileName || ((this.fileResource.getFileObj(res.bienBanLv.fileBienBanLamViec) || [])[0] || {}).fileName,
      haveFileBBLamViec: res.bienBanLv.fileBienBanLamViec ? true : false,
      nguoiLapBBLv: this.getNguoiLapBienBan(res),
      nguoiDaiDienCoQuan: res.bienBanLv.daiDienCqDv,
    });
  }

  // Get tên người lập biên bản
  getNguoiLapBienBan(res) {
    const nguoiLapBB: any = [];
    for (const item of this.getListCanBo(res.canBoTTKTS)) {
      if (res.bienBanLv.nguoiKy === item.text) {
        nguoiLapBB.push(item);
        return nguoiLapBB;
      }
    }
  }

  // Patch value cho các table chi tiết thanh tra kiểm tra
  patChValueChiTietTTKTS(res) {
    const chiTietList: any = [];
    let groupContent: any = groupBy(res, (el: any) => (el.ndTtktAtDonViId));
    groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    for (const item of groupContent) {
      const _el: any = {};
      _el.ndTtktAtDonViId = item[1][0].ndTtktAtDonViId;
      _el.tienHanhTTKTId = item[1][0].tienHanhTTKTId;
      // _el.dmChiTietNDId = item[1][0].dmChiTietNDId;
      _el.isChiTietThanhTra = item[1][0].isChiTietThanhTra;
      _el.isNdKtOfCsKCB = item[1][0].isNdKtOfCsKCB;
      _el.tenNoiDungTTKT = (item[1][0].dmChiTietND || {}).tenNoiDung;
      _el.children = [];
      for (const element of item[1]) {
        let newChiTietTTKTS: any = {};
        element.chiTietHistories.forEach(el => {
          if (el.isNew) {
            newChiTietTTKTS = el;
          }
        });
        newChiTietTTKTS.tenChiTietNoiDung = element.tenChiTietNoiDung;
        newChiTietTTKTS.dmChiTietNDId = element.dmChiTietNDId;
        _el.children.push(newChiTietTTKTS);
        for (const el of _el.children) {
          el.chiTietHistories = this.getHistoriesForChildren(el, item[1]);
          el.ndTtktAtDonViId = item[1][0].ndTtktAtDonViId;
        }
      }
      _el.id = item[0];
      chiTietList.push(_el);
    }
    this.tableContent1 = chiTietList.filter(el => el.isChiTietThanhTra);
    this.tableContent2 = chiTietList.filter(el => !el.isChiTietThanhTra);

    this.sumTableContent1 = this.getTongSoLieuChiTietTTKS(this.tableContent1);
    this.sumTableContent2 = this.getTongSoLieuChiTietTTKS(this.tableContent2);
  }

  get tableKiemTra() {
    const tableKiemTra = this.tableContent2.filter(res => !res.isNdKtOfCsKCB);//
    this.sumTableKiemTra = this.getTongSoLieuChiTietTTKS(tableKiemTra);
    return tableKiemTra;
  }

  get tableCoSoKcb() {
    const tableCSKCB = this.tableContent2.filter(res => res.isNdKtOfCsKCB);//
    this.sumTableCSKCB = this.getTongSoLieuChiTietTTKS(tableCSKCB);
    return tableCSKCB;
  }

  getHistoriesForChildren(element, arrayItem) {
    for (const item of arrayItem) {
      if (element.chiTietTTKTId === item.id) {
        element.chiTietHistories = item.chiTietHistories;
        return element;
      }
    }
  }

  // Tính tổng các chỉ số bảng chi tiết TTKTS
  getTongSoLieuChiTietTTKS(tableContent) {
    const sumSoLieu: any = {
      cskcbChapNhanCuaDv: 0,
      cskcbChuaChapNhanTT: 0,
      cskcbGiaoVaXoat: 0,
      cskcbKhac: 0,
      cskcbTcBsVuotTranVq: 0,
      cskcbXuatToan: 0,
      soLuotNguoiChapHanh: 0,
      soLuotNguoiChenhLech: 0,
      soLuotNguoiViPham: 0,
      soTienChapHanh: 0,
      soTienChenhLech: 0,
      soTienViPham: 0,
      soSoViPham: 0,
      soSoChapHanh: 0,
      soSoChenhLech: 0
    };
    for (const item of tableContent) {
      for (const element of item.children) {
        if (element.cskcbChapNhanCuaDv) { sumSoLieu.cskcbChapNhanCuaDv = sumSoLieu.cskcbChapNhanCuaDv + Number(element.cskcbChapNhanCuaDv); }
        if (element.cskcbChuaChapNhanTT) { sumSoLieu.cskcbChuaChapNhanTT = sumSoLieu.cskcbChuaChapNhanTT + Number(element.cskcbChuaChapNhanTT); }
        if (element.cskcbGiaoVaXoat) { sumSoLieu.cskcbGiaoVaXoat = sumSoLieu.cskcbGiaoVaXoat + Number(element.cskcbGiaoVaXoat); }
        if (element.cskcbKhac) { sumSoLieu.cskcbKhac = sumSoLieu.cskcbKhac + Number(element.cskcbKhac); }
        if (element.cskcbTcBsVuotTranVq) { sumSoLieu.cskcbTcBsVuotTranVq = sumSoLieu.cskcbTcBsVuotTranVq + Number(element.cskcbTcBsVuotTranVq); }
        if (element.cskcbXuatToan) { sumSoLieu.cskcbXuatToan = sumSoLieu.cskcbXuatToan + Number(element.cskcbXuatToan); }
        if (element.soLuotNguoiChapHanh) { sumSoLieu.soLuotNguoiChapHanh = sumSoLieu.soLuotNguoiChapHanh + Number(element.soLuotNguoiChapHanh); }
        if (element.soLuotNguoiChenhLech) { sumSoLieu.soLuotNguoiChenhLech = sumSoLieu.soLuotNguoiChenhLech + Number(element.soLuotNguoiChenhLech); }
        if (element.soLuotNguoiViPham) { sumSoLieu.soLuotNguoiViPham = sumSoLieu.soLuotNguoiViPham + Number(element.soLuotNguoiViPham); }
        if (element.soTienChapHanh) { sumSoLieu.soTienChapHanh = sumSoLieu.soTienChapHanh + Number(element.soTienChapHanh); }
        if (element.soTienChenhLech) { sumSoLieu.soTienChenhLech = sumSoLieu.soTienChenhLech + Number(element.soTienChenhLech); }
        if (element.soTienViPham) { sumSoLieu.soTienViPham = sumSoLieu.soTienViPham + Number(element.soTienViPham); }
        if (element.soSoChapHanh) { sumSoLieu.soSoChapHanh = sumSoLieu.soSoChapHanh + Number(element.soSoChapHanh); }
        if (element.soSoChenhLech) { sumSoLieu.soSoChenhLech = sumSoLieu.soSoChenhLech + Number(element.soSoChenhLech); }
        if (element.soSoViPham) { sumSoLieu.soSoViPham = sumSoLieu.soSoViPham + Number(element.soSoViPham); }
      }
    }
    return sumSoLieu;
  }

  // Check xem đơn vị có phải cơ sở khám chữa bệnh không. Nếu phải thì thay đổi nội dung table nội dung kiểm tra
  getChiTietDvi(res, id) {
    for (const item of res.dsDvDcTTKTS) {
      if (Number(id) === Number(item.id)) {
        this.currentDvi = item;
        if (item.tenDanhMucPhanLoaiDt.toLowerCase().indexOf('khám chữa bệnh') > -1) {
          this.isCsKhamChuaBenh = true;
          this.tableTTKTS.forEach(el => {
            if (el.loaiHinh.toLowerCase().indexOf('kiểm tra') > -1) {
              el.loaiHinh = 'kiểm tra chi phí khám chữa bệnh';
            }
          });
        }
      }
    }
  }

  // Get list cán bộ để patch value cho ng-select
  getListCanBo(res) {
    const listCanBo: any = [];
    for (const item of res) {
      item.danhSachDoan.text = item.danhSachDoan.hoVaTen;
      listCanBo.push(item.danhSachDoan);
    }
    return listCanBo;
  }

  // Get list cán bộ cho danh sách đoàn
  getDsCanBoTTKT(res) {
    this.listCanBo = res;
    res.map(el => {
      el.text = el.hoVaTen;
    });
  }

  // Method cho Modal thêm mới nội dung TTKT
  tableIndex: number;
  listNoiDung; // list ban đầu lấy từ server về
  addNoiDung(number) {
    this.formThemDonVi.reset();
    while (this.listDonVi.length) {
      this.listDonVi.removeAt(0);
    }
    this.listDviDoiTuong = [];
    this.listDcChon = [];
    // this.listNdSelect = this['listLoaiHinhDonVi' + this.tableIndex].filter(res => res.id != this['listLoaiHinhDonVi' + this.tableIndex].id);
    this.modalThemDonVi.show();

    // this.getListLoaiHinhNoiDung();
    if (number === 1) {
      this.listNoiDung = this.currentDvi.noiDungKTS.filter(el => el.loaiHinh === 1);
      this.listNdSelect = this.listNoiDung;
      this.tableIndex = number;
    } else {
      this.tableIndex = 2;
    }
    if (number == 2) {
      this.listNoiDung = this.currentDvi.noiDungKTS.filter(el => el.loaiHinh === 2 && !el.isCskcb);
      this.listNdSelect = this.listNoiDung;
      this.isCsKhamChuaBenh = false;
    }
    if (number == 3) {
      this.listNoiDung = this.currentDvi.noiDungKTS.filter(el => el.loaiHinh === 2 && el.isCskcb);
      this.listNdSelect = this.listNoiDung;
      this.isCsKhamChuaBenh = true;
    }


    if (number === 1) {
      this.listNdSelect = this.listNoiDung.filter(item => {
        const foundedItem = this.tableContent1.find(item1 => item1.tenNoiDungTTKT === item.tenNoiDungTTKT);
        return foundedItem === undefined;
      });
    } else {
      this.listNdSelect = this.listNoiDung.filter(item => {
        const foundedItem = this.tableContent2.find(item1 => item1.tenNoiDungTTKT === item.tenNoiDungTTKT);
        return foundedItem === undefined;
      });

    }
  }


  // Get list các nội dung theo loại hình nội dung id
  getDsNoiDungByLoaiHinhId(event?) {
    const arrNameLoaiHinh = 'listLoaiHinhDonVi' + this.tableIndex;
    const loaiHinhId = this.formThemDonVi.value.loaiHinh;
    const arrName = 'tableContent' + this.tableIndex;
    let currentNoiDung: any;
    let currentDanhMucId: number;
    for (const item of this[arrName]) { // tableContent1 or tableContent2
      if (item.ndTtktAtDonViId) {
        if (Number(item.ndTtktAtDonViId) === Number(loaiHinhId)) {
          currentNoiDung = item;
        }
      } else {
        if (Number(item.id) === Number(loaiHinhId)) {
          currentNoiDung = item;
        }
      }
    }
    if (event) {
      this.listDcChon = [];
      this.listDviDoiTuong = [];
      this.currentPage = 0;
    }
    // this[arrNameLoaiHinh].forEach((el, i) => {
    //   if (el.id === Number(loaiHinhId)) {
    //     this.indexTable = i;
    //     currentDanhMucId = el.dmNoiDungTTKTId;
    //   }
    // });
    this.listNdSelect.forEach(el => {
      if (el.id == this.formThemDonVi.value.loaiHinh) {
        currentDanhMucId = el.dmNoiDungTTKTId;
      }
    });

    this.danhMucService.getByDmNoiDungTtktId(currentDanhMucId, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
        this.listDviDoiTuong = res.content;
        (this.listDviDoiTuong || []).map(el => {
          el.active = false;
        });
        if (currentNoiDung !== 'undefined' && currentNoiDung) {
          this.isCurrentNoiDung = true;
          this.currentIndex = this.tldCommon.getCurrentNoiDungIndex(currentNoiDung, this[arrName]);
          this.listDviDoiTuong = this.getListDonViConLai(this.listDviDoiTuong, currentNoiDung.children);
        } else {
          this.isCurrentNoiDung = false;
        }
        while (this.listDonVi.length) {
          this.listDonVi.removeAt(0);
        }
        this.listDviDoiTuong.forEach(item => {
          this.listDonVi.push(this.fb.group({
            tenNoiDung: [''],
            tenChiTietNoiDung: [item.tenChiTietNoiDung],
            loaiHinh: [''],
            soLuotNguoiViPham: [0],
            id: [item.id],
            soTienViPham: [0],
            soSoViPham: [0],
            soLuotNguoiChapHanh: [0],
            soTienChapHanh: [0],
            soSoChapHanh: [0],
            searchName: [''],
            cskcbXuatToan: [0],
            cskcbChuaChapNhanTT: [0],
            cskcbTcBsVuotTranVq: [0],
            cskcbGiaoVaXoat: [0],
            cskcbKhac: [0],
            cskcbChapNhanCuaDv: [0],
            isNdKtOfCsKCB: item.isCskcb
          }));
        });
      }, err => { });
  }

  getListDonViConLai(listAll, listHienTai) {
    listHienTai.forEach(el => {
      const index = listAll.findIndex(it => {
        return it.tenChiTietNoiDung === el.tenChiTietNoiDung;
      });
      listAll.splice(index, 1);
    });
    return listAll;
  }

  searchDvDoiTuong(e?: any) {
    const arrNameLoaiHinh = 'listLoaiHinhDonVi' + this.tableIndex;
    const loaiHinhId = this.formThemDonVi.value.loaiHinh;
    const arrName = 'tableContent' + this.tableIndex;
    let currentNoiDung: any;
    let currentDanhMucId: number;
    for (const item of this[arrName]) { // tableContent1 or tableContent2
      if (item.ndTtktAtDonViId) {
        if (Number(item.ndTtktAtDonViId) === Number(loaiHinhId)) {
          currentNoiDung = item;
        }
      } else {
        if (Number(item.id) === Number(loaiHinhId)) {
          currentNoiDung = item;
        }
      }
    }
    if (e) {
      this.listDcChon = [];
      this.listDviDoiTuong = [];
      this.currentPage = 0;
    }
    this[arrNameLoaiHinh].forEach((el, i) => {
      if (el.id === Number(loaiHinhId)) {
        this.indexTable = i;
        currentDanhMucId = el.dmNoiDungTTKTId;
      }
    });

    if (e) { this.currentPage = 0; }
    this.isSearching = true;
    const body: any = {};
    body.tenNoiDung = this.formThemDonVi.value.searchName;
    body.page = this.currentPage;
    body.size = this.pageSize;
    this.danhMucService.getByTenNoiDungAndDM_NoiDung_TTKT_ID(currentDanhMucId, body.tenNoiDung, body.page, body.size).subscribe(res => {
      this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      this.listDviDoiTuong = res.content;
      (this.listDviDoiTuong || []).map(el => {
        el.active = false;
      });
    }, err => { });
  }

  setPage(number) {
    this.currentPage = number;
    // this.isSearching ? this.searchDvDoiTuong() : this.getDsNoiDungByLoaiHinhId(1);
  }

  chonNoiDung(e: any, number, status) {
    status = !status;
    this.listDviDoiTuong[number].active = status;
    if (this.listDviDoiTuong[number].active) {
      // status = true;
      this.listDcChon.push(this.listDviDoiTuong[number]);
    } else {
      const index = this.listDcChon.findIndex(el => el['id'] === this.listDviDoiTuong[number].id);
      this.listDcChon.splice(index, 1);
    }
    this.listDcChon = LD_uniqBy(this.listDcChon, 'id');
  }

  tinhToan() {
    const arrName = 'tableContent' + this.tableIndex;
    for (let i = 0; i < this.listDonVi.controls.length; i++) {
      const aaa = <FormGroup>this.listDonVi.controls[i];
      this[arrName][this[arrName].length - 1].children[i].soLuotNguoiChenhLech = Number(aaa.controls.soLuotNguoiViPham.value) - Number(aaa.controls.soLuotNguoiChapHanh.value);
      this[arrName][this[arrName].length - 1].children[i].soTienChenhLech = Number(aaa.controls.soTienViPham.value) - Number(aaa.controls.soTienChapHanh.value);
      this[arrName][this[arrName].length - 1].children[i].soSoChenhLech = Number(aaa.controls.soSoViPham.value) - Number(aaa.controls.soSoChapHanh.value);
    }
  }
  saveNoiDung() {
    const arrNameLoaiHinh = 'listLoaiHinhDonVi' + this.tableIndex;
    const arrName = 'tableContent' + this.tableIndex;
    const sumArrName = 'sumTableContent' + this.tableIndex;
    if (this.formThemDonVi.invalid) {
      this.validateLH = true;
      return;
    } else {
      this.validateLH = false;
    }
    this.modalThemDonVi.hide();
    const selectItem = this.listNdSelect.filter(el => el.id == this.formThemDonVi.value.loaiHinh);
    this[arrName].push({
      isNdKtOfCsKCB: selectItem[0].isCskcb,
      tenNoiDungTTKT: selectItem[0].tenNoiDungTTKT,
      id: selectItem[0].id,
      children: this.formThemDonVi.value.listDonVi
    });

    this[arrName].forEach(item => {
      // item.tenNoiDungTTKT = this[arrNameLoaiHinh][this.indexTable].tenNoiDungTTKT;
      item.children.forEach(item2 => {
        if (item2.soLuotNguoiChapHanh === '') {
          item2.soLuotNguoiChapHanh = 0;
        }
        if (item2.soLuotNguoiViPham === '') {
          item2.soLuotNguoiViPham = 0;
        }
        if (item2.soSoChapHanh === '') {
          item2.soSoChapHanh = 0;
        }
        if (item2.soSoViPham === '') {
          item2.soSoViPham = 0;
        }
        if (item2.soTienChapHanh === '') {
          item2.soTienChapHanh = 0;
        }
        if (item2.soTienViPham === '') {
          item2.soTienViPham = 0;
        }
      });
    });
    this.tinhToan();
    this[sumArrName] = this.getTongSoLieuChiTietTTKS(this[arrName]);
    while (this.listDonVi.length) {
      this.listDonVi.removeAt(0);
    }
    console.log(this.formThemDonVi.value)
  }

  modalNoiDungType: any;
  editNoiDung(type, item, index2, number) {
    const arrName = 'tableContent' + number;
    this.tableIndex = number;
    this.isCsKhamChuaBenh = false;
    let index = this[arrName].findIndex(res => res == item);
    const currentItem = this[arrName][index].children[index2];
    this.modalNoiDungType = type;
    if (type === 'edit') {
      this.noiDungForm.reset();
      this.title = TITLE_MODAL.UPDATE_TTKT;
      if (item.isNdKtOfCsKCB) {
        this.title = TITLE_MODAL.UPDATE_CS_KHAMCHUABENH;
        this.isCsKhamChuaBenh = true;
      }
      this.noiDungForm.get('soLuotNguoiViPham').enable();
      this.noiDungForm.get('soTienViPham').enable();
      this.noiDungForm.get('soSoViPham').enable();
      this.noiDungForm.get('soLuotNguoiChapHanh').enable();
      this.noiDungForm.get('soTienChapHanh').enable();
      this.noiDungForm.get('soSoChapHanh').enable();
      this.noiDungForm.get('cskcbXuatToan').enable();
      this.noiDungForm.get('cskcbChuaChapNhanTT').enable();
      this.noiDungForm.get('cskcbTcBsVuotTranVq').enable();
      this.noiDungForm.get('cskcbGiaoVaXoat').enable();
      this.noiDungForm.get('cskcbKhac').enable();
      this.noiDungForm.get('cskcbChapNhanCuaDv').enable();
    } else {
      this.title = TITLE_MODAL.XOA_NOIDUNG_TTKT;
      if (item.isNdKtOfCsKCB) {
        this.title = TITLE_MODAL.XOA_CS_KHAMCHUABENH;
        this.isCsKhamChuaBenh = true;
      }
      this.noiDungForm.get('soLuotNguoiViPham').disable();
      this.noiDungForm.get('soTienViPham').disable();
      this.noiDungForm.get('soSoViPham').disable();
      this.noiDungForm.get('soLuotNguoiChapHanh').disable();
      this.noiDungForm.get('soTienChapHanh').disable();
      this.noiDungForm.get('soSoChapHanh').disable();
      this.noiDungForm.get('cskcbXuatToan').disable();
      this.noiDungForm.get('cskcbChuaChapNhanTT').disable();
      this.noiDungForm.get('cskcbTcBsVuotTranVq').disable();
      this.noiDungForm.get('cskcbGiaoVaXoat').disable();
      this.noiDungForm.get('cskcbKhac').disable();
      this.noiDungForm.get('cskcbChapNhanCuaDv').disable();
    }
    if ((currentItem.chiTietHistories || {}).length >= 1) {
      this.isHaveHistories = true;
    }
    let fileName = '';
    if (currentItem.file) {
      fileName = currentItem.fileName;
    }
    this.currentIndex1 = index;
    this.currentIndex2 = index2;
    this.modalNoiDungTTKT.show();
    this.noiDungForm.patchValue({
      noiDungTTKT: currentItem.tenChiTietNoiDung,
      soLuotNguoiViPham: currentItem.soLuotNguoiViPham,
      soTienViPham: currentItem.soTienViPham,
      soSoViPham: currentItem.soSoViPham,
      soLuotNguoiChapHanh: currentItem.soLuotNguoiChapHanh,
      soTienChapHanh: currentItem.soTienChapHanh,
      soSoChapHanh: currentItem.soSoChapHanh,
      soLuotNguoiChenhLech: currentItem.soLuotNguoiChenhLech,
      soTienChenhLech: currentItem.soTienChenhLech,
      soSoChenhLech: currentItem.soSoChenhLech,
      cskcbXuatToan: currentItem.cskcbXuatToan,
      cskcbChuaChapNhanTT: currentItem.cskcbChuaChapNhanTT,
      cskcbTcBsVuotTranVq: currentItem.cskcbTcBsVuotTranVq,
      cskcbGiaoVaXoat: currentItem.cskcbGiaoVaXoat,
      cskcbKhac: currentItem.cskcbKhac,
      cskcbChapNhanCuaDv: currentItem.cskcbChapNhanCuaDv,
      lyDo: currentItem.lyDo,
      file: currentItem.file,
      fileName: fileName,
      fileObj: currentItem.fileObj
    });
  }

  saveNoiDungTTKT() {
    const arrName = 'tableContent' + this.tableIndex;
    const sumArrName = 'sumTableContent' + this.tableIndex;
    if (this.modalNoiDungType === 'delete') {
      this[arrName][this.currentIndex1].children.splice(this.currentIndex2, 1);
      if (this[arrName][this.currentIndex1].children.length === 0) {
        this[arrName].splice(this.currentIndex1, 1);
      }
    } else {
      if (this.noiDungForm.valid) {
        const formValue = this.noiDungForm.value;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soLuotNguoiViPham = formValue.soLuotNguoiViPham;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soTienViPham = formValue.soTienViPham;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soSoViPham = formValue.soSoViPham;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soLuotNguoiChapHanh = formValue.soLuotNguoiChapHanh;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soTienChapHanh = formValue.soTienChapHanh;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soSoChapHanh = formValue.soSoChapHanh;
        this[arrName][this.currentIndex1].children[this.currentIndex2].soLuotNguoiChenhLech = Number(formValue.soLuotNguoiViPham) - Number(formValue.soLuotNguoiChapHanh);
        this[arrName][this.currentIndex1].children[this.currentIndex2].soTienChenhLech = Number(formValue.soTienViPham) - Number(formValue.soTienChapHanh);
        this[arrName][this.currentIndex1].children[this.currentIndex2].soSoChenhLech = Number(formValue.soSoViPham) - Number(formValue.soSoChapHanh);
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbXuatToan = formValue.cskcbXuatToan;
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbChuaChapNhanTT = formValue.cskcbChuaChapNhanTT;
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbTcBsVuotTranVq = formValue.cskcbTcBsVuotTranVq;
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbGiaoVaXoat = formValue.cskcbGiaoVaXoat;
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbKhac = formValue.cskcbKhac;
        this[arrName][this.currentIndex1].children[this.currentIndex2].cskcbChapNhanCuaDv = formValue.cskcbChapNhanCuaDv;
        this[arrName][this.currentIndex1].children[this.currentIndex2].lyDo = formValue.lyDo;
        this[arrName][this.currentIndex1].children[this.currentIndex2].file = this.fileResource.getFileString(formValue.fileObj);
        if (formValue.fileObj) {
          this[arrName][this.currentIndex1].children[this.currentIndex2].fileObj = formValue.fileObj;
          this[arrName][this.currentIndex1].children[this.currentIndex2].fileName = formValue.fileName;
        }
        this[arrName][this.currentIndex1].children = [...this[arrName][this.currentIndex1].children]; // detect value change of children
      }
    }
    this[sumArrName] = this.getTongSoLieuChiTietTTKS(this[arrName]);
    this.modalNoiDungTTKT.hide();
  }

  // Modal vi phạm hành chính
  openModalVPHC() {
    this.showModalVPHC = true;
    this.bienBanVPHC.soQuyetDinh = this.chiTiet.soQuyetDinh;
    if (this.modalVPHC !== null && this.modalVPHC !== undefined) {
      this.modalVPHC.openModalVPHX();
    }
  }
  openModalQDXP() {
    this.showModalQDXP = true;
    this.bienBanQDXP.soQuyetDinh = this.chiTiet.soQuyetDinh;
    // this.chiTietTienHanh.status;
    if (this.modalQDXP !== null && this.modalQDXP !== undefined) {
      this.modalQDXP.openModalQDXP();
    }
  }
  // Upload file chỉnh sửa chi tiết TTKT
  uploadFileChinhSua() {
    const fileEl = this.fileInputChinhSua.nativeElement;
    const location = FILE.FILE_OTHER;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, location).subscribe(res => {
        // const fileChinhSua = res[0];
        this.noiDungForm.patchValue({
          fileObj: res[0],
          fileName: res[0].fileName
        });
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  downloadFileChinhSua() {
    const formValue = this.noiDungForm.value;
    const fileUrl = this.fileResource.getFileObj(formValue.file);
    this.fileResource.downloadFile(fileUrl.url).subscribe(blob => {
      this.fileResource.saveFile(blob, fileUrl.fileName);
    }, err => { });
  }


  // Modal kiến nghị
  addNoiDungKienNghi() {
    this.kienNghiForm.reset();
    this.modalNoiDungKienNghi.show();
    this.kienNghiModalType = 'add';
  }

  saveNoiDungKienNghi() {
    this.formService.touchAllInput(this.kienNghiForm);
    if (this.kienNghiForm.invalid) {
      console.log(this.formService.getErrorList(this.kienNghiForm));
      return;
    }
    const formValue = this.kienNghiForm.value;
    if (formValue.isKienNghiTuDonVi === '1') {
      formValue.isKienNghiTuDonVi = true;
    } else {
      formValue.isKienNghiTuDonVi = false;
    }
    if (this.kienNghiModalType === 'add') {
      this.listNoiDungKienNghi.push(formValue);
    } else {
      this.listNoiDungKienNghi[this.kienNghiIndex] = formValue;
      // this.listNoiDungKienNghi[this.kienNghiIndex] = [...this.listNoiDungKienNghi[this.kienNghiIndex]];
    }
    this.modalNoiDungKienNghi.hide();
  }

  editNoiDungKienNghi(index) {
    const formValue = this.listNoiDungKienNghi[index];
    this.kienNghiForm.patchValue({
      noiDungKienNghi: formValue.noiDungKienNghi,
      //isKienNghiTuDonVi: formValue.isKienNghiTuDonVi,
      // soLuong: formValue.soLuong,
      ghiChu: formValue.ghiChu
    });
    if (formValue.isKienNghiTuDonVi === true) {
      this.kienNghiForm.patchValue({ isKienNghiTuDonVi: 1 });
    } else {
      this.kienNghiForm.patchValue({ isKienNghiTuDonVi: 2 });
    }
    this.modalNoiDungKienNghi.show();
    this.kienNghiModalType = 'edit';
    this.kienNghiIndex = index;
  }

  deleteNoiDungKienNghi(index) {
    this.listNoiDungKienNghi.splice(index, 1);
  }

  onSubmit() {
    // if (this.chitietHdDonviForm.invalid || this.formThemDonVi.invalid || this.noiDungForm.invalid) {
    if (this.chitietHdDonviForm.invalid || this.formThemDonVi.invalid) {
      this.alertService.error('Bạn phải điền đầy đủ thông tin');
      console.log(this.formService.getErrorList(this.chitietHdDonviForm));
      console.log(this.formService.getErrorList(this.formThemDonVi));
      return;
    }
    this.modalLuu = this.modalService.show(ModalLuuComponent);
    this.modalService.onHidden.subscribe(() => {
      if (this.modalLuu.content.isLuu) {
        this.onSubmitSave();
      }
      this.modalLuu.content.isLuu = false;
    });
  }

  // Tạo mới tiến hành TTKT
  onSubmitSave() {
    const formBody: any = this.chiTietTienHanh;
    const formValue: any = this.chitietHdDonviForm.value;
    formBody.bienBanLv = this.saveBBLamViec(formValue);
    if (!formBody.canBoTTKTS) {
      formBody.canBoTTKTS = this.saveCanBoTTKTS();
    }
    formBody.ngayBatDau = this.timeBuilder.fromTimeDatePicker(formValue.tuNgay).setUTC().toISOString();
    formBody.ngayKetThuc = this.timeBuilder.fromTimeDatePicker(formValue.denNgay).setUTC().toISOString();
    formBody.dsDvDcTTKTId = this.dvttktId;
    formBody.status = STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DANG_TIEN_HANH;
    const chiTietTTSet = this.saveChiTietTTKTS(this.tableContent1);
    const chiTietKTSet = this.saveChiTietTTKTS(this.tableContent2);
    chiTietKTSet.forEach(el => el.isChiTietThanhTra = false);
    formBody.chiTietTTKTS = chiTietTTSet.concat(chiTietKTSet);

    formBody.bbQdVPHCS = this.getBienBanVPHCAndQDXP()
    formBody.ndKienNghis = this.saveNdKienNghis();
    if (!formBody.bienBanLv.ngayKy || !formBody.bienBanLv.daiDienCqDv || !formBody.bienBanLv.nguoiKy) {
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      formBody.status = false;
      return;
    } else if (this.tableContent1.length == '0' && this.isShowNdTT) {
      this.alertService.error('Bạn phải thêm nội dung thanh tra');
      formBody.status = false;
      return;

    } else if (this.tableContent2.length == '0' && this.isShowNdKiemTra) {
      this.alertService.error('Bạn phải thêm nội dung kiểm tra');
      formBody.status = false;
      return;
    } else {
      console.log('formBody', formBody);
      this.tienHanhService.updateTienHanhTTKT(formBody).subscribe(res => {
        this.isLuu = true;
        this.tienHanhTTKTId = res.id;
        this.allowUpdateTable('again');
        this.alertService.success('Tạo tiến hành thanh tra kiểm tra thành công!');
        this.getDvDcTtkt(this.dvttktId);
      }, err => {
        formBody.status = false;
        this.alertService.error('Có lỗi xảy ra');
      });
    }
  }

  saveBBLamViec(form) {
    console.log(form);
    const formValue: any = {};
    formValue.fileBienBanLamViec = this.fileResource.getFileString(this.linkFile);
    formValue.ngayKy = form.ngayLapBienBan;
    formValue.nguoiKy = form.nguoiLapBBLv[0] ? form.nguoiLapBBLv[0].text : '';
    formValue.daiDienCqDv = form.nguoiDaiDienCoQuan;
    // formValue.soBienBanLamViec = form.soBienBan;
    return formValue;
  }

  saveCanBoTTKTS() {
    const formValue: any = [];
    for (const item of this.chiTiet.danhSachDoans) {
      const _el: any = {
        danhSachDoanId: item.id
      };
      formValue.push(_el);
    }
    return formValue;
  }

  saveChiTietTTKTS(tableContent) {
    const arrayChiTietTTKTS: any = [];
    if (tableContent) {
      for (const item of tableContent) {
        for (const element of item.children) {
          const chiTietTTKT: any = {};
          chiTietTTKT.id = element.chiTietTTKTId;
          if (item.isChiTietThanhTra === null || typeof item.isChiTietThanhTra === 'undefined') {
            // chiTietTTKT.isChiTietThanhTra = this.chiTietTienHanh.isNoiDungThanhTra;
            chiTietTTKT.isChiTietThanhTra = this.isNoiDungThanhTra;
          } else {
            chiTietTTKT.isChiTietThanhTra = item.isChiTietThanhTra;
          }
          // if (item.isChiTietThanhTra) {
          //   chiTietTTKT.isChiTietThanhTra = item.isChiTietThanhTra;
          // }
          chiTietTTKT.tenChiTietNoiDung = element.tenChiTietNoiDung;
          chiTietTTKT.tenNoiDungTTKT = item.tenNoiDungTTKT;
          if (item.ndTtktAtDonViId) {
            chiTietTTKT.ndTtktAtDonViId = item.ndTtktAtDonViId;
          } else {
            chiTietTTKT.ndTtktAtDonViId = item.id;
          }
          chiTietTTKT.chiTietHistories = this.getChiTietKTSHistories(element);
          chiTietTTKT.isNdKtOfCsKCB = item.isNdKtOfCsKCB || false;

          // if (!chiTietTTKT.isChiTietThanhTra && this.isCsKhamChuaBenh) {
          //   chiTietTTKT.isNdKtOfCsKCB = true;
          // } else {
          //   chiTietTTKT.isNdKtOfCsKCB = false;
          // }
          // if (item.isNdKtOfCsKCB) {
          //   chiTietTTKT.isNdKtOfCsKCB = item.isNdKtOfCsKCB;
          // }
          if (element.dmChiTietNDId) {
            chiTietTTKT.dmChiTietNDId = element.dmChiTietNDId;
          } else {
            chiTietTTKT.dmChiTietNDId = element.id;
          }
          arrayChiTietTTKTS.push(chiTietTTKT);
        }
      }
    }
    return arrayChiTietTTKTS;
  }

  getChiTietKTSHistories(element) {
    const chiTietHistories: any = [];
    const chiTiet: any = {};
    // let newChiTietHisroties: any = {};
    // if (element.chiTietHistories) {
    //   for (const el of element.chiTietHistories) {
    //     if (el.isNew) {
    //       newChiTietHisroties = el;
    //     }
    //   }
    //   if (newChiTietHisroties.chiTietHistories) {
    //     delete newChiTietHisroties.chiTietHistories;
    //   }
    //   chiTietHistories.push(newChiTietHisroties);
    // }
    chiTiet.cskcbChapNhanCuaDv = element.cskcbChapNhanCuaDv;
    chiTiet.cskcbChuaChapNhanTT = element.cskcbChuaChapNhanTT;
    chiTiet.cskcbGiaoVaXoat = element.cskcbGiaoVaXoat;
    chiTiet.cskcbKhac = element.cskcbKhac;
    chiTiet.cskcbTcBsVuotTranVq = element.cskcbTcBsVuotTranVq;
    chiTiet.cskcbXuatToan = element.cskcbXuatToan;
    chiTiet.soLuotNguoiChapHanh = element.soLuotNguoiChapHanh;
    chiTiet.soTienChapHanh = element.soTienChapHanh;
    chiTiet.soSoChapHanh = element.soSoChapHanh;
    chiTiet.soLuotNguoiChenhLech = element.soLuotNguoiChenhLech;
    chiTiet.soTienChenhLech = element.soTienChenhLech;
    chiTiet.soSoChenhLech = element.soSoChenhLech;
    chiTiet.soLuotNguoiViPham = element.soLuotNguoiViPham;
    chiTiet.soTienViPham = element.soTienViPham;
    chiTiet.soSoViPham = element.soSoViPham;
    chiTiet.lyDo = element.lyDo;
    chiTiet.file = element.file;
    chiTiet.id = element.id;
    chiTietHistories.push(chiTiet);
    return chiTietHistories;
  }

  getBienBanVPHCAndQDXP() {
    const bbQdVPHC: any = [];
    bbQdVPHC.push(...this.addBienBanToList(this.bienBanVPHC));
    bbQdVPHC.push(...this.addBienBanToList(this.bienBanQDXP));
    return bbQdVPHC;
  }

  addBienBanToList(list) {
    for (let _el of list) {
      if ((typeof _el.danhSachDoanVien !== 'string') && (typeof _el.danhSachNguoiChungKien !== 'string') && (typeof _el.danhSachCanhanTochucViPham !== 'string')) {
        _el.danhSachDoanVien = JSON.stringify(_el.danhSachDoanVien);
        _el.danhSachNguoiChungKien = JSON.stringify(_el.danhSachNguoiChungKien);
        _el.danhSachCanhanTochucViPham = JSON.stringify(_el.danhSachCanhanTochucViPham);
      }
    };
    return list;
  }

  saveNdKienNghis() {
    const ndKienNghi: any = [];
    for (const item of this.listNoiDungKienNghi) {
      let _el: any = {};
      _el = item;
      _el.actived = true;
      ndKienNghi.push(_el);
    }
    return ndKienNghi;
  }

  // upload File liên quan biên bản làm việc
  onAttachFile() {
    const fileEl = this.fileInputRef.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_BIEN_BAN).subscribe(res => {
        this.linkFile = res;
        if (res.length !== 0) {
          this.tenFileBBLamViec = res[0].fileName;
        }
        this.chitietHdDonviForm.patchValue({
          haveFileBBLamViec: true,
          fileBienBan: res[0].fileName
        });
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  // download File Biên bản làm việc
  downLoadFileBBLamViec() {
    this.fileResource.downloadFile(this.linkFile[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.linkFile[0].fileName);
    }, err => { });
  }

  downLoadFileVPHC(item) {
    const fileUrl = this.fileResource.getFileObj(item.value.fileDinhKem);
    this.fileResource.downloadFile(fileUrl.url).subscribe(res => {
      this.fileResource.saveFile(res, fileUrl.fileName);
    }, err => { });
  }

  // Hoãn, upload file liên quan
  onAttachFileHoan() {
    const fileEl = this.fileInputHoan.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_BIEN_BAN).subscribe(res => {
        if (res.length !== 0) {
          this.tenFileHoanTTKT = res[0].fileName;
        }
        this.hoanForm.patchValue({
          fileDinhKem: this.fileResource.getFileString(res[0])
        });
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  // Gửi Hoãn lên server
  onSubmitHoan() {
    this.formService.touchAllInput(this.hoanForm);
    if (this.hoanForm.invalid) {
      return;
    }
    const formBody: any = this.hoanForm.value;
    formBody.dsDvDcTTKTId = this.dvttktId;
    formBody.ngayKy = this.timeBuilder.fromTimeDatePicker(formBody.ngayKy).setUTC().toISOString();
    this.tienHanhService.hoanTTKT(formBody).subscribe(res => {
      this.biHoan = true;
      this.alertService.success(QUAN_LY_DOAN.SUCCESS_HOAN_TIEN_HANH);
      this.hoan.hide();
      this.hoanId = res.id;
      this.getDvDcTtkt(this.dvttktId);
    }, err => {
      this.alertService.error(COMMON_ERROR_MESS.LOI_CHUNG);
    });
  }
  onDenyHoan() {
    this.huyHoanModal.show();
  }

  refreshValueDVPH(value: any): void {
    this.firstValue = value;
    this.getListCBLapBBlv(this.firstValue.map(el => {
      return { ...el };
    }));
  }

  getListCBLapBBlv(value) {
    this.tenCanBo = value;
  }

  refreshValueDVPH2(value: any): void {
    this.firstValue2 = value;
  }

  // checkErrFormThongTin() {
  //   if (!this.formThongTin.value.soCongVan_InForm) {
  //     this.errsoCongVan = true;
  //     return false;
  //   }
  //   if (!this.formThongTin.value.coQuanTC_InForm) {
  //     this.errcoQuanTC = true;
  //     return false;
  //   }
  //   return true;
  // }
  //
  // resetMessageErr() {
  //   this.errsoCongVan = false;
  //   this.errcoQuanTC = false;
  // }

  // get formData() {
  //   return <FormArray>this.VPHCForm.get('VPHCTinhMoi');
  // }

  showThongBaoKetThuc() {
    this.thongBaoKetThucForm.reset();
    this.modalThongBaoKetThuc.show();
  }

  saveThongBaoKetThuc() {
    this.thongBaoKetThucForm.updateValueAndValidity();
    if (this.thongBaoKetThucForm.invalid) {
      this.thongBaoKetThucFormSubmited = true;
      return;
    }
  }

  xemChiTietHistory(history, tenNoiDung, isCsKhamChuaBenh) {
    let isNewIndex: number;
    this.isLichSuCoSoKhamChuaBenh = isCsKhamChuaBenh;
    this.soLanDieuChinhList = Array.from(Array(history.length)).map((e, i) => i + 1);
    this.chiTietHistoriesList = history;
    history.forEach((el, index) => {
      if (el.isNew) {
        isNewIndex = index;
      }
    });
    this.chiTietHistoriesForm.patchValue({
      soLanChinhSua: isNewIndex + 1,
      noiDungViPham: tenNoiDung
    });
    this.getLanChinhSua(isNewIndex);
    this.modalChiTietTTKTHistories.show();
  }

  getLanChinhSua(number) {
    const currentLichSu = this.chiTietHistoriesList[number];
    this.chiTietHistoriesForm.patchValue({
      soLuotNguoiViPham: currentLichSu.soLuotNguoiViPham || '',
      soTienViPham: currentLichSu.soTienViPham || '',
      soSoViPham: currentLichSu.soSoViPham || '',
      soLuotNguoiChapHanh: currentLichSu.soLuotNguoiChapHanh || '',
      soTienChapHanh: currentLichSu.soTienChapHanh || '',
      soSoChapHanh: currentLichSu.soSoChapHanh || '',
      soLuotNguoiChenhLech: currentLichSu.soLuotNguoiChenhLech || '',
      soTienChenhLech: currentLichSu.soTienChenhLech || '',
      soSoChenhLech: currentLichSu.soSoChenhLech || '',
      cskcbXuatToan: currentLichSu.cskcbXuatToan || '',
      cskcbChuaChapNhanTT: currentLichSu.cskcbChuaChapNhanTT || '',
      cskcbTcBsVuotTranVq: currentLichSu.cskcbTcBsVuotTranVq || '',
      cskcbGiaoVaXoat: currentLichSu.cskcbGiaoVaXoat || '',
      cskcbKhac: currentLichSu.cskcbKhac || '',
      cskcbChapNhanCuaDv: currentLichSu.cskcbChapNhanCuaDv || '',
      lyDo: currentLichSu.lyDo || '',
      file: (this.fileResource.getFileObj(currentLichSu.file) || {}).fileName || '',
    });
  }

  xemLichSuDieuChinh() {
    const lanDieuChinh = this.chiTietHistoriesForm.controls.soLanChinhSua.value;
    this.chiTietHistoriesForm.patchValue({
      soLuotNguoiViPham: '',
      soTienViPham: '',
      soSoViPham: '',
      soLuotNguoiChapHanh: '',
      soTienChapHanh: '',
      soSoChapHanh: '',
      soLuotNguoiChenhLech: '',
      soTienChenhLech: '',
      soSoChenhLech: '',
      cskcbXuatToan: '',
      cskcbChuaChapNhanTT: '',
      cskcbTcBsVuotTranVq: '',
      cskcbGiaoVaXoat: '',
      cskcbKhac: '',
      cskcbChapNhanCuaDv: '',
      lyDo: '',
      file: '',
    });
    this.getLanChinhSua(lanDieuChinh - 1);
  }

  allowUpdateTable(again) {
    this.allowEdit = true;
    this.isLuu = false;
    if (again) {
      this.allowEdit = false;
      this.getDvDcTtkt(this.dvttktId);
    }
  }

  ketThucTienHanh() {
    this.modalKetThucTienHanh.show();
  }

  onSubmitKetthuc() {
    this.tienHanhService.ketThucTienHanh(this.chiTietTienHanh.id).subscribe(res => {
      this.alertService.success(QUAN_LY_DOAN.SUCCESS_KETTHUC_TIEN_HANH);
      this.isDaKetThuc = true;
      this.getDvDcTtkt(this.dvttktId);
    }, err => {
      this.alertService.error(COMMON_ERROR_MESS.LOI_CHUNG);
    });
    this.modalKetThucTienHanh.hide();
  }

  onBack() {
    this.location.back();
  }
  onListBBVPHC(listBBVPHC) {
    if (listBBVPHC.length > 0) {
      if (this.bienBan_VPHC_QDXP.length == 0) {
        this.bienBan_VPHC_QDXP = listBBVPHC;
      } else {
        this.bienBan_VPHC_QDXP = this.bienBan_VPHC_QDXP.filter(el => el.isBienBanVPHC == false);
        for (const item of listBBVPHC) {
          this.bienBan_VPHC_QDXP.push(item);
        }
      }
    } else {
      //k có data thì gán []
      this.bienBan_VPHC_QDXP = [];
    }
    this.bienBanVPHC = listBBVPHC;
    this.numberBBVPHC = listBBVPHC.length;
  }

  onListQDXP(listBBQDXP) {
    if (listBBQDXP.length > 0) {
      this.bienBan_VPHC_QDXP = this.bienBan_VPHC_QDXP.filter(el => el.isBienBanVPHC == true);
      for (const item of listBBQDXP) {
        this.bienBan_VPHC_QDXP.push(item);
      }
    }
    this.bienBanQDXP = listBBQDXP;
    this.numberBBQDXP = listBBQDXP.length;
  }
}
