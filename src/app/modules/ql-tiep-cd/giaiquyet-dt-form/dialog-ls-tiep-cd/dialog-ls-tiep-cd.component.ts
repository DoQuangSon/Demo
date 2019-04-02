import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Pagging } from '../../../../shared/models/pagging.model';
import { NoiDonthuService } from '../../../../services/api/noi-donthu/noi-donthu.service';
import { NoiTiepcongdanService } from '../../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';

@Component({
  selector: 'ttkt-dialog-ls-tiep-cd',
  templateUrl: './dialog-ls-tiep-cd.component.html',
  styleUrls: ['./dialog-ls-tiep-cd.component.scss']
})
export class DialogLSTiepCDComponent implements OnInit {

  pagging: Pagging = new Pagging();
  dslichsu: Array<any> = [];
  currentItem: any;

  constructor(
    public bsModalRef: BsModalRef,
    private noiTiepCongDanService: NoiTiepcongdanService,
    private noiDonThuService: NoiDonthuService
  ) {}

  ngOnInit() {
    // tshis.list.push('PROFIT!!!');
    this.pagging.itemsPerPage = 5;
    this.getLichSu();
  }

  getLichSu() {
    // this.noiTiepCongDanService.getTiepCongDanDonThu(true, this.pagging).subscribe( res => {
    //   // console.log(res);
    //   this.dslichsu = res.content;
    //   this.pagging.totalItems = res.totalElements;
    // });

    this.noiDonThuService.getDonThuChuaGiaiQuyet({}, this.pagging.currentPage - 1, this.pagging.itemsPerPage).subscribe( res => {
      this.dslichsu = res.content;
      // console.log(this.dslichsu);
      this.pagging.totalItems = res.totalElements;
    });
  }

  pageChanged(event) {
    console.log(event);
    this.pagging.currentPage = event.page;
    this.getLichSu();
  }

  onClickCheck(item, event) {
    this.currentItem = item;
    // console.log(this.currentItem);

    this.bsModalRef.hide();
  }
}
