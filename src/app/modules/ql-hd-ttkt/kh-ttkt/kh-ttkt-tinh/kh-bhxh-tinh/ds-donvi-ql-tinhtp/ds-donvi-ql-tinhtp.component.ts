import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ds-donvi-ql-tinhtp',
  templateUrl: './ds-donvi-ql-tinhtp.component.html',
  styleUrls: ['./ds-donvi-ql-tinhtp.component.scss']
})
export class DsDonviQlTinhtpComponent implements OnInit {
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
