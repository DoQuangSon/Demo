import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NoiBaoCaoTongHopService } from '../../../../../../../services/api/noi-ql-baocao-ttkt/noi-bao-cao-tong-hop/noi-bao-cao-tong-hop.service';

@Component({
  selector: 'ttkt-so-tonghop-kq-live',
  templateUrl: './so-tonghop-kq-live.component.html',
  styleUrls: ['./so-tonghop-kq-live.component.scss']
})
export class SoTonghopKqLiveComponent implements OnInit {
  public typeAccount: string;
  data: any;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: ActivatedRoute,
    private baoCaoTongHopService: NoiBaoCaoTongHopService,
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType.toUpperCase();

    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), 1);
    this.searchForm = this.fb.group({
      fromDate: [date.toISOString()]
    });
    this.router.queryParams.subscribe(params => {
      this.baoCaoTongHopService.searchDataLive({
        fromDate:  params['fromDate']
      }).subscribe(res => {
        this.data = res;
      });
    });
  }

}
