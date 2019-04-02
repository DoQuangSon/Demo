import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DANH_MUC } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class NoiDmNoiDungTtktService {

  constructor(
    private http: HttpClient,
  ) { }

  getDmNoiDungTTKT(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_NOI_DUNG_TTKTS + '?page=' + page + '&size=' + size + '&active=');//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmNoiDungTTKTByActiveTrue(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_NOI_DUNG_TTKTS + '?page=' + page + '&size=' + size + '&active=true');//, options)
      //.map(extractData)
      //.catch(handleError);
  }


  creatDmNoiDungTTKT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_NOI_DUNG_TTKTS, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDmNoiDungTTKT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_NOI_DUNG_TTKTS, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDmNoiDungTTKT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_NOI_DUNG_TTKTS+ `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deactiveDmNoiDungTTKT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DEACTIVE_DM_NOI_DUNG_TTKTS + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  activeDmNoiDungTTKT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.ACTIVE_DM_NOI_DUNG_TTKTS + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getAllChiTietND(page, size): Observable<any> {
    return this.http.get(DANH_MUC.DM_CHI_TIET_NOI_DUNG_TTKT + `?page=${page}&size=${size}`);
  }

  getChiTietNDByDmPhanLoai(dmNoiDungTTKTId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_CHI_TIET_NOI_DUNG_TTKT + `?dmNoiDungTTKTId=${dmNoiDungTTKTId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  creatChiTietNDOfDmPhanLoai(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_CHI_TIET_NOI_DUNG_TTKT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateChiTietNDOfDmPhanLoai(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_CHI_TIET_NOI_DUNG_TTKT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteChiTietNDOfDmPhanLoai(id:number): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_CHI_TIET_NOI_DUNG_TTKT+ `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deactiveChiTietNDOfDmPhanLoai(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DEACTIVE_DM_CHI_TIET_NOI_DUNG_TTKT + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  activeChiTietNDOfDmPhanLoai(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.ACTIVE_DM_CHI_TIET_NOI_DUNG_TTKT + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  
  getDmNoiDungTTKTLastByActiveTrue(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_NOI_DUNG_TTKTS + "/no-child");//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
