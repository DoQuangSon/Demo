import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FILE } from '../../../../../../constants/api-file.constants';
import { COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';
import { LOAIHINH_TKKT, TLD_STT } from '../../../../../../constants/status.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { find, groupBy, uniqBy as LD_uniqBy } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { QUAN_LY_DOAN } from '../../../../../../constants/message.constants';
import { TempService } from '../tao-moi-doan-ttkt/temp.service';
import { IfilerQuyetDinhTldoan } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/ifiler-quyet-dinh-tldoan.interface';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { DmCanCuService } from '../../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { PhanLoaiDtService } from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { TldCommonService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { ThanhlapdoanCommonMethodService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/thanhlapdoan-common-method.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';
import { ModalDsDoanTtktComponent } from '../modal-list/modal-ds-doan-ttkt/modal-ds-doan-ttkt.component';
import { ModalLuuComponent } from '../modal-list/modal-luu/modal-luu.component';
import { AuthService } from '../../../../../../auth/auth.service';
import { TtktModalService } from '../../../../../../shared/modal/ttkt-modal.service';
import { ACCOUNTTYPE } from '../../../../../../constants/giaiquyet-dt.constants';

@Component({
  selector: 'ttkt-edit-thanh-lap-doan',
  templateUrl: './edit-thanh-lap-doan.component.html',
  styleUrls: ['./edit-thanh-lap-doan.component.scss']
})
export class EditThanhLapDoanComponent implements OnInit {
  dataFilterTLDoan: IfilerQuyetDinhTldoan = {};
  disabled: boolean = false;
  // setting multiselect
  dcTldForm: FormGroup;
  soLanDieuChinh: any;
  currentDieuChinhObj: any;
  tlDoanId: any;

  // File
  @ViewChild('fileQdDieuChinh') fileInputRef1: ElementRef;
  @ViewChild('tldForm') tldForm: any;

  fileQdDieuChinh: any = [];
  tenFileQdDieuChinh: any;
  urlFileDownload: any;
  isDisableTimKiemTrongThemMoiDV: boolean = false;
  // Location:
  locationType: string = '';

  isDaGuiTinh: boolean = false;
  isCanEdit: boolean = true;

  // Chưa điều chỉnh lần nào, ẩn đi field thông tin điều chỉnh, ấn vào mới hiện ra
  isFirstTimeDieuChinh: boolean = false;

  listDvDaTienHanh: any = [];

  tldId: number;
  typeAccount: string;
  isOwnerTW: boolean = false;

  selectedDiaBan: any;
  duyet: boolean;

  // showKB: any;
  editKB: FormControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private alertService: AlertService,
    private tlDoanService: ThanhLapDoanService,
    private timeBuilder: TimeBuilderService,
    private noiDmCanCu: DmCanCuService,
    private phanLoaiDvi: PhanLoaiDtService,
    private dmTinhHuyen: NoiDmTinhHuyenService,
    private pagination: PaginationService,
    private tldCommon: TldCommonService,
    private fileResource: FileResourceService,
    private modalService: BsModalService,
    private commonMethodTld: ThanhlapdoanCommonMethodService,
    public formService: FormService,
    private helper: UtilsService,
    private tempservice: TempService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType;
    this.initTldForm();
    this.route.params.subscribe(params => {
      if (params['index']) {
        this.tldId = params['index'];
      }
    });
    this.getSoLanDieuChinh();
    this.getCurrentDieuChinh(this.tldId, 'first');
    this.checkShowDieuChinh();
  }
  initTldForm() {
    this.dcTldForm = this.fb.group({
      lanDieuChinh: '',
      ngayDieuChinh: [new Date(), Validators.required],
      soQDdieuChinh: ['', Validators.required],
      fileQdDieuChinh: ['', Validators.required],
      fileQdDieuChinhObj: '',
      lyDoDieuChinh: ['', Validators.required],
    });
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
            if (el.ngayDieuChinh) { el.timeDieuChinh = new Date(el.ngayDieuChinh); }
          }
        });
        if (res.length > 1) {
          this.isFirstTimeDieuChinh = true;
        }
      }
    }, err => {
      this.soLanDieuChinh = [];
    });
  }

  chuaDieuChinh: boolean = false;
  getCurrentDieuChinh(id, first?, select?) {
    this.tlDoanService.getThanhLapDoanById(id).subscribe(res => {
      this.currentDieuChinhObj = res;
      this.tlDoanId = res.id;
      if (res.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_TAO_MOI) {
        this.chuaDieuChinh = true;
      }
      if (this.currentDieuChinhObj.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_DIEU_CHINH || this.currentDieuChinhObj.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_TAO_MOI) {
        this.duyet = true;
      } else {
        this.duyet = false;
      }
      this.selectedDiaBan = { id: res.phamViId, tenTinhHuyen: res.tenTinhHuyen };
      this.getFileList(res);
      this.patchValueForm(res, first);
      // console.log(res.status);
      // console.log("dieuChinh", this.chuaDieuChinh);
      // console.log("duyet", this.duyet);
    }, err => { });
  }

  getFileList(res) {
    try {
      if (res.fileQuyetDinhDieuChinh) { this.fileQdDieuChinh = JSON.parse(res.fileQuyetDinhDieuChinh); }
    } catch (e) {
      this.fileQdDieuChinh = [];
    }
  }

  downLoadFile(str, i?) {
    let arrayFile: any = [];
    if (str === 'dieuChinh') {
      arrayFile = this.fileQdDieuChinh;
    }
    this.fileResource.downloadFile(arrayFile[i].url).subscribe(blob => {
      this.fileResource.saveFile(blob, arrayFile[i].fileName);
    }, err => { });
  }

  patchValueForm(res, edit?) {
    this.dcTldForm.patchValue({
      lanDieuChinh: res.id,
    });
      this.resetThongTinDieuChinh();
  }

  changeLanDieuChinh() {
    const selectedId = this.dcTldForm.value.lanDieuChinh;
    this.getCurrentDieuChinh(selectedId, 'no', 'select');
    for (const item of this.soLanDieuChinh) {
      if (item.thanhLapDoanId > selectedId) {
        this.isCanEdit = false;
        return;
      } else {
        this.isCanEdit = true;
      }
    }
  }

  resetThongTinDieuChinh() {
    this.dcTldForm.patchValue({
      soQDdieuChinh: '',
      fileQdDieuChinh: '',
      lyDoDieuChinh: '',
      // ngayDieuChinh: ''
    });
  }

  onSubmit() {
    this.formService.touchAllInput(this.dcTldForm);
    if (this.dcTldForm.invalid) {
      this.alertService.error('Chưa điền đủ thông tin');
      console.log(this.formService.getErrorList(this.dcTldForm));
      return;
    }

    const formData = this.tldForm.submitForm();
    if (!formData) {
      return;
    }
    this.onSubmitUpdate(formData);
    this.tempservice.setValue(this.editKB.value);
  }

  onSubmitUpdate(formData) {
    const currentThanhLap = this.currentDieuChinhObj;
    const formValue = this.dcTldForm.value;
    const formBody: any = Object.assign(currentThanhLap, formData);
    formBody.ngayDieuChinh = this.timeBuilder.fromTimeDatePicker(formValue.ngayDieuChinh).setUTC().toISOString() || '';
    formBody.soQuyetDinhDieuChinh = formValue.soQDdieuChinh;
    formBody.lyDoDieuChinh = formValue.lyDoDieuChinh;
    formBody.fileQuyetDinhDieuChinh = this.fileResource.getFileString(this.fileQdDieuChinh);
    formBody.isDaDuocDieuChinh = false;
    formBody.actived = true;
    formBody.currentDieuChinh = this.currentDieuChinhObj.currentDieuChinh + 1;
    // Handle data for dsDvDcTTKTS
    // formBody.dsDvDcTTKTS = this.getFinalListDvDcTTKTS(this.tldCommon.getDvDcTTKTS(this.tableContent), this.listDvDaTienHanh);
    // formBody.dsDvDcTTKTS = LD_uniqBy(formBody.dsDvDcTTKTS, 'id');// có vấn đề ở đây: 3 item
    // this.checkFormBodyValid(formBody);
    this.saveThanhLapDoan(formBody);

  }

  saveThanhLapDoan(formBody) {
    if (this.currentDieuChinhObj.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_DIEU_CHINH || this.currentDieuChinhObj.status === TLD_STT.STATUS_THANH_LAP_DOAN_CHO_DUYET_TAO_MOI) {
      this.tlDoanService.editThanhLapDoan(formBody).subscribe(res => {
        this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT, { delay: 1000 });
        this.afterUpdateThanhLapDoan(res.id);
      }, err => { });
    } else {
      this.tlDoanService.ver2DieuChinhTlDoan(formBody).subscribe(res => {
        this.alertService.success('Điều chỉnh thành công', { delay: 1000 });
        this.afterUpdateThanhLapDoan(res.id);
      }, err => { });
    }
  }

  afterUpdateThanhLapDoan(id) {
    if (this.typeAccount === ACCOUNTTYPE.trunguong) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', id]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chi-tiet', id]);
    }
  }

  upFileQDDieuChinh() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQdDieuChinh = res;
        this.urlFileDownload = res;
        if (this.urlFileDownload.length !== 0) {
          this.tenFileQdDieuChinh = this.urlFileDownload[0].fileName;
        }
        this.dcTldForm.patchValue({
          fileQdDieuChinh: res[0].fileName
        });
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  checkShowDieuChinh() {
    if (!this.chuaDieuChinh && !this.duyet) {
      this.updateValueAndValidityTldForm('ngayDieuChinh', Validators.required);
      this.updateValueAndValidityTldForm('soQDdieuChinh', Validators.required);
      this.updateValueAndValidityTldForm('fileQdDieuChinh', Validators.required);
      this.updateValueAndValidityTldForm('lyDoDieuChinh', Validators.required);
      return true;
    } else {
      this.updateValueAndValidityTldForm('ngayDieuChinh', null);
      this.updateValueAndValidityTldForm('soQDdieuChinh', null);
      this.updateValueAndValidityTldForm('fileQdDieuChinh', null);
      this.updateValueAndValidityTldForm('lyDoDieuChinh', null);
      return false;
    }
  }
  updateValueAndValidityTldForm(control: string, validators: any) {
    this.dcTldForm.controls[control].setValidators(validators);
    this.dcTldForm.controls[control].updateValueAndValidity();
  }

  // setValueMaKhamChuaBenh(coquan, valueKCB) {
  //   coquan['maCoSoKhamChuaBenh'] = valueKCB;
  // }
}
