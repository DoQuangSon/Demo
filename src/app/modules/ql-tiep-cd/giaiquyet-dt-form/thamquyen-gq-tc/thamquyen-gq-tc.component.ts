import { AUTHORITY, THULY, OPTION_THULY, TAILIEU_CHUNGCU, STATUS_LETTER, STATE_CONTENT, IS_ENOUGH_CONDITION, SIGNATURE, COMPLEX, AUTHORITYOPTION } from './../../../../constants/giaiquyet-dt.constants';
import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { NoiLydokhongthulytcService } from '../../../../services/api/noi-lydokhongthulytc/noi-lydokhongthulytc.service';
import { NoiDmtinhtrangtailieuService } from '../../../../services/api/danh-muc/noi-dmtinhtrangtailieu/noi-dmtinhtrangtailieu.service';
import { StatesService } from '../../../../services/api/state.service';
import { NoiDtTocaoService } from '../../../../services/api/noi-dtTocao/noi-dt-tocao.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { AlertService } from '../../../../services/api/alert.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { NoiDmbhxhService } from '../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { FormService } from '../../../../shared/form-module/form.service';
import { setValue, pickBy } from '../../../../services/api/utils/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { PrintToCaoCanBoComponent } from '../print-to-cao-can-bo/print-to-cao-can-bo.component';

@Component({
  selector: 'ttkt-thamquyen-gq-tc',
  templateUrl: './thamquyen-gq-tc.component.html',
  styleUrls: ['./thamquyen-gq-tc.component.scss']
})
export class ThamquyenGqTcComponent implements OnInit {
  @ViewChild('seasonKoRutdon') koRutdonModal: ModalDirective;
  @ViewChild('lgModal') modal: ModalDirective;
  @ViewChild('modalAddTailieu') addTailieu: ModalDirective;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('modalAddTailieuTocao') modalAddTailieuTocao: ModalDirective;
  // @ViewChild('fileInput') fileInputRef: ElementRef;
  // @ViewChild('fileInputBitc') fileInputBitc: ElementRef;
  @ViewChild('modalAddTailieutlTocao') modalAddTailieutlTocao: ModalDirective;
  @ViewChild('modalAddTailieutlBiTocao') modalAddTailieutlBiTocao: ModalDirective;
  @ViewChild('fileInputTl') fileInputRefTl: ElementRef;
  @ViewChild('modalThongBao') modalThongBao: ModalDirective;
  @ViewChild('modalDeXuat') modalDeXuat: ModalDirective;
  @ViewChild(PrintToCaoCanBoComponent) modalMauDon: PrintToCaoCanBoComponent;
  @Input() formQiaiquyetDt: FormGroup;
  @Input() source?: Subject<any>;
  @Input() preview?: boolean = false;
  @Input() editAble?: boolean = true;
  @Output('onSubmitted') onSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isExisted?: boolean = false;
  ObjectAuthorityForm: any;
  ObjectFromAddTaiLieu: any;
  // delete required khi chon rut don add TAI LIEU TO CAO
  ObFormAuth: any;

  mauThongBaoForm: FormGroup;
  errdvBanHanh: Boolean = false;
  errso: Boolean = false;
  errdiaDiemBanHanh: Boolean = false;
  errngayBanHanh: Boolean = false;
  errnguoiCoThamQuyen: Boolean = false;
  errhoTenDCNguoiTC: Boolean = false;
  errthongTinNguoiBiTC: Boolean = false;
  errtomTatNDTC: Boolean = false;
  errNDTCDuocThuLy: Boolean = false;
  errtenNguoiQL: Boolean = false;

  phieuDeXuatForm: FormGroup;
  errdvXuLy: Boolean = false;
  errngayLapPhieu: Boolean = false;
  errTTCoQuan: Boolean = false;
  errngayNhan: Boolean = false;
  errhoTenNguoiTC: Boolean = false;
  errdiaChiNguoiTC: Boolean = false;
  errtomTatNDDon: Boolean = false;

  public selected: string;
  public nguoiKyThanhLap: string;
  public numTrungCauGD: string;
  public reKetQuaXM: string;
  public soKetluanNdTocao: string;
  public hdDoithoai: string;
  public qdGqKhieunai: string;
  public bcNgThamquyen: string;
  public soTbKqGqTocao: string;
  public congboCkKqGqTocao: string;
  public data: any;
  authority: any;
  authorityForm: FormGroup;
  formModal: FormGroup;
  addTailieuForm: FormGroup;
  addTailieuFormSubmited: boolean = false;

  koRutdonForm: FormGroup;
  addInTailieuTocaoForm: FormGroup;
  addInTailieuTocaoFormSubmited: boolean = false;

