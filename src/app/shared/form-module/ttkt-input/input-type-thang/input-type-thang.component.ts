import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';
import { QUY, THANG } from '../../../../constants/ke-hoach-ttkt.constants';
import { UtilsService } from '../../../../services/api/utils/utils.service';
import { InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-thang',
  templateUrl: './input-type-thang.component.html',
  styleUrls: ['./input-type-thang.component.scss']
})
export class TtktInputTypeThangComponent extends InputTypeBase<any> implements OnInit {
  danhSachThang: any[] = THANG;
  
  ngOnInit(): void {
 
  }
}
