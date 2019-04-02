import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { NoiDmmaudonService } from '../../../../services/api/danh-muc/noi-dmmaudon/noi-dmmaudon.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { StatesService } from '../../../../services/api/state.service';
import { NoiDtkhieunaiService } from '../../../../services/api/noi-dtkhieunai/noi-dtkhieunai.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { AlertService } from '../../../../services/api/alert.service';
import { SIGNATURE, STATUS_LETTER, IS_ENOUGH_CONDITION, AUTHORITY, THULY, TOCHUC_DOITHOAI, AUTHORITYOPTION, dieu_kien } from '../../../../constants/giaiquyet-dt.constants';
import { setValue, pickBy } from '../../../../services/api/utils/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { FormService } from '../../../../shared/form-module/form.service';
import { PopUpPrintComponent } from '../pop-up-print/pop-up-print.component';
import { PopUpPrintMau05Component } from '../pop-up-print-mau05/pop-up-print-mau05.component';

@Component({
  selector: 'ttkt-thamquyen-gq-kn',
  templateUrl: './thamquyen-gq-kn.component.html',
  styleUrls: ['./thamquyen-gq-kn.component.scss']
})
export class ThamquyenGqKnComponent implements OnInit {
  @ViewChild('lgModal') modal: ModalDirective;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('addCqTcLq') addCqTcLq: ModalDirective;
  @ViewChild('modalAddNgayKhieunai') modalAddNgayKhieunai: ModalDirective;
  @ViewChild('modalAddNgayBiKhieunai') modalAddNgayBiKhieunai: ModalDirective;
  @ViewChild('modalMauDon') modalMauDon: ModalDirective;
  @ViewChild('modalThemCongVan') modalThemCongVan: ModalDirective;
  @Input() formQiaiquyetDt: FormGroup;
  @Input() source?: Subject<any>;
  @Input() preview?: boolean = false;
  @Input() editAble?: boolean = true;
  @Output('onSubmitted') onSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isExisted?: boolean = false;

  ObjectAuthorityForm: any;
  ObjaddCqTcLqForm: any;
  public dateThanhLap: any;
  public qdGqKhieunai: any;
  public soTbKqGqKhieunai: any;
  public dateTrungCauGD: any;
  public congBo: any;
  public hdDoithoai: any;
  public congboCkKqGqKhieunai: any;
  public fillSoqd: any;
  public fillNgayQd: any;
  public soQdXacMinhKN: string;
  public nguoiKyThanhLap: string;
  public numTrungCauGD: string;
  public numGiaiQuyetKN: string;
  public reKetQuaXM: string;
  themCongVanForm: FormGroup;



  account: any = {};
  authority: any;
  authorityForm: FormGroup;
  formModal: FormGroup;
  addCqTcLqForm: FormGroup;
  addCqTcLqFormSubmited: boolean = false;

  addNgayKhieunaiForm: FormGroup;
  addNgayKhieunaiFormSubmited: boolean = false;

  addNgayBiKhieunaiForm: FormGroup;
  addNgayBiKhieunaiFormSubmited: boolean = false;

  lyDoKhongThuLy: any;
  depend_authority: any;
  no_depend_authority: any;

  yes_thuly: any;
  no_thuly: any;

  thongBaoDT: any;
  bienBanDT: any;
  isRutdon: boolean = false;

