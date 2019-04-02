import { Component, OnInit } from '@angular/core';
import { Pagging } from '../../../shared/models/pagging.model';
import { NotificationService } from '../../../services/api/notification/notification.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ttkt-view-all-notification',
  templateUrl: './view-all-notification.component.html',
  styleUrls: ['./view-all-notification.component.scss']
})
export class ViewAllNotificationComponent implements OnInit {
  listNoti: Array<any> = [];
  pagging: Pagging = new Pagging();
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};

  constructor(
    private notiService: NotificationService,
    private pagination: PaginationService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.accountType === 'tw' ? this.getNotiTW() : this.getNotiTinh();
  }
  getNotiTW() {
    this.notiService.getNotificationTW(this.currentPage, this.pageSize).subscribe(res => {
      this.getResponseAndPager(res);
    });
  }

  getNotiTinh() {
    const dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
    this.notiService.getNotificationTINH(dmTinhHuyenId, this.currentPage, this.pageSize).subscribe(res => {
      this.getResponseAndPager(res);
    });
  }
  getResponseAndPager(res) {
    this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
    this.listNoti = res.content;
  }
  setPage(number) {
    this.currentPage = number;
  }

}