// import { extractData, handleError } from './../http-req';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DONTHU } from '../../../constants/api.constants';


@Injectable({   providedIn: 'root' })
export class NoiDonthuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(dmBHXHId, page, size): Observable<any> {
    return this.http.get(DONTHU.getDonthu + '?dmBHXHId=' + dmBHXHId + `&page=${page}&size=${size}` + '&sort=id,desc'); // , options)
  }
  getAllWhereSoCvDenNotNull(dmBHXHId, page, size): Observable<any> {
    return this.http.get(DONTHU.getDonThuSoCvDenNotNull + '?dmBHXHId=' + dmBHXHId + `&page=${page}&size=${size}` + '&sort=id,desc'); // , options)
  }
  getByID({ id }): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    console.log(DONTHU.getDonthu + '/' + id);
    return this.http.get(DONTHU.getDonthu + '/' + id); //  options)
    // .map(extractData)
    // .catch(handleError);
  }

  traCuuLichSuCD(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(DONTHU.traCuu, body); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }

  getLichSuCDByCmt(soCmt): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(DONTHU.getLichSuByCmt + `?soCmtnd=${soCmt}`); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }

  getInfoByCmt({ soCMND }): Observable<any> {
    //  const options = createCommonHeaders(this.authService);
    return this.http.get(DONTHU.getInfoByCmt + `?soCmtnd=${soCMND}`);
    //  .map(extractDataArray)
    //  .catch(handleError);
  }

  searchDonThu(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(DONTHU.searchDonThu, body); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }

  getDonThuChuaGiaiQuyet(body: any, page: any, size: any): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(DONTHU.getDonThuChuaGQ + '?page=' + page + '&size=' + size); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }


  getDonThuDieuChinhByDmbhxhId(dmBHXHid, page: any, size: any): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(DONTHU.getDonThuDieuChinhByDmbhxhId + '?dmBHXHid=' + dmBHXHid + '&page=' + page + '&size=' + size); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }

  updateDonThu(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.put(DONTHU.updateDonthu, body); // , options)
    // .map(extractDataArray)
    // .catch(handleError);
  }
}
