import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QL_BAOCAO_TTKT } from '../../../../constants/api.constants';
import {PrintService} from '../../print/print.service';

@Injectable({   providedIn: 'root' })
export class NoiBaoCaoTongHopService {

  constructor(
    private http: HttpClient,
    private printService: PrintService
  ) { }
  mockData = {
    thucHienTTKT: [
    {
      id: 1,
      noiDung: 'Số cuộc thanh tra',
      maTieuThuc: 'I.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số đơn vị được thanh tra',
      maTieuThuc: 'I.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số cuộc kiểm tra',
      maTieuThuc: 'I.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số cơ quan BHXH được kiểm tra',
      maTieuThuc: 'I.4',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Số đơn vị SDLĐ được kiểm tra',
      maTieuThuc: 'I.5',
      soThucHien: '',
      ghiChu: ''
    },
  ],
  ketQuaTTKT: [
    {
      id: 1,
      noiDung: 'Số lao động chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số lao động đóng sai đối tượng, đóng sai thời gian',
      maTieuThuc: 'II.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền truy đóng do chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số tiền lãi truy đóng do chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.4',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Số lao động đóng sai mức quy định',
      maTieuThuc: 'II.5',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 6,
      noiDung: 'Số tiền truy đóng do đóng thiếu mức quy định',
      maTieuThuc: 'II.6',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 7,
      noiDung: 'Số tiền lãi truy đóng do đóng thiếu mức quy định',
      maTieuThuc: 'II.7',
      soThucHien: '',
      ghiChu: ''
    },
  ],
  ketLuanTTKT: [
    {
      id: 1,
      noiDung: 'Số tiền truy đóng đã thu',
      maTieuThuc: 'III.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số tiền lãi truy đóng đã thu',
      maTieuThuc: 'III.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền đã hoàn trả hoặc điều chỉnh giảm cho đơn vị',
      maTieuThuc: 'III.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền đã thu hồi về quỹ BHXH',
      maTieuThuc: 'III.4',
      soThucHien: '',
      ghiChu: ''
    },
  ]};

  updateOrCreateBaoCaoTongHop(formBody): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    // return this.http.post(QL_BAOCAO_TTKT.GET_ALL_BAOCAO_TONGHOP, formbody);//, options)
    //   //.map(extractData)
    //   //.catch(handleError);
    // return Observable.of(this.mockData);

      return this.http.post(QL_BAOCAO_TTKT.CREATE_BAO_CAO_TONG_HOP, formBody);
  }

  getBaoCaoTongHop(id: any): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT_SAVE + '/' +  id);
    //   //.map(extractData)
    //   //.catch(handleError);
  }

  getBaoCaoTongHopToanNganh(value: any): Observable<any> {
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT_SAVE + '/search-bckq-toan-nganh?nam='+value.nam+'&dmbhxhId='+value.dmbhxhId+'&page='+value.page+'&size='+value.size);

  }

  tongHopBaoCao(body): Observable<any> {
    return Observable.of(this.mockData);
  }

  searchDataByMonth(value: any): any {
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT + '/search-data-by-month?thang=' + value.thang + '&nam=' + value.nam);
  }
  searchDataLive(value: any): any {
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT_LIVE + `/?month=${value.fromDate}`);
  }


  saveSoTHKQ(body: any) {
    return this.http.post(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT_SAVE, body);
  }

    // getBaoCaoTongHopByMonth(month, year): Observable<any> {
    //     return this.http.get(QL_BAOCAO_TTKT.GET_BAO_CAO_TONG_HOP_BY_MONTH + '?thang=' + month + '&nam=' + year);
    // }
  getListTinhChuaGui(fromDate: any, toDate: any): any {
    return this.http.get(QL_BAOCAO_TTKT.SO_TH_KQ_TTKT_SAVE + `/get-tinh-chua-gui-bckltn?fromDate=${fromDate}&toDate=${toDate}`);
  }

    printSoBaoCaoTongHopToanNganh(id, ngayTao, type) {
        this.printService.printSoBaoCaoTongHopToanNganh(QL_BAOCAO_TTKT.PRINT_MAU_01 + '?id=' + id + '&ngayTao=' + ngayTao, type);
    }
}
