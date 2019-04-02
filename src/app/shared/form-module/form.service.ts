import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';

@Injectable({   providedIn: 'root' })
export class FormService {

  constructor() { }

  isRequired(control: AbstractControl): boolean {
    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    if (control['controls']) {
      for (const controlName in control['controls']) {
        if (control['controls'][controlName]) {
          if (this.isRequired(control['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getErrorMsg(control: AbstractControl): string {
    if (control.errors) {
      if (control.errors.required && (control.dirty || control.touched)) {
        return 'Không bỏ trống phần này';
      }
    }
    return '';
  }
  nospaceValidator(control: AbstractControl): string {
    let re = / /;
    if (control.value && control.value.trim() === '') {
      if (control.value.match(re)) {
        return 'không được nhập toàn khoảng trắng';
      }
    }
  }

  touchAllInput(form: any, recursive: boolean = false): void {
    if (form instanceof FormControl) {
      form.markAsDirty({onlySelf:true});
      form.markAsTouched({onlySelf:true});
    }
    if (form instanceof FormGroup) {
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        if (control instanceof FormControl) {
          this.touchAllInput(control, recursive);
        }
        if (control instanceof FormArray && recursive) {
          const controlArray = control as FormArray;
          for (const controlGroup of controlArray.controls) {
            this.touchAllInput(controlGroup, recursive);
          }
        }
        if (control instanceof FormGroup && recursive) {
          this.touchAllInput(control, recursive);
        }
      });
    }
    if (form instanceof FormArray) {
      const controlArray = form as FormArray;
      for (const controlGroup of controlArray.controls) {
        this.touchAllInput(controlGroup, recursive);
      }
    }
  }

  getErrorList(form: FormGroup): Array<string> {
    const errorList = [];
    for (const key of Object.keys(form.controls)) {
      if (form.get(key).invalid) {
        errorList.push(key);
      }
      if (form.get(key) instanceof FormGroup) {
        errorList.push(...this.getErrorList(form.get(key) as FormGroup));
      }
      if (form.get(key) instanceof FormArray) {
        for (const c of (form.get(key) as FormArray).controls) {
          errorList.push(...this.getErrorList(c as FormGroup));
        }
      }
    }
    return errorList;
  }

  disableControl(listControl: Array<string>, form: FormGroup) {
    for(let cnl of listControl) {
      if (form.get(cnl))
        form.get(cnl).disable();
    }
  }

  enableControl(listControl: Array<string>, form: FormGroup) {
    for(let cnl of listControl) {
      if (form.get(cnl))
        form.get(cnl).enable();
    }
  }
  joinArray(value: Array<any>, valueType: string = 'text', joinChar: string = ', ') {
    let nd = '';
    if (value instanceof Array) {
      let temp = [];
      for (let vl of value) {
        temp.push(vl[valueType]);
      }
      nd = temp.join(joinChar);
    }

    return nd;
  }
}
