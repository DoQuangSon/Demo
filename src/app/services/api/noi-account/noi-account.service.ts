// import { extractData } from './../http-req';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCOUNT } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiAccountService {

  constructor(
    private http: HttpClient,
  ) { }

  getAcount(): Observable<any> {
    return this.http.get(ACCOUNT.getAccount);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getDonvi(dvId): Observable<any> {
    return this.http.get(ACCOUNT.getDonvi + '?maDonVi=' + dvId)
      //.map(extractData)
      //.catch(handleError);
  }
}