  // authorityOptions: any = [
  //   { id: 1, name: 'Chưa được giải quyết' },
  //   { id: 2, name: 'Đã được giải quyết lần đầu' },
  //   { id: 3, name: 'Đã được giải quyết nhiều lần' }
  // ];
  noAuthorityOptions: any[] = [];
  reasons: any = [
    { id: 1, name: 'Quyết định hành chính, hành vi hành chính để chỉ đạo, tổ chức thực hiện nhiệm vụ, công vụ trong nội bộ cơ quan BHXH.' },
    // tslint:disable-next-line:max-line-length
    { id: 2, name: '­Quyết định hành chính, hành vi hành chính bị khiếu nại không liên quan trực tiếp đến quyền, lợi ích hợp pháp của người khiếu nại.' },
    { id: 3, name: 'Người khiếu nại không có năng lực hành vi dân sự đầy đủ mà không có người đại diện hợp pháp.' },
    { id: 4, name: '­Người đại diện không hợp pháp thực hiện khiếu nại.' },
    { id: 5, name: '­Đơn khiếu nại không có chữ ký hoặc điểm chỉ của người khiếu nại.' },
    { id: 6, name: 'Có văn bản thông báo đình chỉ việc giải quyết khiếu nại mà sau 30 ngày người khiếu nại không tiếp tục khiếu nại.' },
    // tslint:disable-next-line:max-line-length
    { id: 7, name: '­Việc khiếu nại đã được Tòa án thụ lý hoặc đã được giải quyết bằng bản án, quyết định của Toà án, trừ quyết định đình chỉ giải quyết vụ án hành chính của Tòa án.' },
    { id: 8, name: '­Khiếu nại đã có quyết định giải quyết khiếu nại lần 2.' }
  ];
  thuLy: any;
  enough_condition: any;
  no_enough_condition: any;
  no_condition: any;
  signature_one: any;
  signature_many: any;
  signature_none: any;
  authorityOption_none: any;
  authorityOption_one: any;
  authorityOption_many: any;
  du_dieuKien: any;
  khongDu_dieuKien: any;
  saveLetter: boolean = null;
  date: Date = new Date();
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: true,
  };
  // public myDatePickerOptions2: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   alignSelectorRight: true,
  //   showInputField: false
  // };
  // listTiepnhanTt = [
  //   '01/01/2015', '01/01/2015'
  // ];

  // listNguoiKhieunai = [
  //   '03/04/2016', '03/07/2016', '08/04/2017'
  // ];
  listCqTcLq = [];

  listTailieuNKN = [];
  statusOption: string;
  type_title_ngayKn: string;
  title_ngayKhieunai: string;
  type_tailieuKn: string;

  listTailieuBiKn = [
  ];
  title_them_xem_congvan: any = 'Thêm';
  title_button_congvan: any;
  title_popup_congvan: any;
  listCongVan: any = {};

  statusOptionBikn: string;
  title_ngayBiKhieunai: any;
  type_title_ngayBiKhieunai: any;

  type_tcLienquan: string;
  title_tcLienquan: string;
  // isChoosetn: boolean = false;
  // isChooseth: boolean = false;
  error: string = '';
  private status: number = 1;
  private rootPage: string = 'ql-tiep-cd/gq-kt/danh-sach-don-thu';
  private data: any = {};
  show_Pop_Up_Print = false;
  show_Pop_Up_Print_05 = false;


  constructor(
    private fb: FormBuilder,
    private noiDmmaudonService: NoiDmmaudonService,
    private noiAccountService: NoiAccountService,
    private statesService: StatesService,
    private noiDtkhieunaiService: NoiDtkhieunaiService,
    private router: Router,
    private timeBuilder: TimeBuilderService,
    private _alert: AlertService,
    private builder: FormBuilder,
    private formService: FormService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.date.setHours(0,0,0,0);
    this.themCongVanForm = this.builder.group({
      soCongVan: ['', Validators.required],
      ngayCongVan: ['', Validators.required],
      trichYeu: ['', Validators.required]
    });

    if (this.preview) {
      this.source.subscribe(res => {
        this.fillData(res);
      });
    }
    this.account = this.auth.currentUser;

    this.noiDmmaudonService.getAllDmMaudon(0, 10)
      .subscribe(res => {
        this.noAuthorityOptions = res.content;
      });

    this.ObjectAuthorityForm = {
      signature: [SIGNATURE.motnguoi.toString(), Validators.required],
      authority: ['', Validators.required],
      authorityOption: [AUTHORITYOPTION.no_giaiquyet.toString(), this.checkConditionRequired.bind(this)],
      noAuthorityOption: ['', this.checkConditionRequired.bind(this)],
      isDuDieuKienXuLy: [dieu_kien.DU_DIEUKIEN.toString(), this.checkConditionRequired.bind(this)],
      condition: [IS_ENOUGH_CONDITION.NO_ENOUGH_CONDITION, this.checkConditionRequired.bind(this)],
      saveLetter: ['', Validators.required],
      fillSoqd: [''],
      fillNgayQd: [this.date.toISOString()],
      soQdXacMinhKN: [null, Validators.required],
      dateThanhLap: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      nguoiKyThanhLap: [null, this.checkConditionRequired.bind(this)],
      congBo: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      dateTiepNhan: [null],
      dateTrungCauGD: [this.date.toISOString()],
      numTrungCauGD: [null],
      numGiaiQuyetKN: [null, this.checkConditionRequired.bind(this)],
      reKetQuaXM: [null, this.checkConditionRequired.bind(this)],
      lydoRutdonKn: [''],
      dataTableCheckbox: [''],
      hdDoithoai: [this.date.toISOString()],
      qdGqKhieunai: [this.date.toISOString(), this.checkConditionRequired.bind(this)],
      soTbKqGqKhieunai: [''],
      congboCkKqGqKhieunai: [this.date.toISOString(), this.checkConditionRequired.bind(this)]
    };
    this.authorityForm = this.fb.group(this.ObjectAuthorityForm);

    this.authorityForm.get("noAuthorityOption").valueChanges.subscribe(res => {
      this.title_them_xem_congvan = 'Thêm';
      this.themCongVanForm.reset();
    })

    this.formModal = this.fb.group({
      lyDoKhongThuLy: this.fb.array([])
    });
    this.signature_one = SIGNATURE.motnguoi;
    this.signature_many = SIGNATURE.nhieunguoi;
    this.signature_none = SIGNATURE.nacdanh;
    this.authorityOption_none = AUTHORITYOPTION.no_giaiquyet;
    this.authorityOption_one = AUTHORITYOPTION.giaiquyet_mot;
    this.authorityOption_many = AUTHORITYOPTION.giaiquyet_nhieu;
    this.du_dieuKien = dieu_kien.DU_DIEUKIEN;
    this.khongDu_dieuKien = dieu_kien.KHONGDU_DIEUKIEN;
    this.enough_condition = IS_ENOUGH_CONDITION.ENOUGH_CONDITION;
    this.no_enough_condition = IS_ENOUGH_CONDITION.NO_ENOUGH_CONDITION;
    this.no_condition = IS_ENOUGH_CONDITION.NO_CONDITION;
    this.depend_authority = AUTHORITY.thuoc_tq;
    this.no_depend_authority = AUTHORITY.khongthuoc_tq;
    this.yes_thuly = THULY.thuly;
    this.no_thuly = THULY.no_thuly;
    this.thongBaoDT = TOCHUC_DOITHOAI.thongbao_dt;
    this.bienBanDT = TOCHUC_DOITHOAI.bienban_dt;
    this.ObjaddCqTcLqForm = {
      name: ['', Validators.required],
      diachi: ['', Validators.required],
      ngay: ['', Validators.required],
      id: ['']
    };
    this.addCqTcLqForm = this.fb.group(this.ObjaddCqTcLqForm);

    this.addNgayKhieunaiForm = this.fb.group({
      ngay: ['', Validators.required],
      ghichu: [''],
      tailieu: ['',],
      fileName: [''],
      isRutdon: [''],
      id: ['']
    });
    this.addNgayBiKhieunaiForm = this.fb.group({
      id: [''],
      ngay: ['', Validators.required],
      ghichu: [''],
      fileNamebiKN: ['']
    });
    // this.toogleValidate();
  }

  patchValueAuthorityForm(detail) {
    const xacMinhGQKN = detail.xacMinhGQKN || {};
    this.authorityForm.patchValue({
      fillSoqd: xacMinhGQKN.soThongBaoThuLy || '',
      fillNgayQd: xacMinhGQKN.ngayThongBaoThuLy || '',
      soQdXacMinhKN: xacMinhGQKN.soQuyetDinh,
      nguoiKyThanhLap: xacMinhGQKN.nguoiKyQD,
      dateThanhLap: xacMinhGQKN.ngayKyQD,
      congBo: xacMinhGQKN.ngayCongBo,
      hdDoithoai: xacMinhGQKN.ngayHoatDongDT,
      qdGqKhieunai: xacMinhGQKN.ngayQuyetDinhGQKN,
      soTbKqGqKhieunai: xacMinhGQKN.ngayThongBaoKQ,
      congboCkKqGqKhieunai: xacMinhGQKN.ngayCongKhaiKQ,
      dateTrungCauGD: xacMinhGQKN.ngayTrungCauGD,
      numTrungCauGD: xacMinhGQKN.soTrungCauGD,
      numGiaiQuyetKN: xacMinhGQKN.soGiaiQuyetKN,
      reKetQuaXM: xacMinhGQKN.bcKetQuaXM
    });
  }

  fillData(data: any) {
    console.log(data);
    const _data: any = {};
    const detail = data.detail || {};
    this.patchValueAuthorityForm(detail);
    const saveLetter = detail.donThu.luuDon;
    let signature;
    if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === false) {
      signature = '1';
    } else if (detail.donThu.isChuKyMotNguoi === false && detail.donThu.isNacDanh === false) {
      signature = '2';
    } else if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === true) {
      signature = '3';
    }
    const authority = setValue(detail.donThu.isThuocThamQuyen, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const authorityOption = detail.isKhieuNaiLanDau;
    const isDuDieuKienXuLy =setValue(detail.donThu.isDuDieuKienXuLy, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    let condition;
    if (detail.donThu.hasThuLy === true && detail.donThu.isDuDieuKienThuLy === true) {
      condition = 1;
    } else if (detail.donThu.hasThuLy === true && detail.donThu.isDuDieuKienThuLy === false) {
      condition = 2;
    } else if (detail.donThu.hasThuLy === false && detail.donThu.isDuDieuKienThuLy === false) {
      condition = 3;
    }
    const xacMinhGQKN = detail.xacMinhGQKN || {};
    const id = detail.id || null;
    const donThu: any = {};
    const _xacMinhGQKN_id = xacMinhGQKN.id;
    donThu.id = detail.donThuId;
    if (detail.donThu.isThuocThamQuyen) {
      const fillSoqd = xacMinhGQKN.soThongBaoThuLy || '';
      const fillNgayQd = xacMinhGQKN.ngayThongBaoThuLy || '';
      const soQdXacMinhKN = xacMinhGQKN.soQuyetDinh;
      const nguoiKyThanhLap = xacMinhGQKN.nguoiKyQD;
      const dateThanhLap = xacMinhGQKN.ngayKyQD;
      const qdGqKhieunai = xacMinhGQKN.ngayQuyetDinhGQKN;
      const soTbKqGqKhieunai = xacMinhGQKN.ngayThongBaoKQ;
      const dateTrungCauGD = xacMinhGQKN.ngayTrungCauGD;
      const numTrungCauGD = xacMinhGQKN.soTrungCauGD;
      const numGiaiQuyetKN = xacMinhGQKN.soGiaiQuyetKN;
      const reKetQuaXM = xacMinhGQKN.bcKetQuaXM;
      const congBo = xacMinhGQKN.ngayCongBo;
      const hdDoithoai = xacMinhGQKN.ngayHoatDongDT;
      const congboCkKqGqKhieunai = xacMinhGQKN.ngayCongKhaiKQ;
      const _listTailieuNKN = xacMinhGQKN.lamViecVoiNKNS || [];
      const listTailieuNKN: any = [];
      _listTailieuNKN.forEach(el => {
        const _el: any = {};
        _el.id = el.id;
        _el.ngay = this.timeBuilder.fromString(el.ngayLamViec).get();
        _el.tailieus = el.taiLieu;
        _el.rutdon = el.hasRutDon;
        _el.ghichu = el.ghiChu;
        listTailieuNKN.push(_el);
      });
      const _listTailieuBiKn = xacMinhGQKN.lamViecVoiNBKNS || [];
      const listTailieuBiKn: any = [];
      _listTailieuBiKn.forEach(el => {
        const _el: any = {};
        _el.id = el.id;
        _el.ngay = this.timeBuilder.fromString(el.ngayLamViec).get();
        _el.tailieus = el.taiLieu;
        _el.ghichu = el.ghiChu;
        listTailieuBiKn.push(_el);
      });
      const _listCqTcLq = xacMinhGQKN.coQuanToChucLQS || [];
      const listCqTcLq: any = [];
      _listCqTcLq.forEach(el => {
        const _el: any = {};
        _el.id = el.id;
        _el.ngay = this.timeBuilder.fromString(el.ngayLamViec).get();
        _el.name = el.tenCoQuanToChuc;
        _el.diachi = el.diaChi;
        listCqTcLq.push(_el);
      });
      _data.fillSoqd = fillSoqd;
      _data.fillNgayQd = fillNgayQd;
      _data.soQdXacMinhKN = soQdXacMinhKN;
      _data.nguoiKyThanhLap = nguoiKyThanhLap;
      _data.numTrungCauGD = numTrungCauGD;
      _data.numGiaiQuyetKN = numGiaiQuyetKN;
      _data.reKetQuaXM = reKetQuaXM;
      _data.dateThanhLap = dateThanhLap;
      _data.qdGqKhieunai = qdGqKhieunai;
      _data.soTbKqGqKhieunai = soTbKqGqKhieunai;
      _data.dateTrungCauGD = dateTrungCauGD;
      _data.congBo = congBo;
      _data.hdDoithoai = hdDoithoai;
      _data.congboCkKqGqKhieunai = congboCkKqGqKhieunai;
      this.listTailieuNKN = listTailieuNKN;
      this.listTailieuBiKn = listTailieuBiKn;
      this.listCqTcLq = listCqTcLq;
    }
    if (detail.mauKoThuocTQId) {
      const noAuthorityOption = detail.mauKoThuocTQId;
      _data.noAuthorityOption = noAuthorityOption;
    }

    _data.soCongVan = detail.donThu.soCongVanKN;
    _data.ngayCongVan = detail.donThu.ngayCongVanKN;
    _data.trichYeu = detail.donThu.trichYeuNoiDung;

    _data.signature = signature;
    _data.authority = authority;
    _data.authorityOption = authorityOption;
    _data.isDuDieuKienXuLy = isDuDieuKienXuLy;
    _data.condition = condition;
    _data.saveLetter = saveLetter;
    _data.id = id;
    _data.donThu = donThu;
    _data.xacMinhGQKN_id = _xacMinhGQKN_id;
    this.data = _data;
    this.patchData(_data);
  }
  patchData(data: any) {
    this.authorityForm.patchValue({
      signature: data.signature,
      authority: data.authority,
      isDuDieuKienXuLy: data.isDuDieuKienXuLy,
      condition: data.condition,
      saveLetter: data.saveLetter
    });
    this.fillSoqd = data.fillSoqd,
      this.fillNgayQd = data.fillNgayQd,
      this.soQdXacMinhKN = data.soQdXacMinhKN,
      this.nguoiKyThanhLap = data.nguoiKyThanhLap,
      this.dateThanhLap = data.dateThanhLap,
      this.qdGqKhieunai = data.qdGqKhieunai,
      this.soTbKqGqKhieunai = data.soTbKqGqKhieunai,
      this.dateTrungCauGD = data.dateTrungCauGD,
      this.congBo = data.congBo,
      this.hdDoithoai = data.hdDoithoai,
      this.congboCkKqGqKhieunai = data.congboCkKqGqKhieunai,
      this.numTrungCauGD = data.numTrungCauGD,
      this.numGiaiQuyetKN = data.numGiaiQuyetKN,
      this.reKetQuaXM = data.reKetQuaXM,
      this.changeAuthority();
    this.authorityForm.patchValue({
      authorityOption: String(data.authorityOption),
      noAuthorityOption: data.noAuthorityOption
    });
    if (data.soCongVan !== null) {
      this.title_them_xem_congvan = 'Xem';
      this.listCongVan.soCongVan = data.soCongVan;
      this.listCongVan.ngayCongVan = data.ngayCongVan;
      this.listCongVan.trichYeu = data.trichYeu;
    } else {
      this.title_them_xem_congvan = 'Thêm';
    }
  }

  // removeDateKhieunai(i) {
  //   this.listNguoiKhieunai.splice(i, 1);
  // }

  changeAuthority() {
    this.authority = this.authorityForm.value.authority;
    if (this.authority === '1') {
      this.authorityForm.patchValue({thuLy: 0 }); // authorityOption: 0, 
      this.thuLy = this.authorityForm.value.thuLy;
    } else if (this.authority === '2') {
      this.authorityForm.patchValue({ noAuthorityOption: 0, thuLy: 0 });
      this.thuLy = this.authorityForm.value.thuLy;
    }
  }
  // onDateChanged(event: IMyDateModel) {
  //   const date = new Date(event.jsdate).toLocaleDateString();
  //   // tslint:disable-next-line:triple-equals
  //   if (date != '' && date != '1/1/1970') {
  //     this.isChoosetn = true;
  //     this.listTiepnhanTt.push(new Date(event.jsdate).toLocaleDateString());
  //   } else {
  //     this.isChoosetn = false;
  //   }
  // }
  // removeDateTnTt(index) {
  //   console.log(index);
  //   this.listTiepnhanTt.splice(index, 1);
  // }
  // onDateChangedNguoiKn(event: IMyDateModel) {
  //   const date = new Date(event.jsdate).toLocaleDateString();
  //   // tslint:disable-next-line:triple-equals
  //   if (date != '' && date != '1/1/1970') {
  //     this.isChooseth = true;
  //     this.listNguoiKhieunai.push(new Date(event.jsdate).toLocaleDateString());
  //   } else {
  //     this.isChooseth = false;
  //   }
  // }
  //
  // rutdonKhieunai() {
  //   this.isRutdon = true;
  // }

  onSubmit() {
    const formValue = this.authorityForm.value;
    const jframe = document.getElementById('iframePrint');
    if (formValue.thuLy == this.yes_thuly) {
      jframe.setAttribute('src', '../../../../../assets/print-document/04_KN_Phieudexuatxulydon.html');
      this.printDocument.show();
    } else if (formValue.thuLy == this.no_thuly) {
      jframe.setAttribute('src', '../../../../../assets/print-document/05_KN_ThongBaoKhieuNaiKhongDuDieuKienGiaiQuyet.html');
      this.printDocument.show();
    } else {
      if (formValue.authority == this.depend_authority) {
        if (formValue.authorityOption == 1) {
          jframe.setAttribute('src', '../../../../../assets/print-document/07_KN_Huongdankhieunailan2.html');
          this.printDocument.show();
        } else {
          jframe.setAttribute('src', '../../../../../assets/print-document/13_KN_VeViecXacMinhNoiDungKhieuNai.html');
          this.printDocument.show();
        }
      } else {
        if (formValue.noAuthorityOption == 1) {
          jframe.setAttribute('src', '../../../../../assets/print-document/08_KN_HuongDanGuiDonKhieuNaiDenCqCoTq.html');
          this.printDocument.show();
          // tslint:disable-next-line:triple-equals
        } else if (formValue.noAuthorityOption == 2) {
          jframe.setAttribute('src', '../../../../../assets/print-document/06_KN_ChuyendonKNTCvetinh.html');
          this.printDocument.show();
          // tslint:disable-next-line:triple-equals
        } else if (formValue.noAuthorityOption == 3) {
          jframe.setAttribute('src', '../../../../../assets/print-document/09_KN_CVTraLaiDonKNChoCQToChuc.html');
          this.printDocument.show();
        } else {
          jframe.setAttribute('src', '../../../../../assets/print-document/07_KN_Huongdankhieunailan2.html');
          this.printDocument.show();
        }
      }
    }
  }

  // Them, sua, xoa Table LamViecNguoiKN
  showModalAddNgayKN() {
    // this.modalListAddTailieuTc = [];
    this.statusOption = 'add';
    this.type_title_ngayKn = 'Thêm';
    this.addNgayKhieunaiForm.reset();
    this.addNgayKhieunaiForm.patchValue({ ngay: this.date});
    this.addNgayKhieunaiFormSubmited = false;
    this.title_ngayKhieunai = 'khiếu nại';
    this.type_tailieuKn = 'khieunai';
    this.modalAddNgayKhieunai.show();
  }

  editNgayKhieunai(i) {
    this.statusOption = 'edit';
    this.type_title_ngayKn = 'Sửa';
    this.title_ngayKhieunai = 'khiếu nai';
    this.type_tailieuKn = 'tocao';
    this.addNgayKhieunaiForm.reset();
    this.addNgayKhieunaiFormSubmited = false;
    this.addNgayKhieunaiForm.patchValue({
      id: i,
      ngay: this.listTailieuNKN[i].ngay,
      ghichu: this.listTailieuNKN[i].ghichu,
      isRutdon: this.listTailieuNKN[i].rutdon,
      fileName: this.listTailieuNKN[i].tailieus
    });
    this.modalAddNgayKhieunai.show();
  }

  deleteNgayKhieunai(i) {
    this.statusOption = 'delete';
    this.type_title_ngayKn = 'Xóa';
    this.title_ngayKhieunai = 'khiếu nại';
    this.type_tailieuKn = 'tocao';
    this.addNgayKhieunaiForm.reset();
    this.addNgayKhieunaiForm.patchValue({
      id: i,
      ngay: this.listTailieuNKN[i].ngay,
      ghichu: this.listTailieuNKN[i].ghichu,
      fileName: this.listTailieuNKN[i].tailieus,
      isRutdon: this.listTailieuNKN[i].rutdon
    });
    this.modalAddNgayKhieunai.show();
  }

  onSubmitModalAddNgayKn() {
    this.addNgayKhieunaiForm.updateValueAndValidity();
    if (this.addNgayKhieunaiForm.invalid) {
      this.addNgayKhieunaiFormSubmited = true;
      return;
    }
    const formValue = this.addNgayKhieunaiForm.value;
    const data: any = {};
    data.ngay = formValue.ngay;
    data.ghichu = formValue.ghichu;
    data.rutdon = formValue.isRutdon ? formValue.isRutdon : false;
    data.tailieus = formValue.fileName;
    this.listTailieuNKN.push(data);
    this.modalAddNgayKhieunai.hide();
  }

  onSubmitModalEditNgayKn() {
    this.addNgayKhieunaiForm.updateValueAndValidity();
    if (this.addNgayKhieunaiForm.invalid) {
      this.addNgayKhieunaiFormSubmited = true;
      return;
    }
    const formValue = this.addNgayKhieunaiForm.value;
    this.listTailieuNKN[formValue.id].id = this.listTailieuNKN[formValue.id].id;
    this.listTailieuNKN[formValue.id].ngay = formValue.ngay;
    this.listTailieuNKN[formValue.id].ghichu = formValue.ghichu;
    this.listTailieuNKN[formValue.id].tailieus = formValue.fileName;
    this.listTailieuNKN[formValue.id].rutdon = formValue.isRutdon;
    this.modalAddNgayKhieunai.hide();
  }

  onSubmitModalDeleteNgayKn() {
    const formValue = this.addNgayKhieunaiForm.value;
    this.listTailieuNKN.splice(formValue.id, 1);
    this.modalAddNgayKhieunai.hide();
  }

  // Them, sua, xoa Table LamViecNguoiBiKN
  showModalAddNgayBiKn() {
    this.addNgayBiKhieunaiForm.reset();
    this.addNgayBiKhieunaiForm.patchValue({ ngay: this.date});
    this.addNgayBiKhieunaiFormSubmited = false;
    this.statusOptionBikn = 'add';
    this.title_ngayBiKhieunai = 'Thêm ngày làm việc với người bị khiếu nại';
    this.type_title_ngayBiKhieunai = 'bikhieunai';
    this.modalAddNgayBiKhieunai.show();
  }

  editNgayBitKhieunai(i) {
    this.addNgayBiKhieunaiForm.reset();
    this.addNgayBiKhieunaiFormSubmited = false;
    this.statusOptionBikn = 'edit';
    this.title_ngayBiKhieunai = 'Sửa ngày làm việc với người bị khiếu nại';
    this.type_title_ngayBiKhieunai = 'bikhieunai';
    this.addNgayBiKhieunaiForm.patchValue({
      id: i,
      ngay: this.listTailieuBiKn[i].ngay,
      ghichu: this.listTailieuBiKn[i].ghichu,
      fileNamebiKN: this.listTailieuBiKn[i].tailieus
    });
    this.modalAddNgayBiKhieunai.show();
  }

  deleteNgayBikhieunai(i) {
    this.addNgayBiKhieunaiForm.reset();
    this.statusOptionBikn = 'delete';
    // this.type_tile_tailieuTc = 'Sửa';
    this.title_ngayBiKhieunai = 'Xóa ngày làm việc với người bị khiếu nại';
    this.type_title_ngayBiKhieunai = 'bikhieunai';
    // this.addInTailieuTocaoForm.reset();
    this.addNgayBiKhieunaiForm.patchValue({
      id: i,
      ngay: this.listTailieuBiKn[i].ngay,
      ghichu: this.listTailieuBiKn[i].ghichu,
      fileNamebiKN: this.listTailieuBiKn[i].tailieus
    });
    this.modalAddNgayBiKhieunai.show();
  }

  onSubmitModalAddNgayBiKn() {
    this.addNgayBiKhieunaiForm.updateValueAndValidity();
    if (this.addNgayBiKhieunaiForm.invalid) {
      this.addNgayBiKhieunaiFormSubmited = true;
      return;
    }
    const formValue = this.addNgayBiKhieunaiForm.value;
    const data: any = {};
    data.ngay = formValue.ngay;
    data.ghichu = formValue.ghichu;
    data.tailieus = formValue.fileNamebiKN;
    this.listTailieuBiKn.push(data);
    this.modalAddNgayBiKhieunai.hide();
  }

  onSubmitModalEditNgayBiKn() {
    this.addNgayBiKhieunaiForm.updateValueAndValidity();
    if (this.addNgayBiKhieunaiForm.invalid) {
      this.addNgayBiKhieunaiFormSubmited = true;
      return;
    }
    const formValue = this.addNgayBiKhieunaiForm.value;
    // this.listTailieuBiKn[formValue.id].id = this.listTailieuBiKn[formValue.id].id;
    this.listTailieuBiKn[formValue.id].ngay = formValue.ngay;
    this.listTailieuBiKn[formValue.id].ghichu = formValue.ghichu;
    this.listTailieuBiKn[formValue.id].tailieus = formValue.fileNamebiKN;
    this.modalAddNgayBiKhieunai.hide();
  }

  onSubmitModalDeleteNgayBiKn() {
    const formValue = this.addNgayBiKhieunaiForm.value;
    this.listTailieuBiKn.splice(formValue.id, 1);
    this.modalAddNgayBiKhieunai.hide();
  }

  // Them, sua, xoa Table LamViecToChucLienQuan
  onThemLienquan() {
    this.addCqTcLqFormSubmited = false;
    this.type_tcLienquan = 'add';
    this.title_tcLienquan = 'Thêm';
    this.addCqTcLqForm.reset();
    this.addCqTcLqForm.patchValue({ ngay: this.date});
    this.addCqTcLq.show();
  }

  editKNLienquan(i) {
    this.type_tcLienquan = 'edit';
    this.title_tcLienquan = 'Sửa';
    this.addCqTcLqForm.patchValue({
      name: this.listCqTcLq[i].name,
      diachi: this.listCqTcLq[i].diachi,
      ngay: this.listCqTcLq[i].ngay,
      id: i
    });
    this.addCqTcLq.show();
  }

  deleteKNLienquan(i) {
    this.type_tcLienquan = 'delete';
    this.title_tcLienquan = 'Xóa';
    this.addCqTcLqForm.patchValue({
      name: this.listCqTcLq[i].name,
      diachi: this.listCqTcLq[i].diachi,
      ngay: this.listCqTcLq[i].ngay,
      id: i
    });
    this.addCqTcLq.show();
  }

  onSubmitAddCqKNLqModal() {
    this.addCqTcLqForm.updateValueAndValidity();
    if (!this.addCqTcLqForm.valid) {
      this.addCqTcLqFormSubmited = true;
      return;
    }
    const formValua = this.addCqTcLqForm.value;
    const data: any = {};
    data.name = formValua.name;
    data.diachi = formValua.diachi;
    data.ngay = formValua.ngay;
    this.listCqTcLq.push(data);
    this.addCqTcLq.hide();
  }

  onSubmitEditCqKNLqModal() {
    this.addCqTcLqForm.updateValueAndValidity();
    if (!this.addCqTcLqForm.valid) {
      this.addCqTcLqFormSubmited = true;
      return;
    }
    const formValua = this.addCqTcLqForm.value;
    this.listCqTcLq[formValua.id].name = formValua.name;
    this.listCqTcLq[formValua.id].diachi = formValua.diachi;
    this.listCqTcLq[formValua.id].ngay = formValua.ngay;
    this.addCqTcLq.hide();
  }

  onSubmitDeleteCqKNLqModal() {
    const formValua = this.addCqTcLqForm.value;
    this.listCqTcLq.splice(formValua.id, 1);
    this.addCqTcLq.hide();
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

  updateRequiredFormXM() {
    const listControl = ['fillSoqd','fillNgayQd','soQdXacMinhKN', 'nguoiKyThanhLap', 'dateThanhLap'
    ,'congBo','reKetQuaXM','numGiaiQuyetKN','qdGqKhieunai','congboCkKqGqKhieunai','numTrungCauGD','dateTrungCauGD','hdDoithoai'];
    for(const control of listControl){
      this.authorityForm.get(control).setValue('', { emitEvent: false });
      this.authorityForm.get(control).disable({ emitEvent: false });
    }
    this.addNgayKhieunaiForm.get('ngay').disable({ emitEvent: false });
    this.addNgayBiKhieunaiForm.get('ngay').disable({ emitEvent: false });
  }
  updateRequiredFormThemCV(){
    const listControl = ['soCongVan', 'ngayCongVan', 'trichYeu'];
    for(const control of listControl){
      this.themCongVanForm.get(control).setValue('', { emitEvent: false });
    this.themCongVanForm.get(control).disable({ emitEvent: false });
    }
  }
  saveDonThu({ action }) {
    const donThu: any = {};
    donThu.createBy = { id: this.account.id };
    donThu.soCongVanKN = this.listCongVan.soCongVan;
    donThu.ngayCongVanKN = this.listCongVan.ngayCongVan;
    donThu.trichYeuNoiDung = this.listCongVan.trichYeu;
    donThu.actived = true;
    donThu.diaChiCongDan = this.formQiaiquyetDt.get('diaChi').value;
    donThu.dmBHXH = {
      'id': this.account.donViId
    };
    donThu.hoTenCongDan = this.formQiaiquyetDt.get('hoTenCd').value;
    donThu.lastModifiedBy = {
      id: this.account.id,
    };
    donThu.ngayCongVan = this.formQiaiquyetDt.get('ngayThang').value;
    if (action === 'ketthuc') {
      donThu.ngayKetThuc = this.timeBuilder.current().setUTC().toISOString();
    }
    donThu.ngayTiepNhan = this.timeBuilder.fromTimeDatePicker(this.formQiaiquyetDt.get('ngayThang').value).setUTC().toISOString();
    donThu.noiDung = this.formQiaiquyetDt.get('noiDung').value;
    donThu.phanLoaiNoiDung = {
      id: this.formQiaiquyetDt.get('selectType').value,
    };
    donThu.soCMTND = this.formQiaiquyetDt.get('soCMND').value;
    donThu.soCongVanDen = this.formQiaiquyetDt.get('soCongVanDen').value;
    donThu.tiepCongDanId = this.formQiaiquyetDt.get('quaTc').value ? this.formQiaiquyetDt.get('tiepCongDanId').value : null;
    donThu.id = this.formQiaiquyetDt.get('id').value;
    donThu.status = this.status;

    if (Number(this.authorityForm.value.signature) === 1) {
      donThu.isChuKyMotNguoi = true;
      donThu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 2) {
      donThu.isChuKyMotNguoi = false;
      donThu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 3) {
      donThu.isChuKyMotNguoi = true;
      donThu.isNacDanh = true;
    }
    //đủ điều kiện xử lí
    if(Number(this.authorityForm.value.isDuDieuKienXuLy) == 2){
      donThu.isDuDieuKienXuLy = false;
      donThu.luuDon = true;
      this.updateRequiredFormThemCV();
      this.updateValueAndValidityForm(this.authorityForm, 'authority', null);
      this.updateValueAndValidityForm(this.authorityForm, 'noAuthorityOption', null);
      this.authorityForm.get('authority').setValue(null);
      this.authorityForm.get('noAuthorityOption').setValue(null);
      this.updateRequiredFormXM();
    }else{
      donThu.isDuDieuKienXuLy = true;
      donThu.luuDon = null;
    }
    //thuộc thẩm quyền
    if (Number(this.authorityForm.value.authority) === 1) {
      donThu.isThuocThamQuyen = true;
      this.listCongVan = {};
      this.updateRequiredFormThemCV();
      this.updateValueAndValidityForm(this.authorityForm, 'noAuthorityOption', null);
    } else if (Number(this.authorityForm.value.authority) === 2) {
      donThu.isThuocThamQuyen = false;
      this.updateRequiredFormXM();
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      this.updateValueAndValidityForm(this.authorityForm, 'condition', null);
      this.authorityForm.get('condition').setValue('');
    }else{
      donThu.isThuocThamQuyen = null;
      this.updateRequiredFormThemCV();
      this.updateValueAndValidityForm(this.authorityForm, 'condition', null);
      this.authorityForm.get('condition').setValue('');
    }
    //điều kiện thụ lý
    if (Number(this.authorityForm.value.condition) === 1) {
      donThu.isDuDieuKienThuLy = true;
      donThu.hasThuLy = true;
      donThu.luuDon = null;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      this.updateRequiredFormThemCV();
    } else if (Number(this.authorityForm.value.condition) === 2) {
      if(this.authorityForm.value.saveLetter === false){
        donThu.isDuDieuKienThuLy = false;
        donThu.hasThuLy = true;
        donThu.luuDon = false;
        this.updateRequiredFormThemCV();
        this.updateRequiredFormXM();
      }else{
        if(action == 'ketthuc'){
          this._alert.error('Bạn phải chọn mẫu thông báo');
          return;
        }
      }
    } else if (Number(this.authorityForm.value.condition) === 3) {
      donThu.isDuDieuKienThuLy = false;
      donThu.hasThuLy = false;
      donThu.luuDon = null;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      this.updateValueAndValidityForm(this.authorityForm, 'noAuthorityOption', null);
      this.updateRequiredFormThemCV();
      this.updateRequiredFormXM();
    }
    return donThu;
  }

  onSave({ action }) {
    if (this.isExisted) {
      this._alert.error('Số công văn đến đã tồn tại!');
      return;
    }
    const formValue = this.authorityForm.value;
    let formBody: any = {};

    let xacMinhGQKN: any = {};

    const xacMinhGQKN_coQuanToChucLQS: any = [];
    this.listCqTcLq.forEach(el => {
      const coQuan: any = {};
      if (el.id) {
        coQuan.id = el.id;
      }
      coQuan.actived = true;
      coQuan.diaChi = el.diachi;
      coQuan.ngayLamViec = this.timeBuilder.fromString(el.ngay).setUTC().toISOString();
      coQuan.tenCoQuanToChuc = el.name;
      coQuan.xacMinhGQKN = {};
      xacMinhGQKN_coQuanToChucLQS.push(coQuan);
    });
    const xacMinhGQKN_donThu: any = {};
    const xacMinhGQKN_dtKhieuNai: any = {};
    const xacMinhGQKN_lamViecVoiNBKNS: any = [];
    const mauKoThuocTQ: any = this.noAuthorityOptions[formValue.noAuthorityOption - 1];

    this.listTailieuBiKn.forEach(el => {
      const taiLieu: any = {};
      if (el.id) {
        taiLieu.id = el.id;
      }
      taiLieu.actived = true;
      taiLieu.ghiChu = el.ghichu;
      taiLieu.ngayLamViec = this.timeBuilder.fromString(el.ngay).setUTC().toISOString();
      taiLieu.taiLieu = el.tailieus;
      taiLieu.xacMinhGQKN = {};
      xacMinhGQKN_lamViecVoiNBKNS.push(taiLieu);
    });
    const xacMinhGQKN_lamViecVoiNKNS: any = [];
    this.listTailieuNKN.forEach(el => {
      const taiLieu: any = {};
      if (el.id) {
        taiLieu.id = el.id;
      }
      taiLieu.actived = true;
      taiLieu.ghiChu = el.ghichu;
      // taiLieu.id = el.id;
      taiLieu.hasRutDon = el.rutdon;
      taiLieu.ngayLamViec = this.timeBuilder.fromString(el.ngay).setUTC().toISOString();
      taiLieu.taiLieu = el.tailieus;
      taiLieu.xacMinhGQKN = {}; // not sure
      xacMinhGQKN_lamViecVoiNKNS.push(taiLieu);
    });
    xacMinhGQKN.coQuanToChucLQS = xacMinhGQKN_coQuanToChucLQS;
    xacMinhGQKN.donThu = xacMinhGQKN_donThu;
    xacMinhGQKN.dtKhieuNai = xacMinhGQKN_dtKhieuNai;
    xacMinhGQKN.lamViecVoiNBKNS = xacMinhGQKN_lamViecVoiNBKNS;
    xacMinhGQKN.lamViecVoiNKNS = xacMinhGQKN_lamViecVoiNKNS;
    xacMinhGQKN.ngayCongBo = formValue.congBo;
    xacMinhGQKN.ngayCongKhaiKQ = formValue.congboCkKqGqKhieunai; // not sure
    xacMinhGQKN.ngayHoatDongDT = formValue.hdDoithoai;
    xacMinhGQKN.ngayKyQD = formValue.dateThanhLap;
    xacMinhGQKN.ngayQuyetDinhGQKN = formValue.qdGqKhieunai;
    xacMinhGQKN.ngayThongBaoKQ = formValue.soTbKqGqKhieunai;
    xacMinhGQKN.ngayTrungCauGD = formValue.dateTrungCauGD;
    xacMinhGQKN.nguoiKyQD = formValue.nguoiKyThanhLap;
    xacMinhGQKN.soQuyetDinh = formValue.soQdXacMinhKN;
    xacMinhGQKN.soTrungCauGD = formValue.numTrungCauGD;
    xacMinhGQKN.soGiaiQuyetKN = formValue.numGiaiQuyetKN;
    xacMinhGQKN.bcKetQuaXM = formValue.reKetQuaXM;
    xacMinhGQKN.ngayThongBaoThuLy = formValue.fillNgayQd;
    xacMinhGQKN.soThongBaoThuLy = formValue.fillSoqd;
    xacMinhGQKN = pickBy(xacMinhGQKN, { notEmpty: true, notNull: true, notUndefined: true, notStringEmpty: true });
    formBody.actived = true;
    formBody.status = this.status;
    formBody.isKhieuNaiLanDau = Number(formValue.authorityOption);
    formBody.donThu = this.saveDonThu({ action });
    formBody.mauKoThuocTQ = mauKoThuocTQ;
    formBody.xacMinhGQKN = xacMinhGQKN;
    let api = 'createNewDtKhieuNai';
    if (this.preview) {
      api = 'updateNewDtKhieuNai';
      formBody.id = this.data.id;
      formBody.donThu.id = ((this.data || {}).donThu || {}).id;
    }
    if (formBody.donThu.soCongVanDen !== null) {
      formBody.donThu.soCongVanDen = formBody.donThu.soCongVanDen.trim();
    }
    formBody = pickBy(formBody, { notEmpty: true, notNull: true, notUndefined: true, notStringEmpty: true });
    if (formBody.xacMinhGQKN) {
      formBody.xacMinhGQKN.id = this.data.xacMinhGQKN_id || null;
      formBody.xacMinhGQKN.actived = true;
    }
    if(formBody.donThu.isDuDieuKienXuLy == false){
      formValue.noAuthorityOption = null;
    }
    if (this.formQiaiquyetDt.invalid) {
      this.formService.touchAllInput(this.formQiaiquyetDt, true);
      this._alert.error('Cần nhập các phần bắt buộc ở Giải quyết đơn thư KN, TC, KNPA');
      return;
    }
    if (action == 'ketthuc') {
      this.formService.touchAllInput(this.formQiaiquyetDt, true);
      this.formService.touchAllInput(this.authorityForm, true);
      this.formService.touchAllInput(this.addNgayKhieunaiForm, true);
      this.formService.touchAllInput(this.addNgayBiKhieunaiForm, true);
      this.formService.touchAllInput(this.themCongVanForm, true);
      if (this.authorityForm.invalid || this.formQiaiquyetDt.invalid
        || ( (formValue.noAuthorityOption != null && formValue.noAuthorityOption != undefined &&  formValue.noAuthorityOption != '') && (formBody.donThu.soCongVanKN == null || formBody.donThu.soCongVanKN == undefined) )
        || (formValue.condition == IS_ENOUGH_CONDITION.ENOUGH_CONDITION && (this.listTailieuNKN.length === 0 || this.listTailieuBiKn.length === 0))) {
          console.log(this.formService.getErrorList(this.authorityForm), 
          this.formService.getErrorList(this.addNgayKhieunaiForm), this.formService.getErrorList(this.addNgayBiKhieunaiForm), 
          this.formService.getErrorList(this.themCongVanForm));
        if (action === 'luutam') {
          this._alert.error('Lưu tạm làm việc không thành công!');
        } else if (action === 'ketthuc') {
          this._alert.error('Kết thúc làm việc không thành công!');
        }
        return;
      }
    }
    this.noiDtkhieunaiService[api](formBody)
      .subscribe(res => {
        this.router.navigate([this.rootPage]);
        if (action === 'luutam') {
          this._alert.success('Lưu tạm làm việc  thành công!', { delay: 1000 });
        } else if (action === 'ketthuc') {
          this._alert.success('Kết thúc làm việc thành công!', { delay: 1000 });
        }
      }, err => {
        if (action === 'luutam') {
          this._alert.error('Lưu tạm làm việc không thành công!', { delay: 1000 });

        } else if (action === 'ketthuc') {
          this._alert.error('Kết thúc làm việc không thành công!', { delay: 1000 });
        }
      });
  }

  // onXong() {
  //   const formValue = this.authorityForm.value;
  //   const jframe = document.getElementById('iframePrint');
  //   if (Number(formValue.condition) === 2 && (formValue.saveLetter || formValue.saveLetter === 'true') ) {
  //     jframe.setAttribute('src', '../../../../../assets/print-document/04_KN_Phieudexuatxulydon.html');
  //     this.printDocument.show();
  //   }
  // }

  onChangeReason(reason: string, isChecked: boolean) {
    const reasonFormArray = <FormArray>this.formModal.controls.lyDoKhongThuLy;
    if (isChecked) {
      reasonFormArray.push(new FormControl(reason));
    } else {
      const index = reasonFormArray.controls.findIndex(x => x.value == reason);
      reasonFormArray.removeAt(index);
    }
  }

  onSubmitModal() {
    // const formValueModal = this.formModal.value;
    this.modal.hide();
  }

  // onShowModal() {
  //   this.modal.show();
  // }
  //
  // onChangeDoithoai(event) {
  //   const doithoai = event.target.value;
  //   // tslint:disable-next-line:triple-equals
  //   if (doithoai == this.bienBanDT) {
  //     this.authorityForm.patchValue({
  //       dateBienBanDT: '',
  //       dateThongBaoDT: ''
  //     });
  //   } else {
  //     this.authorityForm.patchValue({
  //       dateBienBanDT: '',
  //       dateThongBaoDT: ''
  //     });
  //   }
  // }

  closeModalThemCongVan() {
    this.modalThemCongVan.hide();
  }
  showPopUpThemCongVan() {
    this.modalThemCongVan.show();
    if (this.title_them_xem_congvan === 'Thêm') {
      this.title_popup_congvan = 'Thêm';
      this.title_button_congvan = 'Thêm';
    } else if (this.title_them_xem_congvan === 'Xem') {
      this.title_popup_congvan = 'Xem';
      this.title_button_congvan = 'Cập nhật';
      this.themCongVanForm.get('soCongVan').setValue(this.listCongVan.soCongVan);
      this.themCongVanForm.get('ngayCongVan').setValue(this.listCongVan.ngayCongVan);
      this.themCongVanForm.get('trichYeu').setValue(this.listCongVan.trichYeu);
      this.themCongVanForm.get('soCongVan').disable();
      this.themCongVanForm.get('ngayCongVan').disable();
      this.themCongVanForm.get('trichYeu').disable();
    }
  }

  saveCongVan() {
    this.formService.touchAllInput(this.themCongVanForm, true);
    if (this.themCongVanForm.invalid) {
      return false;
    }
    const formValue = this.themCongVanForm.value;
    if (this.title_popup_congvan === 'Thêm' || this.title_popup_congvan === 'Sửa') {
      this.listCongVan = formValue;
      this.title_them_xem_congvan = 'Xem';
      this.modalThemCongVan.hide();
    }

    if (this.title_popup_congvan === 'Xem') {
      this.themCongVanForm.get('soCongVan').enable();
      this.themCongVanForm.get('ngayCongVan').enable();
      this.themCongVanForm.get('trichYeu').enable();
      this.title_button_congvan = 'Lưu';
      this.title_popup_congvan = 'Sửa';
    }
  }

  onSubmitPrintDocument() {

  }

  checkConditionRequired(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.authority && !control.value) {
      return { required: true };
    }
    return null;
  }
  toogleValidate() {
    const listToogle = [
      'authority', 'condition'
    ];
    const fieldToogleConfig = {
      authority: {
        1: ['condition', 'soQdXacMinhKN', 'fillSoqd', 'fillNgayQd', 'nguoiKyThanhLap', 'dateThanhLap', 'congBo', //'authorityOption', 
          'dateTiepNhan', 'dateTrungCauGD', 'lydoRutdonKn', 'dataTableCheckbox', 'hdDoithoai', 'qdGqKhieunai', 'soTbKqGqKhieunai',
          'congboCkKqGqKhieunai', 'numTrungCauGD', 'numGiaiQuyetKN', 'reKetQuaXM'],
        2: ['noAuthorityOption']
      },
      condition: {
        1: ['soQdXacMinhKN', 'fillSoqd', 'fillNgayQd', 'nguoiKyThanhLap', 'dateThanhLap', 'congBo', 'dateTiepNhan', 'dateTrungCauGD'
          , 'lydoRutdonKn', 'dataTableCheckbox', 'hdDoithoai', 'qdGqKhieunai', 'soTbKqGqKhieunai', 'congboCkKqGqKhieunai',
          'numTrungCauGD', 'numGiaiQuyetKN', 'reKetQuaXM'],
        2: ['saveLetter']
      }
    };
    for (const field of listToogle) {
      this.authorityForm.get(field).valueChanges.subscribe(val => {
        if (val == 1) {
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
            this.addNgayKhieunaiForm.get('ngay').disable();
            this.addNgayKhieunaiForm.get('fileName').disable();
            this.addNgayKhieunaiForm.get('ghichu').disable();
            this.addNgayBiKhieunaiForm.get('ngay').disable();
            this.addNgayBiKhieunaiForm.get('fileNamebiKN').disable();
            this.addNgayBiKhieunaiForm.get('ghichu').disable();
          }
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            this.authorityForm.get(fieldCHild).enable();
            this.addNgayKhieunaiForm.get('ngay').enable();
            this.addNgayKhieunaiForm.get('fileName').enable();
            this.addNgayKhieunaiForm.get('ghichu').enable();
            this.addNgayBiKhieunaiForm.get('ngay').enable();
            this.addNgayBiKhieunaiForm.get('fileNamebiKN').enable();
            this.addNgayBiKhieunaiForm.get('ghichu').enable();
          }
        }
        if (val == 2) {
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
            this.addNgayKhieunaiForm.get('ngay').enable();
            this.addNgayKhieunaiForm.get('fileName').enable();
            this.addNgayKhieunaiForm.get('ghichu').enable();
            this.addNgayBiKhieunaiForm.get('ngay').enable();
            this.addNgayBiKhieunaiForm.get('fileNamebiKN').enable();
            this.addNgayBiKhieunaiForm.get('ghichu').enable();
          }
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            this.authorityForm.get(fieldCHild).enable();
            this.addNgayKhieunaiForm.get('ngay').disable();
            this.addNgayKhieunaiForm.get('fileName').disable();
            this.addNgayKhieunaiForm.get('ghichu').disable();
            this.addNgayBiKhieunaiForm.get('ngay').disable();
            this.addNgayBiKhieunaiForm.get('fileNamebiKN').disable();
            this.addNgayBiKhieunaiForm.get('ghichu').disable();
          }
        }
      });
    }
  }

  typeMauDon: object;
  @ViewChild(PopUpPrintComponent) popUpPrint: PopUpPrintComponent;
  openModalMauDon(id) {
    if (this.popUpPrint !== undefined) {
      this.show_Pop_Up_Print = true;
      this.typeMauDon = this.noAuthorityOptions.filter(el => el.id === id)[0] || {};
      this.popUpPrint.openModalMauDon(id, this.typeMauDon);
    } else {
      this.typeMauDon = this.noAuthorityOptions.filter(el => el.id === id)[0] || {};
      this.show_Pop_Up_Print = true;
    }
  }

  @ViewChild(PopUpPrintMau05Component) popUpPrint05: PopUpPrintMau05Component;
  openModalMauDon05() {
    if (this.popUpPrint05 !== undefined) {
      this.show_Pop_Up_Print_05 = true;
      this.popUpPrint05.openModalMauDon();
    } else {
      this.show_Pop_Up_Print_05 = true;
    }
  }
}
