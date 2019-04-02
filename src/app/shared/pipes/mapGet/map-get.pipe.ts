import { Pipe, PipeTransform } from '@angular/core';

/**
 * mapGet host key
 */

@Pipe({
  name: 'mapGet'
})
export class MapGetPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    if (Array.isArray(args) && typeof args[0] !== 'object') {
      return value;
    }

    const host = args || {};
    const key = 'id';
    const field = 'name';

    if (Array.isArray(host)) {
      // tslint:disable-next-line:triple-equals
      const obj = host.find(item => item[key] == value);
      return (!!obj && !!obj[field]) ? obj[field] : null;
    }

    return null;

  }

}
