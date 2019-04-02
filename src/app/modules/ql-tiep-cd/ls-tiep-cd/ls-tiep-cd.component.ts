import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from './../../../constants/index';
import { TimeBuilderService } from './../../../services/helper/time-builder.service';
import { StatesService } from './../../../services/api/state.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { NoiDmphanloainoidungService } from '../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
import { IHistoryTiepCD } from '../../../services/api/noi-tiepcongdan/history-tiep-cong-dan.interface';
import { NoiTiepcongdanService } from '../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';
import { AuthService } from '../../../auth/auth.service';
import { Pagging } from '../../../shared/models/pagging.model';
import { NoiDmbhxhService } from '../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';

@Component({
  selector: 'ttkt-ls-tiep-cd',
  templateUrl: './ls-tiep-cd.component.html',
  styleUrls: ['./ls-tiep-cd.component.scss']
})
export class LsTiepCdComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective = false;
  searchForm: FormGroup;
  lichsuTiepCDForm: FormGroup;
  dslichsu: any[] = [];
  loaiNoidung: any[] = [];
  trang_thais: any[] = ['Từ chối', 'Giải quyết'];
  account: any = {};
  pager: any = {};
  pagging: Pagging = new Pagging();
  data: IHistoryTiepCD = {};

  listCoQuan = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noiTiepcongdanService: NoiTiepcongdanService,
    private noiDmphanloainoidungService: NoiDmphanloainoidungService,
    private timeBuilder: TimeBuilderService,
    private dmBhxhService: NoiDmbhxhService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.account = this.auth.currentUser;
    this.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.noiDmphanloainoidungService.getAllDmPhanloainoidung(0, 10)
    .subscribe((res: any) => {
      this.loaiNoidung = res.content;
    });

    if (this.auth.accountType == 'tw') {
      this.dmBhxhService.getDmBHXHBTinhAndTw().subscribe(res => {
        this.listCoQuan = res;
      });
    }

    this.lichsuTiepCDForm = this.fb.group({
      idNoiDung: [''],
      fromDate: [''],
      toDate: [''],
      hoten: [''],
      coQuan: [this.auth.currentUser.donViId]
    });

    this.lichsuTiepCDForm.get('coQuan').valueChanges.subscribe(value => {
      this.search();
    });
    this.search();
  }

  currentPage;
  pageChanged(event) {
    // this.pagging.currentPage = event.page - 1;
      this.currentPage = event.page - 1;
      this.search();
  }

  mapDataService (value) {
  if (value !== undefined && value !== null) {
    this.data.dmBHXHId = value.dmBHXHId;
    this.data.fromDate = value.fromDate || '';
    this.data.toDate = value.toDate ? value.toDate : '' ;
    this.data.hoten = value.hoten ? value.hoten : '';
    this.data.idNoiDung = value.idNoiDung ? value.idNoiDung : '';
    this.data.page = value.page;
    this.data.size = value.size;
  }

}
  search(resetPage: boolean = false) {
    if (resetPage) {
        this.currentPage = 0;
    }
    const formValue = this.lichsuTiepCDForm.value;
    const formBody: any = {};
    const from = this.timeBuilder.fromTimeDatePicker(formValue.fromDate).setUTC().toISOString();
    const to = this.timeBuilder.fromTimeDatePicker(formValue.toDate).setUTC().toISOString();
    // console.log(formValue);
    if (formValue.idNoiDung !== '0') {
      formBody.idNoiDung = formValue.idNoiDung;
    }
    formBody.fromDate = from;
    formBody.toDate = to;
    formBody.hoten = formValue.hoten;
    formBody.page = this.currentPage;
    formBody.size = this.pagging.itemsPerPage;

    if (this.auth.accountType == 'tw') {
      formBody.dmBHXHId = this.lichsuTiepCDForm.get('coQuan').value;
    } else {
      formBody.dmBHXHId = this.account.donViId;
    }
    console.log(formBody);
    this.mapDataService(formBody);
    this.noiTiepcongdanService.searchHistoryTiepCongDan(this.data).subscribe(res => {
      this.dslichsu = [];
      this.dslichsu = res.content;
      this.pagging.totalItems = res.totalElements;
      this.pagging.currentPage = this.currentPage;
    }, err => {
      console.log('Errors: ' + err);
    });
  }

  goToChiTietLichsu(id) {
    this.router.navigate(['/ql-tiep-cd/ls-tiep-cd/chi-tiet/', id]);
  }

}
