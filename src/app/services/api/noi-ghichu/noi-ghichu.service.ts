import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GHICHU } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiGhichuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllGhiChu() {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(GHICHU.create);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  createNewGhichu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(GHICHU.create, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateGhiChuTW(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(GHICHU.create, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
