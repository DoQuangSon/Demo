import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoiBaoCaoTongHopService } from '../../../../../services/api/noi-ql-baocao-ttkt/noi-bao-cao-tong-hop/noi-bao-cao-tong-hop.service';

@Component({
  selector: 'ttkt-chitiet-bao-cao-tong-hop-tw',
  templateUrl: './chitiet-bao-cao-tong-hop-tw.component.html',
  styleUrls: ['./chitiet-bao-cao-tong-hop-tw.component.scss']
})
export class ChitietBaoCaoTongHopTwComponent implements OnInit {
  noiDungBaoCao: any = {};
    data: any = {
    tenBaoCao: 'Báo cáo tổng hợp kết quả TTKT quý I năm 2017',
    soNumber: 'BC-23545',
    ngayLap: '10/01/2017',
  };

  constructor(
    private router: Router,
    private baoCao: NoiBaoCaoTongHopService,
    private routerActive: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerActive.params.subscribe(res => {
      this.baoCao.getBaoCaoTongHop(res.id).subscribe(req => {
        this.noiDungBaoCao = req;
      });
    });
  }

  closeChiTietBCTongHopTw() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop']);
  }

}
