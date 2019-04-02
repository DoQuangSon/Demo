import { Injectable } from '@angular/core';
import {DANH_MUC} from '../../../../constants/api-ttkt.constants';
//import {createCommonHeaders, extractData, handleError} from '../../http-req';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class DmVbCancuXuphatService {

  constructor(
    private http: HttpClient,
  ) {}

  createDMVBCanCuXuPhat(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_VB_CAN_CU_XU_PHAT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDMVBCanCuXuPhat(body): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_VB_CAN_CU_XU_PHAT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllVBCanCuXuPhat(page, size): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_VB_CAN_CU_XU_PHAT + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDMVBCanCuXuPhat(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_VB_CAN_CU_XU_PHAT + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

}
