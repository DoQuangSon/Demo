import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoiSoTonghopKqService } from '../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-tonghop-kq/noi-so-tonghop-kq.service';

@Component({
  selector: 'ttkt-so-tonghop-kq-form',
  templateUrl: './so-tonghop-kq-form.component.html',
  styleUrls: ['./so-tonghop-kq-form.component.scss']
})
export class SoTonghopKqFormComponent implements OnInit {
  @Input() typeAccount: string;
  soTongHopKqForm: FormGroup;
  isCollapseDirective: boolean = false;
  dsSoBaoCao: Array<any>;
  totalItems: number = 0;
  currentPage: number = 1;
  currentIndex: number = 1;
  itemsPerPage: number = 20;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private baoCao: NoiSoTonghopKqService
  ) { }

  ngOnInit() {
    let now = new Date();
    this.soTongHopKqForm = this.fb.group({
      nam: [now.getFullYear()],
      fromYear: [now.getFullYear()],
      fromMonth: [(now.getMonth() + 1)]
    });

    this.searchBaoCao();
  }

  searchBaoCao() {
    this.baoCao.getSoTHKQTTKT(this.soTongHopKqForm.value.nam, this.currentPage - 1, this.itemsPerPage).subscribe(req => {
      this.dsSoBaoCao = req.content;
      this.totalItems = req.totalElements;
      this.currentIndex = this.currentPage;
    });
  }

  search() {
    this.totalItems = 0;
    this.currentPage = 1;
    this.searchBaoCao();
  }

  pageChanged(event) {
    console.log(event);
    this.currentPage = event.page;
    this.searchBaoCao();
  }

  chiTietSoTongHopKQ(index) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/so-tong-hop-kq/chitiet-so-tonghop-kq', index]);
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/so-tonghop-kq/chitiet-so-tonghop-kq', index]);
    }
  }

  // taoMoiSoTongHopKQ() {
  //   this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/so-tong-hop-kq/taomoi-so-tonghop-kq']);
  // }

  xemChiTietLive() {
    const fromDate = (new Date(this.soTongHopKqForm.value.fromYear, this.soTongHopKqForm.value.fromMonth , 1)).toISOString();
    if (this.typeAccount == 'TINH') {
      this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/so-tonghop-kq/chitiet-so-tonghop-kq/live'], { queryParams: { fromDate: fromDate}});
    } else {
      this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/so-tong-hop-kq/chitiet-so-tonghop-kq/live'], { queryParams: { fromDate: fromDate}});
    }

  }


    printMau03(id, ngayTao,  type) {
        this.baoCao.printMauBaoCao03(id, ngayTao, type);
    }

}
