import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../auth/auth.service';


@Component({
  selector: 'ttkt-ds-donvi-ql-tinh',
  templateUrl: './ds-donvi-ql-tinh.component.html',
  styleUrls: ['./ds-donvi-ql-tinh.component.scss']
})
export class DsDonviQlTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';
  public statusActive: string = 'KH_TTKT';
  public id: any;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.id = this.auth.currentUser.id;
    // console.log(this.id);
  }

}
