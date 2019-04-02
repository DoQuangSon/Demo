import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({   providedIn: 'root' })
export class UtilsService {

  constructor() { }

  getDateFromToByQuyNam(quy: any, nam: any) {
    let from: any, to: any;

    switch(Number(quy)) {
      case  1:
        from = `${nam}-01-01`;
        to = `${nam}-03-31`;
        break;
      case  2:
        from = `${nam}-04-01`;
        to = `${nam}-06-30`;
        break;
      case  3:
        from = `${nam}-07-01`;
        to = `${nam}-09-30`;
        break;
      case  4:
        from = `${nam}-10-01`;
        to = `${nam}-12-31`;
        break;
    }

    if(!from || !to) {
      return [null, null];
    }
    let resetTime: any = 'T00:00:00';
    return [(new Date(from + resetTime)).toISOString(), (new Date(to + resetTime)).toISOString()];
  }

  getDateFromToByThangNam(thang: any, nam: any) {
    let from: any, to: any;

    let resetTime = 'T00:00:00';
    switch(Number(thang)) {
      case  1:
        from = '-01-01';
        to = '-01-31';
        break;
      case  2:
        from = '-02-01';
        to = '-02-28';
        break;
      case  3:
        from = '-03-01';
        to = '-03-31';
        break;
      case  4:
        from = '-04-01';
        to = '-04-30';
        break;
      case  5:
        from = '-05-01';
        to = '-05-31';
        break;
      case  6:
        from = '-06-01';
        to = '-06-30';
        break;
      case  7:
        from = '-07-01';
        to = '-07-31';
        break;
      case  8:
        from = '-08-01';
        to = '-08-31';
        break;
      case  9:
        from = '-09-01';
        to = '-09-30';
        break;
      case  10:
        from = '-10-01';
        to = '-10-31';
        break;
      case  11:
        from = '-11-01';
        to = '-11-30';
        break;
        case  12:
        from = '-12-01';
        to = '-12-31';
        break;
    }
    
    from = nam + from + resetTime;
    to = nam + to + resetTime;

    if(!from || !to) {
      return [null, null];
    }
    console.log(from,to);
    return [(new Date(from)).toISOString(), (new Date(to)).toISOString()];
  }

  getQuyHienTai() {
    let now = new Date();
    let q1 = (new Date(now.getFullYear(), 0, 1)).getTime();
    let q2 = (new Date(now.getFullYear(), 2, 31)).getTime();
    let q3 = (new Date(now.getFullYear(), 5, 30)).getTime();
    let q4 = (new Date(now.getFullYear(), 8, 30)).getTime();
    let q5 = (new Date(now.getFullYear(), 11, 31)).getTime();

    if(now.getTime() >= q1 && now.getTime() <= q2) {
      return 1;
    }
    if(now.getTime() > q2 && now.getTime() <= q3) {
      return 2;
    }
    if(now.getTime() > q3 && now.getTime() <= q4) {
      return 3;
    }
    if(now.getTime() > q4 && now.getTime() <= q5) {
      return 4;
    }

    return 0;
  }
}

export function setValue (source, map: any[]) {
  const obj = map.find(o => o.key === source);
  if ( obj ) {
    return obj.value;
  } else {
    return undefined;
  }
}
export function  pickBy (obj: any, _options: any) {
  const defaultOpitons = {
    notEmpty: false,
    notNull: false,
    notUndefined: false,
    notStringEmpty: false,
  };
  const result = obj;
  const options = { ...defaultOpitons, ..._options };
  // tslint:disable-next-line:forin
  for (const prop in result) {
    if (typeof result[prop] !== 'boolean' && typeof result[prop] !== 'number') {
      if (options.notEmpty) {
        if (result[prop] && Object.keys(result[prop]).length === 0) {
          delete result[prop];
        }
      }
      if (options.notNull) {
        if (result[prop] === null) {
          delete result[prop];
        }
      }
      if (options.notUndefined) {
        if (typeof result[prop] === 'undefined') {
          delete result[prop];
        }
      }
      if (options.notStringEmpty) {
        if (result[prop] === '') {
          delete result[prop];
        }
      }
    }
  }
  return result;
}
export function convertToRomanNumber(num: number) {
  const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman: string = '';
  // tslint:disable-next-line:forin
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

export function getDayCompareDate(src: any, dst: any) {
  if (typeof src == 'string') {
    src = new Date(src);
    // dst = parseDateFromString(dst);
  }
  if (typeof dst == 'string') {
    dst = new Date(dst);
    // dst = parseDateFromString(dst);
  }

  return Math.round((src.getTime() - dst.getTime()) / (1000*60*60*24));
}
