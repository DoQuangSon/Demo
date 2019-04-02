import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { NoiDonthuService } from '../../../../services/api/noi-donthu/noi-donthu.service';
import { NoiDtkhieunaiService } from '../../../../services/api/noi-dtkhieunai/noi-dtkhieunai.service';
import { NoiDtTocaoService } from '../../../../services/api/noi-dtTocao/noi-dt-tocao.service';
import { NoiKiennghiPaService } from '../../../../services/api/noi-dtKiennghiPA/noi-kiennghi-pa.service';
import { TIEPCD } from '../../../../constants/config.constant';

@Component({
  selector: 'ttkt-chitiet-dt',
  templateUrl: './chitiet-dt.component.html',
  styleUrls: ['./chitiet-dt.component.scss']
})
export class ChitietDtComponent implements OnInit {

  constructor(
    private noiDonthuService: NoiDonthuService,
    private noiDtkhieunaiService: NoiDtkhieunaiService,
    private noiDtTocaoService: NoiDtTocaoService,
    private route: ActivatedRoute,
    // private config: ConfigService,
    private noiKiennghiPaService: NoiKiennghiPaService,
    private routerAngular: Router,
  ) { }
  public source: Subject<boolean> = new Subject<boolean>();
  public editAble: boolean = true;
  private data: any = {};
  private router: any;
  private id: number;
  private PHAN_LOAI_DON_THU: any[];
  ngOnInit() {
    this.PHAN_LOAI_DON_THU = this.convertArrayKeys(TIEPCD.PHAN_LOAI_DON_THU, 'key', 'id');
    this.router = this.route.params.subscribe(params => {
      this.id = + params['id'];
      this.getDonthuById( this.id );
    });
  }
  convertArrayKeys(arr: any[], key, value ) {
    const _result: any[] = [];
    arr.forEach(el => {
      if (typeof el[key] !== 'undefined' && typeof el[value] !== 'undefined') {
        _result[el[key]] = el[value];
      }
    });
    return _result;
  }
  getDonthuById(id) {
    this.noiDonthuService.getByID({id})
      .subscribe( res => {
        this.data.main = res;
        // this.source.next( this.data );
        switch (res.phanLoaiNoiDungId) {
          case (this.PHAN_LOAI_DON_THU['khieu_nai']): {
            this.getDtKhieuNai(id);
            break;
          }
          case (this.PHAN_LOAI_DON_THU['to_cao_dt']):
          case (this.PHAN_LOAI_DON_THU['to_cao_dv']): {
            this.getDtToCao(id);
            break;
          }
          case (this.PHAN_LOAI_DON_THU['kien_nghi_phan_anh']): {
            this.getDtKienNghiPhanAnh(id);
            break;
          }
          default: {
            break;
          }
        }
      });
  }
  getDtKhieuNai(id: number) {
    this.noiDtkhieunaiService.getDtKhieuNaiById({id})
    .subscribe( res => {
      this.data.detail = res;
      if (res.status === 1) {
        this.editAble = true;
      } else if (res.status === 2) {
        this.editAble = false;
      }
      this.source.next( this.data );
      });
  }
  getDtToCao(id: number) {
    this.noiDtTocaoService.getDtToCaoById({id})
    .subscribe( res => {
      this.data.detail = res;
      if (res.status === 1) {
        this.editAble = true;
      } else if (res.status === 2) {
        this.editAble = false;
      }
      this.source.next( this.data );
      });
  }
  getDtKienNghiPhanAnh(id: number) {
    this.noiKiennghiPaService.getDtKienNghiPAPAById({id})
    .subscribe( res => {
      this.data.detail = res;
      if (res.status === 1) {
        this.editAble = true;
      } else if (res.status === 2) {
        this.editAble = false;
      }
      this.source.next( this.data );
      });
  }

  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/gq-kt/danh-sach-don-thu']);
  }
}
