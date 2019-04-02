//import { extractData, handleError, createHttpHeader } from './../http-req';
import { TIEPCONGDAN } from './../../../constants/api.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
//import { extractDataArray } from '../http-req';
import { IHistoryTiepCD } from './history-tiep-cong-dan.interface';
import { HttpClient } from '@angular/common/http';
import { Pagging } from '../../../shared/models/pagging.model';
import { createHttpHeader } from '../http-req';
import { Http } from '@angular/http';
import { AuthService } from '../../../auth/auth.service';
import { map } from '../../../../../node_modules/rxjs/operators';

@Injectable({   providedIn: 'root' })
export class NoiTiepcongdanService {

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  createNewCongdan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.post(TIEPCONGDAN.createNewCongdan, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateCongdan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.put(TIEPCONGDAN.createNewCongdan, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteCongdan(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.delete(TIEPCONGDAN.createNewCongdan + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getCongdanByCmt(soCmt): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(TIEPCONGDAN.getCdByCmt + '?soCMTND=' + soCmt);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getCongdanBySothe(sothe): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(TIEPCONGDAN.getCdByCmt + '?soThe=' + sothe);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getCongDanBySo(cmt?, sothe?): Observable<any> {
    const options = createHttpHeader(this.authService);
    return this.http.get(TIEPCONGDAN.getCdByCmt + `?soCMTND=${cmt}&soThe=${sothe}`,options)
    .map(res => res.json());
  }

  historyTiepCongDan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.post(TIEPCONGDAN.historyTiepCongDan, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  searchHistoryTiepCongDan(data: IHistoryTiepCD): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(TIEPCONGDAN.searchHistoryTiepCongDan + '?' + `hoten= ${data.hoten}` + `&fromDate=${data.fromDate}` + `&toDate=${data.toDate}` + `&idNoiDung=${data.idNoiDung}` + `&dmBHXHId=${data.dmBHXHId}` + `&page=${data.page}` + `&size=${data.size}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getAllHistoryTiepCd({ page, size, sort, dmBHXHId }): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(TIEPCONGDAN.createNewCongdan + '?page=' + page + '&size=' + size + '&dmBHXHId=' + dmBHXHId + '&sort=' + sort);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getDetailHistoryTiepCd(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(TIEPCONGDAN.detailHistoryTiepCongDan + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getTiepCongDanInforByCongDanID(congDanID): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(TIEPCONGDAN.getTiepCongDanInfor + '?congDanID=' + congDanID);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  // for autocomplete
  searchByName(name: any): Observable<any> {
    const options = createHttpHeader(this.authService);
    return this.http.get(TIEPCONGDAN.searchByName + '?searchValue=' + name, options)
    .map(res => res.json());
  }

  getTiepCongDanDonThu(coDonThu, pagging: Pagging): Observable<any> {
    const options = createHttpHeader(this.authService);
    return this.http.post(TIEPCONGDAN.searchDonThu + '?page=' + (pagging.currentPage - 1) + '&size=' + pagging.itemsPerPage, {
      coDonThu: coDonThu
    }, options);
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
