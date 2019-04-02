import { TRANG_THAI_KH } from '../../../../../constants/ke-hoach-ttkt.constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NoiKehoachDuthaoService } from '../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { NoiAccountService } from '../../../../../services/api/noi-account/noi-account.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-xay-dung-ke-hoach-tinh',
  templateUrl: './xay-dung-ke-hoach-tinh.component.html',
  styleUrls: ['./xay-dung-ke-hoach-tinh.component.scss']
})
export class XayDungKeHoachTinhComponent implements OnInit {
  @ViewChild('guiKHModal') modal: ModalDirective;

  formTimKiem: FormGroup;
  formGuiKHModal: FormGroup;
  dskehoach: any[] = [];
  currentPage = 0;
  pageSize = 10;
  pager: any = {};
  account: any;
  status: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private pagination: PaginationService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.account = this.auth.currentUser;
    this.formTimKiem = this.fb.group({
      searchKey: ['']
    });
    this.formGuiKHModal = this.fb.group({
      noiDungLn: [''],
      inputSend: ['BHXH VN']
    });

      this.setPage(0);
  }

  detailKehoach(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach/chi-tiet-ke-hoach/' + id]);
  }

  taoKehoach() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach/tao-ke-hoach']);
  }

  onSend() {
    this.modal.show();
  }
  setPage(number) {
      this.currentPage = number;
      this.search();
  }
  getStatus(code) {
    const status = TRANG_THAI_KH.find(el => {
      return el.code === code;
    });
    return status;
  }
  search() {
      const tenKeHoach = this.formTimKiem.value.searchKey;
      this.noiKehoachDuthaoService.searchKeHoachTinhDauNam(this.account.dmTinhHuyenId, tenKeHoach.trim(), this.currentPage, this.pageSize)
      .subscribe(res => {
          this.dskehoach = res.content;
          this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      }, err => {
        console.log(err);
      });
  }
}
