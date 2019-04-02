import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BcKquaToanNganhService } from '../../../../../../services/api/noi-tiepcongdan/bc-kqua-toan-nganh.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {NoiSoTheodoiTiepnhanService} from '../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';

@Component({
  selector: 'ttkt-chitiet-bckq-toannganh',
  templateUrl: './chitiet-bckq-toannganh.component.html',
  styleUrls: ['./chitiet-bckq-toannganh.component.scss']
})
export class ChitietBckqToannganhComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataGiaiQuyetDT: any[] = [];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private bcKetQuaService: BcKquaToanNganhService,
    private soTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
  ) { }

  ngOnInit() {
    this.getChiTietBaoCao();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getChiTietBaoCao() {
    this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(param => {
      if (param['id']) {
        this.bcKetQuaService.getBaoCaoTheoDvi(param['id']).subscribe(res => {
          this.dataGiaiQuyetDT = res.content;
        });
      }
    });
  }

  closeChiTietBCToanNganh() {
    this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/bc-ketqua-toannganh']);
  }
  chiTietBaoCaoTheoDV(index) {
    // this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq/chitiet/', index]);
      let dmbhxhID = 1;
      this.activeRoute.params.subscribe(res => dmbhxhID = res.id);
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/bc-ketqua-toannganh/chitiet/' + dmbhxhID + '/', index]);
  }

    printMau29(item, type) {
        this.soTheoDoiTiepNhanService.printMau29(item.namKeHoach, -1, item.thangKeHoach, type, false, item.dmbhxhId);
    }
}
