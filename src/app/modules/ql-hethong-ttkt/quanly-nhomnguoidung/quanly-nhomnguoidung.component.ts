import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { TreeviewComponent, TreeviewConfig, TreeviewItem } from 'ngx-treeview';

import { ModalGanNsdComponent } from './modal-gan-nsd/modal-gan-nsd.component';
import { CAP_QUAN_LY } from '../../../constants/ql-nhom-nguoidung.constants';
import { AlertService } from '../../../services/api/alert.service';
import { PhanQuyenUserService } from '../../../services/api/noi-phanquyennguoidung/noi-phanquyennguoidung.service';
import { QLyNhomNguoiDungService } from '../../../services/api/noi-qlnhomnguoidung/noi-qlnhomnguoidung.service';
import { Pagging } from '../../../shared/models/pagging.model';
import { MESS_QUAN_LY_NHOM_NGUOI_DUNG, COMMON_SUCCESS_MESS, COMMON_ERROR_MESS } from '../../../constants/message.constants';
import { DualListBoxComponent } from '../../../shared/ng2-dual-list-box/dual-list-box.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ttkt-quanly-nhomnguoidung',
  templateUrl: './quanly-nhomnguoidung.component.html',
  styleUrls: ['./quanly-nhomnguoidung.component.scss'],
})
export class QuanlyNhomnguoidungComponent implements OnInit {
  nhomNguoiDungId: any;
  modalGanNSD: BsModalRef;
  @ViewChild('modalNhomNSD') modalNhomNSD: ModalDirective;
  @ViewChild('modalPhanQuyen') public modalPhanQuyen: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild(TreeviewComponent) public treeView: TreeviewComponent;
  @ViewChild(DualListBoxComponent) public dualListBox: DualListBoxComponent;

  pagging: Pagging = new Pagging();
  // tree
  enableButton = true;
  items: TreeviewItem[];
  itemsOriginal: any;
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  optionsTab_Text: boolean = false;
  isSearch: boolean = false;

  // fake dsNhomNguoiDung
  userGroupList: any[] = [];

  // Modal option
  status_Option: string;
  icon_ModalHeader: string;
  type_title_NhomNSD: string;

  // Boolean check khi ấn save
  errtenNhom: boolean = false;
  // errorUpperCase: boolean = false;
  errcapQuanLy: boolean = false;
  errSpacesWhite: boolean = false;

  tennhom = false;
  capQL = false;
  // Rework
  dmbhxhId: any;

  // Người sử dụng dual listbox

  // Formm Group List
  NhomNSDNguoiDungForm: FormGroup;
  phanQuyenForm: FormGroup;
  addNhomNSDForm: FormGroup;
  ganNSDForm: FormGroup;

  // Cấp quản lý select
  capQuanLyOptions: any = CAP_QUAN_LY;
  currentAuthiorityId: any;
  validateQuanLy = false;

