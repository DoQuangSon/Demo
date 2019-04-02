import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { StatesService } from './../../../../../services/api/state.service';
import { NoiAccountService } from './../../../../../services/api/noi-account/noi-account.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { FormGroup, FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { SoTheodoiKetluanService } from '../../../../../services/api/so-theodoi-ketluan/so-theodoi-ketluan.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../auth/auth.service';
import { Pagging } from '../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-theodoi-dondoc-tinh',
  templateUrl: './danhsach-sotheodoi-ttkt.component.html',
  styleUrls: ['./danhsach-sotheodoi-ttkt.component.scss']
})
export class DanhSachSoTheodoiTTKTComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  pagging: Pagging = new Pagging();
  isCollapseDirective: boolean = false;
  searchForm: FormGroup;
  account: any = {};
  pager: any = {};
  isTW: boolean = true;
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
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.searchForm = this.builder.group({
      tungay: null,
      denngay: null
    });
    this.account = this.auth.currentUser;
    this.search();
  }

  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.search();
  }

  xemChiTietQD(data) {
    this.router.navigate(['/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw/ds-sotheodoi-kl/capnhat', data.thahLapDoanId, data.hasKetLuan, data.tenQuyetDinh]);
  }

  search() {
    const tuNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() || '';
    const denNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() || '';
    const dmBHXHId = this.auth.currentUser.donViId;
      this.soTheodoiKetluanService.getDsChiTietSoTheoDoiByDate(this.isTW, dmBHXHId, tuNgay, denNgay, this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe(res => {
          this.DANH_SACH_QD = res['content'];
          console.log(this.DANH_SACH_QD);
          this.pagging.totalItems = res.totalElements;
        }, err => { });
  }
}
