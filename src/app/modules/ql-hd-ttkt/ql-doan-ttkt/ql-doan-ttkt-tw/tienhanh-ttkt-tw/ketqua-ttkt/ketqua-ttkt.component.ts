import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { groupBy } from 'lodash';
import { TldCommonService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { MESS_TAO_KH_TW, QUAN_LY_DOAN, COMMON_ERROR_MESS } from '../../../../../../constants/message.constants';
import { Location } from '@angular/common';
import { last } from '@angular/router/src/utils/collection';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TienHanhTtktService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { AuthService } from '../../../../../../auth/auth.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { DmHanhviService } from '../../../../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
@Component({
  selector: 'ttkt-ketqua-ttkt',
  templateUrl: './ketqua-ttkt.component.html',
  styleUrls: ['./ketqua-ttkt.component.scss']
})
export class KetquaTtktComponent implements OnInit {
  title = '';
  ketQuaTTKTForm: FormGroup;
  // tenDoan: string = '';
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  isBaoCao = true;

  // Báo cáo, kết luận Object
  baoCaoKetLuanObj: any;

  theoDoiDoanObj: any = {};

  // List các biên bản
  listBBLamViec: any = [];
  listBBVPHC: any = [];
  listQDXuPhatHC: any = [];

  // hành vi vi phạm
  optionHanhViViPhams: any = [];

  // Danh sách các đơn vị đc TTKT
  listDonViDcTTKT: any = [];

  // Table nội dung TTKT
  tableContentTT: any = [];
  sumDataTT: any = {};
  tableContentKT: any = [];
  sumDataKT: any = {};
  tableContentCsKcb: any = [];
  sumDataKcb: any = [];

  // Check đã có báo cáo kết luận hay chưa
  isHaveBaoCaoKL = false;
  isCanEdit = true;

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tienHanhTTKT: TienHanhTtktService,
    private timeBuilder: TimeBuilderService,
    private tldCommon: TldCommonService,
    private fileResource: FileResourceService,
    private tldService: ThanhLapDoanService,
    private alert: AlertService,
    private location: Location,
    private authService: AuthService,
    private dmHanhviService: DmHanhviService
  ) { }

  ngOnInit() {
    this.creatKetQuaTTKTForm();
    if (this.router.url.indexOf('bao-cao') !== -1) {
      this.title = 'Báo cáo kết quả đoàn TTKT';
      this.isBaoCao = true;
    } else {
      this.title = 'Kết luận đoàn TTKT';
      this.isBaoCao = false;
    }
    // get list dmhanhvi
    this.dmHanhviService.getAllHanhVi()
      .subscribe(res => {
        this.optionHanhViViPhams = res['content'];
        // patch value
        this.route.params.subscribe(params => {
          if (params['id']) {
            this.getBaoCaoKLByTLD(params['id']);
            this.getTheoDoiHoatDongDoan(params['id']);
            this.getChiTietTTKT(params['id']);
          }
        });
      }, err => { });
  }

  creatKetQuaTTKTForm() {
    this.ketQuaTTKTForm = this.fb.group({
      tenBaoCao: [null, [Validators.required, Validators.pattern(/[^-\s]/)]],
      soBaoCao: [null, [Validators.required, this.formService.nospaceValidator]],
      denNgay: [null, [Validators.required]],
      tuNgay: [null, Validators.required],
      tenDoan: [''],
      ghiChu: ['']
    });
  }

  getBaoCaoKLByTLD(id) {
    const dmbhxhId = this.authService.currentUser.donViId;
    this.tienHanhTTKT.getBaoCaoKetLuan(dmbhxhId, id, !this.isBaoCao).subscribe(res => {
      if (res.id) {
        this.isHaveBaoCaoKL = true;
        this.isCanEdit = false;
      }
      this.baoCaoKetLuanObj = res;
      this.patchValueKetQuaTTKTForm(res);
    }, err => { });
  }

  getChiTietTTKT(id) {
    this.tienHanhTTKT.tongHopChiTietTTKT(id).subscribe(res => {
      if (res.length) {
        this.getTableChiTietNoiDungTTKT(res);
      }
    }, err => { });
  }

  getTableChiTietNoiDungTTKT(res) {
    res = this.getExtraclyData(res);
    const listNoiDungTT = res.filter(el => {
      return el.isThanhTra;
    });
    const listNoiDungKcb = res.filter(el => {
      return el.isKiemTraKCB;
    });
    const listNoiDungKT = res.filter(el => {
      return el.isKiemTra;
    });
    this.tableContentCsKcb = this.getDataTable(listNoiDungKcb);
    this.tableContentKT = this.getDataTable(listNoiDungKT);
    this.tableContentTT = this.getDataTable(listNoiDungTT);
    this.sumDataKcb = this.getSumDataTable(this.tableContentCsKcb);
    this.sumDataKT = this.getSumDataTable(this.tableContentKT);
    this.sumDataTT = this.getSumDataTable(this.tableContentTT);
  }

  getExtraclyData(res) {
    for (const item of res) {
      if (item.isKiemTraKCB) {
        item.isKiemTra = false;
      }
    }
    return res;
  }

  getDataTable(res) {
    const chiTietTable: any = [];
    let groupContent: any = groupBy(res, (el: any) => (el.dmChiTietNDDTO.tenNoiDung));
    groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    console.log(groupContent, res);

    for (const item of groupContent) {
      const _el: any = {};
      _el.tenNoiDung = (item[1][0].dmChiTietNDDTO || {}).tenNoiDung;
      _el.isThanhTra = item[1][0].isThanhTra;
      _el.isKiemTra = item[1][0].isKiemTra;
      _el.isKiemTraKCB = item[1][0].isKiemTraKCB;
      _el.children = [];
      for (const element of item[1]) {
        const chiTietND: any = element.chiTietHistoryDTO;
        chiTietND.tenChiTietNoiDung = (element.dmChiTietNDDTO || {}).tenChiTietNoiDung;
        _el.children.push(chiTietND);
      }
      _el.children = this.getFinalChildren(_el.children);
      chiTietTable.push(_el);
    }
    return chiTietTable;
  }

  getFinalChildren(children) {
    const finalChildren: any = [];
    let newChildren: any = groupBy(children, (el: any) => (el.tenChiTietNoiDung));
    newChildren = Object.keys(newChildren).map(key => {
      return [key, newChildren[key]];
    });
    for (const item of newChildren) {
      const _el: any = {};
      _el.tenChiTietNoiDung = item[0];
      _el.cskcbChapNhanCuaDv = this.getTotalData(item[1], 'cskcbChapNhanCuaDv');
      _el.cskcbChuaChapNhanTT = this.getTotalData(item[1], 'cskcbChuaChapNhanTT');
      _el.cskcbGiaoVaXoat = this.getTotalData(item[1], 'cskcbGiaoVaXoat');
      _el.cskcbKhac = this.getTotalData(item[1], 'cskcbKhac');
      _el.cskcbTcBsVuotTranVq = this.getTotalData(item[1], 'cskcbTcBsVuotTranVq');
      _el.cskcbXuatToan = this.getTotalData(item[1], 'cskcbXuatToan');
      _el.soLuotNguoiChapHanh = this.getTotalData(item[1], 'soLuotNguoiChapHanh');
      _el.soLuotNguoiChenhLech = this.getTotalData(item[1], 'soLuotNguoiChenhLech');
      _el.soLuotNguoiViPham = this.getTotalData(item[1], 'soLuotNguoiViPham');
      _el.soTienChapHanh = this.getTotalData(item[1], 'soTienChapHanh');
      _el.soTienChenhLech = this.getTotalData(item[1], 'soTienChenhLech');
      _el.soTienViPham = this.getTotalData(item[1], 'soTienViPham');
      _el.soSoViPham = this.getTotalData(item[1], 'soSoViPham');
      _el.soSoChapHanh = this.getTotalData(item[1], 'soSoChapHanh');
      _el.soSoChenhLech = this.getTotalData(item[1], 'soSoChenhLech');
      finalChildren.push(_el);
    }
    return finalChildren;
  }

  getTotalData(list, property) {
    let total = 0;
    for (const el of list) {
      if (el[property]) { total = total + el[property]; }
    }
    return total;
  }

  // getSumItemOfChildren(item, children) {
  //   for (const el of children) {
  //     if (item.tenChiTietNoiDung === el.tenChiTietNoiDung) {
  //       const newItem: any = item;
  //       newItem.cskcbChapNhanCuaDv = item.cskcbChapNhanCuaDv + el.cskcbChapNhanCuaDv;
  //       newItem.cskcbChuaChapNhanTT = item.cskcbChuaChapNhanTT + el.cskcbChuaChapNhanTT;
  //       newItem.cskcbGiaoVaXoat = item.cskcbGiaoVaXoat + el.cskcbGiaoVaXoat;
  //
  //     }
  //   }
  // }

  getSumDataTable(tableContent) {
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

  onEdit() {
    this.isCanEdit = true;
    this.isHaveBaoCaoKL = false;
  }

  getTheoDoiHoatDongDoan(id) {
    this.tienHanhTTKT.getTheoDoiHdDoan(id).subscribe(res => {
      this.patchValueKetQuaTTKTTable(res);
      this.listDonViDcTTKT = res.dsDvDcTTKTS;
      this.theoDoiDoanObj = res;
    }, err => { });
  }

  // later, patch value của báo cáo/kết luận
  patchValueKetQuaTTKTForm(res) {
    this.ketQuaTTKTForm.patchValue({
      tenBaoCao: res.tenBaoCao || '',
      soBaoCao: res.soBaoCao || '',
      denNgay: res.ngayTo || '',
      tuNgay: res.ngayFrom || '',
      ghiChu: res.ghiChu
    });
  }

  // Patch value các biên bản, nội dung TTKT
  patchValueKetQuaTTKTTable(res) {
    this.ketQuaTTKTForm.patchValue({
      tenDoan: res.tenQuyetDinh,
    });
    this.getListBienBanViPham(res.dsDvDcTTKTS);
  }

  // get list các biên bản
  getListBienBanViPham(res) {
    const listBB: any = [];
    for (const item of res) {
      listBB.push(item.moreInfo);
    }
    for (const item of listBB) {
      this.listBBLamViec.push(item.bienBanLv);
      this.listBBLamViec = this.cleanList(this.listBBLamViec);
      this.listBBLamViec = this.getFileObj(this.listBBLamViec);
      if (item.listBienBanVPHC) {
        for (const element of item.listBienBanVPHC) {
          if (element.hanhViViPham && this.optionHanhViViPhams.length > 0) {
            element.hanhViViPham = this.optionHanhViViPhams.find(el => el.id === Number(element.hanhViViPham)).tenHanhVi;
          } else {
            element.hanhViViPham = '';
          }
          this.listBBVPHC.push(element);
          this.listBBVPHC = this.cleanList(this.listBBVPHC);
          this.listBBVPHC = this.getFileObj(this.listBBVPHC);
        }
      }
      if (item.listQuyetDinhXuPhatVPHC) {
        for (const element of item.listQuyetDinhXuPhatVPHC) {
          if (element.hanhViViPham && this.optionHanhViViPhams.length > 0) {
            element.hanhViViPham = this.optionHanhViViPhams.find(el => el.id === Number(element.hanhViViPham)).tenHanhVi;
          } else {
            element.hanhViViPham = '';
          }
          this.listQDXuPhatHC.push(element);
          this.listQDXuPhatHC = this.cleanList(this.listQDXuPhatHC);
          this.listQDXuPhatHC = this.getFileObj(this.listQDXuPhatHC);
        }
      }
    }
  }

  // Remove element null or undefine out of array
  cleanList(array) {
    const newList = new Array();
    for (const item of array) {
      if (item) {
        newList.push(item);
      }
    }
    return newList;
  }

  // Get File Object
  getFileObj(arrayList) {
    for (const item of arrayList) {
      if (item.fileBienBanLamViec) {
        item.fileBienBanLamViec = this.fileResource.getFileObj(item.fileBienBanLamViec);
      }
      if (item.fileDinhKem) {
        item.fileDinhKem = this.fileResource.getFileObj(item.fileDinhKem);
      }
    }
    return arrayList;
  }

  // Download file by url
  downLoadFileBBLamViec(file) {
    this.fileResource.downloadFile(file.url).subscribe(blob => {
      this.fileResource.saveFile(blob, file.fileName);
    }, err => { });
  }

  onSubmit() {
    const formBody: any = this.baoCaoKetLuanObj;
    const formValue: any = this.ketQuaTTKTForm.value;
    formBody.ghiChu = formValue.ghiChu;
    formBody.isBienBanKetLuan = !this.isBaoCao;
    formBody.ngayFrom = formValue.tuNgay;
    formBody.ngayTo = formValue.denNgay;
    formBody.soBaoCao = formValue.tenBaoCao;
    formBody.tenBaoCao = formValue.soBaoCao;
    console.log(this.ketQuaTTKTForm);
    if (new Date(formBody.ngayFrom).getTime() > new Date(formBody.ngayTo).getTime()) {
      this.alert.error('Ngày bắt đầu không được lớn hơn ngày kết thúc');
      return;
    }
    if (this.ketQuaTTKTForm.invalid) {
      this.alert.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED, { delay: 1000 });
      return;
    } else {
      this.tldService.updateBaoCaoKetLuan(formBody).subscribe(res => {
          this.isBaoCao ? this.alert.success(QUAN_LY_DOAN.SUCCESS_BAOCAO, { delay: 1000 }) : this.alert.success(QUAN_LY_DOAN.SUCCESS_KETLUAN, { delay: 1000 });
          this.location.back();
      }, err => {
        this.alert.error(COMMON_ERROR_MESS.LOI_CHUNG, { delay: 1000 });
      });
    }
  }

  onBack() {
    this.location.back();
  }
}
