import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';
@Component({
  selector: 'ttkt-so-theodoi-tiepnhan-form',
  templateUrl: './so-theodoi-tiepnhan-form.component.html',
  styleUrls: ['./so-theodoi-tiepnhan-form.component.scss']
})
export class SoTheodoiTiepnhanFormComponent implements OnInit {
  @Input() typeAccount: string;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  public dt: Date = new Date();
  // public minDate: Date = void 0;
  // public dateDisabled: { date: Date, mode: string }[];
  // now: Date = new Date();
  soTheoDoiForm: FormGroup;
  thongTinSoDTOList = [];
  account: any = {};
  isSearching: boolean = false;
  dsSoTD: any[] = [];
  // dsSoBaoCao = [];
  selectYear: any;
  public ngayTao: Date = new Date();
  isCollapseDirective: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private timeBuilder: TimeBuilderService,
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private helper: UtilsService,
  ) { }

  ngOnInit() {
    let now = new Date();
    // let date = new Date(now.getFullYear(), now.getMonth(), 1);

    this.soTheoDoiForm = this.fb.group({
      nam: [(new Date).getFullYear()],
      fromYear: [now.getFullYear()],
      fromMonth: [(now.getMonth() + 1)]
    });
    this.getListSoTDTN();
  }

  xemChiTietLive() {
    let fromDate = (new Date(this.soTheoDoiForm.value.fromYear, this.soTheoDoiForm.value.fromMonth -1 , 1)).toISOString();
    if (this.typeAccount == 'TINH') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiepnhan/chitiet/live'], { queryParams: { fromDate: fromDate}});
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/chitiet/live'], { queryParams: { fromDate: fromDate}});
    }
  }

  getListSoTDTN() {
    this.selectYear = this.soTheoDoiForm.controls.nam.value;
    this.noiSoTheoDoiTiepNhanService.listSoTheoDoi(this.selectYear).subscribe(res => {
      this.dsSoTD = res.content.map(r => ({
        ...r,
        ngayTao: new Date(parseInt(`${r.ngayTao}`.substr(0, 4)), parseInt(`${r.ngayTao}`.substr(4)) - 1, 1)
      }));
    }, err => {
      console.log('Errors: ' + err);
    });
  }
  changeYear(event: any) {
    this.getListSoTDTN();
  }
  taoMoiSoTiepNhan() {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/taomoi']);
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiepnhan/taomoi']);
    }
  }

  chiTietSoTiepNhan(index) {
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/chitiet', index]);
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiepnhan/chitiet', index]);
    }
  }
  goToChiTietSoSach(id) {
    this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/chitiet/', id]);
    if (this.typeAccount === 'TW') {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan/chitiet/', id]);
    } else {
      this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiepnhan/chitiet/', id]);
    }
  }

    printPDF(item, type) {
        const year = item.ngayTao.getFullYear();
        const month = item.ngayTao.getMonth() + 1;
        this.noiSoTheoDoiTiepNhanService.printMauBaoCao28(year, month, type, false);
    }
}
