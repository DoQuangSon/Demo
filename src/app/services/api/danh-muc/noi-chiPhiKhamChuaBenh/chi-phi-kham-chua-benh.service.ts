import { Injectable } from '@angular/core';
import {DANH_MUC} from '../../../../constants/api-ttkt.constants';
import {Observable} from 'rxjs/Observable';
//import {createCommonHeaders, extractData, handleError} from '../../http-req';
import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class ChiPhiKhamChuaBenhService {

  constructor(
    private http: HttpClient,
  ) {}

  createChiPhiKhamChuaBenh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.CHI_PHI_KHAM_CHUA_BENH, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateChiPhiKhamChuaBenh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.CHI_PHI_KHAM_CHUA_BENH, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllChiPhiKhamChuaBenh(page, size): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.CHI_PHI_KHAM_CHUA_BENH + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteChiPhiKhamChuaBenh(chiPhiKhamChueBenhID): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.CHI_PHI_KHAM_CHUA_BENH + '/' + chiPhiKhamChueBenhID);//, options)
      //.map(extractData)
      //.catch(handleError);
  }


}
