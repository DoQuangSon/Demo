import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NoiSoTheodoiTiepnhanService } from '../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { AuthService } from '../../../../auth/auth.service';
@Component({
  selector: 'ttkt-chitiet-bc-tonghop-kq-live',
  templateUrl: './chitiet-bc-tonghop-kq-live.component.html',
  styleUrls: ['./chitiet-bc-tonghop-kq-live.component.scss']
})
export class ChitietBcTonghopKqLiveComponent implements OnInit {
  typeAccount: string;
  data: any;
  searchForm: FormGroup;
  constructor(private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService, 
    private fb: FormBuilder, 
    public auth: AuthService, 
    private router: ActivatedRoute) { }
  ngOnInit() {
    // let now = new Date();
    // this.searchForm = this.fb.group({
    //   formDate: [(new Date(now.getFullYear(), now.getMonth(), 1))],
    //   dmbhxhId: [this.auth.currentUser.donViId]
    // })
    this.typeAccount = this.auth.accountType.toUpperCase();
    this.router.queryParams.subscribe(params => {
      this.noiSoTheoDoiTiepNhanService.chitietBaoCaoTHByFromAndDmbhxh({
        fromDate: params['fromDate'],
        dmbhxhId: this.auth.currentUser.donViId
      }).subscribe(res => {
        this.data = res;
      });
    });
    // this.search();
  }
}