import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { ThanhLapDoanService } from './../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-qd-ttkt-bhxh-vn',
  templateUrl: './qd-ttkt-bhxh-vn.component.html',
  styleUrls: ['./qd-ttkt-bhxh-vn.component.scss']
})
export class QdTtktBhxhVnComponent implements OnInit {

  quyedinhForm: FormGroup;
  dsquyedinh: any[] = [];
  dmTinhhuyenId: any;
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  isSearch: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private qdinhService: ThanhLapDoanService,
    private pagination: PaginationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.quyedinhForm = this.fb.group({
      search: ['']
    });
    this.dmTinhhuyenId = this.auth.currentUser.dmTinhHuyenId;
    this.getDsQuyetDinh();
  }

  getDsQuyetDinh() {
    this.isSearch = false;
    this.qdinhService.getTLDTWGuiTinh(this.dmTinhhuyenId, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.dsquyedinh = res.content;
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      }, err => { });
  }

  detailQuyedinh(id: string) {
    this.router.navigate(['ql-hd-ttkt/ql-doan-ttkt/tinh/qd-ttkt-bhxh-vn/detail-qd-ttkt-bhxh-vn', id]);
  }

  // Tìm kiếm danh sách
  search() {
    this.currentPage = 0;
    if (this.quyedinhForm.value.search && this.quyedinhForm.value.search.trim()) {
      this.callSearch();
    } else {
      this.getDsQuyetDinh();
    }
  }

  callSearch() {
    this.isSearch = true;
    this.qdinhService.searchByTenQDinhAccTinh(this.dmTinhhuyenId, this.quyedinhForm.value.search.trim(), this.currentPage, this.pageSize).subscribe(
      res => {
        this.dsquyedinh = res.content;
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      }
    );
  }

  // Phân trang ở bảng nhóm người dùng
  setPage(number) {
    this.currentPage = number;
    if (this.isSearch) {
      this.callSearch();
    } else {
      this.getDsQuyetDinh();
    }

  }
}
