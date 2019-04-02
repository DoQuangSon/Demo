import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NoiSoTheoDoiTiepCdService } from '../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theo-doi-tiep-cd/noi-so-theo-doi-tiep-cd.service';
import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chi-tiet-so-theodoi-tiep-cd-live',
  templateUrl: './chi-tiet-so-theodoi-tiep-cd-live.component.html',
  styleUrls: ['./chi-tiet-so-theodoi-tiep-cd-live.component.scss']
})
export class ChiTietSoTheodoiTiepCdLiveComponent implements OnInit {
  public typeAccount: string;
  searchForm: FormGroup;
  data: any;

  constructor(
    private soTheoDoiTiepCdService: NoiSoTheoDoiTiepCdService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType.toUpperCase();

    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), 1);
    this.searchForm = this.fb.group({
      fromDate: [date.toISOString()],
      dmbhxhId: [this.auth.currentUser.donViId]
    })

    this.router.queryParams.subscribe(params => {
      this.soTheoDoiTiepCdService.getLiveData({
        fromDate:  params['fromDate']
      }).subscribe(res => {
        this.data = res;
      })
    });
  }

}
