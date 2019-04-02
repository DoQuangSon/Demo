import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoiSoTonghopKqService } from '../../../../services/api/noi-ql-baocao-ttkt/noi-so-tonghop-kq/noi-so-tonghop-kq.service';
import { AlertService } from '../../../../services/api/alert.service';
import { Pagging } from '../../../../shared/models/pagging.model';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-bao-cao-tong-hop',
  templateUrl: './bao-cao-tong-hop.component.html',
  styleUrls: ['./bao-cao-tong-hop.component.scss']
})
export class BaoCaoTongHopComponent implements OnInit {
  tongHopKqForm: FormGroup;
  dsBaoCaoTonghop: Array<any>;
  paging: Pagging = new Pagging();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private baoCao: NoiSoTonghopKqService,
    private alert: AlertService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.tongHopKqForm = this.fb.group({
      nam: [new Date().getFullYear()]
    });
    this.searchBaoCao();
  }

  searchBaoCao(isReset?: boolean) {
    if (isReset) {
      this.paging.currentPage = 1;
    }
    this.baoCao.getBCTH(this.tongHopKqForm.value.nam, this.paging.currentPage - 1, this.paging.itemsPerPage).subscribe(req => {
      this.dsBaoCaoTonghop = req.content;
      this.paging.totalItems = req.totalElements;
    });
  }

  chuyenBaoCaoTongHop(id: any) {
    this.baoCao.chuyenBaoCaoTongHop(id).subscribe(res => {
      this.alert.success('Chuyển thành công');
      this.searchBaoCao(true);
    });
  }

  chiTietBCTongHopTw(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop/chitiet', index]);
  }

  taoMoiBCTongHopTw() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop/taomoi']);
  }

  pageChanged(event) {
    this.paging.currentPage = event.page;
    this.searchBaoCao();
  }

    printMau01(id, type) {
      this.baoCao.printMauBaoCao01(id, type);
    }
}
