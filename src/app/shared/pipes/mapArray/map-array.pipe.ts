import { Pipe, PipeTransform } from '@angular/core';

/**
 * mapGet host key
 */

@Pipe({
  name: 'mapArray'
})
export class MapArrayPipe implements PipeTransform {

  transform(value: any, fieldName?: string): any {
    if (!value) {
      return null;
    }
    const arr = value || [];
    const field = fieldName || '';

    if (Array.isArray(arr)) {
      // tslint:disable-next-line:triple-equals
      const arrString = arr.map(el => {
        return el[field] || '';
      });
      return arrString.join(', ');
    }

    return null;

  }
}
