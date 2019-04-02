import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, AbstractControl, FormControl } from '@angular/forms';
import { IDataRadio, InputTypeBase } from '../input-type.interface';
@Component({
  selector: 'input-type-radio',
  templateUrl: './input-type-radio.component.html',
  styleUrls: ['./input-type-radio.component.scss']
})
export class TtktInputTypeRadioComponent extends InputTypeBase<IDataRadio> implements OnInit {
  // placaholder: any = '';
  _data: IDataRadio = {
    inline: true,
    options: []
  };

  ngOnInit(): void {
    // console.log(this.data);
    // throw new Error("Method not implemented.");
  }
}
