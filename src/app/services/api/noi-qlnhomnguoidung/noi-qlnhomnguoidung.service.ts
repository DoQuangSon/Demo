import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CAP_QUAN_LY } from '../../../constants/ql-nhom-nguoidung.constants';
import { QL_NHOM_NGUOI_DUNG } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class QLyNhomNguoiDungService {

  constructor(
    private http: HttpClient,
  ) { }

  getCapQuanLyName(capQuanLyId) {
    let capQuanLyName: string = '';
    for (const item of CAP_QUAN_LY) {
      if (Number(capQuanLyId) === Number(item.id)) {
        capQuanLyName = item.name;
      }
    }
    return capQuanLyName;
  }

  checkStringIsUpperCase(str) {
    if (str === str.toUpperCase()) {
      return true;
    }
    return false;
  }
  

  getUserGroupList(dmbhxhId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.GET_DS_NHOM_NGUOI_DUNG + `?dmbhxhId=${dmbhxhId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  createNhomNguoiDung(formBody): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(QL_NHOM_NGUOI_DUNG.NHOM_NGUOI_DUNG_ALL, formBody);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateNhomNguoiDung(formBody): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(QL_NHOM_NGUOI_DUNG.NHOM_NGUOI_DUNG_ALL, formBody);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getUserGroupById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.NHOM_NGUOI_DUNG_ALL + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getUserNotBelongToAuthiority(authorityId, dmbhxhId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.GET_USER_NOT_BELONG_TO_AUTHORITY + `?authorityId=${authorityId}&dmbhxhId=${dmbhxhId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getUserOfAuthiority(authorityId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.GET_USER_OF_AUTHORITY + `?authorityId=${authorityId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  addUserFromAuthority(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(QL_NHOM_NGUOI_DUNG.ADD_USER_FROM_AUTHORITY, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  removeUserFromAuthority(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(QL_NHOM_NGUOI_DUNG.REMOVE_USER_FROM_AUTHORITY, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteNhomNguoiDung(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(QL_NHOM_NGUOI_DUNG.NHOM_NGUOI_DUNG_ALL + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getTimKiemNhomNguoiDung(dmbhxhId, tenNhom, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.GET_TIM_KIEM_NHOM_NGUOI_DUNG + `?dmbhxhId=${dmbhxhId}&tenNhom=${tenNhom}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
