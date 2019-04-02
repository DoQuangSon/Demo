import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CAU_HINH_THOI_HAN } from '../../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class CauHinhThoiHanService {

  constructor(
    private http: HttpClient,
  ) { }
  getAllThoiHan(page, size): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(CAU_HINH_THOI_HAN.GET_ALL_CAU_HINH_THOI_HAN + `?page=${page}&size=${size}`); // , options)
      // .map(extractData)
      // .catch(handleError);
  }
  createThoiHan(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(CAU_HINH_THOI_HAN.GET_ALL_CAU_HINH_THOI_HAN, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  updateThoiHan(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.put(CAU_HINH_THOI_HAN.GET_ALL_CAU_HINH_THOI_HAN, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  deleteThoiHan(id): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.delete(CAU_HINH_THOI_HAN.GET_ALL_CAU_HINH_THOI_HAN + `/${id}`); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

}
