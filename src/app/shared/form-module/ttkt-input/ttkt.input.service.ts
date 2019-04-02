import { Injectable } from '@angular/core';
import { InputTypeSelectOptionComponent } from './input-type-select-option/input-type-select-option.component';
import { TtktInputTypeQuyComponent } from './input-type-quy/input-type-quy.component';
import { TtktInputTypeNamComponent } from './input-type-nam/input-type-nam.component';
import { TtktInputTypeTextComponent } from './input-type-text/input-type-text.component';
import { TtktInputTypeDateComponent } from './input-type-date/input-type-date.component';
import { TtktInputTypeNumberComponent } from './input-type-number/input-type-number.component';
import { TtktInputTypeSelectBasicComponent } from './input-type-select-basic/input-type-select-basic.component';
import { TtktInputTypeCheckboxComponent } from './input-type-checkbox/input-type-checkbox.component';
import { TtktInputTypeRadioComponent } from './input-type-radio/input-type-radio.component';
import { TtktInputTypeTextareaComponent } from './input-type-textarea/input-type-textarea.component';
import { TtktInputTypeFileComponent } from './input-type-file/input-type-file.component';
import { TtktInputTypeThangComponent } from './input-type-thang/input-type-thang.component';

@Injectable()
export class TtktInputService {

    constructor() { }

    getInputComponentByType(type: any): any {
        // debugger;
        let component;
        switch (type) {
            case 'textarea':
                component = TtktInputTypeTextareaComponent;
                break;
            case 'select':
                component = InputTypeSelectOptionComponent;
                break;
            case 'quy':
                component = TtktInputTypeQuyComponent;
                break;
            case 'nam':
                component = TtktInputTypeNamComponent;
                break;
            case 'date':
                component = TtktInputTypeDateComponent;
                break;
            case 'number':
                component = TtktInputTypeNumberComponent;
                break;
            case 'select-basic':
                component = TtktInputTypeSelectBasicComponent;
                break;
            case 'checkbox':
                component = TtktInputTypeCheckboxComponent;
                break;
            case 'radio':
                component = TtktInputTypeRadioComponent;
                break;
            case 'file':
                component = TtktInputTypeFileComponent;
                break;
            case 'thang':
                component = TtktInputTypeThangComponent;
                break;
            default:
                component = TtktInputTypeTextComponent;
                break;
        }

        return component;
    }
}
