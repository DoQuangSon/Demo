import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TtktInputTypeTextComponent,
} from './ttkt-input/input-type-text/input-type-text.component';
import {
  TtktInputTypeTextareaComponent,
} from './ttkt-input/input-type-textarea/input-type-textarea.component';
import { TtktInputComponent } from './ttkt-input/ttkt-input.component';

import { InputTypeSelectOptionComponent } from './ttkt-input/input-type-select-option/input-type-select-option.component';
import { SelectModule } from 'ng2-select';
import { TtktInputTypeQuyComponent } from './ttkt-input/input-type-quy/input-type-quy.component';
import { TtktInputTypeNamComponent } from './ttkt-input/input-type-nam/input-type-nam.component';
import { TtktInputService } from './ttkt-input/ttkt.input.service';
import { MyDatePickerModule } from 'mydatepicker';
import { TtktInputTypeDateComponent } from './ttkt-input/input-type-date/input-type-date.component';
import { TtktInputTypeNumberComponent } from './ttkt-input/input-type-number/input-type-number.component';
import { TtktInputTypeSelectBasicComponent } from './ttkt-input/input-type-select-basic/input-type-select-basic.component';
import { TtktInputTypeCheckboxComponent } from './ttkt-input/input-type-checkbox/input-type-checkbox.component';
import { TtktInputTypeRadioComponent } from './ttkt-input/input-type-radio/input-type-radio.component';
import { TtktInputTypeFileComponent } from './ttkt-input/input-type-file/input-type-file.component';
import { TtktInputTypeThangComponent } from './ttkt-input/input-type-thang/input-type-thang.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    MyDatePickerModule
  ],
  exports: [TtktInputComponent],
  declarations: [
    TtktInputComponent,
    TtktInputTypeTextComponent,
    TtktInputTypeTextareaComponent,
    InputTypeSelectOptionComponent,
    TtktInputTypeQuyComponent,
    TtktInputTypeNamComponent,
    TtktInputTypeDateComponent,
    TtktInputTypeNumberComponent,
    TtktInputTypeSelectBasicComponent,
    TtktInputTypeCheckboxComponent,
    TtktInputTypeRadioComponent,
    TtktInputTypeFileComponent,
    TtktInputTypeThangComponent
  ],
  entryComponents: [
    TtktInputTypeTextComponent,
    TtktInputTypeTextareaComponent,
    InputTypeSelectOptionComponent,
    TtktInputTypeQuyComponent,
    TtktInputTypeNamComponent,
    TtktInputTypeDateComponent,
    TtktInputTypeNumberComponent,
    TtktInputTypeSelectBasicComponent,
    TtktInputTypeCheckboxComponent,
    TtktInputTypeRadioComponent,
    TtktInputTypeFileComponent,
    TtktInputTypeThangComponent
  ],
  providers: [
    TtktInputService
  ]
})
export class TtktFormModule { }
