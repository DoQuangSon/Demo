import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { QUY } from '../../../../constants/ke-hoach-ttkt.constants';
import { UtilsService } from '../../../../services/api/utils/utils.service';
import { InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-quy',
  templateUrl: './input-type-quy.component.html',
  styleUrls: ['./input-type-quy.component.scss']
})
export class TtktInputTypeQuyComponent extends InputTypeBase<any> implements OnInit {
  data: any;
  quyHienTai: number;
  danhSachQuy: any[] = QUY;
  
  ngOnInit(): void {
    // console.log(this.data, this.formControlInput.value);
    // throw new Error("Method not implemented.");
  }
}
