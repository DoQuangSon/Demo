import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GIAI_TRINH_TTKT, TIEN_HANH_TTKT} from '../../../../constants/api-ttkt.constants';
import {DTKHIEUNAI} from '../../../../constants/api.constants';
import {PrintService} from '../../print/print.service';

@Injectable({   providedIn: 'root' })
export class TienHanhTtktService {

  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

  getDsChiTietTienHanhTTKT(isTW, dmbhxhId, page, size): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.GET_DS_CHI_TIET + `?isOwnerTW=${isTW}&dmBHXHId=${dmbhxhId}&page=${page}&size=${size}`);//, options)
  }

  getTheoDoiHdDoan(id): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.GET_THEO_DOI_HD_DOAN + `?thanhLapDoanId=${id}`);//, options)
  }

  getTienHanhTTKTById(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(TIEN_HANH_TTKT.GET_ALL + `/${id}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getByDvTtktId(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(TIEN_HANH_TTKT.GET_BY_DVDCTTKT_ID + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  creatTienHanhTTKT(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(TIEN_HANH_TTKT.GET_ALL, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  updateTienHanhTTKT(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.put(TIEN_HANH_TTKT.GET_ALL, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  hoanTTKT(body): Observable<any> {
    return this.http.post(TIEN_HANH_TTKT.HOAN_TTKT, body);//, options)
  }
  huyHoanTTKT(id): Observable<any>{
    return this.http.delete(TIEN_HANH_TTKT.HUY_HOAN_TTKT+"/"+`${id}`);
  }

  getDsDoanTTKT(isOwnerTW, dmBHXHId, dateFrom, dateTo, page, size): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.GET_DS_DOAN_TTKT + `?isOwnerTW=${isOwnerTW}&dmBHXHId=${dmBHXHId}&dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&size=${size}`);
  }
  getDsDoanTTKTTienDoEqual1(isOwnerTW, dmBHXHId, dateFrom, dateTo, isGettingKL, page, size): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.GET_DS_DOAN_TTKT_HAS_TIEN_DO_EQUAL_1 + `?isOwnerTW=${isOwnerTW}&dmBHXHId=${dmBHXHId}&dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&size=${size}`);
  }

  getBaoCaoKetLuan(dmbhxhId, thanhLapDOanId, isBienBanKetLuan): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.XEM_BAOCAO_KL + `?dmbhxhId=${dmbhxhId}&thanhLapDOanId=${thanhLapDOanId}&isBienBanKetLuan=${isBienBanKetLuan}`); // , options)
  }

  ketThucTienHanh(tienHanhTTKTId): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.KET_THUC_TIENHANH + `?tienHanhTTKTId=${tienHanhTTKTId}`);
  }

  tongHopChiTietTTKT(thanhLapDoanId): Observable<any> {
    return this.http.get(TIEN_HANH_TTKT.TONG_HOP_CHI_TIET_TTKT + `?thanhLapDoanId=${thanhLapDoanId}`);
  }

    printMauViPhamHanhChinh(type, data): void {
        this.printService.printMauViPhamHanhChinh(TIEN_HANH_TTKT.PRINT_MAU_VI_PHAM_HANH_CHINH, type, data);
    }

    printMauXuPhatViPhamHanhChinh(type, data): void {
        this.printService.printMauXuPhatViPhamHanhChinh(TIEN_HANH_TTKT.PRINT_MAU_XU_PHAT_VI_PHAM_HANH_CHINH, type, data);
    }

    getDataForGiaiTrinh(thanhLapDoanID, doiTuongTTKTID): Observable<any> {
      return this.http.get(TIEN_HANH_TTKT.TONG_HOP_CHI_TIET_TTKT_BY_THANH_LAP_DOAN_AND_DOI_TUONG_TTKT + '?thanhLapDoanID=' + thanhLapDoanID + '&doiTuongTTKTID=' + doiTuongTTKTID);
    }

    createGiaiTrinh(giaiTrinhData): Observable<any> {
        return this.http.post(TIEN_HANH_TTKT.CREATE_GIAI_TRINH, giaiTrinhData);
    }

    updateGiaiTrinh(giaiTrinhData): Observable<any> {
        return this.http.put(TIEN_HANH_TTKT.CREATE_GIAI_TRINH, giaiTrinhData);
    }

    getGiaiTrinhByTienHanhTTKT_ID(tienHanhTTKT_ID): Observable<any> {
        return this.http.get(GIAI_TRINH_TTKT.GET_GIAI_TRINH_BY_TIEN_HANH_TTKT_ID + '?tienHanhTTKT_ID=' + tienHanhTTKT_ID);
    }


}
