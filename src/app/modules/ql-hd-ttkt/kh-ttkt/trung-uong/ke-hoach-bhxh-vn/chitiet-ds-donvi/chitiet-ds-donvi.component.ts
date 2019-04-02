import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-ds-donvi',
  templateUrl: './chitiet-ds-donvi.component.html',
  styleUrls: ['./chitiet-ds-donvi.component.scss']
})
export class ChitietDsDonviComponent implements OnInit {
  public id: number;
  // tslint:disable-next-line:no-inferrable-types
  public typeAccount: string = 'TW';
  // tslint:disable-next-line:no-inferrable-types
  public statusActive: string = 'KH_TTKT';
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });
  }

}

