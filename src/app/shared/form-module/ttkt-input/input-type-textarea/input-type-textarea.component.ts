import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { IDataTextarea, InputTypeBase } from '../input-type.interface';
@Component({
  selector: 'input-type-textarea',
  templateUrl: './input-type-textarea.component.html',
  styleUrls: ['./input-type-textarea.component.scss']
})
export class TtktInputTypeTextareaComponent extends InputTypeBase<IDataTextarea> implements OnInit {
  // placaholder: any = '';
  data: IDataTextarea = {
    placeholder : '',
    rows: 5
  };

  ngOnInit(): void {
    // console.log(this.data);
    // throw new Error("Method not implemented.");
  }

  //trim space white
  onBlur(event) {
    this.formControlInput.setValue((event.target.value + '').trim(), { emitEvent: false });
  }
}
