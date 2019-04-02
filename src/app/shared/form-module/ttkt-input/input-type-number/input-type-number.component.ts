import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';
import { IDataText, InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-number',
  templateUrl: './input-type-number.component.html',
  styleUrls: ['./input-type-number.component.scss']
})
export class TtktInputTypeNumberComponent extends InputTypeBase<IDataText> implements OnInit {
  ngOnInit(): void {

    this.formControlInput.valueChanges.subscribe(vl => {
      if (vl && !(/^([0-9]*)$/.test(vl + ''))) {
        this.formControlInput.setValue((vl + '').slice(0, -1), {emitEvent: false});
      }
    })
  }
}
