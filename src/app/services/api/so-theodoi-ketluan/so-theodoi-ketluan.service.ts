import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SO_THEO_DOI_KET_LUAN } from '../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class SoTheodoiKetluanService {
  constructor(
    private http: HttpClient,
  ) { }

  getAllTinh(dmBHXHId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(SO_THEO_DOI_KET_LUAN.GET_ALL + 'dmBHXHId=' + dmBHXHId + '&isOwnerTW=false&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getAllTW(dmBHXHId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(SO_THEO_DOI_KET_LUAN.GET_ALL + 'dmBHXHId=' + dmBHXHId + '&isOwnerTW=true&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getById(thanhLapDoanId, hasKetLuan): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(SO_THEO_DOI_KET_LUAN.GET_BY_ID + '?thanhLapDoanId=' + thanhLapDoanId + '&hasKetLuan=' + hasKetLuan);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  createSTDKetLuan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(SO_THEO_DOI_KET_LUAN.STD_KETLUAN, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  capNhatSoTheoDoiKetLuan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(SO_THEO_DOI_KET_LUAN.UPDATE_SO_THEO_DOI, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getDsChiTietSoTheoDoiByDate(isTW, dmbhxhId,tuNgay,denNgay, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(SO_THEO_DOI_KET_LUAN.GET_DS_CHI_TIET_BY_DATE + `?isOwnerTW=${isTW}&dmBHXHId=${dmbhxhId}&dateFrom=${tuNgay}&dateTo=${denNgay}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
