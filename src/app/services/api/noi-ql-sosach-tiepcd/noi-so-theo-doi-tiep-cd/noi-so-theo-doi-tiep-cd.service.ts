import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QL_SOSACH_TIEP_CD } from '../../../../constants/api.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoiSoTheoDoiTiepCdService {

  constructor(
    private http: HttpClient,
  ) { }

  listSoTheoDoiTiepCd(namKeHoach): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.GET_ALL_SO_TD_TIEPCD + `?nam=${namKeHoach}`);
  }
  chitietSoTheoDoiTiepCd(id): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.GET_ALL_SO_TD_TIEPCD + `/${id}`);
  }
  getLiveData(req: any): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.GET_ALL_SO_TD_TIEPCD + `/get-live-data?fromDate=${req.fromDate}`);
  }
}
