import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ttkt-chitiet-so-theodoi-tiepnhan',
  templateUrl: './chitiet-so-theodoi-tiepnhan.component.html',
  styleUrls: ['./chitiet-so-theodoi-tiepnhan.component.scss']
})
export class ChitietSoTheodoiTiepnhanComponent implements OnInit {
  public data: Subject<any> = new Subject<any>();
  private router: any;
  private id: number;
  chiTietSoTheoDoiForm: FormGroup;
  thongTinSoDTOList: any[] = [];
  kyTruocChuyenSang: any;
  tongSoDonDaGiaiQuyet: any;
  tiepNhanTrongKy: any;
  khieuNaiDaGQ: any;
  khieuNaiTrongKy: any;
  toCaoDaGQ: any;
  toCaoTrongKy: any;
  kienNghiDaGQ: any;
  kienNghiTrongKy: any;
  constructor(
    private route: ActivatedRoute,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private routerAngular: Router,
  ) { }

  ngOnInit() {
    this.router = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.noiSoTheoDoiTiepNhanService.chitietSoTheoDoi(this.id)
      .subscribe(res => {
        this.data.next(res);
        console.log(res);
        this.thongTinSoDTOList = res.thongTinSoDTOList;
        this.kyTruocChuyenSang = res.kyTruocChuyenSang;
        this.tongSoDonDaGiaiQuyet = res.tongSoDonDaGiaiQuyet;
        this.tiepNhanTrongKy = res.tiepNhanTrongKy;
        this.khieuNaiDaGQ = res.khieuNaiDaGQ;
        this.khieuNaiTrongKy = res.khieuNaiTrongKy;
        this.toCaoDaGQ = res.toCaoDaGQ;
        this.toCaoTrongKy = res.toCaoTrongKy;
        this.kienNghiDaGQ = res.kienNghiDaGQ;
        this.kienNghiTrongKy = res.kienNghiTrongKy;
      }, err => {

      });
  }
  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/']);
  }

}
