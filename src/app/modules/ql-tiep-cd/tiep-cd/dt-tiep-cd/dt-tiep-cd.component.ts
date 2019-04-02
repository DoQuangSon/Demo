import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagging } from '../../../../shared/models/pagging.model';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { NoiDonthuService } from '../../../../services/api/noi-donthu/noi-donthu.service';
import { NoiTiepcongdanService } from '../../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';
import { DialogDieuChinhComponent } from './dialog-dieu-chinh/dialog-dieu-chinh.component';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-dt-tiep-cd',
  templateUrl: './dt-tiep-cd.component.html',
  styleUrls: ['./dt-tiep-cd.component.scss']
})
export class DtTiepCdComponent implements OnInit {
  pagging: Pagging = new Pagging();
  dslichsu: Array<any> = [];
  currentItem: any;
  @Input() editAble?: boolean = true;
  phanloai: string;
  dmBHXHid: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private noiTiepCongDanService: NoiTiepcongdanService,
    private donThuService: NoiDonthuService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
      this.currentPage = 0;
      this.pagging.itemsPerPage = 10;
      this.getLichSu();
  }
  getLichSu() {
    const page = this.currentPage;
    const size = this.pagging.itemsPerPage;
    this.dmBHXHid = Number(this.auth.currentUser.donViId);
    this.donThuService.getDonThuDieuChinhByDmbhxhId(this.dmBHXHid, page, size).subscribe( res => {
        this.dslichsu = [];
        this.dslichsu = res.content;
        this.pagging.totalItems = res.totalElements;
        this.pagging.currentPage = this.currentPage;
    });
  }

  currentPage;
  pageChanged(event) {
      this.currentPage = event.page - 1;
      this.getLichSu();
  }
  onClickDieuChinh(item: any) {
    // open dialog
    // after close -> load ls
    // console.log(item);
    const dcDialog = this.modalService.show(DialogDieuChinhComponent, {
      class: 'modal-lg'
    });
    dcDialog.content.currentItem = item;
    this.modalService.onHide.subscribe(value => {
      // reload data
      if (value) {
        this.getLichSu();
      }
    });
  }

  goToNoiDungTiepDan(item: any) {
    this.router.navigate(['/ql-tiep-cd/ls-tiep-cd/chi-tiet/' + item.tiepCongDanId]);
  }
}
