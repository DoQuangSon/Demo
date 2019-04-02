import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HOST } from '../../../constants/api-port.constants';
import { KE_HOACH } from '../../../constants/api-ttkt.constants';
import { createPdfHeaders } from '../http-req';
import { GHI_CHU_OFTWS } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class KeHoachToanNganhService {
  API_LINK_KEHOACH_TW: any = HOST + '/api/kh-du-thaos/search-by-status-use-by-tw-only?';
  API_LINK_KEHOACH: any = HOST + '/api/kh-du-thaos/search-by-status?';
  API_LINK_TINH_CHUAGUI: any = HOST + '/api/kh-du-thaos/search-tinh-chua-gui?';
  API_LINK_KH_BHXH: any = HOST + '/api/kh-du-thaos/search-by-owner-tw?isOwnerTW=';
  API_LINK_KEHOACH_DUKIEN: any = HOST + '/api/kh-du-thaos/get-danh-sach-tinhhuyen-du-kien?';
  API_LINK_KE_HOACH_TW_DAU_NAM: any = HOST + '/api/kh-du-thaos/';
  API_LINK_TW_XEM_KE_HOACH_DAU_NAM: any = HOST + '/api/kh-du-thaos/tw-xem-ke-hoach-dau-nam-cua-minh';
  API_LINK_UPDTAE_KE_HOACH_TW_DAU_NAM: any = HOST + '/api/kh-du-thaos';
  API_DUYET_KH_DU_THAO_TW: any = HOST + '/api/kh-du-thaos/tw-duyet-ke-hoach-du-thao';
  API_LINK_KE_HOACH_CHO_TW_DUYET: any = HOST + '/api/kh-du-thaos/tw-xem-danh-sach-ke-hoach-cho-duyet';
  API_LINK_TW_DUYET_KE_HOACH_TINH_GUI: any = HOST + '/api/kh-du-thaos/tw-duyet-ke-hoach-tinh-gui?';
  API_LINK_TW_TU_CHOI_KE_HOACH_TINH_GUI: any = HOST + '/api/kh-du-thaos/tw-tu-choi-kh?';
  API_LINK_KE_HOACH_TW_DA_DUYET: any = HOST + '/api/kh-du-thaos/tw-xem-danh-sach-ke-hoach-da-duoc-duyet-dau-nam-cua-tinh?';
  API_LINK_KE_HOACH_GIAO_TINH: any = HOST + '/api/kh-du-thaos/tw-lay-danh-sach-ke-hoach-de-dieu-chinh-va-giao-tinh?';
  API_LINK_GIAO_KE_HOACH_CHO_TINH: any = HOST + '/api/kh-du-thaos/tw-giao-ke-hoach-cho-63-tinh-thanh';
  DIEU_CHINH_DA_GIAO: any = HOST + '/api/kh-du-thaos/tw-dieu-chinh-ke-hoach-da-giao-cho-63-tinh-thanh';
  API_LINK_KE_HOACH_XIN_DIEU_CHINH_CHO_DUYET: any = HOST + '/api/kh-du-thaos/tw-xem-ke-hoach-dieu-chinh-dang-cho-duyet';
  API_LINK_TW_TAO_KE_HOACH_DAU_NAM: any = HOST + '/api/kh-du-thaos/tw-tao-ke-hoach-dau-nam';
  API_LINK_TW_DIEU_CHINH_KE_HOACH_DAU_NAM: any = HOST + '/api/kh-du-thaos/tw-dieu-chinh-ke-hoach-dau-nam';
  API_LINK_TW_DUYET_DIEU_CHINH_KE_HOACH_TINH: any = HOST + '/api/kh-du-thaos/tw-chap-nhan-tinh-xin-dieu-chinh-ma-tw-giao';
  API_LINK_TW_TU_CHOI_DIEU_CHINH_KE_HOACH_TINH: any = HOST + '/api/kh-du-thaos/tw-tu-choi-tinh-xin-dieu-chinh-ma-tw-giao';
  API_LINK_TW_DUYET_TAO_KE_HOACH_DAU_NAM: any = HOST + '/api/kh-du-thaos/tw-duyet-tao-ke-hoach';
  // API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH = HOST + '/api/kh-du-thaos/tw-xem-danh-sach-ke-hoach-da-giao-cho-tinh';
    API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH = HOST + '/api/kh-du-thaos/searchKeHoachByYear';

  API_TW_XEM_DANH_SACH_KE_HOACH_CO_THE_GIAO_CHO_TINH_BY_YEAR = HOST + '/api/kh-du-thaos/search-Ke-Hoach-TW-Co-The-Giao-By-Year';
  API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH_OR_CHAP_NHAN_CHINH_SUA_BY_YEAR = HOST + '/api/kh-du-thaos/search-Ke-Hoach-TW-Giao-Or-Chap-Nhan-By-Year';

  API_TW_XEM_DANH_SACH_KE_HOACH_TINH_XIN_DIEU_CHINH_DA_DUOC_CHAP_NHAN = HOST + '/api/kh-du-thaos/tw-xem-danh-sach-ke-hoach-tinh-xin-dieu-chinh-da-duoc-chap-nhan';
  API_XEM_LAI_LICH_SU_DIEU_CHINH = HOST + '/api/kh-du-thaos/search-Lich-Su-Ke-Hoach-TW-giao-By-Ke-Hoach-ID';
  API_XEM_LAI_LICH_SU_DA_GIAO_BHXHVN = HOST + '/api/kh-du-thaos/searchAllKeHoachByKeHoachID';
  API_NHAC_NHO_DS_TINH_CHUA_GUI_KHTTKT = HOST + '/api/tw-nhac-nho';
  API_GET_LIST_LICH_SU_DA_GIAO = HOST + '/api/kh-du-thaos/search-Lich-Su-Ke-Hoach-TW-Giao-Or-Chap-Nhan-By-Year';

  API_LINK_KE_HOACH_TW_DA_DUYET_PRINT: any = HOST + '/api/kh-du-thaos/tw-xem-danh-sach-ke-hoach-da-duoc-duyet-dau-nam-cua-tinh/print?';
  API_LINK_KE_HOACH_DU_THAO_PRINT: any = HOST + '/api/kh-du-thaos/';
  API_TW_XEM_KE_HOACH_DU_THAO: any = HOST + '/api/kh-du-thaos/tw-find-all-ke-hoach-du-thao';
  API_TW_TAO_KE_HOACH_DU_THAO: any = HOST + '/api/kh-du-thaos/tw-tao-ke-hoach-du-thao';
  constructor(
    private http: HttpClient,
  ) { }
  getLSDaGiaoKHBHXH(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_XEM_LAI_LICH_SU_DA_GIAO_BHXHVN + `?keHoachID=${id}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  guiDSNhacNhoTinhChuaGuiKH(DanhSachTinh) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_NHAC_NHO_DS_TINH_CHUA_GUI_KHTTKT, DanhSachTinh);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getListKeHoachTw(year?, status?, page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TW_SEARCH_BY_STT + `year=${year}&status=${status}&page=${page}&size=${size}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListKeHoach(year?, status?, dmTinhHuyenId?, page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.SEARCH_BY_STT + `year=${year}&status=${status}&dmTinhHuyenId=${dmTinhHuyenId}&page=${page}&size=${size}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListTinhChuaGui(year?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TINH_CHUAGUI + `year=${year}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListKeHoachChoTWDuyet(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_KE_HOACH_CHO_TW_DUYET);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListTwXemDanhSachKeHoachDaGiaoChoTinh(year): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    // return this.http.get(this.API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH + `?keHoachYear=${year}`);//, options)
    // return this.http.get(this.API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH + `?year=${year}`);//, options)
    return this.http.get(this.API_TW_XEM_DANH_SACH_KE_HOACH_DA_GIAO_CHO_TINH_OR_CHAP_NHAN_CHINH_SUA_BY_YEAR + `?year=${year}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getLichSuDieuChinh(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_XEM_LAI_LICH_SU_DIEU_CHINH + `?keHoachID=${id}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getListTwXemDanhSachKeHoachTinhXinDieuChinhDaDuocChapNhan(year): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_TW_XEM_DANH_SACH_KE_HOACH_TINH_XIN_DIEU_CHINH_DA_DUOC_CHAP_NHAN + `?year=${year}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getListKeHoachTWDaDuyet(year): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_KE_HOACH_TW_DA_DUYET + 'year=' + year); // , options)
      // .map(extractDataArray)
      // atch(handleError);
  }

  printListKeHoachTWDaDuyet(year): Observable<any> {
    // { responseType: 'arraybuffer' as 'json' }
    const options = {};
    options['responseType'] = 'text';
    options['content-type'] =  'application/json';
    return this.http.get(this.API_LINK_KE_HOACH_TW_DA_DUYET_PRINT + 'year=' + year, options); // , options);
  }

  printKeHoachDuThaoByID(id): Observable<any> {
    const options = {};
    options['responseType'] = 'text';
    options['content-type'] =  'application/json';
    return this.http.get(this.API_LINK_KE_HOACH_DU_THAO_PRINT + id + '/print' , options);
  }

  loadPdf(res): Blob {
    const byteCharacters = atob(res);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new window.Blob([byteArray], {type: 'application/pdf'});
  }

  getListKeHoachGiaoTinh(year): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_TW_XEM_DANH_SACH_KE_HOACH_CO_THE_GIAO_CHO_TINH_BY_YEAR + '?year=' + year); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  getListLichSuDaGiao(year): Observable<any>{
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_GET_LIST_LICH_SU_DA_GIAO + '?year=' + year); // , options)
      // map(extractDataArray)
      // .catch(handleError);
  }
  twDuyetKeHoachTinhGui(idKhDuThaos) {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_TW_DUYET_KE_HOACH_TINH_GUI + 'idKhDuThaos=' + idKhDuThaos); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twDuyetKeHoachDuKien(idKhDuThaos) {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_DUYET_KH_DU_THAO_TW + '?khDuThaoId=' + idKhDuThaos); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twTuChoiKeHoachTinhGui(updateKhDuThaoDTO) {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_TW_TU_CHOI_KE_HOACH_TINH_GUI, updateKhDuThaoDTO); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twGiaoKeHoachChoTinh(khDuThaoDTOS) {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_GIAO_KE_HOACH_CHO_TINH, khDuThaoDTOS, {
      responseType: 'text'
    }); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  updateDieuChinhDaGiao(listCu, listMoi) {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(this.DIEU_CHINH_DA_GIAO, {'khDuThaoDTOS_old': listCu, 'khDuThaoDTOS_new': listMoi},{responseType: 'text'}); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  getListKHDieuChinhChoDuyet(): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_KE_HOACH_XIN_DIEU_CHINH_CHO_DUYET); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twTaoKeHoachDauNam(khDuThaoDTO): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_TW_TAO_KE_HOACH_DAU_NAM, khDuThaoDTO); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twSuaKeHoachDauNam(khDuThaoDTO): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.put(this.API_LINK_KE_HOACH_TW_DAU_NAM, khDuThaoDTO); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twDieuChinhKeHoachDauNam(khDuThaoDTO) {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_TW_DIEU_CHINH_KE_HOACH_DAU_NAM, khDuThaoDTO); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twDuyetKeHoachDauNam(khDuThaoId) {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_TW_DUYET_TAO_KE_HOACH_DAU_NAM + '?khDuThaoId=' + khDuThaoId, {
      responseType: 'text'
    }); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  twDuyetDieuChinhKeHoachTinh(khDuThaoIds) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_TW_DUYET_DIEU_CHINH_KE_HOACH_TINH, khDuThaoIds);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  twTuChoiDieuChinhKeHoachTinh(updateKhDuThaoDTO) {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_LINK_TW_TU_CHOI_DIEU_CHINH_KE_HOACH_TINH, updateKhDuThaoDTO);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getKeHoachTWDauNam(id) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_KE_HOACH_TW_DAU_NAM + id);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  updateKeHoachTWDauNam(khDuThaoDTO) {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(this.API_LINK_UPDTAE_KE_HOACH_TW_DAU_NAM, khDuThaoDTO);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  twXemKeHoachDauNam(page, size): Observable<any>{
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_LINK_TW_XEM_KE_HOACH_DAU_NAM + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getKeHoachBHXHVN(boolean?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.SEARCH + boolean);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getGhiChuTW(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(GHI_CHU_OFTWS);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getGhiChuTWById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(GHI_CHU_OFTWS + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getKHDuKien(dmTinhHuyen?, page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.LIST_TINH_HUYEN_DUKIEN + `dmTinhHuyen=${dmTinhHuyen}&page=${page}&size=${size}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  twCheckStatus(khDuThaoId, keHoachYear) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TW_CHECK_STATUS_KH + `?khDuThaoId=${khDuThaoId}&keHoachYear=${keHoachYear}`);//, options)//.map(extractDataArray)//.catch(handleError);
  }
  tinhCheckStatus(khDuThaoId, keHoachYear) {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TINH_CHECK_STATUS_KH + `?khDuThaoId=${khDuThaoId}&keHoachYear=${keHoachYear}`);//, options)//.map(extractDataArray)//.catch(handleError);
  }

  twXemKeHoachDuThao(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(this.API_TW_XEM_KE_HOACH_DU_THAO + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  twTaoKeHoachDuThao(khDuThaoDTO): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(this.API_TW_TAO_KE_HOACH_DU_THAO, khDuThaoDTO);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
