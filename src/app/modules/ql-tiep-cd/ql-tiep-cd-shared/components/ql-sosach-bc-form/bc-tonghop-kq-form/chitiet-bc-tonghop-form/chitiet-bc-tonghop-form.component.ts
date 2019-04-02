import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { Subject } from 'rxjs/Subject';
import { AlertService } from '../../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-chitiet-bc-tonghop-form',
  templateUrl: './chitiet-bc-tonghop-form.component.html',
  styleUrls: ['./chitiet-bc-tonghop-form.component.scss']
})
export class ChitietBcTonghopFormComponent implements OnInit {
  @Input() typeAccount: string;
  @Input() isLive = false;
  @Input()
  set dataSoths(data: any) {
    if (data) {
      this.handleAfterGetData(data);
    }
  }

  public data: Subject<any> = new Subject<any>();
  private router: any;
  private id: number;
  so29bList: Array<any> = [];
  so29aList: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private routerAngular: Router,
  ) { }

  ngOnInit() {
    if (!this.isLive) {
      this.router = this.route.params.subscribe(params => {
        this.id = + params['id'];
      });
      this.noiSoTheoDoiTiepNhanService.chitietBaoCaoTH(this.id)
        .subscribe(res => {
          this.handleAfterGetData(res);
        });
    }
  }

  handleAfterGetData(res: any) {
    this.data.next(res);
    console.log(res);
    this.so29aList = res.so29aList;
    this.so29bList = res.so29bList;
  }
  onClose() {
    this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq/']);
  }
  getSum(parentKey, countKey?: any): number {
    if (this.so29bList == null) {
      return 0;
    }
    const sum = this.so29bList.reduce((currentSum, value) => {
      if (countKey) {
        return currentSum + value[parentKey][countKey];
      }
      return currentSum + value[parentKey];
    }, 0);
    return sum;
  }
  getTotalBC(parentKey, countKey): number {
    const sum = this.so29aList.reduce((currentSum, value) => {
        return currentSum + value[parentKey][countKey];
    }, 0);
    return sum;
  }

    printMau29(type): void {
      console.log(this.id);
        if (!this.isLive) {
            // let year = 0, month = 0;
            // this.route.params.subscribe(params => {
            //     year = params.year;
            //     month = params.month;
            // });
            // this.noiSoTheoDoiTiepNhanService.printMau29(year, -1, month, type, true);
            const data = { so29aList: [], so29bList: []};
            data.so29aList = this.so29aList;
            data.so29bList = this.so29bList;
            this.noiSoTheoDoiTiepNhanService.printMau29_Cach2(this.id, data, type);
        } else {
            let fromDate: Date = null;
            this.route.queryParams.subscribe(params => fromDate = new Date(params.fromDate));
            if (fromDate !== null) {
                this.noiSoTheoDoiTiepNhanService.printMau29(fromDate.getFullYear(), -1, fromDate.getMonth() + 1, type, true);
            }
        }
    }

}
