import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheodoiTiepnhanService } from '../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { AuthService } from '../../../../auth/auth.service';


@Component({
  selector: 'ttkt-chitiet-so-theodoi-tiepnhan-live',
  templateUrl: './chitiet-so-theodoi-tiepnhan-live.component.html',
  styleUrls: ['./chitiet-so-theodoi-tiepnhan-live.component.scss']
})
export class ChitietSoTheodoiTiepnhanLiveComponent implements OnInit {
  public typeAccount: string;
  data: any;
  searchForm: FormGroup;

  constructor(
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: ActivatedRoute,
    private route: Router
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
      this.noiSoTheoDoiTiepNhanService.chitietSoTheoDoiByFromAndDmbhxh({
        fromDate:  params['fromDate'],
        dmbhxhId: this.auth.currentUser.donViId
      }).subscribe(res => {
        this.data = res;
      })
    });
    // this.search();
  }

  // search() {
  //   console.log(this.searchForm.value);
  //   this.noiSoTheoDoiTiepNhanService.chitietSoTheoDoiByFromAndDmbhxh(this.searchForm.value).subscribe(res => {
  //     this.data = res;
  //   })
  // }
}
