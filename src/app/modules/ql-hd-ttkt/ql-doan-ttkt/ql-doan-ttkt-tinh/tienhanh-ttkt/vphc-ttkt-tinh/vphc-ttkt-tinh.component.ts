import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants/index';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'ttkt-vphc-ttkt-tinh',
  templateUrl: './vphc-ttkt-tinh.component.html',
  styleUrls: ['./vphc-ttkt-tinh.component.scss']
})
export class VphcTtktTinhComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  themMoibtn: boolean = false;
  id: any;
  title: string = '';
  VPHCTinhForm: FormGroup;
  bienBanForm: any = {
    tenTitle: 'Biên bản',
    ten: 'Tên biên bản'
  };
  quyetDinhForm: any = {
    tenTitle: 'Quyết định',
    ten: 'Tên quyết định'
  };
  formChung: any = {};

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
      }
    });
    this.VPHCTinhForm = this.builder.group({
      tenBienBan: [''],
      lyDoLap: [''],
      nguoiLap: [''],
      ngayLap: [''],
      fileDinhKem: [''],
      VPHCTinhMoi: this.fb.array([]),
    });
    if (this.router.url.indexOf('bien-ban') !== -1) {
      this.title = 'Lập biên bản VPHC';
      this.formChung = this.bienBanForm;
    } else {
      this.title = 'Lập quyết định xử phạt VPHC';
      this.formChung = this.quyetDinhForm;
    }
  }

  addVPHCTinh(): FormGroup {
    return this.fb.group({
      tenBienBan: [''],
      lyDoLap: [''],
      nguoiLap: [''],
      ngayLap: [''],
      fileDinhKem: ['']
    });
  }

  themVPHCTinh() {
    const control = <FormArray>this.VPHCTinhForm.controls.VPHCTinhMoi;
    control.push(this.addVPHCTinh());
  }

  xoaVPHCTinh(index: number) {
    const control = <FormArray>this.VPHCTinhForm.controls['VPHCTinhMoi'];
    control.removeAt(index);
  }

  onCloseVPHC() {
    this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/chitiet-hoatdong-donvi/' + this.id]);
  }

  get formData() {
    return <FormArray>this.VPHCTinhForm.get('VPHCTinhMoi');
  }
}
