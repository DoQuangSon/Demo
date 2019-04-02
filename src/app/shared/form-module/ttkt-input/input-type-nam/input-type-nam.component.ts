import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';
import { InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-nam',
  templateUrl: './input-type-nam.component.html',
  styleUrls: ['./input-type-nam.component.scss']
})
export class TtktInputTypeNamComponent extends InputTypeBase<any> implements OnInit {
  // default: boolean = true;
  namHienTai: number;
  fromYear: any = 2000;
  danhSachNam: any[] = [];
  
  ngOnInit(): void {
    this.namHienTai = (new Date()).getFullYear();
    for (let i = this.fromYear; i <= this.namHienTai; i++) {
      this.danhSachNam.unshift(i);
    }
    // this.formControlInput.setValue(this.namHienTai);
    // console.log(this.namHienTai);
  }
}
