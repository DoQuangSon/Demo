import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumArrayTable'
})

export class SumArrayTablePipe implements PipeTransform {

  transform(arr: any[], fieldName?: string): any {
    // console.log('pipesss', arr);
    if (!arr) {
      return null;
    }

    if (Array.isArray(arr)) {
      const arrNumber = arr.map(el => {
        if (el && (typeof el[fieldName] === 'number' || typeof el[fieldName] === 'string')) {
          return Number(el[fieldName]);
        } else if (typeof el === 'number' || typeof el === 'string') {
          return Number(el);
        } else {
          return 0;
        }
      });
      const total = arrNumber.reduce((accumulator, currentValue) => accumulator + currentValue);
      return total;
    }
    return null;
  }

}
