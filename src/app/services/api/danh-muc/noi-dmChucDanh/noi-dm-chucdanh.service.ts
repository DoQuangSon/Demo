import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DMCHUCDANH } from '../../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiDmChucDanhService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmChucDanh(page, size, dmBHXHId): Observable<any> {
    return this.http.get(DMCHUCDANH.getAll + '?page=' + page + '&size=' + size + '&dmBHXHId=' + dmBHXHId);
  }

  createNewDmChucDanh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMCHUCDANH.crud, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDmChucDanh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMCHUCDANH.crud, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDmChucDanh(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMCHUCDANH.crud + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchDmChucDanh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMCHUCDANH.search, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