  modalAddInTailieuTocaoForm: FormGroup;
  modalAddInTailieuBiTocaoForm: FormGroup;
  modalAddInTailieuBiTocaoFormSubmited: boolean = false;
  depend_authority: any;
  no_depend_authority: any;
  yes_thuly: any;
  no_thuly: any;
  thuly_lapphieu: any;
  thuly_thongbao: any;
  co_tailieu: any;
  ko_tailieu: any;
  tinh: any = {};
  isChoosetc: boolean = false;
  isChoosebitc: boolean = false;
  rutDon: any;
  condition: any;
  ko_rutDon: any;
  title_tailieu: string;
  type: string;
  type_tailieu: string;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    // editableDateField: false,
    alignSelectorRight: true,
    // openSelectorOnInputClick: true
  };
  title_ngayTocao: string;
  type_tailieuTc: string;
  type_title_ngayTc: string;
  modalListAddTailieuTc: any[] = [];
  // modalListAddTailieuBiTc: any [] = [];
  statusOption: string;
  statusOptionBitc: string;
  title_tailieuBiTocao: any;
  type_title_tailieuBiTocao: any;
  // optionStLetter: boolean = false;
  public optionShowAllTinh: string[] = ['An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Hà Nam', 'Quảng Nam'];

  account: any = {};
  provinces: any = [];
  districts: any = [];
  strAccount: any;

  authorityOption_none: any;
  authorityOption_one: any;
  authorityOption_many: any;

  chonRutDon: boolean = false;
  date: Date = new Date();

  listTailieuNTC: any[] = [];
  listTailieuBiTc: any[] = [];
  listTailieuTcCn: any[] = [];
  stateOption: any[] = [];
  optionSeason: any[] = [];
  titleModal = 'Chọn lý do không thụ lý đơn tố cáo';
  optionThuly = ['Lập phiếu đề xuất thụ lý số 04/KNTC', 'Thông báo thụ lý đơn'];
  // noAuthorityOptions: any = [
  //   { id: 1, name: 'Chuyển đơn về cơ quan có thẩm quyền' },
  //   { id: 2, name: 'Chuyển đơn về BHXH' }
  // ];
  thuLy: any;
  thuLyOptions: any = [
    { id: 1, name: 'Lập phiếu đề xuất trình Thủ trưởng đơn vị xem xét' },
    { id: 2, name: 'Thông báo về việc thụ lý giải quyết tố cáo' },
  ];
  otherCases: any = [
    { id: 1, name: 'Đơn tố cáo xuất phát từ việc khiếu nại không đạt được mục đích' },
    { id: 2, name: 'Đơn tố cáo có dấu hiệu tội phạm' },
    { id: 3, name: 'Không rõ họ tên, địa chỉ người tố cáo nhưng có nội dung rõ ràng, kèm theo các thông tin, tài liệu' },
  ];
  tailieus: any[] = [];

  koRutdonOption = [
    {
      id: 1,
      name: 'Xét thấy hành vi vi phạm pháp luật vẫn chưa được phát hiện và xử lý'
    },
    {
      id: 2,
      name: 'Có căn cứ cho rằng việc rút tố cáo do người tố cáo bị đe dọa, ép buộc'
    },
    {
      id: 3,
      name: 'Nhằm che giấu hành vi vi phạm pháp luật, trốn tránh trách nhiệm hoặc vì vụ lợi'
    }
  ];
  contentOld: any;
  contentNew: any;
  enough_condition: any;
  no_enough_condition: any;
  baocaoOption = {
    id: 1,
    name: 'Báo cáo thủ trưởng đơn vị xử lý'
  };
  optionContent = [
    { id: 1, name: 'Tố cáo lại' },
    { id: 2, name: 'Tố cáo tiếp' }
  ];
  saveLetter: Boolean = false;
  signature_one: any;
  signature_many: any;
  signature_none: any;
  // complex_yes: any;
  // complex_no: any;
  private status: number = 1;
  private rootPage: string = 'ql-tiep-cd/gq-kt/danh-sach-don-thu';

  constructor(
    private fb: FormBuilder,
    private builder: FormBuilder,
    private noiLydokhongthulytcService: NoiLydokhongthulytcService,
    private noiDmtinhtrangtailieuService: NoiDmtinhtrangtailieuService,
    private statesService: StatesService,
    private noiAccountService: NoiAccountService,
    private noiDtTocaoService: NoiDtTocaoService,
    private _alert: AlertService,
    private router: Router,
    private timeBuilder: TimeBuilderService,
    private noiDmbhxhService: NoiDmbhxhService,
    private formService: FormService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.date.setHours(0, 0, 0, 0);
    this.mauThongBaoForm = this.builder.group({
      coQuan: [''],
      dvBanHanh: [''],
      so: [''],
      diaDiemBanHanh: [''],
      ngayBanHanh: [''],
      nguoiCoThamQuyen: [''],
      hoTenDCNguoiTC: [''],
      thongTinNguoiBiTC: [''],
      tomTatNDTC: [''],
      tenCQChuyenDon: [''],
      nguoiGiaiQuyetTC: [''],
      giaiQuyetTCQDSo: [''],
      giaiQuyetTCQDNgay: [''],
      NDTCDuocThuLy: [''],
      tenNguoiQL: ['']
    });
    this.phieuDeXuatForm = this.builder.group({
      coQuan: [''],
      dvXuLy: [''],
      diaDiemLapPhieu: [''],
      ngayLapPhieu: [''],
      TTCoQuan: [''],
      ngayNhan: [''],
      hoTenNguoiTC: [''],
      diaChiNguoiTC: [''],
      tomTatNDDon: [''],
      nguoiGiaiQuyet: [''],
      ngayGiaiQuyet: [''],
      nguoiPheDuyet: [''],
      nguoiDeXuat: ['']
    });
    this.account = this.auth.currentUser;
    if (this.auth.accountType === 'tinh') {
      this.strAccount = " Huyện";
      this.noiDmbhxhService.getDmBHXHBymaCha(this.account.maDonVi).subscribe(res => {
        const arr = res;
        if (arr.length > 0) {
          this.districts = arr.map(el => {
            const _el: any = {};
            _el.id = el.id;
            _el.text = el.tenDonVi;
            return _el;
          });
        }
      }
      );
    } else if (this.auth.accountType === 'tw') {
      this.strAccount = " Tỉnh";
    }

    if (this.preview) {
      this.source.subscribe(res1 => {
        // this.getTinhTrangTaiLieu();
        this.noiDmtinhtrangtailieuService.getAllDmTinhtrangtailieu(0, 10)
          .subscribe(res2 => {
            this.stateOption = res2['content'];
            this.noiDmbhxhService.getAllDmBhxh(0, 1000)
              .subscribe(res => {
                const arr = res['content'];
                if (Array.isArray(arr)) {
                  this.provinces = arr.map(el => ({ id: el.id, text: el.tenDonVi }));
                }
                this.fillData(res1);
              });
          });
      });
    } else {
      this.noiDmtinhtrangtailieuService.getAllDmTinhtrangtailieu(0, 10)
        .subscribe(res2 => {
          this.stateOption = res2['content'];
        });
      this.noiDmbhxhService.getAllDmBhxh(0, 1000)
        .subscribe(res => {
          const arr = res['content'];
          if (Array.isArray(arr)) {
            this.provinces = arr.map(el => {
              const _el: any = {};
              _el.id = el.id;
              _el.text = el.tenDonVi;
              return _el;
            });
          }
        });
    }
    this.noiLydokhongthulytcService.getAllLydoKhongthulytc(0, 10)
      .subscribe(res => {
        this.optionSeason = res['content'].map(el => {
          const _el: any = {};
          _el.id = el.id;
          _el.tenLyDo = el.tenLyDo;
          _el.actived = false;
          return _el;
        });
        this.mergeLyDoKoThuLyTCS();
      });

    this.ObjectAuthorityForm = {
      stateContent: [STATE_CONTENT.moi.toString(), Validators.required],
      tailieu: [TAILIEU_CHUNGCU.koTailieu.toString(), Validators.required],
      // complex: [COMPLEX.cophuctap.toString(), Validators.required],
      signature: [SIGNATURE.motnguoi.toString(), Validators.required],
      authority: [AUTHORITY.thuoc_tq.toString(), Validators.required],
      optionContentcm: [''],
      noAuthorityOption: ['', this.checkConditionRequired.bind(this)],
      chuyenDenCqctqName: ['', this.checkConditionRequired.bind(this)],
      condition: ['', Validators.required],
      saveLetter: ['', this.checkConditionRequiredForm.bind(this)],
      thuLy: ['', Validators.required],
      thuLyOption: [''],
      koThuLyOption: ['', Validators.required],
      otherCase: [''],
      authorityOption: [AUTHORITYOPTION.no_giaiquyet.toString(), [Validators.required]],
      thulyLapphieu: [''],
      thulyThongbao: [''],
      baocao: [''],
      soQdXacMinhTC: ['', Validators.required],
      dateThanhLap: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      nguoiKyThanhLap: ['', this.checkConditionRequired.bind(this)],
      numTrungCauGD: [''],
      reKetQuaXM: ['', this.checkConditionRequired.bind(this)],
      dateBBXacMinh: [''],
      // dateNguoitc: ['', Validators.required],
      // dateNguoiBitc: ['', Validators.required],
      // statusLetter: [''],
      // optionStLetter: [''],
      dateTochucLq: [''],
      hdDoithoai: [''],
      bcNgThamquyen: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      qdGqKhieunai: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      soKetluanNdTocao: ['', this.checkConditionRequired.bind(this)],
      soTbKqGqTocao: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      congboCkKqGqTocao: [this.date.toISOString()],
      // dateNoidungTc: ['', Validators.required],
      // soNoidungTc: ['', Validators.required],
      // dateNoidungTocao: ['', Validators.required],
      // nguoiKyNoidungTc: ['', Validators.required],
      // noiDungKetluan: ['', Validators.required],
      // chonTinh: ['',  this.checkConditionRequired.bind(this)],
      fillSoqd: [''],
      fillNgayQd: [this.date.toISOString()],
      congBo: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      trungcauGq: [this.date.toISOString()],
      chuyenDenDMBHXH: ['', this.checkConditionRequired.bind(this)],
      // congkhaiDateNoidungTc: [''],
      // tailieuTocao: [''],
      // tailieuBiTocao: ['']
      tenTailieu: ['', this.checkConditionRequiredForm.bind(this)],
      soLuong: ['', this.checkConditionRequiredForm.bind(this)],
      tinhTrang: ['', this.checkConditionRequiredForm.bind(this)],
    };
    this.authorityForm = this.fb.group(this.ObjectAuthorityForm);

    this.formModal = this.fb.group({
      season1: [''],
      season2: [''],
      season3: ['']
    });

    this.ObjectFromAddTaiLieu = {
      tenTailieu: ['', Validators.required],
      soLuong: ['', Validators.required],
      tinhTrang: ['', Validators.required],
      mieuTa: [''],
      id: ['']
    };
    this.addTailieuForm = this.fb.group(this.ObjectFromAddTaiLieu);
    this.addInTailieuTocaoForm = this.fb.group({
      ngay: ['', Validators.required],
      ghichu: [''],
      tailieu: [''],
      fileName: [''],
      isRutdon: [''],
      id: ['']
    });
    this.modalAddInTailieuTocaoForm = this.fb.group({
      id: [''],
      soluong: [''],
      file: ['']
    });

    this.koRutdonForm = this.fb.group({
      seasonRutdon1: [''],
      seasonRutdon2: [''],
      seasonRutdon3: ['']
    });
    this.modalAddInTailieuBiTocaoForm = this.fb.group({
      id: [''],
      ngay: ['', Validators.required],
      ghichu: [''],
      fileNamebitc: ['']
    });
    this.contentOld = STATE_CONTENT.cu;
    this.contentNew = STATE_CONTENT.moi;
    this.signature_one = SIGNATURE.motnguoi;
    this.signature_many = SIGNATURE.nhieunguoi;
    this.signature_none = SIGNATURE.nacdanh;
    // this.complex_yes = COMPLEX.cophuctap;
    // this.complex_no = COMPLEX.khongphuctap;
    this.authorityOption_none = AUTHORITYOPTION.no_giaiquyet;
    this.authorityOption_one = AUTHORITYOPTION.giaiquyet_mot;
    this.authorityOption_many = AUTHORITYOPTION.giaiquyet_nhieu;

    this.depend_authority = AUTHORITY.thuoc_tq;
    this.no_depend_authority = AUTHORITY.khongthuoc_tq;
    this.enough_condition = IS_ENOUGH_CONDITION.ENOUGH_CONDITION;
    this.no_enough_condition = IS_ENOUGH_CONDITION.NO_ENOUGH_CONDITION;
    this.yes_thuly = THULY.thuly;
    this.no_thuly = THULY.no_thuly;

    this.thuly_lapphieu = OPTION_THULY.lapphieu;
    this.thuly_thongbao = OPTION_THULY.thongbao;

    this.co_tailieu = TAILIEU_CHUNGCU.coTailieu;
    this.ko_tailieu = TAILIEU_CHUNGCU.koTailieu;

    this.rutDon = STATUS_LETTER.rutDon;
    this.ko_rutDon = STATUS_LETTER.ko_rutDon;

    // this.toogleValidateTC();
  }
  mergeLyDoKoThuLyTCS() {
    if ((this.optionSeason || []).length > 0 && this.data && (this.data.lyDoKoThuLyTCS || []).length > 0) {
      this.optionSeason = this.optionSeason.map(lyDo => {
        const id = lyDo.id;
        lyDo.actived = ((this.data.lyDoKoThuLyTCS || []).find(el => el.id === id));
        return lyDo;
      });
    }
  }

  patchValueTaiLieu(_tailieus) {
    const tailieus: any[] = [];
    for (const el of _tailieus) {
      const _el: any = {};
      _el.id = el.id;
      _el.name = el.tenTaiLieu;
      _el.state_id = el.dmTinhTrangTaiLieuId;
      _el.state = (this.stateOption.find((item) => {
        return +item.id === +el.dmTinhTrangTaiLieuId;
      }) || {}).tenTinhTrang;
      _el.number = el.soLuong;
      _el.description = el.moTa;
      tailieus.push(_el);
    }
    console.log('tai liều', _tailieus, tailieus);
    return tailieus;
  }

  // tslint:disable-next-line:member-ordering
  thuLyVaXacMinhTCID: any;
  fillData(data: any) {
    const _data: any = {};
    const detail = data.detail || {};
    if (detail.thuLyVaXacMinhTC) { this.thuLyVaXacMinhTCID = detail.thuLyVaXacMinhTC.id; }
    const stateContent = setValue(detail.isNoiDungMoi, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const optionContentcm = setValue(detail.isToCaoTiep, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const tailieu = setValue(detail.hasTaiLieuChungCu, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const _tailieus: any[] = detail.taiLieuChungCuTCS || [];
    const _lyDoKoThuLyTCS: any[] = detail.lyDoKoThuLyTCS || [];
    const lyDoKoThuLyTCS: any[] = _lyDoKoThuLyTCS.map(el => {
      const _el: any = {};
      _el.id = el.dmLyDoKoThuLyTCId;
      _el.dTToCaoId = el.dTToCaoId;
      return _el;
    });
    const id = detail.id || null;
    const donThu: any = {};
    donThu.id = detail.donThuId;
    const chuyenDenDMBHXH = [{
      id: detail.chuyenDenDMBHXHId || '',
      text: detail.tenChuyenDenDMBHXH || ''
    }];
    const baocao = setValue(detail.hasBaoCaoThuTruong, [{ key: true, value: true }, { key: false, value: undefined }]);
    const saveLetter = setValue(detail.donThu.luuDon, [{ key: true, value: 1 }, { key: false, value: 2 }]);
    // const complex = setValue(detail.donThu.isDonPhucTap, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    let signature;
    if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === false) {
      signature = '1';
    } else if (detail.donThu.isChuKyMotNguoi === false && detail.donThu.isNacDanh === false) {
      signature = '2';
    } else if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === true) {
      signature = '3';
    }
    const authority = setValue(detail.donThu.isThuocThamQuyen, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const noAuthorityOption = String(detail.isChuyenDenCQCTQ);
    const authorityOption = detail.isGiaiQuyetLanDau;
    const chuyenDenCqctqName = detail.chuyenDenCqctqName || '';
    const condition = setValue(detail.donThu.isDuDieuKienXuLy, [{ key: true, value: 1 }, { key: false, value: 2 }]);
    const thuLy = setValue(detail.willThuLyDonToCao, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const thulyThongbao = detail.hasThongBaoThuLy || false;
    const thulyLapphieu = detail.hasLapPhieuDeXuat || false;
    const thuLyVaXacMinhTC = detail.thuLyVaXacMinhTC || {};
    const soQdXacMinhTC = thuLyVaXacMinhTC.soQuyetDinhThanhLap || '';
    const fillSoqd = thuLyVaXacMinhTC.soThongBaoThuLy || '';
    const dateThanhLap = thuLyVaXacMinhTC.ngayKyQDTL || '';
    const fillNgayQd = thuLyVaXacMinhTC.ngayThongBaoThuLy || '';
    const nguoiKyThanhLap = thuLyVaXacMinhTC.nguoiKyQDTL || '';
    const numTrungCauGD = thuLyVaXacMinhTC.soCongVanTrungCauGD || '';
    const reKetQuaXM = thuLyVaXacMinhTC.baoCaoKetQuaXM || '';
    const soKetluanNdTocao = thuLyVaXacMinhTC.soKetluanNdTocao || '';
    const congBo = thuLyVaXacMinhTC.ngayCongBoKQ || '';
    const _listTailieuNTC = thuLyVaXacMinhTC.ngayLamViecVoiNTCS || [];
    const listTailieuNTC = _listTailieuNTC.map(el => {
      const _el: any = {};
      _el.id = el.id;
      _el.ngay = el.ngayLamViec;
      _el.ghichu = el.ghiChu;
      _el.rutdon = el.hasRutDon;
      _el.tailieus = el.taiLieu;
      return _el;
    });
    const _listTailieuBiTc = thuLyVaXacMinhTC.ngayLamViecVoiNBTCS || [];
    const listTailieuBiTc = _listTailieuBiTc.map(el => {
      const _el: any = {};
      _el.id = el.id;
      _el.ngay = el.ngayLamViec;
      _el.ghichu = el.ghiChu;
      _el.tailieus = el.taiLieu;
      return _el;
    });
    const _listTailieuTcCn = thuLyVaXacMinhTC.lamViecVoiBenLienQuans || [];
    const listTailieuTcCn = _listTailieuTcCn.map(el => {
      const _el: any = {};
      _el.id = el.id;
      _el.ngay = el.ngayLamViec;
      _el.ghichu = el.ghiChu;
      _el.tailieus = el.taiLieu;
      return _el;
    });
    const hdDoithoai = thuLyVaXacMinhTC.ngayDoiThoai || '';
    const bcNgThamquyen = thuLyVaXacMinhTC.ngayBaoCaoNCTQ || '';
    const qdGqKhieunai = thuLyVaXacMinhTC.ngayQDGiaiQuyet || '';
    const soTbKqGqTocao = thuLyVaXacMinhTC.ngayThongBaoKQGQ || '';
    const congboCkKqGqTocao = thuLyVaXacMinhTC.ngayCongKhaiKQGQ || '';
    const trungcauGq = thuLyVaXacMinhTC.ngayTrungCauGD || '';
    _data.stateContent = stateContent;
    _data.optionContentcm = optionContentcm;
    _data.tailieu = tailieu;
    _data.baocao = baocao;
    // _data.complex = complex;
    _data.signature = signature;
    _data.authority = authority;
    _data.authorityOption = authorityOption;
    _data.noAuthorityOption = noAuthorityOption;
    _data.condition = condition;
    _data.saveLetter = saveLetter;
    _data.thuLy = thuLy;
    _data.thulyLapphieu = thulyLapphieu;
    _data.thulyThongbao = thulyThongbao;
    _data.fillSoqd = fillSoqd;
    _data.fillNgayQd = fillNgayQd;
    _data.nguoiKyThanhLap = nguoiKyThanhLap;
    _data.numTrungCauGD = numTrungCauGD;
    _data.reKetQuaXM = reKetQuaXM;
    _data.soKetluanNdTocao = soKetluanNdTocao;
    _data.dateThanhLap = dateThanhLap;
    _data.soQdXacMinhTC = soQdXacMinhTC;
    _data.congBo = congBo;
    _data.hdDoithoai = hdDoithoai;
    _data.bcNgThamquyen = bcNgThamquyen;
    _data.qdGqKhieunai = qdGqKhieunai;
    _data.soTbKqGqTocao = soTbKqGqTocao;
    _data.congboCkKqGqTocao = congboCkKqGqTocao;
    _data.trungcauGq = trungcauGq;
    _data.chuyenDenCqctqName = chuyenDenCqctqName;
    _data.id = id;
    _data.donThu = donThu;
    _data.chuyenDenDMBHXH = chuyenDenDMBHXH;
    _data.lyDoKoThuLyTCS = lyDoKoThuLyTCS;
    this.tailieus = this.patchValueTaiLieu(_tailieus);
    this.listTailieuNTC = listTailieuNTC;
    this.listTailieuBiTc = listTailieuBiTc;
    this.listTailieuTcCn = listTailieuTcCn;
    this.data = _data;
    this.mergeLyDoKoThuLyTCS();
    this.patchData(_data);
  }
  patchData(data: any) {
    this.authorityForm.patchValue({
      stateContent: data.stateContent,
      optionContentcm: data.optionContentcm,
      tailieu: data.tailieu,
      baocao: data.baocao,
      saveLetter: data.saveLetter,
      // complex: data.complex,  
      signature: data.signature,
      authority: data.authority,
    });
    this.changeAuthority();
    this.authorityForm.patchValue({
      authorityOption: String(data.authorityOption),
      noAuthorityOption: data.noAuthorityOption,
      chuyenDenCqctqName: data.chuyenDenCqctqName,
      condition: data.condition,
      thuLy: data.thuLy,
    });
    this.changeThuLy();
    this.authorityForm.patchValue({
      thulyLapphieu: data.thulyLapphieu,
      thulyThongbao: data.thulyThongbao,
      fillSoqd: data.fillSoqd,
      fillNgayQd: data.fillNgayQd,
      dateThanhLap: data.dateThanhLap,
      congBo: data.congBo,
      hdDoithoai: data.hdDoithoai,
      bcNgThamquyen: data.bcNgThamquyen,
      soKetluanNdTocao: data.soKetluanNdTocao,
      qdGqKhieunai: data.qdGqKhieunai,
      soTbKqGqTocao: data.soTbKqGqTocao,
      congboCkKqGqTocao: data.congboCkKqGqTocao,
      trungcauGq: data.trungcauGq,
      // numTrungCauGD: data.numTrungCauGD,
      nguoiKyThanhLap: data.nguoiKyThanhLap,
      chuyenDenDMBHXH: data.chuyenDenDMBHXH,
      reKetQuaXM: data.reKetQuaXM,
      numTrungCauGD: data.numTrungCauGD,
      soQdXacMinhTC: data.soQdXacMinhTC
    });
    this.congboCkKqGqTocao = data.congboCkKqGqTocao;
    this.soTbKqGqTocao = data.soTbKqGqTocao;
    this.qdGqKhieunai = data.qdGqKhieunai;
    this.bcNgThamquyen = data.bcNgThamquyen;
    this.hdDoithoai = data.hdDoithoai;
    this.nguoiKyThanhLap = data.nguoiKyThanhLap;
    this.numTrungCauGD = data.numTrungCauGD;
    this.reKetQuaXM = data.reKetQuaXM;
    this.soKetluanNdTocao = data.soKetluanNdTocao;
  }

  changeLydoKhongThuLy(i: number) {
    this.optionSeason[i].actived = !this.optionSeason[i].actived;
  }

  openModalMauDon() {
    this.modalMauDon.openModalMauDon();
  }

  changeAuthority() {
    this.authority = this.authorityForm.value.authority;
    if (this.authority === '2') {
      this.authorityForm.patchValue({
        noAuthorityOption: null,
        thuLy: false,
        soQdXacMinhTC: '',
        dateThanhLap: '',
        nguoiKyThanhLap: '',
        numTrungCauGD: '',
        reKetQuaXM: '',
        dateBBXacMinh: '',
        // statusLetter: '',
        // dateNguoiBitc: '',
        // optionStLetter: '',
        dateTochucLq: '',
        hdDoithoai: '',
        bcNgThamquyen: '',
        qdGqKhieunai: '',
        soKetluanNdTocao: '',
        soTbKqGqTocao: '',
        congboCkKqGqTocao: '',
        chuyenDenDMBHXH: '',
        // dateNoidungTc: '',
        // soNoidungTc: '',
        // dateNoidungTocao: '',
        // nguoiKyNoidungTc: '',
        // noiDungKetluan: '',
        fillSoqd: '',
        fillNgayQd: ''
      });
    } else {
      this.authorityForm.patchValue({
        noAuthorityOption: null
      });
    }
  }
  // onDateChangedNguoitc(event: IMyDateModel) {
  //   const date = new Date(event.jsdate).toLocaleDateString();
  //   // tslint:disable-next-line:triple-equals
  //   if (date != '' && date != '1/1/1970') {
  //     this.isChoosetc = true;
  //     this.listDateTc.push(new Date(event.jsdate).toLocaleDateString());
  //   } else {
  //     this.isChoosetc = false;
  //   }
  // }
  // onDateChangedNguoiBitc(event: IMyDateModel) {
  //   const date = new Date(event.jsdate).toLocaleDateString();
  //   // tslint:disable-next-line:triple-equals
  //   if (date != '' && date != '1/1/1970') {
  //     this.isChoosebitc = true;
  //     this.listDatebiTc.push(new Date(event.jsdate).toLocaleDateString());
  //   } else {
  //     this.isChoosebitc = false;
  //   }
  // }

  changeThuLy() {
    this.thuLy = this.authorityForm.value.thuLy;
    if (this.thuLy === '1') {
      this.authorityForm.patchValue({ thuLyOption: 0 });
    } else if (this.thuLy === '2') {
      this.authorityForm.patchValue({
        soQdXacMinhTC: '',
        dateThanhLap: '',
        nguoiKyThanhLap: '',
        numTrungCauGD: '',
        reKetQuaXM: '',
        dateBBXacMinh: '',
        // statusLetter: '',
        // dateNguoiBitc: '',
        // optionStLetter: '',
        dateTochucLq: '',
        hdDoithoai: '',
        bcNgThamquyen: '',
        qdGqKhieunai: '',
        soKetluanNdTocao: '',
        soTbKqGqTocao: '',
        congboCkKqGqTocao: '',
        chuyenDenDMBHXH: '',
        // dateNoidungTc: '',
        // soNoidungTc: '',
        // dateNoidungTocao: '',
        // nguoiKyNoidungTc: '',
        // noiDungKetluan: '',
        fillSoqd: '',
        fillNgayQd: ''
      });
    }
  }

  changeCondition() {
    this.condition = this.authorityForm.value.condition;
    if (Number(this.condition) === Number(this.enough_condition)) {
      this.authorityForm.patchValue({ saveLetter: false });
      this.saveLetter = false;
    } else if (Number(this.condition) === Number(this.no_enough_condition)) {
      this.authorityForm.patchValue({
        thuLy: false,
        soQdXacMinhTC: '',
        dateThanhLap: '',
        nguoiKyThanhLap: '',
        numTrungCauGD: '',
        reKetQuaXM: '',
        dateBBXacMinh: '',
        // statusLetter: '',
        // dateNguoiBitc: '',
        // optionStLetter: '',
        dateTochucLq: '',
        hdDoithoai: '',
        bcNgThamquyen: '',
        qdGqKhieunai: '',
        soKetluanNdTocao: '',
        soTbKqGqTocao: '',
        congboCkKqGqTocao: '',
        chuyenDenDMBHXH: '',
        // dateNoidungTc: '',
        // soNoidungTc: '',
        // dateNoidungTocao: '',
        // nguoiKyNoidungTc: '',
        // noiDungKetluan: '',
        fillSoqd: '',
        fillNgayQd: '',

      });
    }
  }
  // removeDate(i) {
  //   this.listDateTc.splice(i, 1);
  // }
  // addDateTc() {
  //   const formValua = this.authorityForm.value;
  //   console.log(formValua.dateNguoitc);
  //   this.listDateTc.push(formValua.dateNguoitc.formatted);
  //   this.authorityForm.patchValue({
  //     dateNguoitc: ''
  //   });
  // }
  // removeDateBiTc(i) {
  //   this.listDatebiTc.splice(i, 1);
  // }
  // addDatebiTc() {
  //   const formValua = this.authorityForm.value;
  //   this.listDatebiTc.push(formValua.dateNguoitc.formatted);

  // }

  onSubmit() {
    const formValua = this.authorityForm.value;
    console.log(formValua);
    const jframe = document.getElementById('iframePrint');
    // tslint:disable-next-line:triple-equals
    if (formValua.thuLy == this.no_thuly) {
      jframe.setAttribute('src', '../../../../../assets/print-document/12_KN_Khongthulygiaiquyetkhieunai.html');
      this.printDocument.show();
      // tslint:disable-next-line:triple-equals
    } else if (formValua.thuLy == this.yes_thuly) {
      jframe.setAttribute('src', '../../../../../assets/print-document/11_KN_Thongbaothulydon.html');
      this.printDocument.show();
    } else {
      // tslint:disable-next-line:triple-equals
      if (formValua.condition == 2 && formValua.saveLetter) {
        jframe.setAttribute('src', '../../../../../assets/print-document/04_KN_Phieudexuatxulydon.html');
        this.printDocument.show();
      } else if (Number(formValua.condition) === 1) {

      } else {
        if (Number(formValua.authority) === Number(this.no_depend_authority)) {
          if (formValua.noAuthorityOption == ! null) {
            jframe.setAttribute('src', '../../../../../assets/print-document/22_KN_ChuyendonTCtoiCQcothamquyen.html');
            this.printDocument.show();
          }
        }
      }
    }
  }

  onSubmitModal() {
    const formValueModal = this.formModal.value;
    console.log(formValueModal);
    this.modal.hide();
  }

  // changeRutDon() {
  //   this.authorityForm.patchValue({ optionStLetter: 0 });
  // }

  // changeOptionStLetter(event) {
  //   console.log(event.target.value);
  //   if (event.target.value == this.ko_rutDon) {
  //     this.koRutdonModal.show();
  //   } else if (event.target.value == this.rutDon) {
  //     this.optionStLetter = true;
  //   }
  // }

  onSubmitKoRutdon() {
    const formValue = this.koRutdonForm.value;
    console.log(formValue);
    this.koRutdonModal.hide();
  }

  public refreshTinh(value: any) {
    this.tinh = value;
  }

  public removed(value: any) {
    this.tinh = {};
  }

  // Them, sua, xoa Table Tai Lieu
  onAddTailieu() {
    this.type_tailieu = 'add';
    this.title_tailieu = 'Thêm';
    this.addTailieuForm.reset();
    this.addTailieuFormSubmited = false;
    this.addTailieu.show();
  }

  editTailieu(index) {
    this.type_tailieu = 'edit';
    this.title_tailieu = 'Sửa';
    this.addTailieuForm.patchValue({
      id: index,
      tenTailieu: this.tailieus[index].name,
      soLuong: this.tailieus[index].number,
      tinhTrang: this.tailieus[index].state_id,
      mieuTa: this.tailieus[index].description
    });
    this.addTailieuFormSubmited = false;
    this.addTailieu.show();
  }

  deleteTailieu(index) {
    this.type_tailieu = 'delete';
    this.title_tailieu = 'Xóa';
    this.addTailieuForm.patchValue({
      id: index,
      tenTailieu: this.tailieus[index].name,
      soLuong: this.tailieus[index].number,
      tinhTrang: this.tailieus[index].state_id,
      mieuTa: this.tailieus[index].description
    });
    this.addTailieu.show();
  }

  onSubmitAddTailieu() {
    this.addTailieuForm.updateValueAndValidity();
    if (this.addTailieuForm.invalid) {
      this.addTailieuFormSubmited = true;
      return;
    }
    const formValue = this.addTailieuForm.value;
    const state_tailieu = this.stateOption.find((item) => {
      return Number(item.id) === Number(formValue.tinhTrang);
    });
    const data: any = {};
    data.id = null;
    data.name = formValue.tenTailieu;
    data.description = formValue.mieuTa;
    data.state_id = (state_tailieu || {}).id;
    data.state = (state_tailieu || {}).tenTinhTrang;
    data.number = formValue.soLuong;
    this.tailieus.push(data);
    this.addTailieu.hide();
  }

  onSubmitEditTailieu() {
    this.addTailieuForm.updateValueAndValidity();
    if (this.addTailieuForm.invalid) {
      this.addTailieuFormSubmited = true;
      return;
    }
    const formValue = this.addTailieuForm.value;
    const state_tailieu = this.stateOption.find((item) => {
      return Number(item.id) === Number(formValue.tinhTrang);
    });
    this.tailieus[formValue.id].name = formValue.tenTailieu;
    this.tailieus[formValue.id].number = formValue.soLuong;
    this.tailieus[formValue.id].description = formValue.mieuTa;
    this.tailieus[formValue.id].state = (state_tailieu || {}).tenTinhTrang;
    this.tailieus[formValue.id].state_id = (state_tailieu || {}).id;
    this.addTailieu.hide();
    // console.log(formValue);
  }

  onSubmitDeleteTailieu() {
    const formValue = this.addTailieuForm.value;
    this.tailieus.splice(formValue.id, 1);
    this.addTailieu.hide();
  }

  // Them, sua, xoa Table LamViecNguoiToCao
  showModalAddTlTc() {
    this.statusOption = 'add';
    this.type_title_ngayTc = 'Thêm';
    this.addInTailieuTocaoForm.reset();
    this.addInTailieuTocaoForm.patchValue({ ngay: this.date });
    this.addInTailieuTocaoFormSubmited = false;
    this.title_ngayTocao = 'tố cáo';
    this.type_tailieuTc = 'tocao';
    this.modalAddTailieuTocao.show();
  }

  editTailieutocao(i) {
    this.statusOption = 'edit';
    this.type_title_ngayTc = 'Sửa';
    this.title_ngayTocao = 'tố cáo';
    this.type_tailieuTc = 'tocao';
    this.addInTailieuTocaoForm.reset();
    this.addInTailieuTocaoFormSubmited = false;
    const item = (this.listTailieuNTC[i] || {});
    this.addInTailieuTocaoForm.patchValue({
      id: i,
      ngay: item.ngay,
      ghichu: item.ghichu,
      tailieu: item.tailieus,
      isRutdon: item.rutdon
    });
    this.modalAddTailieuTocao.show();
  }

  deleteTailieutocao(i) {
    this.statusOption = 'delete';
    this.type_title_ngayTc = 'Xóa';
    this.title_ngayTocao = 'tố cáo';
    this.type_tailieuTc = 'tocao';
    this.addInTailieuTocaoForm.reset();
    this.addInTailieuTocaoForm.patchValue({
      id: i,
      ngay: this.listTailieuNTC[i].ngay,
    });
    this.modalAddTailieuTocao.show();
  }

  onSubmitModalAddTailieuTc() {
    this.addInTailieuTocaoForm.updateValueAndValidity();
    if (this.addInTailieuTocaoForm.invalid) {
      this.addInTailieuTocaoFormSubmited = true;
      return;
    }
    const formValue = this.addInTailieuTocaoForm.value;
    const data: any = {};
    console.log(formValue);
    data.id = this.listTailieuNTC.length + 1;
    data.ngay = formValue.ngay;
    data.ghichu = formValue.ghichu;
    data.rutdon = formValue.isRutdon ? formValue.isRutdon : false;
    data.tailieus = formValue.tailieu;
    console.log(data);
    this.listTailieuNTC.push(data);
    this.modalAddTailieuTocao.hide();
  }

  onSubmitModalEditTailieuTc() {
    this.addInTailieuTocaoForm.updateValueAndValidity();
    if (this.addInTailieuTocaoForm.invalid) {
      this.addInTailieuTocaoFormSubmited = true;
      return;
    }
    const formValue = this.addInTailieuTocaoForm.value;
    this.listTailieuNTC[formValue.id].id = this.listTailieuNTC[formValue.id].id;
    this.listTailieuNTC[formValue.id].ngay = formValue.ngay;
    this.listTailieuNTC[formValue.id].ghichu = formValue.ghichu;
    this.listTailieuNTC[formValue.id].tailieus = formValue.tailieu;
    this.listTailieuNTC[formValue.id].rutdon = formValue.isRutdon;
    this.modalAddTailieuTocao.hide();
  }

  onSubmitModalDeleteTailieuTc() {
    const formValue = this.addInTailieuTocaoForm.value;
    this.listTailieuNTC.splice(formValue.id, 1);
    this.modalAddTailieuTocao.hide();
  }

  // Them, sua, xoa Table LamViecNguoiBiToCao
  addTcLienquan(i) {
    this.type_title_ngayTc = 'Thêm';
    this.title_ngayTocao = 'tố cáo';
    this.type_tailieuTc = 'tocao';
    this.modalAddInTailieuTocaoForm.reset();
    this.modalAddInTailieuTocaoForm.patchValue({
      id: i
    });
    this.modalAddTailieutlTocao.show();
  }

  showModalAddTlBiTc() {
    this.modalAddInTailieuBiTocaoForm.reset();
    this.modalAddInTailieuBiTocaoForm.patchValue({ ngay: this.date });
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.statusOptionBitc = 'add';
    this.title_tailieuBiTocao = 'Thêm ngày làm việc với người bị tố cáo';
    this.type_title_tailieuBiTocao = 'bitocao';
    this.modalAddTailieutlBiTocao.show();
  }

  editTailieuBitocao(i) {
    this.modalAddInTailieuBiTocaoForm.reset();
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.statusOptionBitc = 'edit';
    this.title_tailieuBiTocao = 'Sửa ngày làm việc với người bị tố cáo';
    this.type_title_tailieuBiTocao = 'bitocao';
    this.addInTailieuTocaoForm.reset();
    this.modalAddInTailieuBiTocaoForm.patchValue({
      id: i,
      ngay: (this.listTailieuBiTc[i] || {}).ngay,
      ghichu: this.listTailieuBiTc[i].ghichu,
      fileNamebitc: this.listTailieuBiTc[i].tailieus
    });
    this.modalAddTailieutlBiTocao.show();
  }

  deleteTailieuBitocao(i) {
    this.modalAddInTailieuBiTocaoForm.reset();
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.statusOptionBitc = 'delete';
    this.title_tailieuBiTocao = 'Xóa ngày làm việc với người bị tố cáo';
    this.type_title_tailieuBiTocao = 'bitocao';
    this.addInTailieuTocaoForm.reset();
    this.modalAddInTailieuBiTocaoForm.patchValue({
      id: i,
      ngay: this.listTailieuBiTc[i].ngay,
      // ghichu: this.listTailieuBiTc[i].ghichu,
      // fileNamebitc: this.listTailieuBiTc[i].tailieus
    });
    this.modalAddTailieutlBiTocao.show();
  }

  onSubmitModalAddTailieuBiTc() {
    this.modalAddInTailieuBiTocaoForm.updateValueAndValidity();
    if (this.modalAddInTailieuBiTocaoForm.invalid) {
      this.modalAddInTailieuBiTocaoFormSubmited = true;
      return;
    }
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    const data: any = {};
    console.log(formValue);
    data.id = this.listTailieuBiTc.length + 1;
    data.ngay = formValue.ngay;
    data.ghichu = formValue.ghichu;
    data.tailieus = formValue.fileNamebitc;
    this.listTailieuBiTc.push(data);
    this.modalAddTailieutlBiTocao.hide();
  }

  onSubmitModalEditTailieuBiTc() {
    this.modalAddInTailieuBiTocaoForm.updateValueAndValidity();
    if (this.modalAddInTailieuBiTocaoForm.invalid) {
      this.modalAddInTailieuBiTocaoFormSubmited = true;
      return;
    }
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    this.listTailieuBiTc[formValue.id].id = this.listTailieuBiTc[formValue.id].id;
    this.listTailieuBiTc[formValue.id].ngay = formValue.ngay;
    this.listTailieuBiTc[formValue.id].ghichu = formValue.ghichu;
    this.listTailieuBiTc[formValue.id].tailieus = formValue.fileNamebitc;
    this.modalAddTailieutlBiTocao.hide();
  }

  onSubmitModalDeleteTailieuBiTc() {
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    this.listTailieuBiTc.splice(formValue.id, 1);
    this.modalAddTailieutlBiTocao.hide();
  }

  // Them, sua, xoa Table LamViecToChucLienQuan
  showModalAddTlTcZCn() {
    this.modalAddInTailieuBiTocaoForm.reset();
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.statusOptionBitc = 'add';
    this.title_tailieuBiTocao = 'Thêm ngày làm việc với cơ quan tổ chức/cá nhân liên quan';
    this.type_title_tailieuBiTocao = 'benlienquan';
    this.modalAddTailieutlBiTocao.show();
  }

  editTcLienquan(i) {
    this.statusOptionBitc = 'edit';
    this.title_tailieuBiTocao = 'Sửa ngày làm việc với cơ quan tổ chức/cá nhân liên quan';
    this.type_title_tailieuBiTocao = 'benlienquan';
    this.modalAddInTailieuBiTocaoForm.reset();
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.modalAddInTailieuBiTocaoForm.patchValue({
      id: i,
      ngay: (this.listTailieuTcCn[i] || {}).ngay,
      ghichu: (this.listTailieuTcCn[i] || {}).ghichu,
      fileNamebitc: (this.listTailieuTcCn[i] || {}).tailieus
    });
    this.modalAddTailieutlBiTocao.show();
  }

  deleteTcLienquan(i) {
    this.statusOptionBitc = 'delete';
    this.title_tailieuBiTocao = 'Xóa ngày làm việc với cơ quan tổ chức/cá nhân liên quan';
    this.type_title_tailieuBiTocao = 'benlienquan';
    this.modalAddInTailieuBiTocaoFormSubmited = false;
    this.modalAddInTailieuBiTocaoForm.reset();

    this.modalAddInTailieuBiTocaoForm.patchValue({
      id: i,
      ngay: (this.listTailieuTcCn[i] || {}).ngay,
    });
    this.modalAddTailieutlBiTocao.show();
  }

  onSubmitModalAddTailieuBenlq() {
    this.modalAddInTailieuBiTocaoForm.updateValueAndValidity();
    if (this.modalAddInTailieuBiTocaoForm.invalid) {
      this.modalAddInTailieuBiTocaoFormSubmited = true;
      return;
    }
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    const data: any = {};
    console.log(formValue);
    data.id = this.listTailieuTcCn.length + 1;
    data.ngay = formValue.ngay;
    data.ghichu = formValue.ghichu;
    data.tailieus = formValue.fileNamebitc;
    this.listTailieuTcCn.push(data);
    this.modalAddTailieutlBiTocao.hide();
  }

  onSubmitModalEditTailieuBenlq() {
    this.modalAddInTailieuBiTocaoForm.updateValueAndValidity();
    if (this.modalAddInTailieuBiTocaoForm.invalid) {
      this.modalAddInTailieuBiTocaoFormSubmited = true;
      return;
    }
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    this.listTailieuTcCn[formValue.id].id = this.listTailieuTcCn[formValue.id].id;
    this.listTailieuTcCn[formValue.id].ngay = formValue.ngay;
    this.listTailieuTcCn[formValue.id].ghichu = formValue.ghichu;
    this.listTailieuTcCn[formValue.id].tailieus = formValue.fileNamebitc;
    this.modalAddTailieutlBiTocao.hide();
  }

  onSubmitModalDeleteTailieuBenlq() {
    const formValue = this.modalAddInTailieuBiTocaoForm.value;
    this.listTailieuTcCn.splice(formValue.id, 1);
    this.modalAddTailieutlBiTocao.hide();
  }

  onLuuTam() {
    this.status = 1;
    this.onSubmitted.emit(true);
    this.onSave({ action: 'luutam' });
  }

  onKetThuc() {
    this.status = 2;
    this.onSubmitted.emit(true);
    this.onSave({ action: 'ketthuc' });
  }

  updateValueAndValidityForm(_form: FormGroup, control: string, validators: any) {
    _form.controls[control].setValidators(validators);
    _form.controls[control].updateValueAndValidity();
  }

  resetRequiredFormTailieuANDThulyXM() {
    this.updateValueAndValidityForm(this.modalAddInTailieuBiTocaoForm, 'ngay', null);
    this.updateValueAndValidityForm(this.addInTailieuTocaoForm, 'ngay', null);
    const listControl = ['soQdXacMinhTC', 'nguoiKyThanhLap', 'dateThanhLap', 'congBo', 'numTrungCauGD', 'trungcauGq', 'bcNgThamquyen', 'reKetQuaXM', 'soKetluanNdTocao', 'qdGqKhieunai', 'soTbKqGqTocao', 'congboCkKqGqTocao'];
    for (const control of listControl) {
      this.authorityForm.get(control).setValue('', { emitEvent: false });
      this.authorityForm.get(control).disable({ emitEvent: false });
    }
  }
  resetREquiredFormNoAuthorityOption() {
    const listControl = ['noAuthorityOption', 'chuyenDenDMBHXH', 'chuyenDenCqctqName'];
    for (const control of listControl) {
      this.authorityForm.get(control).setValue('', { emitEvent: false });
      this.authorityForm.get(control).disable({ emitEvent: false });
    }
  }

  saveDonThu({ action, formValue }) {
    const donthu: any = {};
    donthu.actived = true;
    donthu.createBy = { 'id': this.account.id };
    donthu.diaChiCongDan = this.formQiaiquyetDt.get('diaChi').value;
    donthu.dmBHXH = { 'id': this.account.donViId };
    donthu.hoTenCongDan = this.formQiaiquyetDt.get('hoTenCd').value;
    donthu.noiDung = this.formQiaiquyetDt.get('noiDung').value;
    donthu.phanLoaiNoiDung = { 'id': this.formQiaiquyetDt.get('selectType').value };
    donthu.soCMTND = this.formQiaiquyetDt.get('soCMND').value;
    donthu.soCongVanDen = this.formQiaiquyetDt.get('soCongVanDen').value;
    donthu.tiepCongDanId = this.formQiaiquyetDt.get('quaTc').value ? this.formQiaiquyetDt.get('tiepCongDanId').value : null;
    if (action === 'ketthuc') {
      donthu.ngayKetThuc = this.timeBuilder.current().setUTC().toISOString();
    }
    donthu.ngayCongVan = this.timeBuilder.fromTimeDatePicker(this.formQiaiquyetDt.get('ngayThang').value).setUTC().toISOString();
    donthu.ngayTiepNhan = this.timeBuilder.fromTimeDatePicker(this.formQiaiquyetDt.get('ngayThang').value).setUTC().toISOString();
    donthu.status = this.status;
    donthu.id = this.formQiaiquyetDt.get('id').value;
    if (Number(this.authorityForm.value.signature) === 1) {
      donthu.isChuKyMotNguoi = true;
      donthu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 2) {
      donthu.isChuKyMotNguoi = false;
      donthu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 3) {
      donthu.isChuKyMotNguoi = true;
      donthu.isNacDanh = true;
    }
    //điều kiện xử lý
    if (Number(formValue.condition) === 1) {
      donthu.isDuDieuKienXuLy = true;
      donthu.luuDon = false;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
    } else if (Number(formValue.condition) === 2) {
      if (formValue.saveLetter == true) {
        donthu.isDuDieuKienXuLy = false;
        donthu.luuDon = true;
        this.updateValueAndValidityForm(this.authorityForm, 'koThuLyOption', null);
        this.resetRequiredFormTailieuANDThulyXM();
        this.resetREquiredFormNoAuthorityOption();
      } else {
        this._alert.error('Bạn chưa lưu đơn khi không đủ điều kiện xử lý');
        return;
      }
    }
    // thẩm quyền
    if (Number(formValue.authority) === 1) {
      donthu.isThuocThamQuyen = true;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      this.resetREquiredFormNoAuthorityOption();
    } else if (Number(formValue.authority) === 2) {
      donthu.isThuocThamQuyen = false;
      if (action == 'ketthuc') {
        if (formValue.chuyenDenCqctqName || formValue.chuyenDenDMBHXH) {
          this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
          this.updateValueAndValidityForm(this.authorityForm, 'thuLy', null);
          this.updateValueAndValidityForm(this.authorityForm, 'koThuLyOption', null);
          this.resetRequiredFormTailieuANDThulyXM();
        } else {
          this._alert.error('Bạn phải chọn 1 cơ quan để chuyển đơn');
          return;
        }
      }
    }
    // thụ lý
    if (Number(formValue.thuLy) == 2) {
      this.resetRequiredFormTailieuANDThulyXM();
    } else if (Number(formValue.thuLy) == 1) {
      this.updateValueAndValidityForm(this.authorityForm, 'koThuLyOption', null);
    }

    return donthu;
  }

  onSave({ action }) {
    if (this.isExisted) {
      this._alert.error('Số công văn đến đã tồn tại!');
      return;
    }
    console.log(this.authorityForm.value.koThuLyOption, this.authorityForm.value.thuLy, this.no_thuly);
    this.formService.touchAllInput(this.formQiaiquyetDt, true);
    this.formService.touchAllInput(this.authorityForm, true);
    this.formService.touchAllInput(this.addTailieuForm, true);
    this.formService.touchAllInput(this.modalAddInTailieuBiTocaoForm, true);
    const numberTailieuNTCs = this.listTailieuNTC.length;
    if (numberTailieuNTCs > 0) {
      for (var i = 0; i < numberTailieuNTCs; i++) {
        if (this.listTailieuNTC[i].rutdon == true) {
          this.chonRutDon = true;

          break;
        }
      }
    }

    if (this.chonRutDon == true && action == 'ketthuc') {
      this.resetRequiredFormTailieuANDThulyXM();
    }

    if (this.authorityForm.value.tailieu == TAILIEU_CHUNGCU.koTailieu.toString()) {
      Object.keys(this.ObjectFromAddTaiLieu).forEach(k => this.updateValueAndValidityForm(this.addTailieuForm, k, null));
    }
    const formValue = this.authorityForm.value;
    let formBody: any = {};
    console.log(this.formQiaiquyetDt, this.authorityForm, this.addTailieuForm, this.modalAddInTailieuBiTocaoForm);
    const lvVoiBenLienquan: any[] = [];
    const benLienquan: any = {};
    this.listTailieuTcCn.forEach(el => {
      if (this.preview) { benLienquan.id = el.id; }
      benLienquan.actived = true;
      benLienquan.ghiChu = el.ghichu;
      benLienquan.ngayLamViec = el.ngay;
      benLienquan.taiLieu = el.tailieus;
      lvVoiBenLienquan.push(benLienquan);
    });
    const lvVoiNguoiTc: any[] = [];
    this.listTailieuNTC.forEach(el => {
      const nguoiTc: any = {};
      if (this.preview) { nguoiTc.id = el.id; }
      nguoiTc.actived = true;
      nguoiTc.ghiChu = el.ghichu;
      nguoiTc.ngayLamViec = el.ngay;
      nguoiTc.taiLieu = el.tailieus;
      nguoiTc.hasRutDon = el.rutdon;
      lvVoiNguoiTc.push(nguoiTc);
    });
    console.log(lvVoiNguoiTc);

    const lvVoiNguoiBTc: any[] = [];
    const nguoiBTc: any = {};
    this.listTailieuBiTc.forEach(el => {
      if (this.preview) { nguoiBTc.id = el.id; }
      nguoiBTc.actived = true;
      nguoiBTc.ghiChu = el.ghichu;
      nguoiBTc.ngayLamViec = el.ngay;
      nguoiBTc.taiLieu = el.tailieus;
      lvVoiNguoiBTc.push(nguoiBTc);
    });
    let jsonTienhanhs: any = {};
    // jsonTienhanhs.actived = true;
    jsonTienhanhs.ngayBaoCaoNCTQ = formValue.bcNgThamquyen;
    jsonTienhanhs.ngayCongBoKQ = formValue.congBo;
    jsonTienhanhs.ngayCongKhaiKQGQ = formValue.congboCkKqGqTocao;
    jsonTienhanhs.ngayDoiThoai = formValue.hdDoithoai;
    jsonTienhanhs.ngayKyQDTL = formValue.dateThanhLap;
    jsonTienhanhs.ngayQDGiaiQuyet = formValue.qdGqKhieunai;
    jsonTienhanhs.ngayThongBaoKQGQ = formValue.soTbKqGqTocao;
    jsonTienhanhs.ngayTrungCauGD = formValue.trungcauGq;
    jsonTienhanhs.ngayThongBaoThuLy = formValue.fillNgayQd;
    jsonTienhanhs.soThongBaoThuLy = formValue.fillSoqd;
    jsonTienhanhs.nguoiKyQDTL = formValue.nguoiKyThanhLap;
    jsonTienhanhs.soCongVanTrungCauGD = formValue.numTrungCauGD;
    jsonTienhanhs.baoCaoKetQuaXM = formValue.reKetQuaXM;
    jsonTienhanhs.soKetluanNdTocao = formValue.soKetluanNdTocao;
    jsonTienhanhs.soQuyetDinhThanhLap = formValue.soQdXacMinhTC;
    console.log(formValue);
    const donthu = this.saveDonThu({ action, formValue });
    formBody.status = this.status;
    formBody.donThu = donthu;
    formBody.isGiaiQuyetLanDau = Number(formValue.authorityOption);
    if (Number(formValue.authority) === Number(this.no_depend_authority)) {
      if (formValue.noAuthorityOption === 'true') {
        formBody.isChuyenDenCQCTQ = true;
        formBody.chuyenDenCqctqName = formValue.chuyenDenCqctqName;
        formBody.chuyenDenDMBHXH = null;
        this.updateValueAndValidityForm(this.authorityForm, 'chuyenDenDMBHXH', null);
      } else if (formValue.noAuthorityOption === 'false') {
        formBody.isChuyenDenCQCTQ = false;
        formBody.chuyenDenCqctqName = null;
        if (formValue.chuyenDenDMBHXH && formValue.chuyenDenDMBHXH['0'] && formValue.chuyenDenDMBHXH['0'].id) {
          formBody.chuyenDenDMBHXH = { id: formValue.chuyenDenDMBHXH['0'].id };
        }
        this.updateValueAndValidityForm(this.authorityForm, 'chuyenDenCqctqName', null);
      }
    }
    if (Number(formValue.thuLy) === Number(this.yes_thuly)) {
      formBody.willThuLyDonToCao = true;
      formBody.hasThongBaoThuLy = formValue.thulyThongbao;
      formBody.hasLapPhieuDeXuat = formValue.thulyLapphieu;
    } else if (Number(formValue.thuLy) === Number(this.no_thuly)) {
      formBody.hasThongBaoThuLy = false;
      formBody.willThuLyDonToCao = false;
      const lyDoKoThuLyTCS: any[] = [];
      this.optionSeason.forEach(el => {
        if (el.actived) {
          const _el: any = {};
          _el.dmLyDoKoThuLyTC = {
            id: el.id,
          };
          if (el.dTToCaoId) {
            _el.id = el.dTToCaoId;
          }
          lyDoKoThuLyTCS.push(_el);
        }
      });
      console.log(lyDoKoThuLyTCS);
      formBody.lyDoKoThuLyTCS = lyDoKoThuLyTCS;
    }
    formBody.hasBaoCaoThuTruong = formValue.baocao;
    if (Number(formValue.tailieu) === 1) {
      formBody.hasTaiLieuChungCu = true;
    } else if (Number(formValue.tailieu) === 2) {
      formBody.hasTaiLieuChungCu = false;
    }
    if (Number(formValue.stateContent) === 1) {
      formBody.isNoiDungMoi = true;
      // formBody.noiDungMoi = true;
    } else if (Number(formValue.stateContent) === 2) {
      formBody.isNoiDungMoi = false;
      // formBody.noiDungMoi = false;
    }

    if (Number(formValue.optionContentcm) === 1) {
      formBody.isToCaoTiep = true;
      formBody.toCaoTiep = true;
    } else if (Number(formValue.optionContentcm) === 2) {
      formBody.isToCaoTiep = false;
      formBody.toCaoTiep = false;
    }

    formBody.taiLieuChungCuTCS = this.saveTaiLieuChungTuKT();
    jsonTienhanhs = pickBy(jsonTienhanhs, { notEmpty: true, notNull: true, notUndefined: true, notStringEmpty: true });
    let api = 'createNewDtTocao';
    jsonTienhanhs.lamViecVoiBenLienQuans = lvVoiBenLienquan;
    jsonTienhanhs.ngayLamViecVoiNBTCS = lvVoiNguoiBTc;
    jsonTienhanhs.ngayLamViecVoiNTCS = lvVoiNguoiTc;
    formBody.thuLyVaXacMinhTC = jsonTienhanhs;
    console.log(this.preview);
    if (this.preview) {
      api = 'updateNewDtTocao';
      formBody.id = this.data.id;
      formBody.donThu.id = this.data.donThu.id;
      formBody.thuLyVaXacMinhTC.id = this.thuLyVaXacMinhTCID;
      formBody.thuLyVaXacMinhTC.actived = true;
      // formBody.thuLyVaXacMinhTC.ngayLamViecVoiNTCS = this.listTailieuNTC;
    }
    formBody.actived = true;
    if (formBody.donThu.soCongVanDen !== null) {
      formBody.donThu.soCongVanDen = formBody.donThu.soCongVanDen.trim();
    }
    formBody = pickBy(formBody, { notEmpty: true, notNull: true, notUndefined: true, notStringEmpty: true });
    if (action == 'luutam') {
      this.formService.touchAllInput(this.formQiaiquyetDt, true);
      if (this.formQiaiquyetDt.invalid) {
        this._alert.error('Cần điền đầy đủ thông tin các trường bắt buộc ở Giải quyết đơn thư KN, TC, KNPA', { delay: 1000 });
        console.log(this.formService.getErrorList(this.formQiaiquyetDt));
        return;
      }
    }
    if (action == 'ketthuc') {
      if (this.authorityForm.invalid || this.formQiaiquyetDt.invalid
        || (jsonTienhanhs.ngayLamViecVoiNBTCS.length === 0 && this.chonRutDon === false && Number(this.authorityForm.value.thuLy) === Number(this.yes_thuly))
        || (Number(this.authorityForm.value.thuLy) === Number(this.no_thuly) && this.authorityForm.value.koThuLyOption === false)) {
        this._alert.error('Không được để trống các trường bắt buộc!', { delay: 1000 });
        console.log(this.formService.getErrorList(this.formQiaiquyetDt),
          this.formService.getErrorList(this.authorityForm),
          this.formService.getErrorList(this.addTailieuForm),
          this.formService.getErrorList(this.modalAddInTailieuBiTocaoForm));
        return;
      }
    }
    if (donthu.soCongVanDen) {
      this.noiDtTocaoService[api](formBody)
        .subscribe(res => {
          this.router.navigate([this.rootPage]);
          if (action === 'luutam') {
            this._alert.success('Lưu tạm làm việc thành công!', { delay: 1000 });
          } else if (action === 'ketthuc') {
            this._alert.success('Kết thúc làm việc thành công!', { delay: 1000 });
          }
        }, err => {

        });
    } else {
      this._alert.error('Không được để trống các trường bắt buộc!', { delay: 1000 });
    }
  }

  checkValidateFormXacMinh() {
    const arrTailieus: any[] = [];
    const tailieu: any = {};
    for (const el of this.tailieus) {
      tailieu.id = el.id;
      tailieu.dmTinhTrangTaiLieu = { 'id': el.state_id };
      tailieu.actived = true;
      tailieu.moTa = el.description;
      tailieu.soLuong = el.number;
      tailieu.tenTaiLieu = el.name;
      arrTailieus.push(tailieu);
    }
    if (tailieu !== '') {
      return true;
    } else {
      return false;
    }
  }

  // popup MauThongBao
  openModalThongBao() {
    this.mauThongBaoForm.reset();
    this.resetMessageErrTB();
    this.modalThongBao.show();
  }

  checkErrFormThongBao(_options?: any) {
    const defaultOptions = {
      checkDvBanHanh: true,
      checkSo: true,
      checkdiaDiemBanHanh: true,
      checkngayBanHanh: true,
      checknguoiCoThamQuyen: true,
      checkhoTenDCNguoiTC: true,
      checkthongTinNguoiBiTC: true,
      checktomTatNDTC: true,
      checkNDTCDuocThuLy: true,
      checktenNguoiQL: true
    };
    const defaultOptionsFalse = { ...defaultOptions };
    // tslint:disable-next-line:forin
    for (const key in defaultOptionsFalse) {
      defaultOptionsFalse[key] = false;
    }
    let option: any = {};
    if (_options) {
      option = { ...defaultOptionsFalse, ..._options };
    } else {
      option = defaultOptions;
    }
    if (!this.mauThongBaoForm.value.dvBanHanh && option.checkDvBanHanh) {
      this.errdvBanHanh = true;
      return false;
    } else {
      this.errdvBanHanh = false;
    }
    if (!this.mauThongBaoForm.value.so && option.checkSo) {
      this.errso = true;
      return false;
    } else {
      this.errso = false;
    }
    if (!this.mauThongBaoForm.value.diaDiemBanHanh && option.checkdiaDiemBanHanh) {
      this.errdiaDiemBanHanh = true;
      return false;
    } else {
      this.errdiaDiemBanHanh = false;
    }
    if (!this.mauThongBaoForm.value.ngayBanHanh && option.checkngayBanHanh) {
      this.errngayBanHanh = true;
      return false;
    } else {
      this.errngayBanHanh = false;
    }
    if (!this.mauThongBaoForm.value.nguoiCoThamQuyen && option.checknguoiCoThamQuyen) {
      this.errnguoiCoThamQuyen = true;
      return false;
    } else {
      this.errnguoiCoThamQuyen = false;
    }
    if (!this.mauThongBaoForm.value.hoTenDCNguoiTC && option.checkhoTenDCNguoiTC) {
      this.errhoTenDCNguoiTC = true;
      return false;
    } else {
      this.errhoTenDCNguoiTC = false;
    }
    if (!this.mauThongBaoForm.value.thongTinNguoiBiTC && option.checkthongTinNguoiBiTC) {
      this.errthongTinNguoiBiTC = true;
      return false;
    } else {
      this.errthongTinNguoiBiTC = false;
    }
    if (!this.mauThongBaoForm.value.tomTatNDTC && option.checktomTatNDTC) {
      this.errtomTatNDTC = true;
      return false;
    } else {
      this.errtomTatNDTC = false;
    }
    if (!this.mauThongBaoForm.value.NDTCDuocThuLy && option.checkNDTCDuocThuLy) {
      this.errNDTCDuocThuLy = true;
      return false;
    } else {
      this.errNDTCDuocThuLy = false;
    }
    if (!this.mauThongBaoForm.value.tenNguoiQL && option.checktenNguoiQL) {
      this.errtenNguoiQL = true;
      return false;
    } else {
      this.errtenNguoiQL = false;
    }

    return true;
  }

  closeModalThongBao() {
    this.modalThongBao.hide();
  }

  resetMessageErrTB() {
    this.errdvBanHanh = false;
    this.errso = false;
    this.errdiaDiemBanHanh = false;
    this.errngayBanHanh = false;
    this.errnguoiCoThamQuyen = false;
    this.errhoTenDCNguoiTC = false;
    this.errthongTinNguoiBiTC = false;
    this.errtomTatNDTC = false;
    this.errNDTCDuocThuLy = false;
    this.errtenNguoiQL = false;
  }

  saveMauThongbao() {
    this.checkErrFormThongBao();
  }

  // popup MauDeXuat
  openModalDeXuat() {
    this.phieuDeXuatForm.reset();
    this.resetMessageErrDX();
    this.modalDeXuat.show();
  }

  checkErrFormDeXuat(_options?: any) {
    const defaultOptions = {
      checkerrdvXuLy: true,
      checkngayLapPhieu: true,
      checkTTCoQuan: true,
      checkngayNhan: true,
      checkhoTenNguoiTC: true,
      checkdiaChiNguoiTC: true,
      checktomTatNDDon: true
    };
    const defaultOptionsFalse = { ...defaultOptions };
    // tslint:disable-next-line:forin
    for (const key in defaultOptionsFalse) {
      defaultOptionsFalse[key] = false;
    }
    let option: any = {};
    if (_options) {
      option = { ...defaultOptionsFalse, ..._options };
    } else {
      option = defaultOptions;
    }
    if (!this.phieuDeXuatForm.value.dvXuLy && option.checkerrdvXuLy) {
      this.errdvXuLy = true;
      return false;
    } else {
      this.errdvXuLy = false;
    }
    if (!this.phieuDeXuatForm.value.ngayLapPhieu && option.checkngayLapPhieu) {
      this.errngayLapPhieu = true;
      return false;
    } else {
      this.errngayLapPhieu = false;
    }
    if (!this.phieuDeXuatForm.value.TTCoQuan && option.checkTTCoQuan) {
      this.errTTCoQuan = true;
      return false;
    } else {
      this.errTTCoQuan = false;
    }
    if (!this.phieuDeXuatForm.value.ngayNhan && option.checkngayNhan) {
      this.errngayNhan = true;
      return false;
    } else {
      this.errngayNhan = false;
    }
    if (!this.phieuDeXuatForm.value.hoTenNguoiTC && option.checkhoTenNguoiTC) {
      this.errhoTenNguoiTC = true;
      return false;
    } else {
      this.errhoTenNguoiTC = false;
    }
    if (!this.phieuDeXuatForm.value.diaChiNguoiTC && option.checkdiaChiNguoiTC) {
      this.errdiaChiNguoiTC = true;
      return false;
    } else {
      this.errdiaChiNguoiTC = false;
    }
    if (!this.phieuDeXuatForm.value.tomTatNDDon && option.checktomTatNDDon) {
      this.errtomTatNDDon = true;
      return false;
    } else {
      this.errtomTatNDDon = false;
    }

    return true;
  }

  closeModalDeXuat() {
    this.modalDeXuat.hide();
  }

  resetMessageErrDX() {
    this.errdvXuLy = false;
    this.errngayLapPhieu = false;
    this.errTTCoQuan = false;
    this.errngayNhan = false;
    this.errhoTenNguoiTC = false;
    this.errdiaChiNguoiTC = false;
    this.errtomTatNDDon = false;
  }

  savePhieuDeXuat() {
    this.checkErrFormDeXuat();
  }

  saveTaiLieuChungTuKT() {
    const arrTailieus: any[] = [];
    for (const el of this.tailieus) {
      const tailieu: any = {};
      tailieu.id = el.id;
      tailieu.dmTinhTrangTaiLieu = { 'id': el.state_id };
      tailieu.actived = true;
      tailieu.moTa = el.description;
      tailieu.soLuong = el.number;
      tailieu.tenTaiLieu = el.name;
      arrTailieus.push(tailieu);
    }
    console.log('save tai lieu', this.tailieus, arrTailieus);
    return arrTailieus;
  }

  onSubmitPrintDocument() {

  }
  checkConditionRequired(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.authority && !control.value) {
      return { required: true };
    }
    return null;
  }
  checkConditionRequiredForm(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.condition && !control.value) {
      return { required: true };
    }
    return null;
  }
  checkConditionRequiredTL(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.stateContent && !control.value) {
      return { required: true };
    }
    return null;
  }
  toogleValidateTC() {
    const listToogle = [
      'authority', 'condition', 'thuLy'
    ];
    const fieldToogleConfig = {
      authority: {
        1: [
          'condition',
          'thuLy',
          'thulyThongbao',
          'fillSoqd',
          'fillNgayQd',
          'soQdXacMinhTC',
          'nguoiKyThanhLap',
          'numTrungCauGD',
          'reKetQuaXM',
          'soKetluanNdTocao',
          'dateThanhLap',
          'congBo',
          'bcNgThamquyen',
          'qdGqKhieunai',
          'soTbKqGqTocao',
          'congboCkKqGqTocao'
        ],
        2: [
          'noAuthorityOption',
          'chuyenDenCqctqName',
          'chuyenDenDMBHXH'
        ]
      },
      condition: {
        1: [
          'thuLy',
          'thulyThongbao',
          'fillSoqd',
          'fillNgayQd',
          'soQdXacMinhTC',
          'nguoiKyThanhLap',
          'numTrungCauGD',
          'reKetQuaXM',
          'soKetluanNdTocao',
          'dateThanhLap',
          'congBo',
          'bcNgThamquyen',
          'qdGqKhieunai',
          'soTbKqGqTocao',
          'congboCkKqGqTocao'
        ],
        2: ['saveLetter']
      },
      thuLy: {
        1: [
          'thulyThongbao',
          'fillSoqd',
          'fillNgayQd',
          'soQdXacMinhTC',
          'nguoiKyThanhLap',
          'numTrungCauGD',
          'reKetQuaXM',
          'soKetluanNdTocao',
          'dateThanhLap',
          'congBo',
          'bcNgThamquyen',
          'qdGqKhieunai',
          'soTbKqGqTocao',
          'congboCkKqGqTocao'
        ],
        2: ['koThuLyOption']
      }
    };
    for (const field of listToogle) {
      this.authorityForm.get(field).valueChanges.subscribe(val => {
        if (val == 1) {
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
            // this.addTailieuForm.get('tenTailieu').disable();
            // this.addTailieuForm.get('soLuong').disable();
            // this.addTailieuForm.get('tinhTrang').disable();
            this.modalAddInTailieuBiTocaoForm.get('ngay').disable();
            this.modalAddInTailieuBiTocaoForm.get('ghichu').disable();
            this.modalAddInTailieuBiTocaoForm.get('fileNamebitc').disable();
          }
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            this.authorityForm.get(fieldCHild).enable();
            this.authorityForm.get(fieldCHild).enable();
            // this.addTailieuForm.get('tenTailieu').enable();
            // this.addTailieuForm.get('soLuong').enable();
            // this.addTailieuForm.get('tinhTrang').enable();
            this.modalAddInTailieuBiTocaoForm.get('ngay').enable();
            this.modalAddInTailieuBiTocaoForm.get('ghichu').enable();
            this.modalAddInTailieuBiTocaoForm.get('fileNamebitc').enable();
          }
        }
        if (val == 2) {
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
            // this.addTailieuForm.get('tenTailieu').enable();
            // this.addTailieuForm.get('soLuong').enable();
            // this.addTailieuForm.get('tinhTrang').enable();
            this.modalAddInTailieuBiTocaoForm.get('ngay').enable();
            this.modalAddInTailieuBiTocaoForm.get('ghichu').enable();
            this.modalAddInTailieuBiTocaoForm.get('fileNamebitc').enable();
          }
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            this.authorityForm.get(fieldCHild).enable();
            // this.addTailieuForm.get('tenTailieu').disable();
            // this.addTailieuForm.get('soLuong').disable();
            // this.addTailieuForm.get('tinhTrang').disable();
            this.modalAddInTailieuBiTocaoForm.get('ngay').disable();
            this.modalAddInTailieuBiTocaoForm.get('ghichu').disable();
            this.modalAddInTailieuBiTocaoForm.get('fileNamebitc').disable();
          }
        }
      });
      this.authorityForm.get('noAuthorityOption').valueChanges.subscribe(res => {
        if (res == true) {
          this.authorityForm.get('chuyenDenDMBHXH').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').enable();
        }
        if (res == false) {
          this.authorityForm.get('chuyenDenCqctqName').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').enable();
        }
      });
      this.authorityForm.get('tailieu').valueChanges.subscribe(res => {
        if (res == 1) {
          this.addTailieuForm.get('tenTailieu').enable();
          this.addTailieuForm.get('soLuong').enable();
          this.addTailieuForm.get('tinhTrang').enable();
        }
        if (res == 2) {
          this.addTailieuForm.get('tenTailieu').disable();
          this.addTailieuForm.get('soLuong').disable();
          this.addTailieuForm.get('tinhTrang').disable();
        }
      });
    }
  }
}
