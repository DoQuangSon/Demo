import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DMTINHHUYEN } from '../../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiDmTinhHuyenService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmTinhHuyen(page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHHUYEN.resource + '?page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  createDmTinhHuyen(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMTINHHUYEN.resource, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updateDmTinhHuyen(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMTINHHUYEN.resource, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  deleteDmTinhHuyen(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMTINHHUYEN.resource + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDanhSachTinhThanh(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHHUYEN.danhSachTinhThanh);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getDsHuyenByTinh(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHHUYEN.danhSachHuyenOfTinh + `?tinhThanhId=${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  searchDmTinhHuyen(tenTinhHuyen, maTinhHuyen, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMTINHHUYEN.searchTinhHuyen + '?tenTinhHuyen=' + tenTinhHuyen + '&maTinhHuyen=' + maTinhHuyen + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getTenPhamVi(id, listTinhHuyen) {
    for (const item of listTinhHuyen) {
      if (Number(id) === Number(item.dmTinhHuyenId) || Number(id) === Number(item.id)) {
        return item.tenTinhHuyen;
      }
    }
  }
}
