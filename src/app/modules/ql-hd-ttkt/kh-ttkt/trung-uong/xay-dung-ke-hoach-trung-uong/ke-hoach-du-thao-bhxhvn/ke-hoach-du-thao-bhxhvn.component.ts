import { Component, OnInit } from '@angular/core';
import { Pagging } from '../../../../../../shared/models/pagging.model';
import { Router } from '@angular/router';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
@Component({
  selector: 'ttkt-ke-hoach-du-thao-bhxhvn',
  templateUrl: './ke-hoach-du-thao-bhxhvn.component.html',
  styleUrls: ['./ke-hoach-du-thao-bhxhvn.component.scss']
})
export class KeHoachDuThaoBhxhvnComponent implements OnInit {
  pagging: Pagging = new Pagging();
  public listKeHoachBHXHVN: any[] = [];
  constructor(private keHoachToanNganhService: KeHoachToanNganhService,
    private router: Router, ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 20;
    this.getListBHXHVN();
  }
  getListBHXHVN() {
    this.keHoachToanNganhService.twXemKeHoachDuThao(this.pagging.currentPage, this.pagging.itemsPerPage)
      .subscribe(res => {
        this.listKeHoachBHXHVN = res['content'];
        this.pagging.totalItems = res.totalElements;
      }, err => { });
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getListBHXHVN();
  }
  goToKeHoachChiTiet(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach', id]);
  }
  goToTaoKeHoach() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/tao-ke-hoach']);
  }
}
