import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants/index';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'ttkt-vphc-ttkt-tw',
  templateUrl: './vphc-ttkt-tw.component.html',
  styleUrls: ['./vphc-ttkt-tw.component.scss']
})
export class VphcTtktTwComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  themMoibtn: boolean = false;
  id: any;
  title: string = '';
  VPHCTwForm: FormGroup;
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
    this.VPHCTwForm = this.builder.group({
      tenBienBan: [''],
      lyDoLap: [''],
      nguoiLap: [''],
      ngayLap: [''],
      fileDinhKem: [''],
      VPHCTwMoi: this.fb.array([]),
    });
    if (this.router.url.indexOf('bien-ban') !== -1) {
      this.title = 'Lập biên bản VPHC';
      this.formChung = this.bienBanForm;
    } else {
      this.title = 'Lập quyết định xử phạt VPHC';
      this.formChung = this.quyetDinhForm;
    }
  }

  addVPHCTw(): FormGroup {
    return this.fb.group({
      tenBienBan: [''],
      lyDoLap: [''],
      nguoiLap: [''],
      ngayLap: [''],
      fileDinhKem: ['']
    });
  }

  themVPHCTw() {
    const control = <FormArray>this.VPHCTwForm.controls.VPHCTwMoi;
    control.push(this.addVPHCTw());
  }

  xoaVPHCTw(index: number) {
    const control = <FormArray>this.VPHCTwForm.controls['VPHCTwMoi'];
    control.removeAt(index);
  }

  onCloseVPHC() {
    this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw/theodoi-hd-ttkt/chitiet-hoatdong-donvi/' + this.id]);
  }

  get formData() {
    return <FormArray>this.VPHCTwForm.get('VPHCTwMoi');
  }
}

