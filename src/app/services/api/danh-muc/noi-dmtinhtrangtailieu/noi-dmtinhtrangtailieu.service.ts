//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../../http-req';
import { DMTINHTRANGTAILIEU } from './../../../../constants/api.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({   providedIn: 'root' })
export class NoiDmtinhtrangtailieuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmTinhtrangtailieu(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHTRANGTAILIEU.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  createAllDmTinhtrangtailieu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMTINHTRANGTAILIEU.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateAllDmTinhtrangtailieu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMTINHTRANGTAILIEU.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteAllDmTinhtrangtailieu(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMTINHTRANGTAILIEU.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchAllDmTinhtrangtailieu(name, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHTRANGTAILIEU.searchByName + '?tenDm=' + name + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
