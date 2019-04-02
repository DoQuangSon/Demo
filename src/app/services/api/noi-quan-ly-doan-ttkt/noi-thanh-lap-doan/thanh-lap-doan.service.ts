import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IfilerQuyetDinhTldoan } from './ifiler-quyet-dinh-tldoan.interface';
import { THANH_LAP_DOAN, THANH_LAP_DOAN_V2, QDINH_TTKT_BHXHVN } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class ThanhLapDoanService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllQD(page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.GET_ALL + `?page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchQuyetDinh(body, page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(THANH_LAP_DOAN.GET_ALL + `?page=${page}&size=${size}`, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  creatThanhLapDoan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(THANH_LAP_DOAN.GET_ALL, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  editThanhLapDoan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(THANH_LAP_DOAN.GET_ALL, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getThanhLapDoanById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.GET_ALL + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getSoLanDieuChinhThanhLapDoanById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.GET_SO_LAN_DIEU_CHINH_QD + `?id=${id}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getDsQDinhByOwnerTW(isTW: boolean, dmbhxhId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.GET_DS_BY_OWNERTW + `?isOwnerTW=${isTW}&dmbhxhId=${dmbhxhId}&page=${page}&size=${size}` + '&sort=id,desc');//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchByTenQDinh(tenQuyetDinh,dmbhxhId,isTW: boolean, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.SEARCH_BY_TEN_QD + `?TenQuyetDinh=${tenQuyetDinh}&dmbhxhId=${dmbhxhId}&isOwnerTW=${isTW}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  changeSTTThanhLapDoan(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(THANH_LAP_DOAN.CHANGE_STT, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  getListScopeOfYear(isTW: boolean, isTrongKeHoach: boolean, year: number, dmTinhHuyenId: number): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    let url: string;
    if (dmTinhHuyenId === null) {
      url = THANH_LAP_DOAN.GET_LIST_SCOPE_OF_YEAR + `?isOwnerTw=${isTW}&isTrongKeHoach=${isTrongKeHoach}&year=${year}`;
    } else {
      url = THANH_LAP_DOAN.GET_LIST_SCOPE_OF_YEAR + `?isOwnerTw=${isTW}&isTrongKeHoach=${isTrongKeHoach}&year=${year}&dmTinhHuyenId=${dmTinhHuyenId}`;
    }

    return this.http.get(url); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  getInfoKhDuThao(dmTinhHuyenId: number, year: number, isTW: boolean): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN.GET_INFO_KHDUTHAO + `?dmTinhHuyenId=${dmTinhHuyenId}&year=${year}&isOwnerTW=${isTW}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getTLDTWGuiTinh(dmTinhhuyenId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QDINH_TTKT_BHXHVN.GET_TLD_CUA_TW_GUI_TINH + `?dmTinhhuyenId=${dmTinhhuyenId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchByTenQDinhAccTinh(dmTinhhuyenId, tenQuyetDinh, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QDINH_TTKT_BHXHVN.SEARCH_BY_TEN_QD_ACC_TINH + `?dmTinhHuyenId=${dmTinhhuyenId}&searchValue=${tenQuyetDinh}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  filterQuyetDinhThanhLapDoan(body: IfilerQuyetDinhTldoan): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(QDINH_TTKT_BHXHVN.FILTER_QUYET_DINH_THANH_LAP_DOAN, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }
  ver2CreatThanhLapDoan(body): Observable<any> {
    console.log(body);
    return this.http.post(THANH_LAP_DOAN_V2.THEM_MOI, body);//, options)
  }

  ver2DieuChinhTlDoan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(THANH_LAP_DOAN_V2.DIEU_CHINH, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  ver2TWGuiTinh(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(THANH_LAP_DOAN_V2.TW_GUI_TINH, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  ver2DuyetTLD(thanhLapDoanId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.DUYET + `?thanhLapDoanId=${thanhLapDoanId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  ver2DuyetDieuChinh(thanhLapDoanId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.DUYET_DIEU_CHINH + `?thanhLapDoanId=${thanhLapDoanId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  ver2QdinhCongBo(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(THANH_LAP_DOAN_V2.CONG_BO_QD, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateBaoCaoKetLuan(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(THANH_LAP_DOAN_V2.BAOCAO_KETLUAN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  checkDvDcTTKTDaTienHanh(dvdcTTKTId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.CHECK_DV_DA_TIEN_HANH + `?dvdcTTKTId=${dvdcTTKTId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  checkTLDKetThuc(thanhLapDoanId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.CHECK_TLD_KET_THUC + `?thanhLapDoanId=${thanhLapDoanId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  checkTLDBaoCao(thanhLapDoanId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.CHECK_DA_BAOCAO_DOAN + `?thanhLapDoanId=${thanhLapDoanId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  checkTLDKetLuan(thanhLapDoanId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(THANH_LAP_DOAN_V2.CHECK_DA_KETLUAN_DOAN + `?thanhLapDoanId=${thanhLapDoanId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
