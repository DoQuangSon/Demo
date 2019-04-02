import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ThanhLapDoanService } from './../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { THANH_LAP_DOAN_STT } from '../../../../../constants/thanh-lap-doan.constants';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-tl-doan-ttkt-form',
  templateUrl: './tl-doan-ttkt-form.component.html',
  styleUrls: ['./tl-doan-ttkt-form.component.scss']
})
export class TlDoanTtktFormComponent implements OnInit {
  @Input() public typeAccount = '';
  // listTrangThai = THANH_LAP_DOAN_STT;
  dsquyetdinh = [];
  currentPage = 0;
  pageSize = 10;
  dmbhxhId: any;
  pager: any = {};
  isSearching = false;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private tlDoanService: ThanhLapDoanService,
    private pagination: PaginationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dmbhxhId = this.auth.currentUser.donViId;
    this.searchForm = new FormGroup({
      tenQuyetDinh: new FormControl('', [Validators.required])
    });
    this.search();
  }

  // getListQdinh() {
  //   let isTW: boolean;
  //   this.typeAccount === 'TW' ? isTW = true : isTW = false;
  //   this.tlDoanService.getDsQDinhByOwnerTW(isTW, this.dmbhxhId, this.currentPage, this.pageSize)
  //     .subscribe(res => {
  //       this.getResponseAndPager(res);
  //     }, err => { });
  // }

  search(e?: any) {
    if (e) {
      this.currentPage = 0;
    }
    const formBody = this.creatSearchForm();
    this.isSearching = true;
    const isTW = this.typeAccount === 'TW';
    this.tlDoanService.searchByTenQDinh(formBody.tenQuyetDinh, this.dmbhxhId, isTW, this.currentPage, this.pageSize).subscribe(res => {
      this.getResponseAndPager(res);
    }, err => { });
  }

  creatSearchForm() {
    const formBody: any = {};
    formBody.dmbhxhId = this.dmbhxhId;
    formBody.page = this.currentPage;
    formBody.size = this.pageSize;
    formBody.tenQuyetDinh = this.searchForm.value.tenQuyetDinh.trim();
    formBody.ownerTW = this.typeAccount === 'TW';
    return formBody;
  }

  getResponseAndPager(res) {
    this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
    this.dsquyetdinh = res.content;
  }

  setPage(number) {
    this.currentPage = number;
    this.search();
  }

  detailQuyetDinh(index) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', index]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chi-tiet', index]);
    }
  }

  creatTLDoan() {
    this.typeAccount === 'TW' ?  this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/tao-moi']) : this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/tao-moi']);
  }
}
