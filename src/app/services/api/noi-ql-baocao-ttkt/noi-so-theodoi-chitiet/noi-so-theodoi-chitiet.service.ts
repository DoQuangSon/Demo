import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {QL_BAOCAO_TTKT, QL_SOSACH_TIEP_CD} from '../../../../constants/api.constants';
import {PrintService} from '../../print/print.service';

@Injectable({   providedIn: 'root' })
export class NoiSoTheodoiChitietService {

  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

  getDSSoTheoDoiChiTiet(dmbhxhId, page, size): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.GET_DS_SO_THEODOI_CHITIET + `?dmbhxhId=${dmbhxhId}&page=${page}&size=${size}`);
  }

  searchSoTheoDoiChiTiet(dmbhxhId, dateFrom, dateTo, page, size): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.SEARCH_DS_SO_THEODOI_CHITIET + `?dmbhxhId=${dmbhxhId}&dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&size=${size}`);
  }

  getThongTinSoChiTietTaiDonVi(id): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.GET_THONG_TIN_SO_THEODOI_CHITIET + `?thanhLapDoanId=${id}`);
  }

  getSoTheoDoiChiTietTaiDonVi(doiTuongTTKTId, thanhLapDoanId): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.GET_SO_THEODOI_CHITIET_DONVI + `?thanhLapDoanId=${thanhLapDoanId}&doiTuongTTKTId=${doiTuongTTKTId}`);
  }

  saveSoTheoDoiChiTietTaiDonVi(formBody): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(QL_BAOCAO_TTKT.SAVE_SO_THEODOI_CHITIET_DONVI, formBody); // , options)
      // .map(extractData)
      // .catch(handleError);
  }
    printMauBaoCao02(thanhLapDoanId, doiTuongTTKTId, type, soVanBanChuyenCQ?, ngayChuyenCQ?, ndVanBanChuyenCQ?): void {

        let url = QL_BAOCAO_TTKT.PRINT_MAU_02 + '?thanhLapDoanId=' + thanhLapDoanId + '&doiTuongTTKTId=' + doiTuongTTKTId;
        if (soVanBanChuyenCQ) {
            url += '&soVanBanChuyenCQ=' + soVanBanChuyenCQ.trim();
        }
        if (ngayChuyenCQ) {
            url += '&ngayChuyenCQ=' + ngayChuyenCQ;
        }
        if (ndVanBanChuyenCQ) {
            url += '&ndVanBanChuyenCQ=' + ndVanBanChuyenCQ.trim();
        }
        this.printService.printMauBaoCao02(url, type);
    }

    printMauBaoCao02_Cach2(soTheoDoi, listTieuThuc, type): void {
      const data = {
          listTieuThuc: {},
          soTheoDoiKetQuaTTKTDTO: {}
      };
      data.listTieuThuc = listTieuThuc;
      data.soTheoDoiKetQuaTTKTDTO = soTheoDoi;
        this.printService.printMauBaoCao02_Cach2(QL_BAOCAO_TTKT.PRINT_MAU_02_CACH_2, data, type);
    }

  xemLichSu(nam, thang, dsdvId): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.XEM_LICH_SU_SO_02 + `?nam=${nam}&thang=${thang}&dsdvId=${dsdvId}`);
  }

}
