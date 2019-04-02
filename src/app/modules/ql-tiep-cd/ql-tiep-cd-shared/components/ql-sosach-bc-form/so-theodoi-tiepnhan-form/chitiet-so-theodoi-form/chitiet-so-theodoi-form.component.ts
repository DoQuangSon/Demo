import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ttkt-chitiet-so-theodoi-form',
  templateUrl: './chitiet-so-theodoi-form.component.html',
  styleUrls: ['./chitiet-so-theodoi-form.component.scss']
})
export class ChitietSoTheodoiFormComponent implements OnInit {
  @Input() typeAccount: string;
  @Input() isLive: boolean = false;
  @Input() 
  set dataSotn(data: any) {
    if (data) {
      this.handleAfterGetData(data);
    }
  }

  public data: Subject<any> = new Subject<any>();
  private router: any;
  private id: number;
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
  tcCbDaGQ: any;
  tcDtDaGQ: any;
  tcCbTrongKy: any;
  tcDtTrongKy: any;
  constructor(
    private route: ActivatedRoute,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private routerAngular: Router,
  ) { }

  ngOnInit() {
    if (!this.isLive) {
      this.router = this.route.params.subscribe(params => {
        this.id = + params['id'];
        this.noiSoTheoDoiTiepNhanService.chitietSoTheoDoi(this.id)
        .subscribe(res => {
          this.handleAfterGetData(res);
        });
      });
    }
  }

  handleAfterGetData(res: any) {
    this.data.next(res);
    console.log(res);
    this.thongTinSoDTOList = res.thongTinSoDTOList;
    this.kyTruocChuyenSang = res.kyTruocChuyenSang;
    this.tongSoDonDaGiaiQuyet = res.tongSoDonDaGiaiQuyet;
    this.tiepNhanTrongKy = res.tiepNhanTrongKy;
    this.khieuNaiDaGQ = res.khieuNaiDaGQ;
    this.khieuNaiTrongKy = res.khieuNaiTrongKy;
    this.toCaoDaGQ = res.toCaoDaGQ;
    this.tcCbDaGQ = res.tcCbDaGQ;
    this.tcDtDaGQ = res.tcDtDaGQ;
    this.toCaoTrongKy = res.toCaoTrongKy;
    this.tcCbTrongKy = res.tcCbTrongKy;
    this.tcDtTrongKy = res.tcDtTrongKy;
    this.kienNghiDaGQ = res.kienNghiDaGQ;
    this.kienNghiTrongKy = res.kienNghiTrongKy;
  }
  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/']);
  }
    printMau28(type) {
        const time = this.thongTinSoDTOList[0] ? this.thongTinSoDTOList[0].ngayNhan : null;
        if (time !== null) {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            this.noiSoTheoDoiTiepNhanService.printMauBaoCao28(year, month, type, true);
        }
    }
}
