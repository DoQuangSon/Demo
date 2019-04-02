import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { QLyNhomNguoiDungService } from '../../../../services/api/noi-qlnhomnguoidung/noi-qlnhomnguoidung.service';
import { AlertService } from '../../../../services/api/alert.service';
import { MESS_QUAN_LY_NHOM_NGUOI_DUNG } from '../../../../constants/message.constants';
import { PaginationService } from '../../../../services/helper/pagination.service';

@Component({
  selector: 'ttkt-modal-gan-nsd',
  templateUrl: './modal-gan-nsd.component.html',
  styleUrls: ['./modal-gan-nsd.component.scss']
})
export class ModalGanNsdComponent implements OnInit, OnDestroy {
  pagerTreeView: any = {
    currentPage: 0,
    pageSize: 20,
    totalPages: 3,
    startPage: 0,
    endPage: 3,
    pages: 3
  };

  data: any;
  pageSizeTreeView: number = 20;
  currentPageTreeView: number = 0;
  ganUserOption: string;

  public openTab: string = '';
  listUserSelected: any = [];
  currentDualBoxTab: any;

  // Gán người sử dụng cho authiority
  currentAuthiorityId: number;
  dmbhxhId: any;

  constructor(
    public modalGanNSD: BsModalRef,
    private quanLyUserGroup: QLyNhomNguoiDungService,
    private alertService: AlertService,
    private pagination: PaginationService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  // Get list người dùng tùy theo tab
  getListUserPhanQuyen(option) {
    this.currentPageTreeView = 0;
    this.ganUserOption = option;
    this.openTab = option;
    if (option === 'add') {
      this.getListUserNotBelongToAuThiority(this.currentAuthiorityId);
    } else {
      this.getListUserBelongAuthiority(this.currentAuthiorityId);
    }
  }

  // Get list người dùng ở tab thêm người dùng
  getListUserNotBelongToAuThiority(id) {
    this.listUserSelected = [];
    this.quanLyUserGroup.getUserNotBelongToAuthiority(id, this.dmbhxhId, this.currentPageTreeView, this.pageSizeTreeView).subscribe(res => {
      if (res.content.length > 0) {
        this.data = res.content.map(el => {
          const _el: any = {};
          _el.id = el.userId;
          _el.name = el.userName;
          return _el;
        });
        this.pagerTreeView = this.pagination.getPager(this.currentPageTreeView, res.size, res.totalPages);
      }
    }, err => { });
  }

  // Get list người dùng ở tab xóa người dùng
  getListUserBelongAuthiority(id) {
    this.listUserSelected = [];
    this.quanLyUserGroup.getUserOfAuthiority(id, this.currentPageTreeView, this.pageSizeTreeView).subscribe(res => {
      if (res.content.length > 0) {
        this.data = res.content.map(el => {
          const _el: any = {};
          _el.id = el.userId;
          _el.name = el.userName;
          return _el;
        });
        this.pagerTreeView = this.pagination.getPager(this.currentPageTreeView, res.size, res.totalPages);
      }
    }, err => { });
  }

  // Phân trang ở dual - listbox
  getPageFromDualListBox(event) {
    this.currentPageTreeView = event;
    if (this.ganUserOption === 'add') {
      this.getListUserNotBelongToAuThiority(this.currentAuthiorityId);
    } else {
      this.getListUserBelongAuthiority(this.currentAuthiorityId);
    }
  }

  // Get list các user đc chọn
  getCurrentMovedListNguoiSD(e: any) {
    this.listUserSelected = e.selected;
  }

  // Save list người sử dụng đc gán vào nhóm
  saveGanNSD() {
    let api = 'addUserFromAuthority';
    let messageSuccess = MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_THEM_USER;
    let messageError = MESS_QUAN_LY_NHOM_NGUOI_DUNG.ERROR_THEM_USER;
    if (this.ganUserOption === 'delete') {
      api = 'removeUserFromAuthority';
      messageSuccess = MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_XOA_USER;
      messageError = MESS_QUAN_LY_NHOM_NGUOI_DUNG.ERROR_XOA_USER;
    }
    const formBody: any = {};
    formBody.authorityId = this.currentAuthiorityId;
    formBody.userInfoDTOList = this.listUserSelected.map(el => {
      const _el: any = {};
      _el.userId = Number(el.value);
      _el.userName = el.text;
      return _el;
    });
    this.quanLyUserGroup[api](formBody).subscribe(res => {
      this.alertService.success(messageSuccess);
      this.modalGanNSD.hide();
    }, err => {
      this.alertService.error(messageError);
    });
  }
}
