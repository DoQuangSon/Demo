import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ql-donvi-ttkt',
  templateUrl: './ql-donvi-ttkt.component.html',
  styleUrls: ['./ql-donvi-ttkt.component.scss'],
})
export class QLDonViTTKTTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';
  public id: any;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.id = this.auth.currentUser.dmTinhHuyenId;
    console.log(this.id);
  }

}
