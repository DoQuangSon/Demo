import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CAU_HINH_THAM_SO_HT } from '../../../../constants/api.constants';
@Injectable({   providedIn: 'root' })
export class CauHinhThamSoHtService {

  constructor(
    private http: HttpClient,
  ) { }

 
  getThamSoHTs(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(CAU_HINH_THAM_SO_HT.GET_ALL_THAM_SO_HT + `?page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  

  createThamSoHT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(CAU_HINH_THAM_SO_HT.GET_ALL_THAM_SO_HT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateThamSoHT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(CAU_HINH_THAM_SO_HT.GET_ALL_THAM_SO_HT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteThamSoHT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(CAU_HINH_THAM_SO_HT.GET_ALL_THAM_SO_HT + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

}
