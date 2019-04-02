import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants/index';

@Component({
  selector: 'ttkt-baocao-kl-ttkt-tinh',
  templateUrl: './baocao-kl-ttkt-tinh.component.html',
  styleUrls: ['./baocao-kl-ttkt-tinh.component.scss']
})
export class BaocaoKlTtktTinhComponent implements OnInit {
  title: string = '';
  KetQuaTTKTForm: FormGroup;
  tenDoan: string = '';
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.KetQuaTTKTForm = this.fb.group({
      tenBaoCao: [''],
      soBaoCao: [''],
      denNgay: [''],
      tuNgay: [''],
      tenDoan: ['']
    });
    this.KetQuaTTKTForm.patchValue ({
      tenDoan: ['Đoàn TTKT Bộ Lao Động']
    });

    if (this.router.url.indexOf('bao-cao') !== -1) {
      this.title = 'Báo cáo kết quả đoàn TTKT';
    } else {
      this.title = 'Kết luận đoàn TTKT';
    }
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt']);
  }

}
