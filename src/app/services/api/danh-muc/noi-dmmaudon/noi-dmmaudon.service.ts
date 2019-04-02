//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../../http-req';
import { DMMAUDON } from './../../../../constants/api.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class NoiDmmaudonService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmMaudon(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMMAUDON.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  createDmMaudon(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMMAUDON.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateDmMaudon(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMMAUDON.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteDmMaudon(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMMAUDON.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchDmMaudon(name, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMMAUDON.searchByName + '?tenMau=' + name + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
