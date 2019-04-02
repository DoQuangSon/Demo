import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-bc-tonghop-tinh',
  templateUrl: './chitiet-bc-tonghop-tinh.component.html',
  styleUrls: ['./chitiet-bc-tonghop-tinh.component.scss']
})
export class ChitietBcTonghopTinhComponent implements OnInit {

  data: any = {
    tenBaoCao: 'Báo cáo tổng hợp kết quả TTKT quý I năm 2017',
    soNumber: 'BC-23545',
    ngayLap: '10/01/2017',
  };
  thucHienTTKT = [
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
  ];
  ketQuaTTKT = [
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
  ];
  ketLuanTTKT = [
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
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  closeChiTietBCTongHopTinh() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh']);
  }

}
