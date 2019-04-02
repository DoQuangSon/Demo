import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
@Component({
  selector: 'ttkt-bc-tonghop-kq-form',
  templateUrl: './bc-tonghop-kq-form.component.html',
  styleUrls: ['./bc-tonghop-kq-form.component.scss']
})
export class BcTonghopKqFormComponent implements OnInit {
  @Input() typeAccount: string;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  tongHopKqForm: FormGroup;
  dsSoBC: any[] = [];
  selectYear: any;
  isEnable = true;
  isCollapseDirective = false;
  public ngayTao: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private helper: UtilsService,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
  ) { }

  ngOnInit() {
    this.tongHopKqForm = this.fb.group({
      nam: [new Date().getFullYear()],
      fromYear: [new Date().getFullYear()],
      fromMonth: [new Date().getMonth() + 1]
    });
    this.getlistBCTH();
  }

  getlistBCTH () {
    this.selectYear = this.tongHopKqForm.controls.nam.value;
    this.noiSoTheoDoiTiepNhanService.listBaoCaoTH(this.selectYear).subscribe(res => {
      this.dsSoBC = res;
    }, err => {
      console.log('Errors: ' + err);
    });
  }
  changeYear(event: any) {
    this.getlistBCTH();
  }
  goToChiTietBaoCao(item) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq/chitiet/', item.id, item.namKeHoach, item.thangKeHoach ]);
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-tonghop-kq/chitiet/', item.id, item.namKeHoach, item.thangKeHoach, item.daGuiTinh ? true : false ]);
    }
  }

    printMau29(item, type): void {
        let month = -1;
        if (item !== null && item !== undefined) {
            month = item.thangKeHoach;
        }
        const year = this.tongHopKqForm.value.nam;
        this.noiSoTheoDoiTiepNhanService.printMau29(year, -1, month, type, false);

    // if (this.tongHopKqForm.value.option === 1) {
    //   const quarter = this.tongHopKqForm.value.quy;
    //   if (year !== undefined && year !== '' && quarter !== undefined && quarter !== '') {
    //     this.noiSoTheoDoiTiepNhanService.printMau29(year, quarter, -1);
    //   }
    // } else if (this.tongHopKqForm.value.option === 2) {
    //   const month = this.tongHopKqForm.value.thang;
    //   if (year !== undefined && year !== '' && month !== undefined && month !== '') {
    //     this.noiSoTheoDoiTiepNhanService.printMau29(year, -1, month);
    //   }
    // }
  }

  xemChiTietLive() {
    const fromDate = (new Date(this.tongHopKqForm.value.fromYear, this.tongHopKqForm.value.fromMonth - 1, 1)).toISOString();
    if (this.typeAccount == 'TINH') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-tonghop-kq/chitiet/live'], { queryParams: { fromDate: fromDate}});
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq/chitiet/live'], { queryParams: { fromDate: fromDate}});
    }
  }
}
