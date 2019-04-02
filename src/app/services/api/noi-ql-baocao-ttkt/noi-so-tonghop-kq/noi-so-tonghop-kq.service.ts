import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QL_BAOCAO_TTKT } from '../../../../constants/api.constants';
import {PrintService} from '../../print/print.service';

@Injectable({ providedIn: 'root' })
export class NoiSoTonghopKqService {

  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

  updateSoTongHopKQ(formBody): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(QL_BAOCAO_TTKT.UPDATE_SO_TONGHOP_KQ, formBody); // , options)
    // .map(extractData)
    // .catch(handleError);
  }

  getDanhSachBaoCao(params: any, page: any, size: any): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(QL_BAOCAO_TTKT.SEARCH_DS_BAO_CAO + '?name=' + params.search + '&page=' + page + '&size=' + size); // , options)
    // .map(extractData)
    // .catch(handleError);

    //   return Observable.of([
    //     {
    //       id: 1,
    //       nam: 'I/2017',
    //       thoiGianLap: '31/03/2017',
    //     },
    //     {
    //       id: 2,
    //       nam: 'II/2017',
    //       thoiGianLap: '30/06/2017',
    //     },
    //     {
    //       id: 3,
    //       nam: 'III/2017',
    //       thoiGianLap: '30/09/2017',
    //     },
    //     {
    //       id: 4,
    //       nam: 'IV/2017',
    //       thoiGianLap: '31/12/2017',
    //     }
    //   ]);

  }

  getChiTietBaoCao(id): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.SEARCH_DS_BAO_CAO + '/' + id);
  }

  filterSoTongHopKQ(body: any): Observable<any> {
    return this.http.post(QL_BAOCAO_TTKT.FILTER_DS_BAO_CAO, body);
  }

  getSoTHKQTTKT(nam: number, currentPage: number, itemsPerPage: number): any {
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT + `?nam=${nam}&page=${currentPage}&size=${itemsPerPage}`);
  }

  getSoTHKQTTKTById(id: any): any {
    // @Todo: Chua co api
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT + '/' + id);
  }

  getBCTH(nam: number, currentPage: number, itemsPerPage: number): any {
    return this.http.get(QL_BAOCAO_TTKT.GET_BAO_CAO_TONG_HOP_BY_YEAR + `?nam=${nam}&page=${currentPage}&size=${itemsPerPage}`);
  }

  getBCTHById(id: any): any {
    // @Todo: Chua co api
    return this.http.get(QL_BAOCAO_TTKT.GET_BAO_CAO_TONG_HOP_BY_YEAR + '/' + id);
  }

  chuyenBaoCaoTongHop(id: number): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.CHUYEN_BAO_CAO_TONG_HOP + `?id=${id}`);
  }

    printMauBaoCao01(id, type) {
        this.printService.printMauBaoCao01(QL_BAOCAO_TTKT.PRINT_MAU_01 + '?id=' + id, type);
    }

    printMauBaoCao03(id, ngayTao, type) {
        this.printService.printMauBaoCao03(QL_BAOCAO_TTKT.PRINT_MAU_03 + '?id=' + id + '&ngayTao=' + ngayTao, type);
    }

    printMauBaoCao03_DotXuat(date, type) {
        this.printService.printMauBaoCao03(QL_BAOCAO_TTKT.PRINT_MAU_03_DOT_XUAT + '?date=' + date, type);
    }
}
