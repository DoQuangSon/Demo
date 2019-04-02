import { NoiTiepcongdanService } from './../../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';
import { NoiLydotuchoitiepcdService } from './../../../../services/api/noi-lydotuchoitiepcds/noi-lydotuchoitiepcd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from  './../../../../constants/index';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QUYENHAN } from './../../../../constants/tiep-cong-dan.constants';
import { Router } from '@angular/router';
import { StatesService } from '../../../../services/api/state.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { AlertService } from '../../../../services/api/alert.service';
import { map as LD_map} from 'lodash';
import { TimeBuilderService } from './../../../../services/helper/time-builder.service';
import { COMMON, CONFIG } from '../../../../constants/config.constant';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-tc-tiep-cd',
  templateUrl: './tc-tiep-cd.component.html',
  styleUrls: ['./tc-tiep-cd.component.scss']
})
export class TcTiepCdComponent implements OnInit {
  @ViewChild('tuChoiModal') tuChoiModal: ModalDirective;
  @ViewChild('kiemTraLichSuModal') kiemTraLichSuModal: ModalDirective;
  @ViewChild('printDocumentModal') printDocumentModal: ModalDirective;
  @ViewChild('themNguoiUQModal') themNguoiUQModal: ModalDirective;

  account: any = {};
  public nguoiUQForm: FormGroup;
  public kiemTraLichSuForm: FormGroup;
  buttonName: string;
  displayNoticeDelete: boolean;
  title: string;
  tiepcdForm: FormGroup;
  soNguoiDT: FormControl;
  lydoTuchoiForm: FormGroup;
  // soNguoiDD: FormControl;
  dsSoNguoiDT: FormArray;
  // dsSoNguoiDD: FormArray;
  displayNgDT: Boolean = true;
  // displayNgDD: Boolean = false;
  // displayDSDD: Boolean = false;
  displayUQ: Boolean = true;
  noticeNguoiTiep: Boolean = true;
  noticeDT: Boolean = true;
  // noticeDD: Boolean = true;
  public thongTinNguoiUQ: any[] = [];
  public thongTinNguoiUQVangMat: any[] = [];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  displayNguoiTiep: Boolean = true;
  dsSoNguoiTiep: any[];
  modalOptions = { add: 1, edit: 2, delete: 3 };
  selectedOption: number;
  public currentSoNguoiTiep: number = 0;
  public currentSoNguoiDT: number = 0;
  isSubmit: boolean = false;
  public kiemTraLichSu: any[] = [];
  titleHanhDong: string;
  public quyenHan: any[] = QUYENHAN;
  public AUTO_COMPLETE_OPTION: any;
  listLydo: any[] = [];
  formBody: any = {};

  dataPostService = {
    'canBoTraLoi': 'string',
    'congDanTrinhBay': 'string',
    'daGiaiQuyet': true,
    'donViTiepDanId': 0,
    'dtKemTheo': {
      'id': 0,
      'isVuViecMoi': true,
      'ngayVietDon': '2017-09-21T03:57:26.544Z',
      'phanLoaiNoiDungId': 0,
      'tiepCongDanId': 0,
      'tomTatNoiDung': 'string'
    },
    'giayUyQuyen': {
      'cntcXacNhan': 'string',
      'coHieuLucFrom': '2017-09-21T03:57:26.544Z',
      'coHieuLucTo': '2017-09-21T03:57:26.544Z',
      'id': 0,
      'ngayLap': '2017-09-21T03:57:26.544Z',
      'noiDung': 'string',
      'soGiay': 'string',
      'tiepCongDanId': 0
    },
    'hasCoTaiLieuKemTheo': true,
    'hasDonThuKemTheo': true,
    'hasDuDieuKienXuLy': true,
    'hasThongTinUyQuyen': true,
    'id': 0,
    'isDaGiaiQuyet': true,
    'isNoiDungMoi': true,
    'isTuChoi': true,
    'lyDoTuChoiTiepDans': [
      {
        'id': 0,
        'lyDoTuChoiId': 0,
        'tiepCongDanId': 0
      }
    ],
    'ngayTiepDan': '2017-09-21T03:57:26.546Z',
    'nguoiDuocTieps': [
      {
        'congDanId': 0,
        'id': 0,
        'isDuocUyQuyen': true,
        'isNguoiUyQuyen': true,
        'soLanDen': 0,
        'tiepCongDanId': 0
      }
    ],
    'nguoiTieps': [
      {
        'id': 0,
        'tiepCongDanId': 0,
        'userId': 0
      }
    ],
    'nguoiUyQuyens': [
      {
        'congDanId': 0,
        'id': 0,
        'tiepCongDanId': 0
      }
    ],
    'noiDungMoi': true,
    'phanLoaiNoiDungId': 0,
    'taiLieuKemTheos': [
      {
        'actived': true,
        'id': 0,
        'moTaTaiLieu': 'string',
        'soLuong': 0,
        'tenTaiLieu': 'string',
        'tiepCongDanId': 0,
        'tinhTrangId': 0
      }
    ],
    'tenDonVi': 'string',
    'tenNoiDung': 'string',
    'tuChoi': true
  };

