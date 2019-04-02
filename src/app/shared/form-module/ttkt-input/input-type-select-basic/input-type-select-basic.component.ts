import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { IDataSelectBasic, InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-select-basic',
  templateUrl: './input-type-select-basic.component.html',
  styleUrls: ['./input-type-select-basic.component.scss']
})
export class TtktInputTypeSelectBasicComponent extends InputTypeBase<IDataSelectBasic> implements OnInit {
  _data: IDataSelectBasic = {
    options: [],
    valueType: 'text',
    idType: 'id',
    firstOptionValue: '',
  };

  ngOnInit(): void {

  }
}
