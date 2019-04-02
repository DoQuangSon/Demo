import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HOST } from '../../../constants/api-port.constants';
import { KHDUTHAO, KH_TINH_DAU_NAM } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiKehoachDuthaoService {

  API_KH_DUKIEN_ID = HOST + '/api/kh-du-thaos/get-tinhdukien-with-live-data?';
  API_CHECK_KH_CREATED = HOST + '/api/kh-du-thaos/check-is-da-tao-ke-hoach?';
  API_CHECK_KH_DUKIEN_TINH_CREATED = HOST + '/api/kh-du-thaos/check-is-da-tao-ke-hoach-of-tinh-du-kien?';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page, size) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.create + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  createKeHoachTinhDauNam(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KH_TINH_DAU_NAM.create, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getKeHoachTinhDauNam(dmTinhHuyenId, page, size): Observable<any> {
    return this.http.get(KH_TINH_DAU_NAM.getKeHoachTinhDauNam + '?dmTinhHuyenId=' + dmTinhHuyenId + '&page=' + page + '&size=' + size);
  }
  searchKeHoachTinhDauNam(dmTinhHuyenId, tenKeHoach, page, size): Observable<any> {
    return this.http.get(KH_TINH_DAU_NAM.searchKeHoachTinhDauNam + '?dmTinhHuyenId=' + dmTinhHuyenId + '&tenKeHoach=' + tenKeHoach + '&page=' + page + '&size=' + size);
  }
  tinhDuyetKeHoachDauNam(khDuThaoId) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.tinhDuyetKeHoachDauNam + '?khDuThaoId=' + khDuThaoId);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  tinhGuiKeHoachDenTW(body) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KH_TINH_DAU_NAM.tinhGuiKeHoachDenTW, body);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getKeHoachTWGiao(dmTinhHuyenId, page, size) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.getKeHoachTWGiao + '?dmTinhHuyenId=' + dmTinhHuyenId + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  tinhXinDieuChinhKHTWGiao(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KH_TINH_DAU_NAM.tinhXinDieuChinhKHTWGiao, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  tinhXinDieuChinhKHBiTuChoi(body) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KH_TINH_DAU_NAM.tinhXinDieuChinhKHBiTuChoi, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getKeHoachDieuChinh(dmTinhHuyenId, page, size) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.getKeHoachDieuChinh + '?dmTinhHuyenId=' + dmTinhHuyenId + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getKHTinh(dmTinhHuyenId) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.GET_KH_TINH + '?tinhHuyenID=' + dmTinhHuyenId);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  searchKHTinh(dmTinhHuyenId, year) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.SEARCH_KH_TINH + '?tinhHuyenID=' + dmTinhHuyenId + `&year=` + year);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  searchKHAllTinhAllYear(dmTinhHuyenId) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KH_TINH_DAU_NAM.GET_KH_TINH + '?tinhHuyenID=' + dmTinhHuyenId);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }


  createNewKhDuthao(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KHDUTHAO.create, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateNewKhDuthao(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(KHDUTHAO.create, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getOwnerTw(dmTinhHuyen, page, size) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.getOwnerTW + '?isOwnerTW=true&dmTinhHuyen=' + dmTinhHuyen + '&page=' + page + '&size=' + size + '&sort=id,desc');//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.create + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getOwnerTinh(dmTinhHuyen, page, size) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.getOwnerTW + '?isOwnerTW=false&dmTinhHuyen=' + dmTinhHuyen + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  changeStatus(id, status): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.changeStatus + '?id=' + id + '&status=' + status);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getKhOld(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.khOld + id);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  updateLoiNhanAndStatus(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KHDUTHAO.loiNhan, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  twTuCHoiKeHoach(body) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KHDUTHAO.tuChoiKeHoach, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  twTuCHoiKhDieuChinh(body) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KHDUTHAO.tuchoiKhDieuChinh, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getByIdAndYear(id, year): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_KH_DUKIEN_ID + 'khDuThaoId=' + id + '&year=' + year);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  checkTinhTaoKH(tinhHuyenId, year, isOwnerTw): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_CHECK_KH_CREATED + 'tinhHuyenId=' + tinhHuyenId + '&year=' + year + '&isOwnerTw=' + isOwnerTw)//, options)
      .map(function (data) {
        return data;
      })
      //.catch(handleError);
  }

  checkTinhTaoKHDuKien(tinhHuyenId, year): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_CHECK_KH_DUKIEN_TINH_CREATED + 'tinhHuyenId=' + tinhHuyenId + '&year=' + year)//, options)
      .map(function (data) {
        return data;
      })
      //.catch(handleError);
  }
  getCurrentDieuChinh(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.getCurr + id);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getThongTinDieuChinh(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KHDUTHAO.getThongTinDieuChinh + id);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
