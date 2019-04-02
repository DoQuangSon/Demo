import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ds-donvi-ql',
  templateUrl: './ds-donvi-ql.component.html',
  styleUrls: ['./ds-donvi-ql.component.scss']
})
export class DsDonviQlComponent implements OnInit {
  public id: any;
  // tslint:disable-next-line:no-inferrable-types
  public statusActive: string = 'KH_TTKT';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.id = this.auth.currentUser.id;
  }
}


