import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DANH_MUC } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class NoiDmPhanLoaiTieuThucService {

  constructor(
    private http: HttpClient,
  ) { }

  getDmPhanLoaiTT(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_PHAN_LOAI_TIEUTHUC + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDmTieuThucByParent(id, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DM_PHAN_LOAI_TIEUTHUC + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  creatDmPhanLoaiTT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_PHAN_LOAI_TIEUTHUC, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDmPhanLoaiTT(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_PHAN_LOAI_TIEUTHUC, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDmPhanLoaiTT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_PHAN_LOAI_TIEUTHUC+ `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deactiveDmPhanLoaiTT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DEACTIVE_PHAN_LOAI_TIEUTHUC + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  activeDmPhanLoaiTT(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.ACTIVE_PHAN_LOAI_TIEUTHUC + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getChiTietTTByDmPhanLoai(dmPhanLoaiTieuThucId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_CHI_TIET_TIEUTHUC + `?dmPhanLoaiTieuThucId=${dmPhanLoaiTieuThucId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  creatChiTietTTOfDmPhanLoai(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.DM_CHI_TIET_TIEUTHUC, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateChiTietTTOfDmPhanLoai(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.DM_CHI_TIET_TIEUTHUC, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteChiTietTTOfDmPhanLoai(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.DM_CHI_TIET_TIEUTHUC+ `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deactiveChiTietTTOfDmPhanLoai(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.DEACTIVE_DM_CHI_TIET_TIEUTHUC + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  activeChiTietTTOfDmPhanLoai(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.ACTIVE_DM_CHI_TIET_TIEUTHUC + `?id=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getKetLuan(ketluan): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_KET_LUAN + `?ketluan=${ketluan}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getChiTietTTKetLuan(dmPhanLoaiTieuThucId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_CHI_TIET_KET_LUAN + `?dmPhanLoaiTieuThucId=${dmPhanLoaiTieuThucId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  saveListChiTietTTKetLuan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.SAVE_KET_LUAN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getChiTiet(chiTietId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_CHI_TIET + `?tieuThucId=${chiTietId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  removeChiTiet(ketLuanId, tieuThucId) {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.REMOVE_CHI_TIET + `?ketLuanId=${ketLuanId}&tieuThucId=${tieuThucId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getListDmTieuThuc(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.GET_LIST_DM_TIEU_THUC);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
