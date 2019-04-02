import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

import { Router } from '@angular/router';
import { NotificationService } from '../../../services/api/notification/notification.service';
import { AuthService } from '../../../auth/auth.service';
import { MainLayoutService } from '../../../services/dom-events/main-layout.service';

@Component({
  selector: 'ttkt-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  listNoti: Array<any> = [];
  newNoti = 0;
  isShow: boolean = false;

  constructor(
    private notiService: NotificationService,
    private router: Router,
    private auth: AuthService,
    private mainLayoutService: MainLayoutService,
  ) {
  }

  ngOnInit() {
    this.getNoti();
    interval(1000 * 60 * 2).subscribe(() => {
      this.getNoti();
    });

    this.mainLayoutService.onMainLayoutClicked().subscribe(() => this.isShow = false);

  }

  getNoti() {
    this.auth.accountType === 'tw' ? this.getNotiTW() : this.getNotiTinh();
    if (this.listNoti !== undefined && this.listNoti.length > 0) {
      this.getNumberNewNoti(this.listNoti);
    }
  }

  getNotiTW() {
    this.notiService.getNotificationTW().subscribe(res => {
      this.listNoti = res['content'];
    });
  }

  getNotiTinh() {
    const dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
    this.notiService.getNotificationTINH(dmTinhHuyenId).subscribe(res => {
      this.listNoti = res['content'];
    });
  }

  getNumberNewNoti(listNotication) {
    this.newNoti = 0;
    for (const noti of listNotication) {
      if (!noti.seen) {
        this.newNoti++;
      }
    }
  }

  toDetailNoti(path) {
    if (path) {
      this.router.navigate(path);
    }
  }
  resetNotify() {
    this.newNoti = 0;
    if (this.listNoti !== undefined && this.listNoti.length > 0 && this.isShow) {
      this.notiService.updateNotifiSeen(this.listNoti).subscribe();
      this.getNoti();
    }

  }
  viewAll() {
    this.isShow = false
  }
  showNotification() {
    this.isShow = !this.isShow;
    this.resetNotify();
  }
}
