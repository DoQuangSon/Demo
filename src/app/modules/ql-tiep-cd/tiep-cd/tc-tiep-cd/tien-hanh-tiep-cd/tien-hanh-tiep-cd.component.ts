import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ttkt-tien-hanh-tiep-cd',
  templateUrl: './tien-hanh-tiep-cd.component.html',
  styleUrls: ['./tien-hanh-tiep-cd.component.scss'],
})
export class TienHanhTiepCdComponent implements OnInit {

  constructor(
    private routerAngular: Router,
  ) { }

  ngOnInit() {
  }
  onClose() {
    this.routerAngular.navigate(['ql-tiep-cd/tiep-cd/tiep-cong-dan/']);
  }
}