  constructor(
    private builder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private noiLydotuchoitiepcdService: NoiLydotuchoitiepcdService,
    private noiTiepcongdanService: NoiTiepcongdanService,
    private statesService: StatesService,
    private noiAccountService: NoiAccountService,
    private alertService: AlertService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService
  ) { }

  dsTenNguoiTiep = [
    { id: 1, hoTen: 'Nguyễn Văn A' },
    { id: 2, hoTen: 'Nguyễn Văn B' },
    { id: 3, hoTen: 'Nguyễn Văn C' },
  ];
  dschucDanhNguoiTiep = [
    { id: 1, chucDanh: 'Cơ quan BHXH VN' },
    { id: 2, chucDanh: 'Giám đốc BHXH Tỉnh' },
    { id: 3, chucDanh: 'Giám đốc BHXH Huyện' },
  ];
  dschucDanhNguoiDT = [
    { id: 1, chucDanh: 'Công dân' },
    { id: 2, chucDanh: 'Luật sư' },
    { id: 3, chucDanh: 'Trợ giúp pháp lý' },
  ];
  noidungLydo: any[] = [];
  CHUCDANH: any[];
  CANBO: any[];
  ngOnInit() {
    this.account = this.auth.currentUser;

    this.noiLydotuchoitiepcdService.getAllLydotuchoitiepcds(0, 10)
      .subscribe(res => {
        this.listLydo = res;
        console.log(res);
      });
    this.lydoTuchoiForm = this.fb.group({
      lydo1: [''],
      lydo2: [''],
      lydo3: [''],
      lydo4: ['']
    });
    this.thongTinNguoiUQ = [];
    this.kiemTraLichSu = [
      {
        ngayDen: '01/01/2017',
        noiDen: 'BHXH BN',
        noiDung: 'Khiếu nại về việc A',
        trangThai: 'Đã tiếp'
      },
      {
        ngayDen: '03/01/2017',
        noiDen: 'BHXH Tỉnh',
        noiDung: 'Khiếu nại về việc B',
        trangThai: 'Đã tiếp'
      },
      {
        ngayDen: '05/01/2017',
        noiDen: 'BHXH Huyện',
        noiDung: 'Khiếu nại về việc C',
        trangThai: 'Từ chối'
      }
    ];
    this.dsSoNguoiDT = this.builder.array([]);
    // this.dsSoNguoiDD = this.builder.array([]);
    this.tiepcdForm = this.builder.group({
      // diaChi: ['', [Validators.required]],
      hoTen: ['', [Validators.required]],
      soNguoiDT: ['', [Validators.required]],
      // soNguoiDD: ['', [Validators.required]],
      // nguoiDD: this.dsSoNguoiDD,
      ngayLap: ['', [Validators.required]],
      ngayCoHieuLuc: ['', [Validators.required]],
      ngayHetHieuLuc: ['', [Validators.required]],
      soNguoiTiep: ['', [Validators.required]],
      // soCMTNguoiDT: ['', [Validators.required]],
      caNhanTCUQ: ['', [Validators.required]],
      checkUyQuyen: [''],
      nguoiTiep: this.fb.array([]),
      nguoiDT: this.fb.array([]),
      noidungLydo: [''],
      noidungUyquyen: [''],
      sogiay: [''],
      ngaytiep: [''],
      hasThongTinUyQuyen: [''],
      soTheNguoiDT: ['']
    });
    const date = new Date();
    this.tiepcdForm.patchValue({
      ngaytiep: {
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        }
      }
    });

