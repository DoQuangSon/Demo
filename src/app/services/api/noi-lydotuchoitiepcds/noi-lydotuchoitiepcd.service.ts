//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../http-req';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LYDOTUCHOITIEPCDS } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiLydotuchoitiepcdService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllLydotuchoitiepcds(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LYDOTUCHOITIEPCDS.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  createLydotuchoitiepcds(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LYDOTUCHOITIEPCDS.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateLydotuchoitiepcds(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(LYDOTUCHOITIEPCDS.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteLydotuchoitiepcds(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(LYDOTUCHOITIEPCDS.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchTuLydotuchoitiepcds(ndLyDo, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LYDOTUCHOITIEPCDS.search + '?ndLyDo=' + ndLyDo + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
