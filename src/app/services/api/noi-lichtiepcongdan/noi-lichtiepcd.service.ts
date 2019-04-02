//import { extractData, handleError, createCommonHeaders, extractDataArray } from '../http-req';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LICHTIEPCD } from '../../../constants/api.constants';
import { Pagging } from '../../../shared/models/pagging.model';

@Injectable({   providedIn: 'root' })
export class NoiLichtiepcdService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllLichtiepCd(data: any, body:any): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LICHTIEPCD.createNewLichtiepCd + `/group-user?page=${data.page}&size=${data.size}&dmbhxhId=${data.dmbhxhId}&isCanBo=${data.isCanBo}`, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  
  getAllLichtiepCd2(data: any, body:any): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LICHTIEPCD.createNewLichtiepCd + `/group-user-lanh-dao2?page=${data.page}&size=${data.size}&dmbhxhId=${data.dmbhxhId}&isCanBo=${data.isCanBo}`, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  createNewLichtiepCd(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(LICHTIEPCD.createNewLichtiepCd, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateNewLichtiepCd(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(LICHTIEPCD.createNewLichtiepCd, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteNewLichtiepCd(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(LICHTIEPCD.createNewLichtiepCd + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchLichTiepCongDan(ten, fromDate, toDate, page, size, dmbhxhId, isLichCanBo): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LICHTIEPCD.searchLichTiepCd + `?tenHienThi=${ten}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}&dmbhxhId=${dmbhxhId}&isLichCanBo=${isLichCanBo}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListCanBo(dmTinhHuyenId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LICHTIEPCD.getListCanBo + `?dmbhxhId=${dmTinhHuyenId}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListCanBoHomNay(dmbhxhId, searchDate): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LICHTIEPCD.getListCanBoHomNay + `?dmbhxhId=${dmbhxhId}` + `&searchDate=${searchDate}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  
  getListDonThuChuaXuLy(dmbhxhId, pagging: Pagging): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(LICHTIEPCD.getListCanBoHomNay + `?dmbhxhId=${dmbhxhId}&page=${pagging.currentPage - 1}&size=${pagging.itemsPerPage}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
