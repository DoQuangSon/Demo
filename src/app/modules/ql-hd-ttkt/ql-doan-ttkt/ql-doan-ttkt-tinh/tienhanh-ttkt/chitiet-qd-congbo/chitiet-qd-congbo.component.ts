import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-chitiet-qd-congbo',
  templateUrl: './chitiet-qd-congbo.component.html',
  styleUrls: ['./chitiet-qd-congbo.component.scss']
})
export class ChiTietQDCongBoComponent implements OnInit {

  constructor() { }

  thanhphanthamgia = [
    {
      'ten': 'Nguyễn Văn A',
      'chucvu': 'Trưởng đoàn',
      'vangmat': false,
      'lydovangmat': ''
    },
    {
      'ten': 'Nguyễn Văn A',
      'chucvu': 'Phó đoàn',
      'vangmat': false,
      'lydovangmat': ''
    },
    {
      'ten': 'Nguyễn Văn A',
      'chucvu': 'Thành viên',
      'vangmat': false,
      'lydovangmat': ''
    },
    {
      'ten': 'Nguyễn Văn A',
      'chucvu': 'Thành viên',
      'vangmat': true,
      'lydovangmat': 'Công tác'
    },
    {
      'ten': 'Nguyễn Văn A',
      'chucvu': 'Giám sát',
      'vangmat': false,
      'lydovangmat': ''
    }
  ];
  danhsachdonvithamgia = {
    coquanBHXH: [
      {
        'tendonvi': 'Cơ quan BHXH 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan BHXH 1',
        'thamgiacongbo': false,
        'vangmat': true,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan BHXH 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': true,
        'lydohoanttkt': 'Năm sau'
      },
    ],
    cosokhamchuabenh: [
      {
        'tendonvi': 'Cơ sở 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ sở 1',
        'thamgiacongbo': false,
        'vangmat': true,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ sở 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': true,
        'lydohoanttkt': 'Năm sau'
      },
    ],
    donvisudunglaodong: [
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': false,
        'vangmat': true,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': true,
        'lydohoanttkt': 'Năm sau'
      },
    ],
    daidienthuchitra: [
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': false,
        'vangmat': true,
        'lydovangmat': '',
        'hoanttkt': false,
        'lydohoanttkt': ''
      },
      {
        'tendonvi': 'Cơ quan 1',
        'thamgiacongbo': true,
        'vangmat': false,
        'lydovangmat': '',
        'hoanttkt': true,
        'lydohoanttkt': 'Năm sau'
      },
    ],
  };

  ngOnInit() {
  }

}
