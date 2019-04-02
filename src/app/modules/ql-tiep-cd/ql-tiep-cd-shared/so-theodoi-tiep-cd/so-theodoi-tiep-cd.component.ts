import { Component, OnInit, Input } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoiSoTheoDoiTiepCdService } from '../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theo-doi-tiep-cd/noi-so-theo-doi-tiep-cd.service';

@Component({
  selector: 'ttkt-so-theodoi-tiep-cd',
  templateUrl: './so-theodoi-tiep-cd.component.html',
  styleUrls: ['./so-theodoi-tiep-cd.component.scss']
})
export class SoTheodoiTiepCdComponent implements OnInit {
  @Input() typeAccount: string;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  public dt: Date = new Date();
  soTheoDoiForm: FormGroup;
  dsSoTD: any[] = [];
  selectYear: any;
  ngayTao: Date = new Date();
  isCollapseDirective: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private soTheoDoiTiepCdService: NoiSoTheoDoiTiepCdService
  ) { }

  ngOnInit() {
    this.soTheoDoiForm = this.fb.group({
      nam: [(new Date).getFullYear()],
      fromYear: [this.ngayTao.getFullYear()],
      fromMonth: [(this.ngayTao.getMonth() + 1)]
    });
    this.getListSoTDTiepCd();
  }

  getListSoTDTiepCd() {
    this.selectYear = this.soTheoDoiForm.controls.nam.value;
    this.soTheoDoiTiepCdService.listSoTheoDoiTiepCd(this.selectYear).subscribe(res => {
      this.dsSoTD = res.content.map(r => ({
        ...r,
        ngayTao: new Date(parseInt(`${r.ngayTao}`.substr(0, 4)), parseInt(`${r.ngayTao}`.substr(4)) - 1, 1)
      }));
    }, err => {
      console.log('Errors: ' + err);
    });
  }
  changeYear(event: any) {
    this.getListSoTDTiepCd();
  }

  goToChiTietSoSach(id) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiep-cd/chitiet/', id]);
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiep-cd/chitiet/', id]);
    }
  }
  xemChiTietLive() {
    const fromDate = (new Date(this.soTheoDoiForm.value.fromYear, this.soTheoDoiForm.value.fromMonth - 1, 1)).toISOString();
    if (this.typeAccount == 'TINH') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiep-cd/chitiet/live'], { queryParams: { fromDate: fromDate}});
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiep-cd/chitiet/live'], { queryParams: { fromDate: fromDate}});
    }
  }

}
