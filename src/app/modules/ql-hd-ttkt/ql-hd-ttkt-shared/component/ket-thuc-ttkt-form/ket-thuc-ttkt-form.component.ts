import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pagging } from '../../../../../shared/models/pagging.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { IMyDpOptions } from 'mydatepicker';
import { TienHanhTtktService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ket-thuc-ttkt-form',
  templateUrl: './ket-thuc-ttkt-form.component.html',
  styleUrls: ['./ket-thuc-ttkt-form.component.scss']
})
export class KetThucTtktFormComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  @Input() typeAccount: string;
  isCollapseDirective = false;
  searchForm: FormGroup;
  dmbhxhId: any;
  dsDoanTTKT = [];
  pagging: Pagging = new Pagging();
  pager: any = {};
  isTW: boolean;
  title: string;
  isGettingKL: boolean;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private tienHanhTTKTService: TienHanhTtktService,
    private pagination: PaginationService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService
  ) { }

  currentPage = 0;

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.searchForm = this.builder.group({
      tungay: null,
      denngay: null
    });
    this.dmbhxhId = this.auth.currentUser.donViId;
    this.isTW = this.router.url.indexOf('tw') > -1;
    this.search();
    this.getTitle();
  }
  search(isSearching: boolean = false) {
    if (isSearching) {
      this.pagging.currentPage = 0;
    }
    const tuNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() || '';
    const denngay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() || '';
    if (this.title == 'báo cáo') {
      this.isGettingKL = false;
      this.tienHanhTTKTService.getDsDoanTTKTTienDoEqual1(this.isTW, this.dmbhxhId, tuNgay, denngay, this.isGettingKL, this.pagging.currentPage, this.pagging.itemsPerPage)
      .subscribe(resp => {
        this.processDataToShow(resp);
      }, error => { });
    } else {
      this.isGettingKL = true;
      this.tienHanhTTKTService.getDsDoanTTKTTienDoEqual1(this.isTW, this.dmbhxhId, tuNgay, denngay, this.isGettingKL, this.pagging.currentPage, this.pagging.itemsPerPage)
      .subscribe(resp => {
        this.processDataToShow(resp);
      }, error => { });
    }
  }
  processDataToShow(data) {
    this.pagging.totalItems = data.totalElements;
    if (data.content.length) {
      data.content.forEach(el => {
        if (el.ngayCongBo) {
          el.ngayCongBo = new Date(el.ngayCongBo);
        } else {
          el.ngayCongBo = '';
        }
        el.ngayQuyetDinh = new Date(el.ngayQuyetDinh);
      });
    }
    this.dsDoanTTKT = data.content;
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.search();
  }
  getTitle() {
    if (this.router.url.indexOf('ket-luan-ttkt') > -1) {
      this.title = 'kết luận';
    } else {
      this.title = 'báo cáo';
    }
  }

  showBaoCaoOrKLDetail(id) {
    if (this.isTW) {
      if (this.title == 'báo cáo') {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/bao-cao-ttkt-tw/${id}/bao-cao-ket-qua`]);
      } else {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/ket-luan-ttkt-tw/${id}/ket-luan-ttkt`]);
      }
    } else {
      if (this.title === 'báo cáo') {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh/bao-cao-ttkt-tinh/${id}/bao-cao-ket-qua`]);
      } else {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh/ket-luan-ttkt-tinh/${id}/ket-luan-ttkt`]);
      }
    }
  }

}
