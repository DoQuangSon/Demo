import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { groupBy } from 'lodash';
import { STATUS_HD_TAI_DVI } from '../../../../../../constants/status.constants';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { FileDetector } from 'selenium-webdriver/remote';
import { IMyDpOptions } from 'mydatepicker';
import { TienHanhTtktService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { ModalVphcFormComponent } from '../../modal-vphc-form/modal-vphc-form.component';
import { ModalQdxpVphcFormComponent } from '../../modal-qdxp-vphc-form/modal-qdxp-vphc-form.component';

@Component({
  selector: 'ttkt-theodoi-hd-doan-ttkt-form',
  templateUrl: './theodoi-hd-doan-ttkt-form.component.html',
  styleUrls: ['./theodoi-hd-doan-ttkt-form.component.scss']
})
export class TheodoiHdDoanTtktFormComponent implements OnInit {
  @Input() typeAccount = '';
  tiendo: any;
  data: any = {};
  // dsDonvi = [];
  theoDoiId: any;
  tableContent: any = [];

  isTW: Boolean = false;

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

  // Modal biên bản
  @ViewChild('modalBienBan') public modalBienBan: ModalDirective;
  // modal vphc
  @ViewChild(ModalVphcFormComponent) modalVPHC: ModalVphcFormComponent;
  @ViewChild(ModalQdxpVphcFormComponent) modalQDXP: ModalQdxpVphcFormComponent;
  //
  bienBanForm: FormGroup;
  isBBLamViec = false;
  isBBHoan = false;
  titleModalBienBanHoanLv = '';

  // Modal biên bản VPHC
  showModalVPHC: Boolean;
  showModalQDXP: Boolean;
  isBBVPHC = false;
  isQDXuPhatHC = false;
  isLuu: Boolean = true;
  bienBanVPHCForm: FormGroup;
  tldId: any;
  public VPHC: any = {
    id: 'BIEN_BAN',
    title: 'Lập biên bản VPHC',
    subTitle: 'Biên bản ',
    name: 'Tên biên bản',
  };

  // Check có báo cáo / kết luận chưa
  isHaveBaoCao = false;
  isHaveKetLuan = false;
  isShowButtonBC: Boolean;

  // Check kết thúc để show báo cáo, báo cáo rồi mới show kết luận
  isCanBaoCao = false;
  isCanKetLuan = false;

  fileBienBanObj: any = {};

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: true,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tienHanhTTKT: TienHanhTtktService,
    private fb: FormBuilder,
    private fileReSource: FileResourceService,
    private timeBuilder: TimeBuilderService,
    private thanhLapDoanService: ThanhLapDoanService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.tiendo = '100%';
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.theoDoiId = params['id'];
      }
    });
    this.checkTLDKetThuc();
    this.getTheoDoiHdDoan();
    this.creatBienBanForm();
    this.creatBienBanVPHCForm();
    this.isTW = this.router.url.indexOf('tw') > -1;
  }

  checkTLDKetThuc() {
    this.thanhLapDoanService.checkTLDKetThuc(this.theoDoiId).subscribe(res => {
      if (res === true || res === 'true') {
        this.isCanBaoCao = true;
        this.thanhLapDoanService.checkTLDBaoCao(this.theoDoiId).subscribe(response => {
          if (response === true || response === 'true') {
            this.isCanKetLuan = true;
          }
        }, err => { });
      }
    }, err => { });
  }

  getTheoDoiHdDoan() {
    this.tienHanhTTKT.getTheoDoiHdDoan(this.theoDoiId).subscribe(res => {
      this.data = res;
      if (res.bbBcKetLuans) {
        this.checkBaoCaoOrKetLuan(res.bbBcKetLuans);
      }
      this.patchValueTable(res);
    }, err => { });
  }

  checkBaoCaoOrKetLuan(listBcKL) {
    for (const item of listBcKL) {
      if (item.isBienBanKetLuan) {
        this.isHaveKetLuan = true;
      } else {
        this.isHaveBaoCao = true;
      }
    }
  }

  creatBienBanForm() {
    this.bienBanForm = this.fb.group({
      lyDoHoanTTKT: [''],
      soBienBan: [''],
      ngayKy: [''],
      nguoiKy: [''],
      fileDinhKem: [''],
      fileBienBanLamViec: [''],
      daiDienCqDv: [''],
      fileName: ['']
    });
  }

  creatBienBanVPHCForm() {
    this.bienBanVPHCForm = this.fb.group({
      VPHCTinhMoi: this.fb.array([]),
    });
  }

  patchValueTable(res) {
    const tableContent = res.dsDvDcTTKTS;
    this.tldId = res.dsDvDcTTKTS[0].thanhLapDoanId;
    let groupContent: any = groupBy(tableContent, (el: any) => (el.dmPhanLoaiDtId));
    groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    for (const item of groupContent) {
      // Patch value to table content
      const _el: any = {};
      _el.dmPhanLoaiDtId = item[1][0].dmPhanLoaiDtId;
      _el.tenDanhMuc = item[1][0].tenDanhMucPhanLoaiDt;
      _el.thanhLapDoanId = item[1][0].thanhLapDoanId;
      _el.children = [];
      for (const element of item[1]) {
        _el.children.push(element);
        if (element.moreInfo.status === null || element.moreInfo.status === 100) {
          this.isShowButtonBC = false;
        }else {
          this.isShowButtonBC = true;
        }
      }
      this.tableContent.push(_el);
    }
  }

  getStatusName(status) {
    for (const item of this.listHoatDongStatus) {
      if (Number(item.status) === Number(status)) {
        return item.name;
      }
    }
  }

  xemBienBan(bienBan, number) {
    if (Number(number) === 1) {
      this.isBBHoan = true;
      this.titleModalBienBanHoanLv = 'Chi tiết biên bản hoãn';
    } else {
      this.isBBHoan = false;
    }
    if (Number(number) === 2) {
      this.isBBLamViec = true;
      this.titleModalBienBanHoanLv = 'Chi tiết biên bản làm việc';
    } else {
      this.isBBLamViec = false;
    }
    this.patchValueBienBan(bienBan);
    this.modalBienBan.show();
  }

  patchValueBienBan(bienBan) {
    let fileObj: any = {};
    if (bienBan.fileDinhKem) {
      fileObj = this.fileReSource.getFileObj(bienBan.fileDinhKem);
    }
    if (bienBan.fileBienBanLamViec) {
      fileObj = this.fileReSource.getFileObj(bienBan.fileBienBanLamViec)[0];
    }
    this.bienBanForm.patchValue({
      lyDoHoanTTKT: bienBan.lyDoHoanTTKT || '',
      soBienBan: bienBan.soBienBan || '',
      ngayKy: this.timeBuilder.fromString(bienBan.ngayKy).toTimeDatePickerValue() || '',
      nguoiKy: bienBan.nguoiKy || '',
      fileDinhKem: bienBan.fileDinhKem || '',
      fileBienBanLamViec: bienBan.fileBienBanLamViec || '',
      daiDienCqDv: bienBan.daiDienCqDv || '',
      fileName: fileObj.fileName || '',
    });
    this.fileBienBanObj = fileObj;
  }

  // patchValueBienBanVPHC(bienBan) {
  //   const bbVPHC = <FormArray>this.bienBanVPHCForm.controls.VPHCTinhMoi;
  //   (bienBan || []).forEach(item => {
  //     let ngayLap = item.ngayLap;
  //     let fileObj: any;
  //     if (typeof ngayLap === 'string') {
  //       ngayLap = this.timeBuilder.fromString(item.ngayLap).toTimeDatePickerValue();
  //     }
  //     if (item.fileDinhKem && item.fileDinhKem !== '') {
  //       fileObj = this.fileReSource.getFileObj(item.fileDinhKem);
  //     }
  //     bbVPHC.push(this.pushBbVphcForm({
  //       tenBienBan: item.tenBienBan || item.tenBienBanQuyetDinh || '',
  //       lyDoLap: item.lyDoLap || '',
  //       nguoiLap: item.nguoiLap || '',
  //       ngayLap: ngayLap || '',
  //       soTien: item.soTien || '',
  //       fileDinhKem: (fileObj || {}).fileName || '',
  //       fileObj: fileObj
  //     }));
  //   });
  // }

  // pushBbVphcForm(obj = {
  //   tenBienBan: '',
  //   lyDoLap: '',
  //   nguoiLap: '',
  //   ngayLap: '',
  //   soTien: '',
  //   fileDinhKem: '',
  //   fileObj: ''
  // }): FormGroup {
  //   const form = this.fb.group({
  //     tenBienBan: obj.tenBienBan,
  //     lyDoLap: obj.lyDoLap,
  //     nguoiLap: obj.nguoiLap,
  //     ngayLap: obj.ngayLap,
  //     soTien: obj.soTien,
  //     fileDinhKem: obj.fileDinhKem,
  //     fileObj: obj.fileObj
  //   });
  //   return form;
  // }

  downLoadFileVPHC(item) {
    const fileUrl = this.fileReSource.getFileObj(item.value.fileObj);
    this.fileReSource.downloadFile(fileUrl.url).subscribe(res => {
      this.fileReSource.saveFile(res, fileUrl.fileName);
    }, err => { });
  }

  downloadFileBBhoanLv() {
    this.fileReSource.downloadFile(this.fileBienBanObj.url).subscribe(blob => {
      this.fileReSource.saveFile(blob, this.fileBienBanObj.fileName);
    });
  }

  detailtheodoi(id) {
    if (!this.data.tenBienBanCongBo) {
      this.alertService.error('Bạn phải tạo quyết định công bố trước khi tiến hành');
      return;
    }
    if (this.isTW) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/' + this.theoDoiId + '/chitiet-hoatdong-donvi/' + `${id},${this.theoDoiId}`]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/' + this.theoDoiId + '/chitiet-hoatdong-donvi/' + `${id},${this.theoDoiId}`]);
    }
  }

  QDCongBo() {
    if (this.isTW) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/congbo-qd-ttkt-tw', this.theoDoiId]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/congbo-qd-ttkt', this.theoDoiId]);
    }
  }

  gotoChitietTlDoan(id) {
    if (this.isTW) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', id]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chi-tiet', id]);
    }
  }

  baoCaoKQTTKT(id) {
    if (this.isTW) {
      this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/${id}/bao-cao-ket-qua`]);
    } else {
      this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/${id}/bao-cao-ket-qua`]);
    }
  }

  ketLuanTTKT(id) {
    if (this.isTW) {
      this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/${id}/ket-luan-ttkt`]);
    } else {
      this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/${id}/ket-luan-ttkt`]);
    }
  }

  get formData() {
    return <FormArray>this.bienBanVPHCForm.get('VPHCTinhMoi');
  }

  // Modal vi phạm hành chính
  bbVPHC: any;
  bbQDXP: any;
  selected_dvDcTtktID: number;
  status: any;
  openModalVPHC(dvDcTtktID, data, status) {
    this.selected_dvDcTtktID = dvDcTtktID;
    this.bbVPHC = data;
    this.bbVPHC.soQuyetDinh = this.data.soQuyetDinh;
    this.status = status;
    console.log(data, this.bbVPHC);
    this.showModalVPHC = true;
    if (this.modalVPHC !== null && this.modalVPHC !== undefined) {
      this.modalVPHC.openModalVPHX();
    }
  }
  openModalQDXP(dvDcTtktID, data, status) {
      this.selected_dvDcTtktID = dvDcTtktID;
      this.bbQDXP = data;
      this.bbQDXP.soQuyetDinh = this.data.soQuyetDinh;
      this.showModalQDXP = true;
      this.status = status;
      if (this.modalQDXP !== null && this.modalQDXP !== undefined) {
          this.modalQDXP.openModalQDXP();
      }
  }
}
