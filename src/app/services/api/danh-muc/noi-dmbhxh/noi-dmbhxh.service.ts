//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../../http-req';
import { DMBHXH } from './../../../../constants/api.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class NoiDmbhxhService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmBhxh(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMBHXH.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  createNewDmBHXH(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMBHXH.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDmBHXH(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMBHXH.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDmBHXH(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMBHXH.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchDmBHXH(tenDonVi = '', maDonVi = '', page = 0, size = 10): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMBHXH.search + '?tenDonVi=' + tenDonVi + '&maDonVi=' + maDonVi + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmBHXHBymaCha(maCha): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMBHXH.getByMaCha + '?maCha=' + maCha);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmBHXHBTinhAndTw(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMBHXH.getAll + '/get-tinh-and-tw');//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  
  //@Todo
  guiThongBaoChoTinh(body: any): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMBHXH.getAll + '/gui');//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
