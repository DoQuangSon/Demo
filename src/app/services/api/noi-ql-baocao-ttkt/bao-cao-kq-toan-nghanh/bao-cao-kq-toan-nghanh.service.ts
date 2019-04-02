import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QL_BAOCAO_TTKT } from '../../../../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class BaoCaoKqToanNganhService {
  constructor(
    private http: HttpClient,
  ) { }

  searchAll(data: any, page: any, size: any): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.BC_KET_QUA_TOAN_NGANH_ROOT + '?nam='+data.nam+'&page=' + page + '&size=' + size);
  }

  create(body: any): any {
    // @Todo: Chua co api
    return this.http.post(QL_BAOCAO_TTKT.BC_KET_QUA_TOAN_NGANH_ROOT, body);
  }

  getById(id: any): any {
    return this.http.get(QL_BAOCAO_TTKT.BC_KET_QUA_TOAN_NGANH_ROOT + '/' + id);
  }
}
