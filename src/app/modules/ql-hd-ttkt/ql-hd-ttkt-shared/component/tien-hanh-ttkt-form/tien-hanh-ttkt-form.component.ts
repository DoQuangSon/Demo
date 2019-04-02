import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { TienHanhTtktService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../auth/auth.service';
import { Pagging } from '../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-tien-hanh-ttkt-form',
  templateUrl: './tien-hanh-ttkt-form.component.html',
  styleUrls: ['./tien-hanh-ttkt-form.component.scss']
})
export class TienHanhTtktFormComponent implements OnInit {
  @Input() typeAccount: string;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective = false;
  searchForm: FormGroup;
  dmbhxhId: any;
  dsDoanTTKT = [];
  pagging: Pagging = new Pagging();
  pager: any = {};
  isTW: boolean;
  currentPage = 0;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private tienHanhTTKTService: TienHanhTtktService,
    private pagination: PaginationService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.searchForm = this.builder.group({
      tungay: null,
      denngay: null
    });
    this.dmbhxhId = this.auth.currentUser.donViId;
    // this.typeAccount === 'TW' ? this.isTW = true : this.isTW = false;
      this.isTW = this.router.url.indexOf('tw') > -1;
      this.search();
  }

  processDataToShow(data) {
    this.pagging.totalItems = data.totalElements;
    this.pagging.currentPage = this.currentPage;
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

  search() {
    const tuNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() || '';
    const denngay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() || '';
      this.tienHanhTTKTService.getDsDoanTTKT(this.isTW, this.dmbhxhId, tuNgay, denngay, this.currentPage, this.pagging.itemsPerPage)
        .subscribe(resp => {
          this.processDataToShow(resp);
        }, error => { });
  }

  pageChanged(event) {
    this.currentPage = event.page - 1;
    this.search();
  }

  chiTietQD(index) {
    if (this.isTW) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt', index]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt', index]);
    }
  }

  QDCongBo(index) {
    if (this.isTW) {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/congbo-qd-ttkt-tw', index]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/congbo-qd-ttkt', index]);
    }
  }

  xemBaoCao(isBaoCao, id) {
    if (this.isTW) {
      if (isBaoCao) {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/${id}/bao-cao-ket-qua`]);
      } else {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/${id}/ket-luan-ttkt`]);
      }
    } else {
      if (isBaoCao) {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/${id}/bao-cao-ket-qua`]);
      } else {
        this.router.navigate([`/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/${id}/ket-luan-ttkt`]);
      }
    }
  }
}
