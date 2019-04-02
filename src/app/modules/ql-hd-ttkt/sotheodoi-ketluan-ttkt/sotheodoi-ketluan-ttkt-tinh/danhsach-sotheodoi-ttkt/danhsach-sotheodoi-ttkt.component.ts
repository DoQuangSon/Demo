import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { StatesService } from './../../../../../services/api/state.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { FormGroup, FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { SoTheodoiKetluanService } from '../../../../../services/api/so-theodoi-ketluan/so-theodoi-ketluan.service';
import { NoiAccountService } from '../../../../../services/api/noi-account/noi-account.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-theodoi-dondoc-tinh',
  templateUrl: './danhsach-sotheodoi-ttkt.component.html',
  styleUrls: ['./danhsach-sotheodoi-ttkt.component.scss']
})
export class DanhSachSoTheodoiTTKTComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective: boolean = false;
  searchForm: FormGroup;
  account: any = {};
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  isTW: boolean = false;
  isSearching: boolean = false;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private soTheodoiKetluanService: SoTheodoiKetluanService,
    private noiAccountService: NoiAccountService,
    private pagination: PaginationService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService
  ) { }

  DANH_SACH_QD: any[] = [];
  ngOnInit() {
    this.searchForm = this.builder.group({
      tungay: null,
      denngay: null
    });
    this.account = this.auth.currentUser;
    this.getAllListKeHoach();
  }

  getAllListKeHoach() {
    const dmbhxhId = this.auth.currentUser.donViId;
    this.soTheodoiKetluanService.getAllTinh(dmbhxhId, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
        this.DANH_SACH_QD = res['content'];
      }, err => { });
  }
  xemChiTietQD(data) {
    this.router.navigate(['/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tinh/danhsach-sotheodoi-ttkt/chitiet', data.thahLapDoanId, data.hasKetLuan, data.tenQuyetDinh]);
  }
  setPage(number) {
    this.currentPage = number;
    if (this.isSearching && this.isSearching == true) {
      this.getDsChiTiet('search');
    } else {
      this.getDsChiTiet('get');
    }
  }
  search() {
    this.currentPage = 0;
    if(this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() === null
    &&  this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() === null){
      this.getDsChiTiet('get');
    }else{
      this.getDsChiTiet('search');
    }
  }

  getDsChiTiet(task: string) {
    const tuNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() || '';
    const denNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() || '';
    const dmBHXHId = this.auth.currentUser.donViId;
    if (task === 'get') {
      this.isSearching = false;
      this.getAllListKeHoach();
    } else if (task === 'search') {
      this.isSearching = true;
      this.soTheodoiKetluanService.getDsChiTietSoTheoDoiByDate(this.isTW, dmBHXHId, tuNgay, denNgay, this.currentPage, this.pageSize)
        .subscribe(res => {
          this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
          this.DANH_SACH_QD = res['content'];
          console.log(this.DANH_SACH_QD);
        }, err => { });
    }
  }
}
