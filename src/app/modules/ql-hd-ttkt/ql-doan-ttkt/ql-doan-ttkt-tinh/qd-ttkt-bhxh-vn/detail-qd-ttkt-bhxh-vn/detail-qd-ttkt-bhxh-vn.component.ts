import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-detail-qd-ttkt-bhxh-vn',
  templateUrl: './detail-qd-ttkt-bhxh-vn.component.html',
  styleUrls: ['./detail-qd-ttkt-bhxh-vn.component.scss']
})
export class DetailQdTtktBhxhVnComponent implements OnInit {
  public typeAccount = 'TINH';
  public tldId: number;
  public quyetDinhTTKT: number;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.tldId = params.id;
      }
    });
  }

}
