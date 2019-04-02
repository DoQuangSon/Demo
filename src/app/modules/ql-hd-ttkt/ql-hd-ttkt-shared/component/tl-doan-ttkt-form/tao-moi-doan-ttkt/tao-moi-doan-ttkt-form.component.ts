import { Component, ElementRef, Input, OnInit, ViewChild, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FILE } from '../../../../../../constants/api-file.constants';
import { LOAIHINH_TKKT, TLD_STT } from '../../../../../../constants/status.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { DmCanCuService } from '../../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { PhanLoaiDtService } from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import { TldCommonService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { ThanhlapdoanCommonMethodService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/thanhlapdoan-common-method.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { UtilsService, getDayCompareDate } from '../../../../../../services/api/utils/utils.service';
import { NoiDmChucDanhService } from '../../../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { ModalDsDoanTtktComponent } from '../modal-list/modal-ds-doan-ttkt/modal-ds-doan-ttkt.component';
import { AuthService } from '../../../../../../auth/auth.service';
import { ModalDonViComponent } from '../modal-list/modal-don-vi/modal-don-vi.component';
import { ModalThemDonViComponent } from '../modal-list/modal-them-don-vi/modal-them-don-vi.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ACCOUNTTYPE } from '../../../../../../constants/giaiquyet-dt.constants';
import { DateCompareValidator } from '../../../../../../shared/form-module/custom-validattion';


@Component({
  selector: 'ttkt-tao-moi-doan-ttkt-form',
  templateUrl: './tao-moi-doan-ttkt-form.component.html',
  styleUrls: ['./tao-moi-doan-ttkt-form.component.scss']
})
export class TaoMoiDoanTtktFormComponent implements OnInit {
  modalThanhVien: BsModalRef;
  modalLuu: BsModalRef;
  @ViewChild('fileInput') fileInputRef: ElementRef;
  @ViewChild('fileInput2') fileInputRef2: ElementRef;
  @ViewChild('fileQdDieuChinh') fileInputRef1: ElementRef;
  // @Output() onSubmitForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() type = 'add'; // edit, view

  private _data: any;
  get data() {
    return this._data;
  }

  @Input()
  set data(data: any) {
    this._data = data;
    this.patchValueEditTlDoan();
  }

  typeAccount: string;

  cacDonViPhoiHop: any = []; //
  cacNoiDungTT: any = []; //
  cacNoiDungKT: any = []; //
  tldoanForm: FormGroup;
  cacCanCu: any = []; //
  cacDonViChuTriByType: any = []; //
  dsThanhVien: any[] = [];
  tableContent: any = [];
  dvChecked: any[] = [];
  dsTinh: any = []; //
  // File
  fileQD: any = [];
  fileTaiLieuLienQuan: any = [];
  fileQdThanhLap: any = [];
  tenFileTaiLieuLienQuan: any;
  urlFileDownload: any;

  listLoaiHinhDonVi: any[] = [];
  listChucVu: any = [];
  date: Date = new Date();

  dataFilterTLDoan: any = {};
  isTkTinh = false;
  listDoiTuong: any = [];
  disableDvCTri = false;

  constructor(
    private alertService: AlertService,
    private canCuService: DmCanCuService,
    private timeBuilder: TimeBuilderService,
    private tlDoanService: ThanhLapDoanService,
    private pagination: PaginationService,
    private phanLoaiDvi: PhanLoaiDtService,
    private tldCommon: TldCommonService,
    private fileService: FileResourceService,
    private dmTinhHuyenService: NoiDmTinhHuyenService,
    private commonMethodTld: ThanhlapdoanCommonMethodService,
    private modalService: BsModalService,
    public formService: FormService,
    private helper: UtilsService,
    private fb: FormBuilder,
    private noiDmChucDanhService: NoiDmChucDanhService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType;
    if (this.typeAccount === 'tinh') {
      this.isTkTinh = true;
    }
    this.getListChucDanh();
    this.initTldForm();
    this.getListCanCu();
    this.getDvChuTriPhoiHop();
    this.getListNDTTKT();
    this.phanLoaiDvi.getListPhanLoaiDt(0, 100).subscribe(res => {
      this.listLoaiHinhDonVi = res.content;
      this.setDvCheckedAndTableData();
    }, err => { });
    this.tldoanForm.get('thoiHanThucHien').disable();

    // @Todo: Gộp code các phần edit, view
    this.patchValueEditTlDoan();
    this.tldoanForm.get('thoiHanThucHien').value == this.subDay();
  }


  // checkShowDieuChinh() {
  //   if (this.type == 'add') {
  //     return false;
  //   }
  //   if (!this.chuaDieuChinh && !this.duyet) {
  //     this.formService.disableControl(['ngayDieuChinh', 'soQDdieuChinh', 'fileQdDieuChinh', 'lyDoDieuChinh'], this.tldoanForm);
  //     return true;
  //   } else {
  //     false
  //   }
  // }
  getDsHuyenByTinhThanhId() {
    this.dmTinhHuyenService.getDsHuyenByTinh(this.auth.currentUser.dmTinhHuyenId).subscribe(res => {
      this.dsTinh = res;
    });
  }

  getFileList(res) {
    try {
      if (res.fileTaiLieuLienQuan) { this.fileTaiLieuLienQuan = JSON.parse(res.fileTaiLieuLienQuan); }
      if (res.fileQuyetDinhThanhLap) {
        this.fileQdThanhLap = JSON.parse(res.fileQuyetDinhThanhLap);
        this.tldoanForm.get('fileQuyetDinh').setValue(this.fileQdThanhLap);
      }
      if (res.fileQuyetDinhDieuChinh) { this.fileQD = JSON.parse(res.fileQuyetDinhDieuChinh); }
    } catch (e) {
      console.log(e);
      this.fileTaiLieuLienQuan = [];
      this.fileQD = [];
      this.fileQdThanhLap = [];
    }
  }

  patchValueEditTlDoan() {
    if (this.type != 'add') {
      this.getDsHuyenByTinhThanhId();
    }
    if (!this.tldoanForm || !this.data) {
      return;
    }

    const res = this.data;
    this.getFileList(res);
    res.noiDungTTKTS = res.noiDungTTKTS.map(res1 => {
      res1.id = res1.dmNoiDungTTKTId;
      return res1;
    });

    res.chonNoiDung = res.isNoiDungThanhTra ? 'thanhTra' : 'kiemTra';
    res.listNoiDungTT = res.isNoiDungThanhTra ? res.noiDungTTKTS.map(res1 => {
      res1.text = res1.tenNoiDungTTKT;
      return res1;
    }) : [];
    res.listNoiDungKT = !res.isNoiDungThanhTra ? res.noiDungTTKTS.map(res1 => {
      res1.text = res1.tenNoiDungTTKT;
      return res1;
    }) : [];
    res.chonDvPhoiHop = (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA) ||
      (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA) ? 'khongLienNganh' : 'lienNganh';

    res.donViPhoiHop = res.dvPhoiHops.map(data => ({
      id: data.dmCTriPHopId,
      text: data.tenDonViChuTriPhoiHop
    })
    );

    this.dvChecked = res.dsDvDcTTKTS.map(req => {
      req.id = req.doiTuongTTKTId;
      req.tenDoiTuong = req.doiTuongTTKT.tenDoiTuong;
      req.maSuDungLaoDong = req.doiTuongTTKT.maSuDungLaoDong;
      req.maCoSoKhamChuaBenh = req.doiTuongTTKT.maCoSoKhamChuaBenh;
      req.maThu = req.doiTuongTTKT.maThu;
      req.noiDungKTS.map(res1 => {
        res1.id = res1.dmNoiDungTTKTId;
        return res1;
      });
      req.noiDungTT = req.noiDungKTS.filter(res1 => res1.isNoiDungThanhTra);
      req.noiDungKT = req.noiDungKTS.filter(res1 => !res1.isNoiDungThanhTra);
      req.noiDungTTName = this.formService.joinArray(req.noiDungTT, 'tenNoiDungTTKT', '; ');
      req.noiDungKTName = this.formService.joinArray(req.noiDungKT, 'tenNoiDungTTKT', '; ');

      return req;
    });

    this.tldoanForm.patchValue(res);

    // map danhSachDoans
    this.setDvCheckedAndTableData();
    this.dsThanhVien = res.danhSachDoans;
  }

  initTldForm() {
    this.tldoanForm = this.fb.group({
      soQuyetDinh: ['', [Validators.required, Validators.maxLength(50)]],
      tenQuyetDinh: ['', Validators.required],
      ngayQuyetDinh: [this.date, Validators.required],
      ngayCongBo: [this.date, Validators.required],
      coQuanBanHanh: ['', Validators.required],
      thoiHanThucHien: ['', Validators.required],
      donViCTriId: ['', Validators.required],
      donViPhoiHop: [''],
      dmCanCuTTKTId: [1, Validators.required],
      nguoiKyQuyetDinh: ['', Validators.required],
      loaiHinh: [''],
      isTrongKeHoach: [true, Validators.required],
      fileQuyetDinh: ['', Validators.required],
      quyetDinhThanhLap: [''],
      taiLieuLienQuan: [''],
      chonNoiDung: ['', Validators.required],
      chonDvPhoiHop: ['', Validators.required],
      listNoiDungTT: [''], //
      listNoiDungKT: [''], //
      ngayBatDau: [this.date, [Validators.required, DateCompareValidator('ngayKetThuc', true)]],
      ngayKetThuc: ['', [Validators.required, DateCompareValidator('ngayBatDau', false)]],
      phamViId: ['', Validators.required],
      dmChucDanhId: [1, Validators.required],
      id: ['']
    });

    this.tldoanForm.get('isTrongKeHoach').valueChanges.subscribe(value => this.changeTypeKeHoach(value));
    this.tldoanForm.get('chonNoiDung').valueChanges.subscribe(value => this.changeNoiDung(value));
    this.tldoanForm.get('chonDvPhoiHop').valueChanges.subscribe(value => this.changeDvPhoiHop(value));
    this.tldoanForm.get('phamViId').valueChanges.subscribe(value => {
      this.changePhamViKeHoach(value, this.tldoanForm.value.isTrongKeHoach);
    });
    this.tldoanForm.get('fileQuyetDinh').valueChanges.subscribe(res => {
      if (res) {
        this.onAttachFileQD(res);
      }
    });

      this.tldoanForm.get('listNoiDungTT').valueChanges.subscribe(res => {
          if (res) {
              this.cleanDataWhenChangeNd(this.tableContent);
          }
      });

      this.tldoanForm.get('listNoiDungKT').valueChanges.subscribe(res => {
          if (res) {
              this.cleanDataWhenChangeNd(this.tableContent);
          }
      });

    // set default
    this.changeTypeKeHoach(true);
  }

  subDay() {
    this.tldoanForm.controls.ngayKetThuc.valueChanges.subscribe(res => {
      let diffDays = 0;
      const eventStartTime = new Date(this.tldoanForm.get('ngayKetThuc').value).getTime();
      const eventEndTime = new Date(this.tldoanForm.get('ngayBatDau').value).getTime();
      if (eventStartTime > eventEndTime) {
        const timeDiff = Math.abs(eventEndTime - eventStartTime);
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      }
      this.tldoanForm.controls.thoiHanThucHien.setValue(diffDays);
    });
  }
  getListCanCu() {
    this.canCuService.getDmCanCuTTKTByActiveTrue(0, 1000).subscribe(res => this.cacCanCu = res.content, err => { });
  }

  getDvChuTriPhoiHop() {
    this.canCuService.getDmDviCtriByType().subscribe(res => {
      this.cacDonViChuTriByType = res.content;
      this.cacDonViPhoiHop = res.content.filter(item => item.type === 0);
    }, err => { });
  }

  getListNDTTKT() {
    this.canCuService.getDmNoiDungTTKT().subscribe(res => {
      const listNd = [];  // TTKTRIS-590
      res.content.forEach(element => {
        if (!element.children) {
          element.children = [];
        }

        if (element.children.length === 0) {
          listNd.push(element);
        } else {
          listNd.push.apply(listNd, element.children);
        }
      });
      this.cacNoiDungTT = listNd.filter(el => !el.isCskcb);
      this.cacNoiDungKT = listNd.filter(el => el.loaiHinh === 2);
    }, err => { });
  }

  getDonViThamGia() {
    let donViPhoiHopFix: any = [];
    const dvChuTri: any = this.cacDonViChuTriByType.filter(el => el.id === Number(this.tldoanForm.value.donViCTriId))
      .map(el => ({ id: el.id, text: el.tenDonViChuTriPhoiHop }));

    if (this.tldoanForm.value.donViPhoiHop) {
      donViPhoiHopFix = this.tldoanForm.value.donViPhoiHop.filter(el => el.id !== Number(this.tldoanForm.value.donViCTriId));
    }

    return dvChuTri.concat((donViPhoiHopFix) || []);
  }
  // show modal sua, xoa thanh vien
  addThanhVien() {
    const modalThanhVien = this.modalService.show(ModalDsDoanTtktComponent);
    const dvph = this.getDonViThamGia();
    modalThanhVien.content.init(dvph);
    modalThanhVien.content.eventChange.subscribe(req => {
      this.dsThanhVien.push(req);
      // set to table
    });
  }

  editThanhVien(index) {
    const modalThanhVien = this.modalService.show(ModalDsDoanTtktComponent);
    const dvph = this.getDonViThamGia();
    modalThanhVien.content.init(dvph, this.dsThanhVien[index]);
    modalThanhVien.content.eventChange.subscribe(req => {
      // set to table
      this.dsThanhVien[index] = req;
    });
  }

  deleteThanhVien(index) {
    const modalThanhVien = this.modalService.show(ModalDsDoanTtktComponent);
    const dvph = this.getDonViThamGia();
    modalThanhVien.content.init(dvph, this.dsThanhVien[index], true);
    modalThanhVien.content.eventChange.subscribe(req => {
      // set to table
      this.dsThanhVien.splice(index, 1);
    });
  }

  // Save thành lập đoàn
  submitForm() {
    this.formService.touchAllInput(this.tldoanForm);
    if (this.tldoanForm.invalid) {
      console.log(this.formService.getErrorList(this.tldoanForm));
      return;
    }
    const formValue = this.tldoanForm.value;
    const formBody: any = this.tldoanForm.value; // TldBody
    // const danhSachDoans = this.dsThanhVien.map(el => {
    //   el.id = el.id || '';
    //   return el;
    // });
    const dvPhoiHop = (formValue.donViPhoiHop || []).map(el => ({ dmCTriPHopId: el.id }));
    const noiDungTT = (formValue.listNoiDungTT || []).map(el => ({ dmNoiDungTTKTId: el.id }));
    const noiDungKT = (formValue.listNoiDungKT || []).map(el => ({ dmNoiDungTTKTId: el.id }));
    formBody.danhSachDoans = this.dsThanhVien;
    formBody.dmbhxhId = this.auth.currentUser.donViId;
    formBody.dvPhoiHops = dvPhoiHop || [];
    formBody.dsDvDcTTKTS = this.tldCommon.getDvDcTTKTS(this.tableContent);
    const taiLieuLienQuan = this.fileTaiLieuLienQuan.filter(el => el.status);
    formBody.fileTaiLieuLienQuan = this.fileService.getFileString(taiLieuLienQuan);
    formBody.fileQuyetDinhThanhLap = this.fileService.getFileString(this.fileQdThanhLap); // Need fix later
    if (formValue.chonNoiDung === 'thanhTra') {
      formBody.noiDungTTKTS = noiDungTT;
    } else if (formValue.chonNoiDung === 'kiemTra') {
      formBody.noiDungTTKTS = noiDungKT;
    }
    formBody.isOwnerTw = this.typeAccount === ACCOUNTTYPE.trunguong;
    formBody.actived = true;
    formBody.thanhLapYear = (new Date()).getFullYear();
    formBody.isNoiDungThanhTra = formValue.chonNoiDung === 'thanhTra';
    formBody.loaiHinhTTKT = this.tldCommon.getLoaiHinhTTKT(this.tldoanForm.value.chonDvPhoiHop, this.tldoanForm.value.chonNoiDung);
    // Thông tin điều chỉnh
    // formBody.fileQuyetDinhDieuChinh = this.fileService.getFileString(formValue.fileQdDieuChinhObj);
    // formBody.currentDieuChinh = this.currentDieuChinhObj.currentDieuChinh + 1;
    // formBody.dsDvDcTTKTS = LD_uniqBy(formBody.dsDvDcTTKTS, 'id');
    formBody.thoiHanThucHien = this.tldoanForm.get('thoiHanThucHien').value;
    return this.checkFormBodyValidAndSubmit(formBody);
  }

  checkFormBodyValidAndSubmit(formBody) {
    // validate ngay cong bo
    const dayTem = getDayCompareDate(formBody.ngayCongBo, formBody.ngayQuyetDinh);
    if (dayTem < 0 || dayTem >= 15) {
      this.alertService.error('Ngày công bố trong vòng 15 ngày kể từ ngày quyết định');
      return;
    }

    if (formBody.danhSachDoans.length < 1) {
      this.alertService.error('Chưa nhập danh sách tham gia thanh tra kiểm tra!');
      return;
    } else {
      const flag = formBody.danhSachDoans.filter(item => item.chucVuDoan === 'Trưởng đoàn'); // fixed for phase 1
      if (!flag || flag.length === 0) {
        this.alertService.error('Chưa nhập trưởng đoàn thanh tra kiểm tra');
        return;
      }
      if (flag.length > 1) {
        this.alertService.error('Trưởng đoàn thanh tra kiểm tra là duy nhất');
        return;
      }
    }
      if (formBody.noiDungTTKTS.length < 1) {
          this.alertService.error('Chưa nhập nội dung thanh tra kiểm tra!');
          return;
      }

    if (formBody.dsDvDcTTKTS.length < 1) {
      this.alertService.error('Chưa chọn đối tượng để thanh tra kiểm tra!');
      return;
    }
    if (formBody.loaiHinhTTKT !== LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA &&
      formBody.loaiHinhTTKT !== LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA_LIEN_NGANH) {
      for (const item of formBody.dsDvDcTTKTS) {
        if ((item.noiDungKTS || []).length <= 0) {
          this.alertService.error('Chưa nhập đủ nội dung thanh tra kiểm tra cho các đơn vị!');
          return;
        }
      }
    } else {
      let motThongBao = false;
      for (const item of formBody.dsDvDcTTKTS) {
        if ((item.noiDungKTS || []).length <= 0) {
          motThongBao = true;
          this.alertService.error('Chưa nhập đủ nội dung thanh tra kiểm tra cho các đơn vị!');
          return;
        } else {
          const noiDungTT = item.noiDungKTS.filter(el => el.isNoiDungThanhTra === true);
          const noiDungKT = item.noiDungKTS.filter(el => el.isNoiDungThanhTra === false);
          if (noiDungTT.length <= 0 && noiDungKT.length <= 0) {
            motThongBao = true;
            this.alertService.error('Chưa nhập đủ nội dung thanh tra kiểm tra cho các đơn vị!');
            return;
          }
        }
      }
    }
    // this.saveThanhLapDoan(formBody);
    return formBody;
  }

  // saveThanhLapDoan(formBody) {
  //   // this.onSubmitForm.emit(formBody);
  // }

  afterUpdateThanhLapDoan(id) {
    if (this.typeAccount === ACCOUNTTYPE.trunguong) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', id]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chi-tiet', id]);
    }
  }

  addDonVi() {
    if (this.typeAccount !== ACCOUNTTYPE.trunguong) {
      if(this.listDoiTuong != null){
        for (let item of this.dvChecked) {
          for (const index of this.listDoiTuong) {
            if (item.id == index.id) {
              this.listDoiTuong.splice(this.listDoiTuong.indexOf(item), 1);
            }
          }
        }
      }else{
        this.listDoiTuong = [];
      }
      if (this.listDoiTuong.length < 1 && this.tldoanForm.value.isTrongKeHoach == true) {
        this.alertService.error('Bạn đã hết đơn vị để TTKT');
        return ;
      }
    }
    //show modal
    const modal = this.modalService.show(ModalThemDonViComponent, {
      class: 'modal-lg'
    });
    modal.content.init(this.tldoanForm, this.listLoaiHinhDonVi, this.dvChecked, this.listDoiTuong, this.dsTinh);
    modal.content.eventChange.subscribe((req: any) => {
      // push to table
      // this.tableContent[index].children[index2] = req;
      // set to table
      this.dvChecked = req;
      this.setDvCheckedAndTableData();
    });
  }
  setDvCheckedAndTableData() {
    if (this.dvChecked.length === 0 || this.listLoaiHinhDonVi.length === 0) {
      return;
    }
    this.tableContent = this.listLoaiHinhDonVi.map(tbl => {
      tbl.children = this.dvChecked.filter(dv => dv.dmPhanLoaiDtId === tbl.id);
      if (tbl.children.length > 0) {
        return tbl;
      }

      return null;
    }).filter(res => res != null);
  }

  editDonVi(index, index2, isDelete: boolean = false) {
    const currentItem = this.tableContent[index].children[index2];
    const modal = this.modalService.show(ModalDonViComponent, {
      class: 'modal-lg'
    });
    modal.content.init(this.tldoanForm, currentItem, isDelete);
    modal.content.eventChange.subscribe(req => {
      if (isDelete) {
        this.checkDeleteItem(index, index2, currentItem);
      } else {
        this.tableContent[index].children[index2] = req;
      }
      // set to table
    });
  }

  checkDeleteItem(index, index2, currentItem) {
    this.dvChecked.splice(this.dvChecked.indexOf(currentItem), 1);
    this.tableContent[index].children.splice(index2, 1);
    if (this.tableContent[index].children.length === 0) {
      this.tableContent.splice(index, 1);
    }
  }

  get FILE() {
    return FILE;
  }

  // @Todo refactor file input
  onAttachFileQD(res: any) {
    this.fileQdThanhLap = res;
    // set formhiden
    this.urlFileDownload = res;
  }

  onAttachFileLienQuan() {
    const fileEl = this.fileInputRef2.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileService.uploadFile(files, FILE.FILE_TAI_LIEU_LIEN_QUAN).subscribe(res => {
        this.fileTaiLieuLienQuan = this.fileTaiLieuLienQuan.concat(res);
        this.urlFileDownload = res;
        if (this.urlFileDownload.length !== 0) {
          this.tenFileTaiLieuLienQuan = this.urlFileDownload[0].fileName;
        }
        this.fileTaiLieuLienQuan.map(el => {
          if (el.status) {
            el.result = 'OK';
          } else {
            el.result = 'ERROR';
          }
        });
      }, err => { this.alertService.error(err.title); });
    } else { }
  }
  deleteFile(index) {
    this.fileTaiLieuLienQuan.splice(index, 1);
    this.fileInputRef2.nativeElement.value = null;
    this.tenFileTaiLieuLienQuan = '';
  }

  // change type of Ke Hoach
  changeTypeKeHoach(isTrongKeHoach) {
    this.tldoanForm.get('phamViId').setValue('');
    this.tldoanForm.patchValue({
      chonNoiDung: [''],
      chonDvPhoiHop: [''],
      phamViId: '',
      donViCTriId: ['']
    }, { emitEvent: false });

    if (this.typeAccount !== ACCOUNTTYPE.trunguong) {
      if (this.type === 'add') {
        this.filterDataTrongKHTkTinh();
      }
      this.tldoanForm.controls.chonNoiDung.setValue('thanhTra');
      this.tldoanForm.controls.chonDvPhoiHop.setValue('khongLienNganh');
    } else {
      if (!isTrongKeHoach) {
        this.tldoanForm.controls.chonNoiDung.setValue('thanhTra');
        this.tldoanForm.controls.chonDvPhoiHop.setValue('khongLienNganh');
        this.disableDvCTri = false;
      }
      else {
        this.disableDvCTri = true;
      }
      this.tlDoanService.getListScopeOfYear(true, isTrongKeHoach, new Date().getUTCFullYear(), null).
        subscribe(res => this.dsTinh = res);
    }
  }
  changeNoiDung(noiDung) {
    if (noiDung === 'thanhTra') {
      this.tldoanForm.get('listNoiDungKT').setValue([]);
      this.cleanDataWhenChangeNd(this.tableContent);
    } else {
      this.tldoanForm.get('listNoiDungTT').setValue([]);
      this.cleanDataWhenChangeNd(this.tableContent);
    }
    if (this.typeAccount !== ACCOUNTTYPE.trunguong) {
      this.dataFilterTLDoan.isThanhTra = (noiDung === 'thanhTra');
      this.filterDataTrongKHTkTinh();
    }
  }
  cleanDataWhenChangeNd(tableContentData) {
    tableContentData.forEach(item => {
      const itemChild = [...item.children];
      itemChild.forEach(el => {
        this.checkDeleteItem(tableContentData.indexOf(item), item.children.indexOf(el), el);
      });
    });
  }
  changeDvPhoiHop(dvPhoiHop) {
    if (this.typeAccount !== ACCOUNTTYPE.trunguong) {
      this.dataFilterTLDoan.isLienNganh = (dvPhoiHop === 'lienNganh');
      this.filterDataTrongKHTkTinh();
    }
  }
  filterDataTrongKHTkTinh() {
    this.dataFilterTLDoan.isTrongKH = this.tldoanForm.controls.isTrongKeHoach.value;
    this.dataFilterTLDoan.nam = new Date().getFullYear();
    this.dataFilterTLDoan.dmTinhHuyenId = Number(this.auth.currentUser.dmTinhHuyenId);
    // this.dataFilterTLDoan.diaBanId = this.tldoanForm.value.phamViId !== '' ? this.tldoanForm.value.phamViId : null;
    this.tlDoanService.filterQuyetDinhThanhLapDoan(this.dataFilterTLDoan).
      subscribe(data => {
        this.dsTinh = data.listTinhHuyen;
        this.listDoiTuong = data.doiTuongTTKTTrongKHList;
      });
  }

  // change Pham Vi Ke Hoach
  changePhamViKeHoach(tinhId: number, isTrongKeHoach) { //

    // this.tldoanForm.patchValue({
    //   chonNoiDung: [''],
    //   chonDvPhoiHop: [''],
    //   donViCTriId: ['']
    // }, { emitEvent: false });
    if (this.typeAccount === ACCOUNTTYPE.trunguong && isTrongKeHoach && tinhId) {
      const date = new Date();
      this.tlDoanService.getInfoKhDuThao(tinhId, date.getUTCFullYear(), true).subscribe(res => {
        if (res.dvChuTri && res.loaiHinhTTKT && res.phoiHopTwDTOS) {
          this.tldoanForm.patchValue({
            donViCTriId: res.dvChuTri.id,
            chonNoiDung: (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA) ||
              (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA_LIEN_NGANH) ? 'kiemTra' : 'thanhTra',
            chonDvPhoiHop: (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA) ||
              (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA) ? 'khongLienNganh' : 'lienNganh'
          });
          if ((res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA_LIEN_NGANH) ||
            (res.loaiHinhTTKT === LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA_LIEN_NGANH)) {
            res.phoiHopTwDTOS.map(el => {
              el.id = el.dmCTriPHopId;
              el.text = el.tenDonViChuTriPhoiHop;
              delete el.dmCTriPHopId;
              delete el.chiTietKhTWId;
            });
            this.cacDonViPhoiHop = res.phoiHopTwDTOS;
          }
        }
      }, err => { });
    }
    if (this.typeAccount !== ACCOUNTTYPE.trunguong) {
      this.dataFilterTLDoan.diaBanId = tinhId;
      this.filterDataTrongKHTkTinh();
    }
    this.tableContent = [];
  }

  // File thông tin điều chỉnh
  upFileQDDieuChinh() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileService.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.tldoanForm.patchValue({
          fileQdDieuChinhObj: res[0],
          fileQdDieuChinh: res[0].fileName
        });
      }, err => { this.alertService.error(err.title); });
    } else { }
  }

  downLoadFile() {
    const file = this.tldoanForm.value.fileQdDieuChinhObj;
    this.fileService.downloadFile(file.url).subscribe(blob => this.fileService.saveFile(blob, file.fileName), err => { });
  }
  getListChucDanh() {
    this.noiDmChucDanhService.getAllDmChucDanh(0, 1000, this.auth.currentUser.donViId)
      .subscribe((res: any) => this.listChucVu = res.content, err => { });
  }

  setValueMaKhamChuaBenh(coquan, valueKCB) {
    coquan['maCoSoKhamChuaBenh'] = valueKCB;
  }
}
