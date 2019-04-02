import { Injectable } from '@angular/core';
import { HOST } from '../../../constants/api-port.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BcKquaToanNganhService {
  private GET_DONVI_GUI_BAO_CAO = `${HOST}/api/so-theo-doi-tn/cac-dv-da-gui-bc`;
  private GET_BAOCAO_THEO_DVI = `${HOST}/api/so-theo-doi-tn/get-by-dmbhxh-id`;
  private SEARCH_BAOCAO_THEO_DVI = `${HOST}/api/so-theo-doi-tn/search-bc-kq`;

  constructor(
    private http: HttpClient
  ) { }

  getDviGuiBaoCao(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.GET_DONVI_GUI_BAO_CAO}?page=${page}&size=${size}`);
  }

  getBaoCaoTheoDvi(dmbhxhId, page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.GET_BAOCAO_THEO_DVI}?id=${dmbhxhId}&page=${page}&size=${size}`);
  }
  searchDviGuiBaoCao(dmbhxhId?, year?, page?: any, size?: any) : Observable<any> {
    return this.http.get(`${this.SEARCH_BAOCAO_THEO_DVI}?dmbhxhId=${dmbhxhId}&year=${year}&page=${page}&size=${size}`);
  }
}
