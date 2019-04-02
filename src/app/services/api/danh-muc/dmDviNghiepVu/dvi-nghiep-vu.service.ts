import { Injectable } from '@angular/core';
import {DANH_MUC} from '../../../../constants/api-ttkt.constants';
import {Observable} from 'rxjs/Observable';
//import {createCommonHeaders, extractData, handleError} from '../../http-req';
import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class DonViNghiepVuService {

  constructor(
    private http: HttpClient,
  ) {}

  createDonViNghiepVu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DVI_NGHIEPVU, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDonViNghiepVu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DVI_NGHIEPVU, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllDonViNghiepVu(page, size): Observable<any> {
    // console.log('vao day ' + body);
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DVI_NGHIEPVU + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDonViNghiepVu(nghiepVuId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DVI_NGHIEPVU + '/' + nghiepVuId);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
