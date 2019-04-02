import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoiAccountService } from '../../../../../services/api/noi-account/noi-account.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { KeHoachBhxhTinhService } from '../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-kh-bhxh-tinh',
  templateUrl: './kh-bhxh-tinh.component.html',
  styleUrls: ['./kh-bhxh-tinh.component.scss']
})
export class KHBHXHTinhComponent implements OnInit {
  formGuiKHModal: FormGroup;
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  account: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pagination: PaginationService,
    private noiAccountService: NoiAccountService,
    private keHoachBHXHTinh: KeHoachBhxhTinhService,
    private auth: AuthService
  ) { }

  dskehoach: any[] = [];
  ngOnInit() {
    this.account = this.auth.currentUser;
    this.getListKehoach();
    this.formGuiKHModal = this.fb.group({
      noiDungLn: [''],
      inputSend: ['BHXH VN']
    });
  }

  getListKehoach() {
    this.keHoachBHXHTinh.getListKeHoachDuKienTinh(this.account.dmTinhHuyenId, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
        this.dskehoach = res['content'];
      }, err => { });
  }

  detailKehoach(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh/detail-kh-bhxh-tinh', id]);
  }

  danhsachdonvi() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh/ds-donvi-ql-tinh/tp']);
  }
  setPage(number) {
    this.currentPage = number;
    this.getListKehoach();
  }

}
