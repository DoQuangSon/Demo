
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeBuilderService, compareDate } from '../../../../services/helper/time-builder.service';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'ttkt-cauhinh-quy',
  templateUrl: './cauhinh-quy.component.html',
  styleUrls: ['./cauhinh-quy.component.scss']
})
export class CauHinhQuyComponent implements OnInit {
  @ViewChild('modalQuy') public modalQuy: ModalDirective;

  formQuy: FormGroup;
  indexSelected: number;
  errTuNgay: Boolean = false;
  errDenNgay: Boolean = false;
  errSoSanhNgay: Boolean = false;

  constructor(
    private builder: FormBuilder,
    private timeBuilder: TimeBuilderService
  ) { }

  QUY = [
    {
      'quy': 'Quý 1',
      'tungay': '01/01/2017',
      'denngay': '31/03/2017'
    },
    {
      'quy': 'Quý 2',
      'tungay': '01/04/2017',
      'denngay': '30/06/2017'
    },
    {
      'quy': 'Quý 3',
      'tungay': '01/07/2017',
      'denngay': '30/09/2017'
    },
    {
      'quy': 'Quý 4',
      'tungay': '01/10/2017',
      'denngay': '31/12/2017'
    },
  ];

  ngOnInit() {
    this.formQuy = this.builder.group({
      tungay_InForm: ['', Validators.required],
      denngay_InForm: ['', Validators.required],
    });
  }

  editQuy(index) {
    this.resetErrMessage();
    this.indexSelected = Number(index);
    const datefrom = this.QUY[Number(index)].tungay.split('/');
    const dateto = this.QUY[Number(index)].denngay.split('/');

    this.formQuy.patchValue({
      tungay_InForm: {
        date: {
          year: datefrom[2],
          month: datefrom[1] < String(10) ? datefrom[1][1] : datefrom[1],
          day: datefrom[0] < String(10) ? datefrom[0][1] : datefrom[0]
        }
      },
      denngay_InForm: {
        date: {
          year: dateto[2],
          month: dateto[1] < String(10) ? dateto[1][1] : dateto[1],
          day: dateto[0] < String(10) ? dateto[0][1] : dateto[0]
        }
      }
    });
    this.openModalQuy();
  }

  saveQuy() {
    if (this.checkErrFormQuy()) {
      if (!this.formQuy.value.tungay_InForm.formatted) {
      } else {
        this.QUY[this.indexSelected].tungay = this.formQuy.value.tungay_InForm.formatted;
      }
      if (!this.formQuy.value.denngay_InForm.formatted) {
      } else {
        this.QUY[this.indexSelected].denngay = this.formQuy.value.denngay_InForm.formatted;
      }
      this.closeModalQuy();
    }
  }

  checkErrFormQuy(_options?: any) {
    const defaultOptions = {
      checkten_InForm: true,
      checktungay_InForm: true,
      checkdenngay_InForm: true
    };
    const defaultOptionsFalse = { ...defaultOptions };
    // tslint:disable-next-line:forin
    for (const key in defaultOptionsFalse) {
      defaultOptionsFalse[key] = false;
    }
    let option: any = {};
    if (_options) {
      option = { ...defaultOptionsFalse, ..._options };
    } else {
      option = defaultOptions;
    }
    if (this.formQuy.value.tungay_InForm === null && option.checktungay_InForm) {
      this.errTuNgay = true;
      this.errSoSanhNgay = false;
      return false;
    } else {
      this.errTuNgay = false;
    }
    if (this.formQuy.value.denngay_InForm === null && option.checkdenngay_InForm) {
      this.errDenNgay = true;
      this.errSoSanhNgay = false;
      return false;
    } else {
      this.errDenNgay = false;
    }
    const batDau = new Date(this.timeBuilder.fromTimeDatePicker(this.formQuy.value.tungay_InForm).setUTC().toISOString());
    const ketThuc = new Date(this.timeBuilder.fromTimeDatePicker(this.formQuy.value.denngay_InForm).setUTC().toISOString());
    if (compareDate(batDau, ketThuc) <= 0) {
      this.errSoSanhNgay = true;
      this.errTuNgay = false;
      this.errDenNgay = false;
      return false;
    } else {
      this.errSoSanhNgay = false;
    }
    return true;
  }
  openModalQuy() {
    this.modalQuy.show();
  }

  closeModalQuy() {
    this.modalQuy.hide();
  }

  resetErrMessage() {
    this.errTuNgay = false;
    this.errDenNgay = false;
    this.errSoSanhNgay = false;
  }
}
