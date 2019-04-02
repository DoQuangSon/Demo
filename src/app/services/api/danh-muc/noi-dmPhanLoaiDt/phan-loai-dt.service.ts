import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DANH_MUC, DOI_TUONG } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class PhanLoaiDtService {

  constructor(
    private http: HttpClient,
  ) { }

  getListPhanLoaiDt(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DANH_MUC.PHAN_LOAI_DT + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deactivePhanLoaiDt(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DANH_MUC.PHAN_LOAI_DT + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  createPhanLoaiDt(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DANH_MUC.PHAN_LOAI_DT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updatePhanLoaiDt(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DANH_MUC.PHAN_LOAI_DT, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDtByPhanLoaiDt(idDoiTuong, dmTinhHuyenId, page, size): Observable<any> {
    // dmTinhHuyenId là id của địa bàn được chọn trong trang ý
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DOI_TUONG.GET_BY_PLOAI_DT + `?phanLoaiDtId=${idDoiTuong}&dmTinhHuyenId=${dmTinhHuyenId}&page=${page}&size=${size}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchDtByTen(body): Observable<any> {
    return this.http.post(DOI_TUONG.SEARCH_BY_TEN_DT, body);
  }
}
