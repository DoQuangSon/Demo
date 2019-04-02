import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-ds-donvi-ql',
  templateUrl: './chitiet-ds-donvi-ql.component.html',
  styleUrls: ['./chitiet-ds-donvi-ql.component.scss']
})
export class ChitietDsDonviQlComponent implements OnInit {
  public id: number;
  public typeAccount: string = 'TW';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });
  }
}