  constructor(
    private fb: FormBuilder,
    private builder: FormBuilder,
    private alertService: AlertService,
    private phanQuyenUserService: PhanQuyenUserService,
    private quanLyUserGroup: QLyNhomNguoiDungService,
    private modalService: BsModalService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.NhomNSDNguoiDungForm = this.fb.group({
      search: ['']
    });
    this.phanQuyenForm = this.builder.group({
    });
    this.addNhomNSDForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      capQuanLy: ['', Validators.required],
      title: [''],
      description: ['']
    });
    this.dmbhxhId = this.auth.currentUser.donViId;
    this.getListNhomNguoiDung();
  }
  noWhitespaceValidator(name) {
    if (name.trim().length === 0) {
      return true;
    }
    return false;
  }

  // Get list nhóm người dùng
  getListNhomNguoiDung() {
    this.isSearch = false;
    this.quanLyUserGroup.getUserGroupList(this.dmbhxhId, this.pagging.currentPage - 1, this.pagging.itemsPerPage).subscribe(res => {
      this.pagging.totalItems = res.totalElements;
      this.userGroupList = res.content;
    }, err => {
    });
  }

  // Modal nhóm người dung
  // add, edit NhomNSD
  showModalAddNhomNSD() {
    this.status_Option = 'add';
    this.icon_ModalHeader = 'fa fa-plus-circle';
    this.type_title_NhomNSD = 'Thêm';
    this.addNhomNSDForm.reset();
    this.resetMessageErr();
    this.modalNhomNSD.show();
  }

  editNhomNSD(i) {
    this.status_Option = 'edit';
    this.icon_ModalHeader = 'fa fa-pencil';
    this.type_title_NhomNSD = 'Sửa';
    this.addNhomNSDForm.reset();
    this.resetMessageErr();
    this.quanLyUserGroup.getUserGroupById(this.userGroupList[i].id).subscribe(res => {
      this.addNhomNSDForm.patchValue({
        name: res.name,
        capQuanLy: res.capQuanLy,
        title: res.title,
        description: res.description,
        id: res.id
      });
    }, err => { });
    this.modalNhomNSD.show();
  }

  // Save add/edit nhóm người dùng
  saveUserGroup(option) {
    const formValue = this.addNhomNSDForm.value;
    if (this.addNhomNSDForm.invalid) {
      this.tennhom = true;
      this.capQL = true;
    } else {
      this.tennhom = false;
      this.capQL = false;
    }
    // if (!this.quanLyUserGroup.checkStringIsUpperCase(formValue.name)) {
    //   this.errorUpperCase = true;
    // } else
    if (this.noWhitespaceValidator(formValue.name)) {
      this.errSpacesWhite = true;
    } else if (this.addNhomNSDForm.valid) {
      const data: any = formValue;
      data.actived = true;
      data.dmbhxhId = this.dmbhxhId;
      let api = 'createNhomNguoiDung';
      let msgSuccess = MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_THEM_NHOM_NGUOI_DUNG;
      let msgError = MESS_QUAN_LY_NHOM_NGUOI_DUNG.ERROR_THEM_NHOM_NGUOI_DUNG;
      if (option === 'edit') {
        api = 'updateNhomNguoiDung';
        msgSuccess = COMMON_SUCCESS_MESS.CAP_NHAT;
        msgError = COMMON_ERROR_MESS.CAP_NHAT_LOI;
      }
      this.quanLyUserGroup[api](data).subscribe(res => {
        this.alertService.success(msgSuccess);
        this.getListNhomNguoiDung();
      }, err => {
        this.alertService.error(err.title);
        // this.userGroupList.push(data);
      });
      // this.errorUpperCase = false;
      this.resetMessageErr();
      this.modalNhomNSD.hide();
    } else {
      this.resetMessageErr();
      // this.errorUpperCase = false;
    }

  }

  // Get cấp quản lí name theo id cấp quản lý
  getCapQuanLyName(i) {
    for (const item of this.capQuanLyOptions) {
      if (this.userGroupList[i].capQuanLy === item.id) {
        return item.name;
      }
    }
  }

  // Mở modal gán người sử dụng
  openModalGanNSD(id) {
    this.modalGanNSD = this.modalService.show(ModalGanNsdComponent, { class: 'modal-lg' });
    this.modalGanNSD.content.dmbhxhId = this.dmbhxhId;
    this.modalGanNSD.content.currentAuthiorityId = id;
    this.modalGanNSD.content.currentPageTreeView = 0;
    this.modalGanNSD.content.getListUserNotBelongToAuThiority(id);
    this.modalService.onHidden.subscribe(() => {

    });
  }
  actionDelete(id) {
    this.modalDelete.show();
    this.nhomNguoiDungId = id;
  }
  acceptDelete() {
    this.modalDelete.hide();
    this.quanLyUserGroup.deleteNhomNguoiDung(this.nhomNguoiDungId)
      .subscribe(res => {
        this.getListNhomNguoiDung();
        this.alertService.success(MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_XOA_USER_GROUP);
      }, err => {
        // this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
        this.alertService.error(err.title);
      });
  }

  // phanQuyen

  // Open modal phân quyền (là 1 TreeView)
  openModalPhanQuyen(id) {
    this.currentAuthiorityId = id;
    this.phanQuyenUserService.getUserPermissionList(id).subscribe(res => {
      res = this.phanQuyenUserService.getTrueFalseForChecked(res);
      this.itemsOriginal = res;
      this.items = this.phanQuyenUserService.patchValueToTreeView(res);
    });
    this.modalPhanQuyen.show();
  }

  // Save phân quyền nhóm người dùng
  savePhanQuyen() {
    const treeViewList = JSON.parse(JSON.stringify(this.treeView.items));
    for (let item of treeViewList) {
      item = this.phanQuyenUserService.getCheckedAndChildrenProperty(item);
      item.checked = this.phanQuyenUserService.checkTreeChecked(item);
    }
    const formBody: any = {};
    formBody.authorityId = this.currentAuthiorityId;
    formBody.permissionDTOs = this.creatTreeViewBody(this.itemsOriginal, treeViewList);
    this.phanQuyenUserService.updatePermissionTreeView(formBody).subscribe(res => {
      this.alertService.success(MESS_QUAN_LY_NHOM_NGUOI_DUNG.SUCCESS_PHAN_QUYEN);
      this.modalPhanQuyen.hide();
    }, err => {
      this.alertService.error(MESS_QUAN_LY_NHOM_NGUOI_DUNG.ERROR_PHAN_QUYEN);
    });
  }

  // Tạo body gửi lên server
  creatTreeViewBody(listOriginal, treeViewList) {
    const treeViewBody: any[] = [];
    for (let item of listOriginal) {
      item = this.getItemChecked(item, treeViewList);
      treeViewBody.push(item);
    }
    return treeViewBody;
  }

  // Gán thuộc tính checked vào các item của body gửi lên server
  getItemChecked(item, treeViewList) {
    for (const element of treeViewList) {
      if (item.value === element.value) {
        item.checked = element.checked;
        // Check xem item có children ko, tiếp tục gán thuộc tính checked vào children
        if (item.children) {
          for (let el of item.children) {
            // Đệ quy đến các cấp children tiếp theo
            el = this.getItemChecked(el, element.children);
          }
        }
        return item;
      }
    }
  }

  resetMessageErr() {
    this.errtenNhom = false;
    this.errcapQuanLy = false;
    this.errSpacesWhite = false;
  }

  // Sự kiện get list item của TreeView khi tiến hành thay đổi 1 giá trị bất kì
  selectItemTreeView(e: any) {

  }

  // tìm kiếm danh sách
  search() {
    this.pagging.currentPage = 0;
    if (this.NhomNSDNguoiDungForm.value.search && this.NhomNSDNguoiDungForm.value.search.trim() !== '') {
      this.callSearch();
    } else {
      this.getListNhomNguoiDung();
    }


  }
  callSearch() {
    this.isSearch = true;
    this.quanLyUserGroup.getTimKiemNhomNguoiDung(this.dmbhxhId, this.NhomNSDNguoiDungForm.value.search,
       this.pagging.currentPage - 1, this.pagging.itemsPerPage).subscribe(
      response => {
        this.userGroupList = response.content;
        this.pagging.totalItems = response.totalElements;
      }
    );
  }

  pageChanged(event) {
    this.pagging.currentPage = event.page;
    this.search();
  }x

}
