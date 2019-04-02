//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../../http-req';
import { TIEUCHITTKT } from './../../../../constants/api.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class TieuChiTTKTService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page, size): Observable<any> {
    return this.http.get(TIEUCHITTKT.root + '?page=' + page + '&size=' + size);
  }

  create(body): Observable<any> {
    return this.http.post(TIEUCHITTKT.root, body);
  }

  update(body): Observable<any> {
    return this.http.put(TIEUCHITTKT.root, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(TIEUCHITTKT.root + '/' + id);
  }
}
