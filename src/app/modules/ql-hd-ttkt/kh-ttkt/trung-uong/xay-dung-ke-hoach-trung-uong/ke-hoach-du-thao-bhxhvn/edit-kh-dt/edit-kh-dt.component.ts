import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants/index';
import { NoiKehoachDuthaoService } from '../../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { NoiDmChutriPhoiHopService } from '../../../../../../../services/api/danh-muc/noi-dmChutriPhoihop/noi-dm-chutri-phoi-hop.service';
import { NoiDmTinhHuyenService } from '../../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { KeHoachToanNganhService } from '../../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';
import { FILE } from '../../../../../../../constants/api-file.constants';
import { MESS_TAO_KH_TW } from '../../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-edit-kh-dt',
  templateUrl: './edit-kh-dt.component.html',
  styleUrls: ['./edit-kh-dt.component.scss']
})
export class EditKhDtComponent implements OnInit {
  @ViewChild('addKehoach') addKehoach: ModalDirective;
  @ViewChild('fileQDDieuChinhKH') fileInputRef1: ElementRef;
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef2: ElementRef;

  dieuchinhForm: FormGroup;
  addKehoachform: FormGroup;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  modelDate: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  id: any;
  type: any;
  chiTietKH: any;
  keHoachNam: any;
  listKeHoach: any[] = [];
  tenFileQuyetDinhTaoKH: any;
  fileQDTaoKH: any = [];
  listDmChutriPhoihop: any[] = [];
  listDonViPhoiHop: any;
  listTinhThanh: any[] = [];
  page: number = 0;
  size: number = 10;
  formBody: any = {};
  isCapNhat: boolean = false;
  duyet: any;
  hideDelete: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private timeBuilderService: TimeBuilderService,
    private noiDmChutriPhoiHopService: NoiDmChutriPhoiHopService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = 'edit';
      this.isCapNhat = true;
      this.getKhDTById(this.id);
      this.getDmChuTriPhoiHop();
    });
  }
  getKhDTById(id: number) {
    this.noiKehoachDuthaoService.getById(id)
      .subscribe(res => {
        this.chiTietKH = res;
        this.keHoachNam = res.keHoachYear;
        this.listKeHoach = res.chiTietKhTWSet;
        this.fileQDTaoKH = res.fileQuyetDinhTaoKH;
        this.tenFileQuyetDinhTaoKH = JSON.parse(res.fileQuyetDinhTaoKH)[0].fileName;
        this.dieuchinhForm.patchValue({
          nam: res.keHoachYear,
          tenKehoach: res.tenKeHoach,
          soQuyetDinh: res.soQuyetDinhTaoKeHoach,
          nguoiKy: res.nguoiKyQDTaoKeHoach,
          nguoiKi: res.nguoiKyQDTaoKeHoach,
          ngayTao: this.timeBuilderService.fromString(res.ngayQuyetDinhTaoKeHoach).toTimeDatePickerValue(),
          ngayKy: this.timeBuilderService.fromString(res.ngayKyQDTaoKeHoach).toTimeDatePickerValue(),
        });
      }, err => {
      });
  }
  getDmChuTriPhoiHop() {
    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihop(this.page, this.size)
      .subscribe(res => {
        this.listDmChutriPhoihop = res['content'];
        for (const i of this.listDmChutriPhoihop) {
          this.listDonViPhoiHop.push(
            {
              'text': i.tenDonViChuTriPhoiHop,
              'id': i.id
            }
          );
        }
      }, err => {
      });
    this.noiDmTinhHuyenService.getDanhSachTinhThanh()
      .subscribe(res => {
        this.listTinhThanh = res['content'];
      }, err => {
      });
  }
  createForm() {
    this.addKehoachform = this.fb.group({
      chonQuy: ['0'],
      chonTinh: ['0'],
      donViChuTri: ['0'],
      donViChiPhoi: ['0'],
      loaiHinhTTKT: ['0']
    });
    this.dieuchinhForm = this.fb.group({
    });
  }

  onListKH(listKeHoach) {
    this.listKeHoach = listKeHoach;
  }
  onLuu(key) {
      this.chiTietKH.chiTietKhTWSet = this.chiTietKH.chiTietKhTWSet.filter(item => item.id !== null);
    if (key === 'capnhat') {
      this.keHoachToanNganhService.twTaoKeHoachDuThao(this.chiTietKH)
        .subscribe(res => {
          this.alertService.success(MESS_TAO_KH_TW.SUCCESS_CAP_NHAT_KH);
          this.router.navigate(['ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn']);
        }, err => {
        });
      }
  }
}
