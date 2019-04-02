import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiBaoCaoTongHopService } from '../../../../../../services/api/noi-ql-baocao-ttkt/noi-bao-cao-tong-hop/noi-bao-cao-tong-hop.service';

@Component({
  selector: 'ttkt-detail-bckq-nganh',
  templateUrl: './detail-bckq-nganh.component.html',
  styleUrls: ['./detail-bckq-nganh.component.scss']
})
export class DetailBckqNganhComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('tuChoiModal') public tuChoiModal: ModalDirective;

  index: number;
  lyDoTuChoi: string;
  noiDungBaoCao: any = {};

  constructor(
    private router: Router,
    private alertService: AlertService,
    private routerActive: ActivatedRoute,
    private baoCao: NoiBaoCaoTongHopService,
  ) { }

  ngOnInit() {
    this.routerActive.params.subscribe(res => {
      this.baoCao.getBaoCaoTongHop(res.id).subscribe(req => {
        this.noiDungBaoCao = req;
      });
    });
  }

  duyetBC() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.duyetModal.hide();
    this.alertService.success('Đã duyệt báo cáo kết quả');
  }

  tuChoiBC() {
    this.tuChoiModal.show();
  }

  onSubmitTuChoi() {
    this.tuChoiModal.hide();
    this.alertService.success('Từ chối báo cáo kết quả');
  }

  closeChiTietBaoCao() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh']);
  }

    printExcel() {
      // excel type = 2
        this.baoCao.printSoBaoCaoTongHopToanNganh(this.noiDungBaoCao.id, this.noiDungBaoCao.ngayLap, 2);
    }

}
