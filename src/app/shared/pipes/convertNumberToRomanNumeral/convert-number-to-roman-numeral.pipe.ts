import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertNumberToRomanNumeral'
})
export class ConvertNumberToRomanNumeralPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.romanize(value);
  }

  romanize(num) {
    // tslint:disable-next-line:prefer-const
    let lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
      roman = '',
      i;
    // tslint:disable-next-line:forin
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

}
