import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaoCaoKqToanNganhService } from '../../../../../../services/api/noi-ql-baocao-ttkt/bao-cao-kq-toan-nghanh/bao-cao-kq-toan-nghanh.service';

@Component({
  selector: 'ttkt-chitiet-bc-tonghop-toannganh',
  templateUrl: './chitiet-bc-tonghop-toannganh.component.html',
  styleUrls: ['./chitiet-bc-tonghop-toannganh.component.scss']
})
export class ChitietBcTonghopToannganhComponent implements OnInit {
  data: any = {};

  constructor(
    private router: Router,
    private baoCaoKqToanNganhService: BaoCaoKqToanNganhService,
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRouter.params.subscribe(param => {
      this.baoCaoKqToanNganhService.getById(param.id).subscribe(res => {
        this.data = res;
      })
    })
  }

  closeChiTietBCTongHopNganh() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tonghop-nganh']);
  }
}
