import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { TRANG_THAI, DIEU_CHINH, LOAIHINHTTKT } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt--ke-hoach-cho-duyet',
  templateUrl: './ke-hoach-cho-duyet.component.html',
  styleUrls: ['./ke-hoach-cho-duyet.component.scss']
})
export class KeHoachChoDuyetComponent implements OnInit {
  @ViewChild('keHoachTable') keHoachTable;
  @ViewChild('printDocument') printDocument: ModalDirective;

  listKeHoach: any[] = [];
  trangThai: any[] = TRANG_THAI;
  dieuChinh: any[] = DIEU_CHINH;
  hinhThuc: any[] = LOAIHINHTTKT;
  myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  currentYear = (new Date()).getFullYear();
  dmbhxhid: any;

  constructor(
    private keHoachService: KeHoachToanNganhService,
    private noiAccountService: NoiAccountService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dmbhxhid = this.auth.currentUser.donViId;
    if (!this.dmbhxhid) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.dmbhxhid = res.dmTinhHuyenId;
        }, err => { });
    }
    this.listKeHoach = this.getListKeHoach();
  }

  inBaoCaoTongHop() {
    const jframe = document.getElementById('iframePrint');
    jframe.setAttribute('src', './../../../../../assets/print-document/BaoCao02.html');
    this.printDocument.show();
  }

  getListKeHoach() {
    this.keHoachService.getListKeHoachChoTWDuyet()
    .subscribe(res => {
      this.listKeHoach = res;
    }, err => { });
    return this.listKeHoach;
  }

  onSubmitPrintDocument() {

  }
}
