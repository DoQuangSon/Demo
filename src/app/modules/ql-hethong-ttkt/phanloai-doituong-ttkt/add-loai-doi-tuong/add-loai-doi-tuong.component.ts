import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoiPhanloaiDoituongService } from '../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { AlertService } from '../../../../services/api/alert.service';
import { BaseModal } from '../../../../shared/modal/base-modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ttkt-add-loai-doi-tuong',
  templateUrl: './add-loai-doi-tuong.component.html',
  styleUrls: ['./add-loai-doi-tuong.component.scss']
})
export class AddLoaiDoiTuongComponent extends BaseModal implements OnInit {

  dtForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.dtForm = this.fb.group({
        id: [''],
        tenDoiTuong: [''],
        maSuDungLaoDong: [''],
        maCoSoKhamChuaBenh: [''],
        diaChi: [''],
        dienThoai: [''],
        dmPhanLoaiDtId: [''],
        dmPhanLoaiDtName: [''],
        dmTinhHuyenId: [''],
        tenTinhHuyen: [''],
        dmbhxhId: [''],
    })
  }
}
