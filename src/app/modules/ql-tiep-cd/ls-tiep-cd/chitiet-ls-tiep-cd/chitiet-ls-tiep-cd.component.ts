// import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { NoiTiepcongdanService } from '../../../../services/api//noi-tiepcongdan/noi-tiepcongdan.service';

@Component({
  selector: 'ttkt-chitiet-ls-tiep-cd',
  templateUrl: './chitiet-ls-tiep-cd.component.html',
  styleUrls: ['./chitiet-ls-tiep-cd.component.scss']
})
export class ChitietLsTiepCdComponent implements OnInit {

  // chitietLsTiepCdForm: FormGroup;

  public data: Subject<any> = new Subject<any>();
  private router: any;
  private id: number;
  constructor(
    // private fb: FormBuilder,
    private noiTiepcongdanService: NoiTiepcongdanService,
    private route: ActivatedRoute,
    private routerAngular: Router,
  ) { }

  ngOnInit() {
    this.router = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.noiTiepcongdanService.getDetailHistoryTiepCd(this.id)
      .subscribe(res => {
        this.data.next(res);
      }, err => {

      });
  }

  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/ls-tiep-cd/']);
  }
}
