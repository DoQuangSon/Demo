import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../constants/index';
import { StatesService } from '../../../services/api/state.service';
import { TimeBuilderService } from '../../../services/helper/time-builder.service';
import { NoiQLNguoiDungService } from '../../../services/api/noi-ql-nguoidung/noi-ql-nguoidung.service';
import { NoiAccountService } from '../../../services/api/noi-account/noi-account.service';
import { AlertService } from '../../../services/api/alert.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { NoiDmbhxhService } from '../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { QLyNhomNguoiDungService } from '../../../services/api/noi-qlnhomnguoidung/noi-qlnhomnguoidung.service';
import { FileResourceService } from '../../../services/helper/file-resource.service';
import { FormService } from '../../../shared/form-module/form.service';
import { COMMON_ERROR_MESS, MESS_QUAN_LY_NHOM_NGUOI_DUNG, COMMON_SUCCESS_MESS } from '../../../constants/message.constants';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ttkt-quanly-nguoidung',
  templateUrl: './quanly-nguoidung.component.html',
  styleUrls: ['./quanly-nguoidung.component.scss'],
})
export class QuanlyNguoidungComponent implements OnInit {
  userGroupList: any;
  @ViewChild('modalThemNguoiDung') public modalThemNguoiDung: ModalDirective;
  @ViewChild('modalResetPassword') public modalResetPassword: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('imageUpload') public imageUpload: ElementRef;
  @ViewChild('imageUser') public imageUser: ElementRef;

  public isCollapseDirective: boolean = false;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formTimKiem: FormGroup;
  formThemNguoiDung: FormGroup;
  formResetPassword: FormGroup;
  isCheckExistedUserName : Boolean;
  isCheckExistedEmail : Boolean;

  account: any;
  listNguoiDung: any[] = [];
  listChucDanh: any;
  type: any;
  indexSelected: any;
  itemSelected: any;
  isCoThoiHan: boolean;
  isThemMoi: boolean;
  errMatchPassword: boolean;
  errMatchPassword2: boolean;
  errTuNgay: boolean;
  errDenNgay: boolean;
  currentPage: number = 0;
  pageSize: number = 30;
  dmbhxhId: any;
  pager: any = {};
  data: any;
  selectCoQuanToChucForm: FormControl = new FormControl();
  isSearch: boolean = false;
  errCompareDate: boolean = false;
  image: File[] = Array<File>();

  emailReg: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  partemMSISDN = /^\+?\d{10,12}$/;
  hoTen = /[a-zA-Z_][0-9a-zA-Z_]*/;
  // test
  public listCoQuanToChuc: Array<any> = [];
  public listCoQuanToChucSelect: Array<any> = [];
  checkExisted: boolean = false;
  constructor(
    private builder: FormBuilder,
    private noiAccountService: NoiAccountService,
    private noiQLNguoiDungService: NoiQLNguoiDungService,
    private timeBuilderService: TimeBuilderService,
    private alertService: AlertService,
    private pagination: PaginationService,
    private noiDmbhxhService: NoiDmbhxhService,
    private quanLyUserGroup: QLyNhomNguoiDungService,
    private fileResourceService: FileResourceService,
    public formService: FormService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dmbhxhId = this.auth.currentUser.donViId;
    console.log('dmbhxhId ' +this.dmbhxhId);
    this.account = this.auth.currentUser;
    this.data = this.account;
    this.getAllData(this.account);

    this.formTimKiem = this.builder.group({
      tenHienThi: [''],
      tenDangNhap: [''],
      nhomQuyen: [],
      donViCongTac: [''],
      chucDanh: ['']
    });

    this.formThemNguoiDung = this.builder.group({
      tenDangNhap_InForm: ['', [Validators.required]],
      hoTen_InForm: ['', [Validators.required, Validators.pattern(this.hoTen)]],
      password_InForm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      repeatPass_InForm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email_InForm: ['', [Validators.required, Validators.pattern(this.emailReg)]],
      diDong_InForm: [''], // [Validators.pattern(this.partemMSISDN)]
      donVi_InForm: ['', [Validators.required]],
      donViId: ['', [Validators.required]],
      chucDanh_InForm: ['', [Validators.required]],
      nhomQuyen_InForm: ['', [Validators.required]],
      tuNgay: [''],
      denNgay: [''],
      actived: [''],
      id: [''],
      dmTinhHuyenId: ['']
    });
    this.selectCoQuanToChucForm.valueChanges.subscribe(val => console.log(val) );

    this.formResetPassword = this.builder.group({
      tenDangNhap_InForm: [''],
      hoTen_InForm: [''],
      password_InForm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      repeatPass_InForm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });


    // get dmbhxh
    // let acc: any = this.authentication.getAccount();
    this.noiDmbhxhService.getDmBHXHBymaCha(this.account.maDonVi).subscribe(req => {
      this.listCoQuanToChuc = req;
      this.listCoQuanToChucSelect = this.listCoQuanToChuc.map(item => {
        return {
          id: item.id,
          text: item.tenDonVi,
          dmTinhHuyenId: item.tinhHuyen.id
        };
      });
      // add acc default
      this.listCoQuanToChucSelect.unshift({
        id: this.account.donViId,
        text: this.account.donVi,
        dmTinhHuyenId: this.account.dmTinhHuyenId
      });
    });
  }

