import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../constants/index';
import { NoiDonthuService } from '../../../services/api/noi-donthu/noi-donthu.service';
import { TimeBuilderService } from '../../../services/helper/time-builder.service';
import { StatesService } from '../../../services/api/state.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { NoiDmphanloainoidungService } from '../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
import { AuthService } from '../../../auth/auth.service';
import { Pagging } from '../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-danhsach-dt',
  templateUrl: './danhsach-dt.component.html',
  styleUrls: ['./danhsach-dt.component.scss']
})
export class DanhsachDtComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective = false;
  searchForm: FormGroup;
  dsDonThuForm: FormGroup;
  dsDonthu = [];
  DON_THU_STATUS_DANG_XU_LY = 1;
  DON_THU_STATUS_DA_XU_LY = 2;
  status: any = ['', 'Đang xử lý', 'Đã xử lý'];
  account: any = {};
  listNoiDung: any = [];
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'soCV';
  public sortOrder = 'asc';
  noiDung: any;
  pager: any = {};
  isSearching = false;
  pagging: Pagging = new Pagging();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noiDonthuService: NoiDonthuService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService,
    private noiDmphanloainoidungService: NoiDmphanloainoidungService,
  ) { }

  currentPage;

  ngOnInit() {
    this.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.getListNoiDung();
    this.account = this.auth.currentUser;
    // this.getDonthu();
    this.dsDonThuForm = this.fb.group({
      search: [''],
      tungay: [''],
      denngay: [''],
      soCVDen: [''],
      phanLoaiNoiDungId: [''],
      rowsOnPage: [''],
      sortBy: [''],
      sortOrder: ['']
    });
    // this.noiDmphanloainoidungService.getAllDmPhanloainoidung(0, 10)
    //   .subscribe((res: any) => {
    //     this.listNoiDung = res.content;
    //   }, err => { });
    this.search();
  }

  formatDate(date: Date) {
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }
  pageChanged(event) {
    this.currentPage = event.page - 1;
    this.search();
  }

  gotoChitietCongvan(id) {
    this.router.navigate([`/ql-tiep-cd/gq-kt/danh-sach-don-thu/chi-tiet/${id}`]);
  }

  fillDataToTable(res) {
    res.content.forEach(el => {
      const donthu: any = {};
      donthu.id = el.id || '';
      donthu.soCV = el.soCongVanDen || '';
      donthu.noiDung = el.tenPhanLoaiNoiDung || '';
      donthu.from = this.timeBuilder.fromString(el.ngayTiepNhan).get();
      donthu.trangThai = this.status[el.status];
      donthu.status = el.status;
      donthu.to = this.timeBuilder.fromString(el.ngayKetThuc).get();
      donthu.ngayTiepNhan = this.timeBuilder.fromString(el.ngayTiepNhan).get();
      this.dsDonthu.push(donthu);
    });
  }

  getListNoiDung() {
    this.noiDmphanloainoidungService.getAllDmPhanloainoidung().subscribe((res: any) => {
      this.listNoiDung = res.content.map(el => {
        const _el: any = {};
        _el.id = el.id;
        _el.text = el.tenNoiDung;
        return _el;
      });
    }, err => { });
  }

  refreshNoiDung(value: any) {
    this.noiDung = value;
  }

  removed(value: any) {
    this.noiDung = {};
  }
  search() {
    this.isSearching = true;
    const formBody: any = {};
    const formValue = this.dsDonThuForm.value || {};
    formBody.phanLoaiNoiDungId = formValue.phanLoaiNoiDungId[0] ? formValue.phanLoaiNoiDungId[0].id : '';
    formBody.page = this.currentPage;
    formBody.size = this.pagging.itemsPerPage;
    formBody.ngayFrom = formValue.tungay ? this.timeBuilder.convertDateUTC(formValue.tungay) : '';
    formBody.ngayTo = formValue.denngay ? this.timeBuilder.convertDateUTC(formValue.denngay) : '';
    formBody.soCongVan = formValue.soCVDen.trim() || '';
    this.noiDonthuService.searchDonThu(formBody).subscribe(res => {
      this.dsDonthu = [];
      this.fillDataToTable(res);
      this.pagging.totalItems = res.totalElements;
      this.pagging.currentPage = this.currentPage;
    });
  }
}
