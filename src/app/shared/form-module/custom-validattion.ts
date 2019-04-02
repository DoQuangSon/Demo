import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isIntergerNumber(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    console.log(value);
    if (!value) {
        return null;
    }
    if (!Number(value)) {
        // Lỗi ở formControl sẽ có dạng formControl.errors.number
        return { number: true }
    }
    if (Number(value)) {
     if (Number(value) === parseInt(value, 10) && Number(value) > 0) {
         return null;
     } else {
         // Lỗi ở formControl sẽ có dạng formControl.errors.numberInterger
         return { numberInterger: true };
     }  
    }
    return null;
}


export function DateCompareValidator(controlName: string, isFrom = true): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // if null return
      let src = control.value;
      if (src == null || src == '') {
        return null;
      }
  
      // no parent return
      if (!control.parent) {
        return null;
      }
  
      // if input pass null, return
      const tem = control.parent.get(controlName);
  
      if (!tem || (tem.value == null || tem.value == '')) {
        return null;
      }
      let dst = tem.value;
  
      // convert to date
      console.log(src);
      if (typeof src == 'string') {
        src = new Date(src);
        // dst = parseDateFromString(dst);
      }
      if (typeof dst == 'string') {
        dst = new Date(dst);
        // dst = parseDateFromString(dst);
      }

      if (src instanceof Date && dst instanceof Date) {
        if (isFrom) {
          if (src.getTime() > dst.getTime()) {
            return {
              dateFrom: true
            };
          } else {
            // update validate input compare
            if (tem.invalid) {
              tem.updateValueAndValidity({ emitEvent: false });
            }
          }
        } else {
          if (src.getTime() < dst.getTime()) {
            return {
              dateTo: true
            };
          } else {
            // update validate input compare
            if (tem.invalid) {
              tem.updateValueAndValidity({ emitEvent: false });
            }
          }
        }
      } else {
        // console.log(src, dst);
        // console.log("not instance of date");
      }
  
      return null;
    };
  }
  