import { Injectable } from '@angular/core';
import {DANH_MUC} from '../../../../constants/api-ttkt.constants';
//import {createCommonHeaders, extractData, handleError} from '../../http-req';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class DmPhongBanService {

  constructor(
    private http: HttpClient,
  ) {}

  createDMPhongBan(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_PHONG_BAN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDMPhongBan(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_PHONG_BAN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllPhongBan(page, size): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_PHONG_BAN + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDMPhongBan(dmPhongBanID): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_PHONG_BAN + '/' + dmPhongBanID);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

}
