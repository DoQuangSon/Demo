import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaoCaoKqToanNganhService } from '../../../../../services/api/noi-ql-baocao-ttkt/bao-cao-kq-toan-nghanh/bao-cao-kq-toan-nghanh.service';
import { Pagging } from '../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-bao-cao-tong-hop-toan-nganh',
  templateUrl: './bao-cao-tong-hop-toan-nganh.component.html',
  styleUrls: ['./bao-cao-tong-hop-toan-nganh.component.scss']
})
export class BaoCaoTongHopToanNganhComponent implements OnInit {
  paging: Pagging = new Pagging();

  bcTongHopNganhForm: FormGroup;
  dsBaoCaoTonghop = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private baoCaoKqToanNganhService: BaoCaoKqToanNganhService
  ) { }

  ngOnInit() {
    this.bcTongHopNganhForm = this.fb.group({
      search: [''],
      nam: [(new Date()).getFullYear()]
    });

    this.search();
  }

  search(isReset?: boolean) {
    if (isReset) {
      this.paging.currentPage = 1;
    }
    this.baoCaoKqToanNganhService
        .searchAll(this.bcTongHopNganhForm.value, this.paging.currentPage - 1, this.paging.itemsPerPage)
        .subscribe(res => {
          this.dsBaoCaoTonghop = res.content;
          this.paging.totalItems = res.totalElements;
        });
  }
  chiTietBCTongHopNganh(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tonghop-nganh/chitiet', index]);
  }

  taoMoiBCTongHopNganh() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tonghop-nganh/taomoi']);
  }
  chiTietBaoCao(id) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop-nganh/chi-tiet-bcth-toan-nganh']);
  }

  pageChanged(event) {
    this.paging.currentPage = event.page;
    this.search();
  }
}
