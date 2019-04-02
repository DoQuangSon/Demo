import { Component, OnInit } from '@angular/core';
import { ACCOUNTTYPE } from '../../../../../../constants/giaiquyet-dt.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../auth/auth.service';
import { TtktModalService } from '../../../../../../shared/modal/ttkt-modal.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'ttkt-tao-moi-doan-ttkt-tw',
  templateUrl: './tao-moi-doan-ttkt-tw.component.html',
  styleUrls: ['./tao-moi-doan-ttkt-tw.component.scss']
})
export class TaoMoiDoanTtktTwComponent implements OnInit {
  public typeAccount;
  @ViewChild('tldForm') tldForm: any;

  constructor(
    private alertService: AlertService,
    private tlDoanService: ThanhLapDoanService,
    private router: Router,
    private auth: AuthService,
    private ttktModalService: TtktModalService
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType;
  }

  onSubmit() {
    const formBody = this.tldForm.submitForm();
    if (!formBody) {
      return;
    }

    console.log(formBody);
    this.ttktModalService.openConfirm('Tạo mới quyết định thành lập đoàn', 'Bạn có muốn lưu không?').subscribe(res => {
      if (res) {
        console.log(formBody);
        this.tlDoanService.ver2CreatThanhLapDoan(formBody).subscribe(res => {
          this.alertService.success('Lưu thành công!');
          if (this.typeAccount === ACCOUNTTYPE.trunguong) {
            this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', res.id]);
          } else {
            this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh/chi-tiet', res.id]);
          }
        });
      }
    });
  }
}