    this.tiepcdForm.valueChanges.subscribe((value => this.updateTableNguoiDuocUyQuyen(value)));

    this.kiemTraLichSuForm = this.builder.group({
      ten: [''],
      soCMT: [''],
      noiDen: [''],
      timNgayDen: [''],
    });
    this.nguoiUQForm = this.fb.group({
      index: [''],
      hoTen: ['', [Validators.required]],
      quyenHan: ['', [Validators.required]],
      soCMTNguoiUQ: [''],
      sdtNguoiUQ: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      vangMat: ['true']
    });
    this.dsSoNguoiTiep = [];
    this.CHUCDANH = LD_map(COMMON.CHUCDANH, 'name');
    this.CANBO = LD_map(COMMON.CANBO, 'name');
    this.AUTO_COMPLETE_OPTION = CONFIG.AUTO_COMPETED;
    // this.dsSoNguoiDT = [];
  }

  openThemNguoiUQModal() {
    this.nguoiUQForm.reset();
    this.selectedOption = this.modalOptions.add;
    this.themNguoiUQModal.show();
    this.titleHanhDong = 'Thêm';
  }

  addNguoiUQ() {
    if (!this.nguoiUQForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.nguoiUQForm.value;
      this.thongTinNguoiUQVangMat.push({
        hoTen: formValue.hoTen,
        quyenHan: formValue.quyenHan,
        soCMTNguoiUQ: formValue.soCMTNguoiUQ,
        sdtNguoiUQ: formValue.sdtNguoiUQ,
        diaChi: formValue.diaChi,
        vangMat: true
      });
      this.updateTableNguoiDuocUyQuyen();
      this.themNguoiUQModal.hide();
    }
  }

  editNguoiUQ(formItem) {
    this.selectedOption = this.modalOptions.edit;
    this.titleHanhDong = 'Sửa';
    this.nguoiUQForm.patchValue({
      index: formItem.id,
      hoTen: formItem.hoTen,
      quyenHan: formItem.quyenHan,
      soCMTNguoiUQ: formItem.soCMTNguoiUQ,
      sdtNguoiUQ: formItem.sdtNguoiUQ,
      diaChi: formItem.diaChi
    });

    this.themNguoiUQModal.show();
  }

  updateNguoiUQ() {
    if (!this.nguoiUQForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.nguoiUQForm.value;
      const index = this.thongTinNguoiUQ.findIndex(item => item.id === formValue.index);
      this.thongTinNguoiUQ[index].hoTen = formValue.hoTen;
      this.thongTinNguoiUQ[index].quyenHan = formValue.quyenHan;
      this.thongTinNguoiUQ[index].soCMTNguoiUQ = formValue.soCMTNguoiUQ;
      this.thongTinNguoiUQ[index].sdtNguoiUQ = formValue.sdtNguoiUQ;
      this.thongTinNguoiUQ[index].diaChi = formValue.diaChi;
      this.updateTableNguoiDuocUyQuyen();
      this.themNguoiUQModal.hide();
    }
  }

  deleteNguoiUQ(formItem) {
    this.selectedOption = this.modalOptions.delete;
    this.titleHanhDong = 'Xóa';
    this.nguoiUQForm.patchValue({
      index: formItem.id,
      hoTen: formItem.hoTen,
      quyenHan: formItem.quyenHan,
      soCMTNguoiUQ: formItem.soCMTNguoiUQ,
      sdtNguoiUQ: formItem.sdtNguoiUQ,
      diaChi: formItem.diaChi
    });
    this.themNguoiUQModal.show();
  }

  confirmDeleteNguoiUQ() {
    const formValue = this.nguoiUQForm.value;
    const index = this.thongTinNguoiUQVangMat.findIndex(item => item.id === formValue.index);
    this.thongTinNguoiUQVangMat.splice(index, 1);
    this.updateTableNguoiDuocUyQuyen();
    this.themNguoiUQModal.hide();
  }

  // checkDT(event) {
  //   this.displayDSDD = event && event.target && event.target.value && event.target.value > 1;
  // }

  // buildFromNguoiDT() {
  //   const formNguoiDT = this.builder.group({
  //     hoTen: ['', [Validators.required]],
  //     diaChi: ['', [Validators.required]],
  //     soCMTNguoiDT: ['', [Validators.required]],
  //   });
  //   return formNguoiDT;
  // }

  // buildFromNguoiDD() {
  //   const formNguoiDD = this.builder.group({
  //     diaChiNguoiDD: ['', [Validators.required]],
  //     hoTenNguoiDD: ['', [Validators.required]],
  //     soCMTNguoiDD: ['', [Validators.required]],
  //   });
  //   return formNguoiDD;
  // }

  initSoNguoiTiep(): FormGroup {
    return this.fb.group({
      tenNguoiTiep: ['', [Validators.required]],
      chucDanhNguoiTiep: ['', [Validators.required]],
    });
  }

  soNguoiTiepChange() {
    const soNguoiTiep = Number(this.tiepcdForm.value.soNguoiTiep);
    const control = <FormArray>this.tiepcdForm.controls.nguoiTiep;
    const l = control.length;

    if (Number.isInteger(soNguoiTiep)) {
      if (this.currentSoNguoiTiep < 0) {
        for (let i = 0; i < soNguoiTiep; i++) {
          control.push(this.initSoNguoiTiep());
        }
      } else {
        let change = this.currentSoNguoiTiep - soNguoiTiep;
        if (change < 0 || change > 0) {
          if (change < 0) {
            while (change !== 0) {
              control.push(this.initSoNguoiTiep());
              change++;
            }
          } else {
            let i = l - 1;
            while (change !== 0 && i >= 0) {
              control.removeAt(i);
              i--;
              change--;
            }
          }
        }
      }
    } else {
      for (let i = l - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    }
    this.currentSoNguoiTiep = soNguoiTiep;
  }

  initSoNguoiDT(): FormGroup {
    const form = this.fb.group({
      id: [''],
      hoTen: ['', [Validators.required]],
      chucDanhNguoiDT: ['', [Validators.required]],
      diaChi: ['', Validators.required],
      quyenHan: [''],
      soCMTNguoiDT: ['', Validators.required],
      lichSuNguoiDT: [''],
      nguoiduocuyquyen: [''],
      nguoiuyquyen: [],
      soTheNguoiDT: ['']
    });

    return form;
  }

  updateTableNguoiDuocUyQuyen(value?) {
    if (!value) {
      if (!this.tiepcdForm || !this.tiepcdForm.value) {
        return;
      } else {
        value = this.tiepcdForm.value;
      }
    }
    if (!Array.isArray(this.thongTinNguoiUQ)) {
      this.thongTinNguoiUQ = [];
    }
    if (!Array.isArray(this.thongTinNguoiUQVangMat)) {
      this.thongTinNguoiUQVangMat = [];
    }

    const nguoiUyQuyenDuocTiep = this.filterNguoiDuocUyQuyenDuocTiep(value);
    this.thongTinNguoiUQ = nguoiUyQuyenDuocTiep.concat(this.thongTinNguoiUQVangMat);
  }

  filterNguoiDuocUyQuyenDuocTiep(value): any[] {
    if (value && Array.isArray(value.nguoiDT)) {
      return <any[]>(value.nguoiDT).filter((ndt) => this.isDuocUyQuen(ndt));
    }

    return [];
  }

  isDuocUyQuen(nguoiDuocTiep) {
    return nguoiDuocTiep && nguoiDuocTiep.quyenHan;
  }

  changeCmt(item: FormGroup) {
    const cmt = item.controls.soCMTNguoiDT.value;
    this.noiTiepcongdanService.getCongdanByCmt(cmt)
      .subscribe(res => {
        console.log(res);
        if (Object.keys(res).length > 0) {
          item.patchValue({
            id: res.id ? res.id : '',
            hoTen: res.hoVaTen ? res.hoVaTen : '',
            chucDanhNguoiDT: res.chucDanh ? res.chucDanh : '',
            diaChi: res.diaChi ? res.diaChi : '',
            quyenHan: 1,
            soCMTNguoiDT: res.soCMTND ? res.soCMTND : '',
            lichSuNguoiDT: res.soLanDen ? res.soLanDen : '',
            // nguoiduocuyquyen: ,
            // nguoiuyquyen: ,
            soTheNguoiDT: res.soThe ? res.soThe : ''
          });
        }
      }, err => {
        console.log(err);
      });
  }

  changeSothe(item: FormGroup) {
    const sothe = item.controls.soTheNguoiDT.value;
    this.noiTiepcongdanService.getCongdanBySothe(sothe)
      .subscribe(res => {
        if (Object.keys(res).length > 0) {
          item.patchValue({
            id: res.id ? res.id : '',
            hoTen: res.hoVaTen ? res.hoVaTen : '',
            chucDanhNguoiDT: res.chucDanh ? res.chucDanh : '',
            diaChi: res.diaChi ? res.diaChi : '',
            quyenHan: 1,
            soCMTNguoiDT: res.soCMTND ? res.soCMTND : '',
            lichSuNguoiDT: res.soLanDen ? res.soLanDen : '',
            // nguoiduocuyquyen: ,
            // nguoiuyquyen: ,
            soTheNguoiDT: res.soThe ? res.soThe : ''
          });
        }
      }, err => {
        console.log(err);
      });
  }

  changeQuenHan(item: FormGroup, value: any, i: any) {
    console.log(item);
    // this.updateTableNguoiDuocUyQuyen();
    console.log(this.thongTinNguoiUQ);
    if (item) {
      if (value === 1) {
        if (item.controls.nguoiduocuyquyen.value) {
          item.patchValue({
            nguoiuyquyen: false,
            quyenHan: value
          });
        } else {
          item.patchValue({
            nguoiuyquyen: false,
            quyenHan: 0
          });
        }
      } else if (value === 2) {
        if (item.controls.nguoiuyquyen.value) {
          item.patchValue({
            nguoiduocuyquyen: false,
            quyenHan: value
          });
        } else {
          item.patchValue({
            nguoiduocuyquyen: false,
            quyenHan: 0
          });
        }
      } else {
        item.patchValue({
          quyenHan: 0
        });
      }
    }
  }

  soNguoiDTChange() {
    const soNguoiDT = Number(this.tiepcdForm.value.soNguoiDT);
    const control = <FormArray>this.tiepcdForm.controls.nguoiDT;
    const l = control.length;

    if (Number.isInteger(soNguoiDT)) {
      if (this.currentSoNguoiDT < 0) {
        for (let i = 0; i < soNguoiDT; i++) {
          control.push(this.initSoNguoiDT());
        }
      } else {
        let change = this.currentSoNguoiDT - soNguoiDT;
        if (change < 0 || change > 0) {
          if (change < 0) {
            while (change !== 0) {
              control.push(this.initSoNguoiDT());
              change++;
            }
          } else {
            let i = l - 1;
            while (change !== 0 && i >= 0) {
              control.removeAt(i);
              i--;
              change--;
            }
          }
        }
      }
    } else {
      for (let i = l - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    }
    this.currentSoNguoiDT = soNguoiDT;
  }


  // changeSoNguoiTiep() {
  //   this.dsSoNguoiTiep = [];
  //   if (this.tiepcdForm.value.soNguoiTiep) {
  //     if (Number(this.tiepcdForm.value.soNguoiTiep) > 4) {
  //       this.noticeNguoiTiep = false;
  //     } else {
  //       for (let i = 0; i < Number(this.tiepcdForm.value.soNguoiTiep); i++) {
  //         this.dsSoNguoiTiep.push('dt_' + (this.dsSoNguoiTiep.length + 1));
  //         this.displayNguoiTiep = false;
  //       }
  //     }
  //   } else {
  //     this.displayNguoiTiep = true;
  //     this.dsSoNguoiTiep = [];
  //   }
  // }

  // resetNguoiDT() {
  //   for (let i = this.dsSoNguoiDT.controls.length - 1; i >= 0; i--) {
  //     this.dsSoNguoiDT.removeAt(i);
  //   }
  // }

  // changeSoNguoiDT() {
  //   this.resetNguoiDT();
  //   if (this.tiepcdForm.value.soNguoiDT) {
  //     if (Number(this.tiepcdForm.value.soNguoiDT) > 4) {
  //       this.noticeDT = false;
  //     } else {
  //       for (let i = 0; i < Number(this.tiepcdForm.value.soNguoiDT); i++) {
  //         this.dsSoNguoiDT.push(this.buildFromNguoiDT());
  //         this.displayNgDT = false;
  //       }
  //     }
  //   } else {
  //     this.noticeDT = false;
  //     this.displayNgDT = true;
  //     this.resetNguoiDT();
  //   }
  // }

  // resetNguoiDD() {
  //   for (let i = this.dsSoNguoiDD.controls.length - 1; i >= 0; i--) {
  //     this.dsSoNguoiDD.removeAt(i);
  //   }
  //   // while (this.dsSoNguoiDD.controls.length > 0) {
  //   //   this.dsSoNguoiDD.removeAt(0);
  //   // }
  // }

  // changeSoNguoiDD() {
  //   this.resetNguoiDD();
  //   if (this.tiepcdForm.value.soNguoiDD) {
  //     if (this.tiepcdForm.value.soNguoiDT) {
  //       this.noticeDT = true;
  //       this.displayNgDT = true;
  //       // this.dsSoNguoiDT = [];
  //       for (let i = 0; i < Number(this.tiepcdForm.value.soNguoiDD); i++) {
  //         this.dsSoNguoiDD.push(this.buildFromNguoiDD());
  //         // this.displayNgDD = false;
  //       }
  //     } else {
  //       this.noticeDD = false;
  //       // this.displayNgDD = true;
  //       this.resetNguoiDD();
  //     }
  //   } else {
  //     this.noticeDD = true;
  //     // this.displayNgDD = true;
  //     this.resetNguoiDD();
  //     if (Number(this.tiepcdForm.value.soNguoiDT) > 4) {
  //       this.noticeDT = false;
  //     } else {
  //       // this.changeSoNguoiDT();
  //     }
  //   }
  // }


  PopUpKiemTraLichSu() {
    this.title = 'Lịch sử Công dân đến Khiếu nại, Tố cáo';
    this.displayNoticeDelete = true;
    this.kiemTraLichSuModal.show();
  }

  PopUpTuChoi() {
    this.title = 'Chọn lý do từ chối tiếp công dân';
    this.displayNoticeDelete = true;
    this.tuChoiModal.show();
  }

  close() {
    this.tuChoiModal.hide();
    this.kiemTraLichSuModal.hide();
  }

  // onSubmit() {
  //   // const formValua = this.tiepcdForm.value;
  //   // console.log(formValua);
  //   const jframe = document.getElementById('iframePrint');
  //   jframe.setAttribute('src', '../../../../../assets/print-document/02_TCD_VeViecTuChoiTiepCongDan.html');
  //   this.printDocumentModal.show();
  // }

  // onClosePrintDocumentModal() {
  //   this.printDocumentModal.hide();
  //   this.tuChoiModal.hide();
  // }

  openLichTiepCD() {
    this.router.navigate(['/ql-tiep-cd/lich-tiep-cong-dan']);
  }
  openTienHanhTiepCD() {
    if (this.tiepcdForm.valid) {
      console.log('Invalid');
    } else {
      // console.log(this.thongTinNguoiUQ);
      this.createFormBody();
      // console.log(1);
      this.statesService.emitTransferDataTiepCdToComponent(this.formBody);
      this.router.navigate(['/ql-tiep-cd/tiep-cong-dan/tien-hanh-tiep-cd']);
    }
  }

  createFormBody() {
    const formValue = this.tiepcdForm.value;
    const giayUyQuyen: any = {};
    // console.log(formValue.ngaytiep);
    const hlfrom = this.timeBuilder.fromTimeDatePicker(formValue.ngayCoHieuLuc).setUTC().toISOString();
    const hlto = this.timeBuilder.fromTimeDatePicker(formValue.ngayLap).setUTC().toISOString();
    const dateNgaylap = this.timeBuilder.fromTimeDatePicker(formValue.ngayHetHieuLuc).setUTC().toISOString();
    const dateNgaytiepdan = this.timeBuilder.fromTimeDatePicker(formValue.ngaytiep).setUTC().toISOString();

    const arrNguoitieps: any[] = [];
    const nguoitiep: any = {};
    formValue.nguoiTiep.forEach(el => {
      nguoitiep.chucVu = el.chucDanhNguoiTiep;
      nguoitiep.hoVaTen = el.tenNguoiTiep;
      arrNguoitieps.push(nguoitiep);
    });

    const arrNguoiduoctieps: any[] = [];
    const nguoiduoctiep: any = {};
    formValue.nguoiDT.forEach(el => {
      nguoiduoctiep.congDan = {
        id: el.id ? el.id : '',
        chucDanh: el.chucDanhNguoiDT,
        diaChi: el.diaChi,
        hoVaTen: el.hoTen,
        soCMTND: el.soCMTNguoiDT,
        soThe: el.soTheNguoiDT
      };
      // tslint:disable-next-line:triple-equals
      nguoiduoctiep.isDuocUyQuyen = el.nguoiduocuyquyen;
      nguoiduoctiep.isNguoiUyQuyen = el.nguoiuyquyen;
      nguoiduoctiep.soLanDen = el.lichSuNguoiDT ? el.lichSuNguoiDT : 1;
      arrNguoiduoctieps.push(nguoiduoctiep);
    });

    const arrttUyquens: any[] = [];
    console.log(this.thongTinNguoiUQ);
    this.thongTinNguoiUQ.forEach(el => {
      nguoiduoctiep.congDan = {
        id: el.id ? el.id : '',
        chucDanh: el.chucDanhNguoiDT,
        diaChi: el.diaChi,
        hoVaTen: el.hoTen,
        soCMTND: el.soCMTNguoiDT
      };
      // tslint:disable-next-line:triple-equals
      nguoiduoctiep.isDuocUyQuyen = el.nguoiduocuyquyen;
      nguoiduoctiep.isNguoiUyQuyen = el.nguoiuyquyen;
      arrttUyquens.push(nguoiduoctiep);
    });

    giayUyQuyen.cntcXacNhan = formValue.caNhanTCUQ;
    giayUyQuyen.coHieuLucFrom = hlfrom;
    giayUyQuyen.coHieuLucTo = hlto;
    giayUyQuyen.ngayLap = dateNgaylap;
    giayUyQuyen.noiDung = formValue.noidungUyquyen;
    giayUyQuyen.soGiay = formValue.sogiay;

    this.formBody.giayUyQuyen = giayUyQuyen;
    this.formBody.ngTieps = arrNguoitieps;
    this.formBody.nguoiDuocTieps = arrNguoiduoctieps;
    this.formBody.nguoiUyQuyens = arrttUyquens;
    this.formBody.ngayTiepDan = dateNgaytiepdan;
    this.formBody.createBy = { 'id': this.account.id };
    this.formBody.donViTiepDan = { 'id': this.account.donViId };
    this.formBody.daGiaiQuyet = false;
    this.formBody.isDaGiaiQuyet = false;
    this.formBody.hasThongTinUyQuyen = true;
  }

  onChoose() {
    this.noidungLydo = [];
    this.createFormBody();
    const formValue = this.lydoTuchoiForm.value;
    if (!formValue.lydo1 && !formValue.lydo2 && !formValue.lydo3 && !formValue.lydo4) {
      this.noidungLydo = [];
      this.tuChoiModal.hide();
      return;
    }
    if (formValue.lydo1) {
      this.noidungLydo.push(this.listLydo[0]);
    }
    if (formValue.lydo2) {
      this.noidungLydo.push(this.listLydo[1]);
    }
    if (formValue.lydo3) {
      this.noidungLydo.push(this.listLydo[2]);
    }
    if (formValue.lydo4) {
      this.noidungLydo.push(this.listLydo[3]);
    }
    this.tiepcdForm.patchValue({
      noidungLydo: this.noidungLydo
    });
    const arrlydos: any[] = [];
    const lydo: any = {};
    this.noidungLydo.forEach(el => {
      lydo.id = el.id;
      arrlydos.push({
        lyDoTuChoi: lydo
      });
    });
    this.formBody.lyDoTuChoiTiepDans = arrlydos;
    this.formBody.isTuChoi = true;
    this.formBody.tuChoi = true;
    this.formBody.actived = true;
    console.log(this.formBody);
    this.noiTiepcongdanService.createNewCongdan(this.formBody)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    this.tuChoiModal.hide();
    this.success('Đã từ chối tiếp công dân!');
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
}

