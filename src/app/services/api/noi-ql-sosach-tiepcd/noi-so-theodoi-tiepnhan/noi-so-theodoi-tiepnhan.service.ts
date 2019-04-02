import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {DTTOCAO, QL_SOSACH_TIEP_CD} from '../../../../constants/api.constants';
import {PrintService} from '../../print/print.service';

@Injectable({   providedIn: 'root' })
export class NoiSoTheodoiTiepnhanService {
  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

  // {
  //   "dmbhxhId": 0,
  //   "month": 0,
  //   "quy": 0,
  //   "year": 0
  // }

  getTongHopSoTheoDoi({ dmbhxhId, month, quy, year }): Observable<any> {
    const body: any = {
      dmbhxhId: dmbhxhId,
      month: month,
      quy: quy,
      year: year
    };
    // const options = createCommonHeaders(this.authService);
    return this.http.post(QL_SOSACH_TIEP_CD.GET_TONGHOP_SO_THEODOI_TIEPNHAN, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }
  listBaoCaoTH(namKeHoach): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll_BCTH + `?namKeHoach=${namKeHoach}`);
  }
  chitietBaoCaoTH(id): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll_BCTH + `/${id}`);
  }
  soTheoDoiTiepCongDan( fromDate, toDate ): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.SO_THEO_DOI_TIEP_CONG_DAN_URL + '?' + `&fromDate=${fromDate}` + `&toDate=${toDate}`);
  }
  listSoTheoDoi(namKeHoach): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll + `?namKeHoach=${namKeHoach}`);
  }

  chitietSoTheoDoi(id): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll + `/${id}`);
  }

  printMauBaoCao28(year, month, type, isDotXuat): void {
    if (type === 1) {
      // this.printService.printMauBaoCao28(QL_SOSACH_TIEP_CD.PRINT_SO_THEO_DOI_TIEP_NHAN + '?' + `year=${year}` + `&month=${month}` + '&type=PDF&isDotXuat=' + isDotXuat, type);
    } else if (type === 2) {
      this.printService.printMauBaoCao28(QL_SOSACH_TIEP_CD.PRINT_SO_THEO_DOI_TIEP_NHAN + '?' + `year=${year}` + `&month=${month}` + '&type=EXCEL&isDotXuat=' + isDotXuat, type);
    }
  }
  chitietSoTheoDoiByFromAndDmbhxh(req: any): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll + `/get-by-from-dmbhxh?fromDate=${req.fromDate}&dmbhxhId=${req.dmbhxhId}`);
  }

  chitietBaoCaoTHByFromAndDmbhxh(req: any): Observable<any> {
    return this.http.get(QL_SOSACH_TIEP_CD.getAll_BCTH + `/get-by-from-dmbhxh?fromDate=${req.fromDate}&dmbhxhId=${req.dmbhxhId}`);
  }

  printMau29(year, quarter, month, type, isDotXuat, dmBHXHID?) {
      let url = QL_SOSACH_TIEP_CD.PRINT_MAU_29 + '?' + 'year=' + year + '&quarter=' + quarter + '&month=' + month +
          '&isDotXuat=' + isDotXuat;
      if (type === 1) {
          url += '&type=PDF';
      } else if (type === 2)  {
          url += '&type=EXCEL';
      }
      if (dmBHXHID !== null && dmBHXHID !== undefined) {
          url += '&dmBHXHID=' + dmBHXHID;
      }
      this.printService.printMauBaoCao29(url, type);
  }


    printMau29_Cach2(id, data, type) {
        let url = QL_SOSACH_TIEP_CD.PRINT_MAU_29_CACH_2;
        if (type === 1) {
            url += '?id=' + id + '&type=PDF';
        } else if (type === 2)  {
            url += '?id=' + id + '&type=EXCEL';
        }
        this.printService.printMauBaoCao29_Cach2(url, data, type);
    }

  guiBaoCaoTinh(id): Observable<any> {
    return this.http.post(QL_SOSACH_TIEP_CD.GUI_BAO_CAO_TINH + `?id=${id}`, null);
  }
}
