import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { KE_HOACH_BHXH_TINH } from '../../../constants/api.constants';
import { KE_HOACH } from '../../../constants/api-ttkt.constants';

declare function escape(s: string): string;
@Injectable({   providedIn: 'root' })
export class KeHoachBhxhTinhService {

  constructor(
    private http: HttpClient,
  ) { }

  searchKeHoachBHXHTinh(year?, tinhHuyenId?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH_BHXH_TINH.SEARCH_KH + `?year=${year}&tinhHuyenId=${tinhHuyenId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getSoLanDieuChinhKHById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH_BHXH_TINH.GET_SO_LAN_DIEU_CHINH_KH + `?Id=${id}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  tinhTaoKeHoachDuKien(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KE_HOACH.TINH_TAO_KE_HOACH_DU_KIEN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getListKeHoachDuKienTinh(dmTinhHuyenId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TINH_XEM_LIST_KE_HOACH_DU_KIEN + `?dmTinhHuyenId=${dmTinhHuyenId}&page=${page}&size=${size}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  duyetKeHoachDuKienTinh(khDuThaoId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(KE_HOACH.TINH_DUYET_KE_HOACH_DU_KIEN + `?khDuThaoId=${khDuThaoId}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getKeHoachWithLiveData(khDuThaoId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    const year = (new Date).getFullYear();
    return this.http.get(KE_HOACH.GET_TINHDUKIEN_WITH_LIVEDATA + `?khDuThaoId=${khDuThaoId}&year=${year}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  tinhDieuChinhKeHoachDuThao(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(KE_HOACH.TINH_DIEU_CHINH_KH_DUKIEN, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  twXemTienDoTinhThucHien(year, dmTinhHuyenIds): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    dmTinhHuyenIds = escape(dmTinhHuyenIds);
    return this.http.get(KE_HOACH.TW_XEM_TIEN_DO_TINH_THUC_HIEN + `?year=${year}&dmTinhHuyenIds=${dmTinhHuyenIds}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getSoLieuThongKeTinhThucHienKeHoach(year, dmTinhHuyenId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    dmTinhHuyenId = escape(dmTinhHuyenId);
    return this.http.get(KE_HOACH.GET_SO_LIEU_THONG_KE_TINH_THUC_HIEN_KE_HOACH + `?year=${year}&dmTinhHuyenId=${dmTinhHuyenId}`);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
}
