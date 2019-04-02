
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { KeHoachToanNganhService } from '../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { QUY, THANG } from '../../../../../constants/ke-hoach-ttkt.constants';
import { Pagging } from '../../../../../shared/models/pagging.model';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ke-hoach-bhxh-vn',
  templateUrl: './ke-hoach-bhxh-vn.component.html',
  styleUrls: ['./ke-hoach-bhxh-vn.component.scss']
})
export class KeHoachBhxhVnComponent implements OnInit {
  @ViewChild('dieuChinhDetailModal') public dieuChinhDetailModal: ModalDirective;
  pagging: Pagging = new Pagging();
  quy: any[] = QUY;
  thang: any[] = THANG;
  formGuiKHModal: FormGroup;
  isDieuChinhDetailModalShown: Boolean = false;
  public listKeHoachBHXHVN: any[] = [];
  public dieuChinhDetailItem: any;
  date: any;
  pager: any = {};
  dmbhxhid: any;
  constructor(
    private router: Router,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 20;
    this.dmbhxhid = this.auth.currentUser.donViId;
    this.getListBHXHVN();
  }
  getListBHXHVN() {
    this.keHoachToanNganhService.twXemKeHoachDauNam(this.pagging.currentPage, this.pagging.itemsPerPage)
    .subscribe(res => {
      this.listKeHoachBHXHVN = res['content'];
      this.pagging.totalItems = res.totalElements;
    }, err => {});
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getListBHXHVN();
  }

  onDieuChinhDetailModalHidden() {
    this.dieuChinhDetailItem = [];
    this.isDieuChinhDetailModalShown = false;
  }

  dieuChinhDetail() {
    this.dieuChinhDetailModal.hide();
  }

  openDieuChinhDetailModal(i: number) {
    this.isDieuChinhDetailModalShown = true;
    this.dieuChinhDetailItem = this.listKeHoachBHXHVN[i].dieuChinh;
    return false;
  }

  goToTaoKeHoach() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/tao-ke-hoach']);
  }

  goToKeHoachChiTiet(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/chi-tiet-ke-hoach', id]);
  }

  goToDanhSachCacTinh() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/danh-sach-tinh']);
  }
}
