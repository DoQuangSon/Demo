import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DANH_MUC } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class DmCanCuService {

  constructor(
    private http: HttpClient,
  ) { }

  getDmDviCtri(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_DV_C_TRI + `?page=0&size=1000`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmDviCtriByType(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_DV_C_TRI_BY_TYPE + `?page=0&size=1000`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmCanCuTTKT(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_CAN_CU_TTKT + '?page=' + page + '&size=' + size + '&active=');//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmCanCuTTKTByActiveTrue(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_CAN_CU_TTKT + '?page=' + page + '&size=' + size + '&active=true');//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDMCanCu(dmCanCuID): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_CAN_CU_TTKT + '/' + dmCanCuID);//, options)
      //.map(extractData)
      //.catch(handleError);
  }


  deactiveDmCanCu(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DEACTIVE_DM_CAN_CU_TTKT + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  activeDmCanCu(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.ACTIVE_DM_CAN_CU_TTKT + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  createDmCanCu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_CAN_CU_TTKT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateDmCanCu(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_CAN_CU_TTKT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmNoiDungTTKT(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.NOI_DUNG_TTKT + `?page=0&size=1000&active=`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmNoiDungTTKTByActiveTrue(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.NOI_DUNG_TTKT + `?page=0&size=1000&active=true`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmChiTietNd(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.CHI_TIET_ND + `?page=0&size=1000`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getByIsNDTT(isNoiDungThanhTra): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_BY_IS_ND_TT + `?isNoiDungThanhTra=${isNoiDungThanhTra}&page=0&size=1000`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getByDmNoiDungTtktId(dmNoiDungTTKTId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_BY_DM_NDTTKT_ID + `?dmNoiDungTTKTId=${dmNoiDungTTKTId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getByTenNoiDung(tenNoiDung, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_BY_TEN_NOIDUNG + `?tenNoiDung=${tenNoiDung}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getByTenNoiDungAndDM_NoiDung_TTKT_ID(dmnoidung_ttkt_id, tenNoiDung, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_BY_TEN_NOIDUNG_AND_DM_NOIDUNG_TTKT_ID + `?dmnoidung_ttkt_id=${dmnoidung_ttkt_id}&tenNoiDung=${tenNoiDung}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
