import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';
import { IMyDpOptions } from 'mydatepicker';
import { IDataText, InputTypeBase, IDataInput } from '../input-type.interface';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants/index';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';

@Component({
  selector: 'input-type-date',
  templateUrl: './input-type-date.component.html',
  styleUrls: ['./input-type-date.component.scss']
})
export class TtktInputTypeDateComponent extends InputTypeBase<IDataInput> implements OnInit {
  // data: IDataText;
  placeholder: any;
  myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  set data(data: IDataText) {
    if (!data) return;
    if (data.placeholder) {
      this.placeholder = data.placeholder;
    }
  }

  formDate: FormControl = new FormControl();
  _formControl: AbstractControl;

  get formControlInput() {
    return this._formControl;
  }

  set formControlInput(form: AbstractControl) {
    if (!form) {
      return;
    }

    this._formControl = form;
    if (this._formControl.value != null && this._formControl.value != '') {
      let vl = this._formControl.value instanceof Date ? this._formControl.value : new Date(this._formControl.value);
      // return date string
      vl.setHours(0, 0, 0, 0);// set time -> 0
      this._formControl.setValue(vl.toISOString(), { emitEvent: false });
      // console.log(vl);
      let value = this.timeBuilderService.fromString(vl).toTimeDatePickerValue() || null;
      this.formDate.setValue(value, { emitEvent: false });
    }



    this.formControlInput.valueChanges.subscribe(vl => {
      //convert string to mydate
      //console.log(vl);
      let value = this.timeBuilderService.fromString(vl).toTimeDatePickerValue() || null;
      this.formDate.setValue(value, { emitEvent: false });
    })
  }

  constructor(
    private timeBuilderService: TimeBuilderService
  ) {
    super();
  }
  ngOnInit(): void {
    this.formDate.valueChanges.subscribe(vl => {
      //convert mydate to string
      let value = vl ? vl.jsdate.toISOString() : '';//this.timeBuilderService.fromTimeDatePicker(vl).setUTC().toISOString() || '';
      this.formControlInput.setValue(value);
    })
  }
}