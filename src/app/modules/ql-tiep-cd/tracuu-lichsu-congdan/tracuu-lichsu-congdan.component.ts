import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from './../../../constants/index';
import { NoiDonthuService } from '../../../services/api/noi-donthu/noi-donthu.service';
import { TimeBuilderService } from './../../../services/helper/time-builder.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { NoiDmphanloainoidungService } from '../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
import { DONTHU_STATUS } from '../../../constants/tiep-cong-dan.constants';
import { AuthService } from '../../../auth/auth.service';
import { NoiDmbhxhService } from '../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';

@Component({
  selector: 'ttkt-tracuu-lichsu-congdan',
  templateUrl: './tracuu-lichsu-congdan.component.html',
  styleUrls: ['./tracuu-lichsu-congdan.component.scss']
})
export class TracuuLichsuCongdanComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective: boolean = false;
  tracuuLsCdForm: FormGroup;
  dsTracuuCongdan = [];
  listNoiDung: any = [];
  listTrangThaiDt: any = [];
  noiDung: any;
  pager: any = {};
  currentPage: number = 0;
  listCoQuan = [];

  constructor(
    private formBuilder: FormBuilder,
    private donThuService: NoiDonthuService,
    private phanLoaiNoiDung: NoiDmphanloainoidungService,
    private timeBuilder: TimeBuilderService,
    private pagination: PaginationService,
    private auth: AuthService,
    private dmBhxhService: NoiDmbhxhService
  ) { }

  ngOnInit() {
    this.getListNoiDung();
    if (this.auth.accountType == 'tw') {
      this.dmBhxhService.getDmBHXHBTinhAndTw().subscribe(res => {
        this.listCoQuan = res;
      });
    }

    this.tracuuLsCdForm = this.formBuilder.group({
      hoTenCongDan: [''],
      soCMTND: [''],
      phanLoaiNoiDungId: [''],
      ngayDenTo: [''],
      ngayDenFrom: [''],
      dmbhxhId: [this.auth.currentUser.donViId],
      coQuan: [this.auth.currentUser.donViId]
    });

    this.tracuuLsCdForm.get('coQuan').valueChanges.subscribe(value => {
      this.search(true);
    });

    this.listTrangThaiDt = DONTHU_STATUS;
    this.search(true);
  }

  search(e?: any) {
    if (e) { this.currentPage = 0; }
    let formValue = this.tracuuLsCdForm.value;
    const formBody: any = {};
    formBody.dmbhxhId = this.auth.currentUser.donViId;
    if (this.auth.accountType == 'tw') {
      console.log(this.tracuuLsCdForm.get('coQuan').value, formValue.coQuan);
      formBody.dmbhxhId = this.tracuuLsCdForm.get('coQuan').value;
    }
    formBody.soCMTND = formValue.soCMTND;
    formBody.hoTenCongDan = formValue.hoTenCongDan;
    if (formValue.phanLoaiNoiDungId[0])
    formBody.phanLoaiNoiDungId = formValue.phanLoaiNoiDungId[0].id;
    if (formValue.ngayDenFrom)
    formBody.ngayDenFrom = this.timeBuilder.fromTimeDatePicker(formValue.ngayDenFrom).toISOString();
    if (formValue.ngayDenTo)
    formBody.ngayDenTo = this.timeBuilder.fromTimeDatePicker(formValue.ngayDenTo).toISOString();
    formBody.page = this.currentPage;
    formBody.size = 10;
    
    this.donThuService.traCuuLichSuCD(formBody).subscribe(res => {
      this.dsTracuuCongdan = res.content;
      this.getStatusName();
      this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      // if (e) { this.setPage(this.currentPage, res, e); }
    }, err => { });
  }

  getListNoiDung() {
    this.phanLoaiNoiDung.getAllDmPhanloainoidung().subscribe((res: any) => {
      this.listNoiDung = res.content.map(el => {
        const _el: any = {};
        _el.id = el.id;
        _el.text = el.tenNoiDung;
        return _el;
      });
    }, err => { });
  }

  getStatusName() {
    this.dsTracuuCongdan.forEach(el => {
      this.listTrangThaiDt.forEach(el2 => {
        if (el.status === el2.id) {
          el.status = el2.name;
        }
      });
    });
  }

  refreshNoiDung(value: any) {
    this.noiDung = value;
  }

  removed(value: any) {
    this.noiDung = {};
  }

  setPage(page: number, res?, e?) {
    this.currentPage = page;
    this.search();
    if (page < 0 || page > this.pager.totalPages) {
      return;
    }
  }
}
