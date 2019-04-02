import 'rxjs/add/observable/throw';

import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


export function createPdfHeaders(authService, contentType = 'application/json', responseType = 'arraybuffer' as 'json') {
  // 'arraybuffer'
  const hObj = {};
  // hObj[AuthConfigConsts.DEFAULT_HEADER_NAME] = AuthConfigConsts.HEADER_PREFIX_BEARER + authService.getToken();
  if (contentType) {
    hObj['content-type'] = contentType;
  }
  if (responseType) {
    hObj['responseType'] = responseType;
  }

  const headers = new Headers(hObj);
  return new RequestOptions({ headers });
}
export function createHttpHeader(authService, contentType = 'application/json') {
  const httpOptions = {
    headers: new Headers({
      'Content-Type': contentType,
      'Authorization': 'Bearer ' + authService.getToken()
    })
  };
  return httpOptions;
}

export function handleError(error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    let body: any = '';
    try {
      body = error.json();
    } catch (e) {
      body = '';
    }
    errMsg = body;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

export function handleErrorObj(error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let body: any = {};
  try {
    body = error.json();
  } catch (e) {

  }
  return Observable.throw(body);
}

export function handleErrorRes(error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  return Observable.throw(error);
}
