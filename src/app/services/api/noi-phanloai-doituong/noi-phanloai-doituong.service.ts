import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PHANLOAIDT, QL_NHOM_NGUOI_DUNG } from '../../../constants/api.constants';
// import { extractData } from '../http-req';
import { ISearchLoaiDoiTuong } from './search-loai-doi-tuong.interface';
import { HttpClient } from '@angular/common/http';
import { createHttpHeader } from '../http-req';
import { AuthService } from '../../../auth/auth.service';
import { Http } from '@angular/http';
// import { createHttpHeader } from '../http-req';
@Injectable({   providedIn: 'root' })
export class NoiPhanloaiDoituongService {

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getAllDoituong({ page, size }): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.httpClient.get(PHANLOAIDT.resource + '?page=' + page + '&size=' + size); // , options)
      // .map(extractDataArray)
      // .catch(handleError);
  }
  getAll(maCha ,page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(PHANLOAIDT.GET_ALL + '?maCha=' + maCha + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  getNhomDonVi(page, size): Observable<any> {
    return this.httpClient.get(PHANLOAIDT.resource + '?page=' + page + '&size=' + size); // , options)
  }
  getTinhHuyen(maCha, value, page, size): Observable<any> {
    return this.httpClient.get(PHANLOAIDT.GET_TINH_HUYEN + '?' + `maCha=${maCha}` + `&value=${value}` + `&page=${page}` + `&size=${size}`);
  }
  // Phân loại đối tượng TTKT:
  // => Lấy danh sách về: /api/doi-tuong-ttkts/get-ds-doituong-ttkt-chua-phan-loai?dmTinhHuyenId=1&page=0&size=10
  // => Xóa phân loại: /api/doi-tuong-ttkts/phan-loai-doi-tuong-ttkt
  getDsDtChuaPhanLoai({ dmTinhHuyenId, page, size }): Observable<any> {
    return this.httpClient.get(PHANLOAIDT.DS_DOI_TUONG_TTKT_CHUA_PHAN_LOAI + '?dmTinhHuyenId=' + dmTinhHuyenId + '&page=' + page + '&size=' + size); // , options)
  }

  phanLoaiDoiTuongTTKT(formBody): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.post(PHANLOAIDT.PHAN_LOAI_DOI_TUONG, formBody);//, options)
      //.map(extractData)
      //.catch(handleError);

  }
  searchByTenDoiTuong(data: any): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.post(PHANLOAIDT.SEARCH_BY_TEN_DOI_TUONG, data);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  // Xóa phân loại đối tượng TTKT:
  // => Lấy danh sách về: /api/doi-tuong-ttkts/get-by-phan-loai-doi-tuong?phanLoaiDtId=1&dmTinhHuyenId=1&page=0&size=10
  // => Xóa phân loại: /api/doi-tuong-ttkts/phan-loai-doi-tuong-ttkt-remove-doi-tuong-from-list
  getDsByPhanLoaiDtIdAndDmTinhHuyenId({ phanLoaiDtId, dmTinhHuyenId, page, size }): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.get(PHANLOAIDT.DS_DOI_TUONG_TTKT + '?phanLoaiDtId=' + phanLoaiDtId + '&dmTinhHuyenId=' + dmTinhHuyenId + '&page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  delPhanLoaiDoiTuongTTKT(formBody): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.post(PHANLOAIDT.XOA_PHAN_LOAI_DOI_TUONG, formBody);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateNhomPhanLoaiDT(data): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.httpClient.put(PHANLOAIDT.UPDATE_NHOM_PHAN_LOAI_DT, data);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

}
