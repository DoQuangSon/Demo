import { Injectable } from '@angular/core';
import {DANH_MUC} from '../../../../constants/api-ttkt.constants';
//import {createCommonHeaders, extractData, handleError} from '../../http-req';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({   providedIn: 'root' })
export class DmHanhviService {

  constructor(
    private http: HttpClient,
  ) {}

  createDMHanhVi(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_HANH_VI, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDMPHanhVi(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_HANH_VI, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllHanhVi(page?, size?): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_HANH_VI + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDMHanhVi(dmHanhViID): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_HANH_VI + '/' + dmHanhViID);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

}
