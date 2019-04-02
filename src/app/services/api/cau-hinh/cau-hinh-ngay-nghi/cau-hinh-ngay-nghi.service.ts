import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CAU_HINH_NGAY_NGHI } from '../../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class CauHinhNgayNghiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllNgayNghi(page, size): Observable<any> {
    // //const options = createCommonHeaders(this.authService);
    return this.http.get(CAU_HINH_NGAY_NGHI.GET_ALL_NGAY_NGHI + `?page=${page}&size=${size}`);
  }

  createNgayNghi(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(CAU_HINH_NGAY_NGHI.CREATE_NGAY_NGHI, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateNgayNghi(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(CAU_HINH_NGAY_NGHI.UPDATE_NGAY_NGHI, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteNgayNghi(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(CAU_HINH_NGAY_NGHI.DELETE_NGAY_NGHI + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
