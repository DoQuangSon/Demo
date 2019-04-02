import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { Subject } from 'rxjs/Subject';
import { AlertService } from '../../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-chitiet-bc-tonghop',
  templateUrl: './chitiet-bc-tonghop.component.html',
  styleUrls: ['./chitiet-bc-tonghop.component.scss']
})
export class ChitietBcTonghopComponent implements OnInit {
  public data: Subject<any> = new Subject<any>();
  private router: any;
  private id: number;
  so29bList: Array<any> = [];
  so29aList: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private routerAngular: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.router = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.noiSoTheoDoiTiepNhanService.chitietBaoCaoTH(this.id)
      .subscribe(res => {
        this.data.next(res);
        console.log(res);
        this.so29aList = res.so29aList;
        this.so29bList = res.so29bList;
      }, err => {

      });
  }
  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq/']);
  }

  getSum(parentKey, countKey?: any) : number {
    if (this.so29bList == null) {
      return 0;
    }
    var sum = this.so29bList.reduce((currentSum, value) => {
      if (countKey) {
        return currentSum + value[parentKey][countKey];
      }
      return currentSum + value[parentKey]; 
    }, 0);
    return sum;
  }

  getTotalBC(parentKey, countKey) : number {
    var sum = this.so29aList.reduce((currentSum, value) => {
        return currentSum + value[parentKey][countKey];
    }, 0);
    return sum;
  }
  guiTinh() {
    this.noiSoTheoDoiTiepNhanService.guiBaoCaoTinh(this.id).subscribe( response => {
      this.alertService.success(response);
    }, err => {
      this.alertService.error(err);
    })
  }
}
