
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { STATUS, TRANG_THAI_KH } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';

@Component({
  selector: 'ttkt-ke-hoach-chi-tiet-bhxhvn',
  templateUrl: './ke-hoach-chi-tiet-bhxhvn.component.html',
  styleUrls: ['./ke-hoach-chi-tiet-bhxhvn.component.scss']
})
export class KeHoachChiTietBhxhvnComponent implements OnInit {
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  kehoachChitietForm: FormGroup;
  soQDdieuChinh: string = '';
  lyDoDieuChinh: string = '';
  kehoach: any;
  keHoachNam: any;
  public listKeHoach: any[] = [];
  currentDieuChinh: any;
  urlFileDownload: any;
  tenFileQDDieuChinh: any;
  keHoachId: any;
  dieuchinh: any;
  isDuyet: boolean;
  isDieuChinh: boolean;
  year: string = '';
  maxDieuChinh: number = 0;
  lanDieuChinh: any[] = [];
  listKeHoachOldId: any[] = [];
  listIdAndStatus: any;
  urlFileDCDownload: any;
  tenFileQD: any;
  listLichSu: any[];
  isDisableLS: boolean = true;
  soLSChinhSua: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
    private fileResource: FileResourceService
  ) { }

  ngOnInit() {
    this.kehoachChitietForm = this.fb.group({
      lanDieuchinh: [''],
      soQDdieuChinh: [''],
      lyDoDieuChinh: ['']
    });
    this.route.params.subscribe(params => {
      this.keHoachId = params['id'];
    });
    this.getKeHoach();
    // setTimeout(() => {
    //   this.twCheckStatusOfKH();
    //   // this.mapStatus(this.keHoachId);
    // }, 1000);
    this.getListLichSu();
  }
  onDuyet() {
    this.duyetModal.show();
  }
  onSubmitDuyet() {
    this.keHoachToanNganhService.twDuyetKeHoachDauNam(this.keHoachId)
      .subscribe(res => {
        this.duyetModal.hide();
        this.getOffAllButtons();
        this.checkThongTinDieuChinh();
        this.alertService.success('Đã duyệt');
      }, err => { });
  }

  goToDieuChinh() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/chi-tiet-ke-hoach/dieu-chinh/', this.keHoachId, 'dieuchinh']);
  }
  goToCapNhat() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/chi-tiet-ke-hoach/dieu-chinh/', this.keHoachId, 'edit']);
  }
  in() {
    // const jframe = document.getElementById('iframePrint');
    // jframe.setAttribute('src', './../../../../../assets/print-document/BaoCao01.html');
    // this.printDocument.show();

    this.keHoachToanNganhService.printKeHoachDuThaoByID(this.keHoachId).subscribe(res => {
      const file = this.keHoachToanNganhService.loadPdf(res);
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, err => { console.log('in bị lỗi'); }, );
  }
  getKeHoach() {
    this.noiKehoachDuthaoService.getById(this.keHoachId)
      .subscribe(res => {
        this.kehoach = res;
        this.listKeHoach = res.chiTietKhTWSet;
        this.urlFileDownload = JSON.parse(res.fileQuyetDinhTaoKH);
        this.urlFileDCDownload = JSON.parse(res.fileQuyetDinhDieuChinh);
        this.keHoachNam = res.keHoachYear;
        this.currentDieuChinh = res.currentDieuChinh;
        this.dieuchinh = res.currentDieuChinh;
        if (this.urlFileDCDownload !== null && this.urlFileDCDownload !== undefined) {
          this.tenFileQDDieuChinh = this.urlFileDCDownload[0].fileName;
        }
        if (this.urlFileDownload !== null && this.urlFileDownload !== undefined) {
            this.tenFileQD = this.urlFileDownload[0].fileName;
        }
        this.kehoachChitietForm.patchValue({
          lanDieuchinh: res.currentDieuChinh,
          soQDdieuChinh: res.soQuyetDinhDieuChinh,
          lyDoDieuChinh: res.lyDoDieuChinh
        });
        if (this.maxDieuChinh < res.currentDieuChinh) {
          this.lanDieuChinh = [];
          this.maxDieuChinh = res.currentDieuChinh;
          for (let i = 0; i < res.currentDieuChinh; i++) {
            this.lanDieuChinh.push(i + 1);
          }
        }
        this.getStatus(res.status);
        this.getKeHoachOldId();
      }, err => {
      });
  }
  chonDieuChinh(lanDieuChinh) {
    for (let i = 0; i < this.listKeHoachOldId.length; i++) {
      if (Number(lanDieuChinh) === this.listKeHoachOldId[i].currentDieuChinh) {
        this.keHoachId = this.listKeHoachOldId[i].id;
        break;
      }
    }
    this.getKeHoach();
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn']);
  }

  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
  downLoadFileDC() {
    this.fileResource.downloadFile(this.urlFileDCDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDCDownload[0].fileName);
    }, err => { });
  }
  getKeHoachOldId() {
    this.listKeHoachOldId = [];
    this.noiKehoachDuthaoService.getKhOld(this.keHoachId)
      .subscribe(res => {
        this.listKeHoachOldId = res;
      }, err => { });
  }
  getStatus(status) {
    if (status === STATUS.STATUS_KHDUTHAO_TW_CHO_DUYET_TAO_KH) {
      this.getOffAllButtons();
      this.isDuyet = true;
    } else {
      this.getOffAllButtons();
      this.checkThongTinDieuChinh();
    }
  }
  getOffAllButtons() {
    this.isDuyet = false;
    this.checkThongTinDieuChinh();
  }
  // twCheckStatusOfKH() {
  //   this.keHoachToanNganhService.twCheckStatus(this.keHoachId, this.keHoachNam).subscribe(res => {
  //     this.listIdAndStatus = res;
  //   }, err => { });
  // }
  // mapStatus(id) {
  //   setTimeout(() => {
  //     for (const keHoach of this.listKeHoach) {
  //       if (this.listIdAndStatus != null && this.listIdAndStatus.length > 0) {
  //         for (const status of this.listIdAndStatus) {
  //           if (keHoach.id === status.id) {
  //             keHoach.status = status.status;
  //           }
  //         }
  //       }
  //     }
  //   }, 100);
  // }
  getStatusName(code: number) {
    let status: string = '';
    for (const trangThai of TRANG_THAI_KH) {
      if (code === trangThai.code) {
        status = trangThai.name;
      }
    }
    return status;
  }

  onSubmitPrintDocument() {

  }
  checkThongTinDieuChinh() {
    if ((this.kehoach.soQuyetDinhDieuChinh !== undefined && this.kehoach.soQuyetDinhDieuChinh !== null)
      || (this.kehoach.lyDoDieuChinh !== undefined && this.kehoach.lyDoDieuChinh !== null)
      || (this.kehoach.ngayXinDieuChinh !== undefined && this.kehoach.ngayXinDieuChinh !== null)
      // || (this.kehoach.soQuyetDinhDieuChinh !== undefined && this.kehoach.soQuyetDinhDieuChinh !== null)
      // || (this.kehoach.soQuyetDinhDieuChinh !== undefined && this.kehoach.soQuyetDinhDieuChinh !== null)
      // || (this.kehoach.soQuyetDinhDieuChinh !== undefined && this.kehoach.soQuyetDinhDieuChinh !== null)
      || (this.kehoach.fileQuyetDinhDieuChinh !== undefined && this.kehoach.fileQuyetDinhDieuChinh !== null)) {
      this.isDieuChinh = true;
    } else {
      this.isDieuChinh = false;
    }
  }
  getListLichSu() {
    this.keHoachToanNganhService.getLSDaGiaoKHBHXH(this.keHoachId).subscribe(
      data => {
        this.listLichSu = data;
        this.soLSChinhSua = this.listLichSu.length;
        if (this.listLichSu.length > 0) {
          this.isDisableLS = false;
        } else {
          this.isDisableLS = true;
        }
      }
    );
  }

  goToDanhSachCacTinh() {
    // if (this.khDuThao !== true) {
      this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/danh-sach-tinh']);
    // } else {
    //   this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn']);
    // }
  }
}
