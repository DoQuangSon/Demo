//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../http-req';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LYDOKHONGTHULYTC } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiLydokhongthulytcService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllLydoKhongthulytc(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LYDOKHONGTHULYTC.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  createNewLydoKhongthulytc(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LYDOKHONGTHULYTC.crud, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateLydoKhongthulytc(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(LYDOKHONGTHULYTC.crud, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteLydoKhongthulytc(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(LYDOKHONGTHULYTC.crud + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchLydoKhongthulytc(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LYDOKHONGTHULYTC.search, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