  public selected(value: any): void {
    console.log(value);
    this.formThemNguoiDung.get('donVi_InForm').setValue(value.text);
    this.formThemNguoiDung.get('donViId').setValue(value.id);
  }

  getAllData(data) {
    this.isSearch = false;
    this.noiQLNguoiDungService.getAllUserByDMBHXH(data.donViId, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.listNguoiDung = res['content'];
        const size = res['size'];
        const totalPages = res['totalPages'];
        this.pager = this.pagination.getPager(this.currentPage, size, totalPages);
      }, err => { });
    this.noiQLNguoiDungService.getChucDanhOfBHXH(data.donViId, 0, 1000)
      .subscribe(res => {
        this.listChucDanh = res['content'];
      }, err => { });

    this.quanLyUserGroup.getUserGroupList(this.dmbhxhId, this.pager, this.pageSize).subscribe(res => {
      this.userGroupList = res.content;
    }, err => {
    });
  }

  addNguoiDung(type) {
    this.type = type;
    this.isCoThoiHan = false;
    this.imageUser.nativeElement.src = '';
    this.formThemNguoiDung.reset();
    this.selectCoQuanToChucForm.reset();
    this.formThemNguoiDung.patchValue({
      actived: '0'
    });
    this.modalThemNguoiDung.show();
  }

  editNguoiDung(type, data) {
    this.type = type;
    this.formThemNguoiDung.reset();
    let activeValue = '';
    if (data.validToDate) {
      activeValue = '1';
      this.isCoThoiHan = true;
    } else {
      activeValue = '0';
      this.isCoThoiHan = false;
    }

    this.selectCoQuanToChucForm.setValue([{
      id: data.donViId,
      text: data.donVi
    }]);

    // console.log('mydata', data);
    const u: HTMLImageElement = this.imageUser.nativeElement as HTMLImageElement;
    // u.src = data.imageUrl;
    this.fileResourceService.downloadFile(data.imageUrl).subscribe(item => u.src  = URL.createObjectURL(item));


    this.formThemNguoiDung.patchValue({
      id: data.id,
      tenDangNhap_InForm: data.login,
      hoTen_InForm: data.tenHienThi,
      password_InForm: data.password,
      repeatPass_InForm: data.password,
      email_InForm: data.email,
      diDong_InForm: data.phoneNumber,
      donVi_InForm: data.donVi,
      donViId: data.donViId,
      dmTinhHuyenId: data.dmTinhHuyenId,
      chucDanh_InForm: data.chucDanhId,
      imageUrl: data.imageUrl,
      tuNgay: this.timeBuilderService.fromString(data.validFromDate).toTimeDatePickerValue(),
      denNgay: this.timeBuilderService.fromString(data.validToDate).toTimeDatePickerValue(),
      actived: activeValue,
      nhomQuyen_InForm: data.groupUserId
    });
    console.log('data', this.formThemNguoiDung.value);
    this.modalThemNguoiDung.show();
  }

  saveNguoiDung() {
    const formValue = this.formThemNguoiDung.value;
    if(this.formThemNguoiDung.invalid){
      this.alertService.error('Bạn cần nhập đầy đủ các trường!');
      return;
    }
    if(this.isCheckExistedUserName === true || this.isCheckExistedEmail === true){
      this.alertService.error('Tên đăng nhập hoặc email đã tồn tại!');
      return;
    }
    let tuNgay = '';
    let denNgay = '';
    if (formValue.tuNgay) {
      // tuNgay = this.timeBuilderService.convertDateUTC(formValue.tuNgay);
      tuNgay = this.timeBuilderService.fromTimeDatePicker(formValue.tuNgay).setUTC().toISOString();
    }
    if (formValue.denNgay) {
      // denNgay = this.timeBuilderService.convertDateUTC(formValue.denNgay);
      denNgay = this.timeBuilderService.fromTimeDatePicker(formValue.denNgay).setUTC().toISOString();
    }
    if (this.checkValidThoiHan(formValue.actived)) {
      // this.modalThemNguoiDung.hide();
      // get tinhhuyenid
      const coQuanTc = this.listCoQuanToChucSelect.filter(req => {
        return req.id == formValue.donViId;
      });

      if (coQuanTc.length > 0 && !formValue.dmTinhHuyenId) {
        formValue.dmTinhHuyenId = coQuanTc[0].dmTinhHuyenId;
      }
      if (this.selectCoQuanToChucForm.value.length > 0) {
        const dmTinhHuyenId = this.listCoQuanToChucSelect.find(el => el.text === this.selectCoQuanToChucForm.value[0].text).dmTinhHuyenId;
        formValue.dmTinhHuyenId = dmTinhHuyenId;
      }
      console.log(formValue.dmTinhHuyenId);
      const formBody = {
        id: formValue.id,
        login: formValue.tenDangNhap_InForm.trim(),
        password: formValue.password_InForm,
        email: formValue.email_InForm,
        activated: formValue.actived === '0' ? true : false,
        chucDanhId: formValue.chucDanh_InForm,
        dmTinhHuyenId: formValue.dmTinhHuyenId, // this.account.dmTinhHuyenId,
        donViId: formValue.donViId, // this.account.donViId,
        imageUrl: '',
        phoneNumber: formValue.diDong_InForm,
        tenHienThi: formValue.hoTen_InForm,
        validFromDate: tuNgay,
        validToDate: denNgay,
        authoryties: ['ROLE_ADMINISTRATOR'],
        groupUserId: formValue.nhomQuyen_InForm
      };
      if (!this.errCompareDate) {
        if (formBody.activated) {
          delete formBody.validFromDate;
          delete formBody.validToDate;
        }
        if (this.type === 'add') {

          if (this.image.length > 0) {
            this.fileResourceService.uploadFile(this.image, 5).subscribe(value => {
              formBody.imageUrl = value[0].url;
              this.noiQLNguoiDungService.createUser(formBody)
                .subscribe(res => {
                  this.modalThemNguoiDung.hide();
                  this.alertService.success(MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_THEM_USER);
                  this.getAllData(this.account);
                }, err => {
                  console.log('err', err);
                });
            });
          } else {
            this.noiQLNguoiDungService.createUser(formBody)
              .subscribe(res => {
                this.modalThemNguoiDung.hide();
                this.alertService.success(MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_THEM_USER);
                this.getAllData(this.account);
              }, err => {
                console.log('err', err);
              });
          }
        } else {
          this.modalThemNguoiDung.hide();
          if (this.image.length > 0) {
            this.fileResourceService.uploadFile(this.image, 5).subscribe(value => {
              formBody.imageUrl = value[0].url;
              this.noiQLNguoiDungService.updateUser(formBody)
                .subscribe(res => {
                  this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
                  this.getAllData(this.account);
                }, err => {
                  this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
                });
            });
          } else {
            this.noiQLNguoiDungService.updateUser(formBody)
              .subscribe(res => {
                this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
                this.getAllData(this.account);
              }, err => {
                this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
              });
          }
        }
      }
    }
  }

  matchPassword() {
    const formValue = this.formThemNguoiDung.value;
    const formValue2 = this.formResetPassword.value;

    if (formValue.password_InForm !== formValue.repeatPass_InForm) {
      this.errMatchPassword = true;
    } else {
      this.errMatchPassword = false;
    }
    if (formValue2.password_InForm !== formValue2.repeatPass_InForm) {
      this.errMatchPassword2 = true;
    } else {
      this.errMatchPassword2 = false;
    }
  }
  checkValidThoiHan(value) {
    const formValue = this.formThemNguoiDung.value;
    if (value === '1') {
      if (!formValue.tuNgay) {
        this.errTuNgay = true;
        return false;
      }
      if (!formValue.denNgay) {
        this.errDenNgay = true;
        return false;
      }
      return true;
    }
    return true;
  }
  setThoiHan() {
    this.isCoThoiHan = true;
  }
  offThoiHan() {
    this.isCoThoiHan = false;
  }
  deleteNguoiDung(index, item) {
    this.indexSelected = index;
    this.itemSelected = item;
    this.modalDelete.show();
  }
  acceptDelete() {
    this.modalDelete.hide();
    this.noiQLNguoiDungService.deleteUser(this.itemSelected.login)
      .subscribe(res => {
        this.getAllData(this.data);
        this.alertService.success(MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_XOA_USER);
      }, err => {
        this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
      });
  }
  openModalResetPass(item) {
    this.itemSelected = item;
    this.formResetPassword.reset();
    this.formResetPassword.patchValue({
      tenDangNhap_InForm: item.login,
      hoTen_InForm: item.tenHienThi
    });
    this.modalResetPassword.show();
  }
  acceptResetPass() {
    const formValue = this.formResetPassword.value;
    this.itemSelected.password = formValue.password_InForm;
    this.noiQLNguoiDungService.updateUser(this.itemSelected)
      .subscribe(res => {
        this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
      }, err => {
        this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
      });
  }
  setPage(number) {
    this.currentPage = number;
    if (this.isSearch) {
      this.searchAction();
    } else {
      this.getAllData(this.data);
    }
  }

  onSearch() {
    this.isSearch = true;
    this.currentPage = 0;
    this.searchAction();

  }
  searchAction() {
    const queryAll = {
      size: this.pageSize,
      page: this.currentPage
    };
    this.isSearch = true;
    const searchValue = this.formTimKiem.value;
    if (searchValue.tenDangNhap === '' && searchValue.tenHienThi === '' &&
      searchValue.chucDanh === '' && searchValue.donViCongTac === '' && (searchValue.nhomQuyen === null || searchValue.nhomQuyen === '')) {
      this.getAllData(this.data);
    } else {
      this.noiQLNguoiDungService.searchUser(this.data.donViId, searchValue, queryAll)
        .subscribe(res => {
          // console.log(res['content']);
          // if ( res['content'].length > 0 ) {
          this.listNguoiDung = res['content'];
          const size = res['size'];
          const totalPages = res['totalPages'];
          this.pager = this.pagination.getPager(this.currentPage, size, totalPages);
          // }
          // else
          // {
          //
          //
          // }
        }, err => { });
    }

  }
  onDateChanged(event, isFromDate) {
    console.log('compare date', event);
    let fromDate = null;
    let toDate = null;
    if (isFromDate) {
      fromDate = this.timeBuilderService.fromTimeDatePicker(event).setUTC().toISOString();
      toDate = this.timeBuilderService.fromTimeDatePicker(this.formThemNguoiDung.controls.denNgay.value).setUTC().toISOString();
    } else {
      fromDate = this.timeBuilderService.fromTimeDatePicker(this.formThemNguoiDung.controls.tuNgay.value).setUTC().toISOString();
      toDate = this.timeBuilderService.fromTimeDatePicker(event).setUTC().toISOString();
    }
    if (fromDate) {
      fromDate = fromDate.split('T')[0];
    }
    if (fromDate > toDate && toDate !== 0) {
      this.errCompareDate = true;
    } else {
      this.errCompareDate = false;
    }
  }

  openChooseImageDiv() {
    const image_temp: File[] = this.image;
    const e: HTMLInputElement = this.imageUpload.nativeElement as HTMLInputElement;
    const u: HTMLImageElement = this.imageUser.nativeElement as HTMLImageElement;
    e.onchange = function(event) {
      image_temp[0] = e.files[0];
      const fr = new FileReader();
      fr.onload = function () {
        u.src = fr.result;
      }
      fr.readAsDataURL(image_temp[0]);
    };
    e.click();
  }
  //check username and email exitst
  checkExitstUserName() {
    const valueExitst = this.formThemNguoiDung.value.tenDangNhap_InForm || '';
    if(valueExitst.trim().length > 0){
      this.noiQLNguoiDungService.checkExitst(valueExitst).subscribe(res => {
        if(res !== ''){
          this.alertService.error(res);
          this.isCheckExistedUserName = true;
        }else{
          this.isCheckExistedUserName = false;
        }
      });
    }
  }

  checkExitstEmail() {
    const valueExitst = this.formThemNguoiDung.value.email_InForm || '';
    if(valueExitst.trim().length > 0){
      this.noiQLNguoiDungService.checkExitst(valueExitst).subscribe(res => {
        if(res !== ''){
          this.alertService.error(res);
          this.isCheckExistedEmail = true;
        }else{
          this.isCheckExistedEmail = false;
        }
      });
    }
  }
}
