import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { IDataCheckbox, InputTypeBase } from '../input-type.interface';
@Component({
  selector: 'input-type-checkbox',
  templateUrl: './input-type-checkbox.component.html',
  styleUrls: ['./input-type-checkbox.component.scss']
})
export class TtktInputTypeCheckboxComponent extends InputTypeBase<IDataCheckbox> implements OnInit {
  ngOnInit(): void {
    console.log(this.data);
    // throw new Error("Method not implemented.");
  }
}
