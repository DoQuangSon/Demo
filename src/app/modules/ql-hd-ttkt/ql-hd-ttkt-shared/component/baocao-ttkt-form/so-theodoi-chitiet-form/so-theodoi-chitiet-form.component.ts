import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants/index';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../../constants/message.constants';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiSoTheodoiChitietService } from '../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-theodoi-chitiet/noi-so-theodoi-chitiet.service';
import { AuthService } from '../../../../../../auth/auth.service';
import { Pagging } from '../../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-so-theodoi-chitiet-form',
  templateUrl: './so-theodoi-chitiet-form.component.html',
  styleUrls: ['./so-theodoi-chitiet-form.component.scss']
})
export class SoTheodoiChitietFormComponent implements OnInit {
  @Input() typeAccount: string;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective: boolean = false;
  dmbhxhId: any;
  pagging: Pagging = new Pagging();
  dsSoThoiDoi = [];
  thongTinTimKiemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noiSoTheodoiChitietService: NoiSoTheodoiChitietService,
    private timeBuilder: TimeBuilderService,
    private pagination: PaginationService,
    private alertService: AlertService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.thongTinTimKiemForm = this.fb.group({
      searchTuNgay: null,
      searchDenNgay: null,
    });
    this.dmbhxhId = this.auth.currentUser.donViId;
    this.getDsChiTiet();
  }

  getDsChiTiet(isSearching: boolean = false) {
    if(isSearching){
      this.pagging.currentPage = 0;
    }
    const formValua = this.thongTinTimKiemForm.value;
    this.noiSoTheodoiChitietService.searchSoTheoDoiChiTiet(
      this.dmbhxhId,
      this.timeBuilder.fromTimeDatePicker(formValua.searchTuNgay).setUTC().toISOString() || '',
      this.timeBuilder.fromTimeDatePicker(formValua.searchDenNgay).setUTC().toISOString() || '',
      this.pagging.currentPage,
      this.pagging.itemsPerPage
    ).subscribe(resp =>{
      this.processDataToShow(resp);
    })
  }

  processDataToShow(data) {
    this.pagging.totalItems = data.totalElements;
    if (data.content && data.content.length) {
      data.content.forEach(el => {
        el.thoiKyTuNgay = new Date(el.ngayBatDau);
        el.thoiKyDenNgay = new Date(el.ngayKetThuc);
      });
    }
    this.dsSoThoiDoi = data.content;
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getDsChiTiet();
  }
  search() {
    this.getDsChiTiet(true);
  }

  dsSoTheoDoidv(index) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tw/so-theo-doi-chi-tiet/ds-so-theodoi-dv', index]);
    } else {
      this.router.navigate(['ql-hd-ttkt/ql-baocao-ttkt/tinh/so-theodoi-chitiet/ds-so-theodoi-dv', index]);
    }
  }

}
