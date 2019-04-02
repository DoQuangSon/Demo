import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { NoiDmbhxhService } from '../../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { NoiBaoCaoTongHopService } from '../../../../../services/api/noi-ql-baocao-ttkt/noi-bao-cao-tong-hop/noi-bao-cao-tong-hop.service';
import { Pagging } from '../../../../../shared/models/pagging.model';
import { NotificationService } from '../../../../../services/api/notification/notification.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { NOTIFY_TYPE } from '../../../../../constants/app.constant';

@Component({
  selector: 'ttkt-bao-cao-ket-qua-toan-nganh',
  templateUrl: './bao-cao-ket-qua-toan-nganh.component.html',
  styleUrls: ['./bao-cao-ket-qua-toan-nganh.component.scss']
})
export class BaoCaoKetQuaToanNganhComponent implements OnInit {
  @ViewChild('dsTinhChuaGuiModal') dsTinhChuaGuiModal: ModalDirective;

  paging: Pagging = new Pagging();
  bcKQToanNganhForm: FormGroup;
  title: string;
  displayNoticeDelete: boolean;
  now: Date = new Date();
  dsTinh: any = [];
  dsBaoCao: any = [
    // {
    //   id: 1,
    //   name: 'Báo cáo kết quả TTKT của tỉnh Hà Nam quý II/2016',
    //   noiGui: 'Cơ quan tỉnh Hà Nam',
    //   ngayGui: '01/05/2016',
    //   trangThai_id: 1,
    //   trangThai: 'Đúng thời hạn'
    // },
    // {
    //   id: 2,
    //   name: 'Báo cáo kết quả TTKT của tỉnh Tuyên Quang quý II/2016',
    //   noiGui: 'Cơ quan tỉnh Tuyên Quang',
    //   ngayGui: '01/05/2016',
    //   trangThai_id: 1,
    //   trangThai: 'Đúng thời hạn'
    // },
    // {
    //   id: 3,
    //   name: 'Báo cáo kết quả TTKT của tỉnh Thanh Hóa quý II/2016',
    //   noiGui: 'Cơ quan tỉnh Thanh Hóa',
    //   ngayGui: '01/05/2016',
    //   trangThai_id: 0,
    //   trangThai: 'Nộp muộn'
    // },
    // {
    //   id: 4,
    //   name: 'Báo cáo kết quả TTKT của tỉnh Bắc Ninh quý II/2016',
    //   noiGui: 'Cơ quan tỉnh Bắc Ninh',
    //   ngayGui: '01/05/2016',
    //   trangThai_id: 0,
    //   trangThai: 'Nộp muộn'
    // },
    // {
    //   id: 5,
    //   name: 'Báo cáo kết quả TTKT của Vụ TTKT quý II/2016',
    //   noiGui: 'Cơ quan BHXH VN',
    //   ngayGui: '01/05/2016',
    //   trangThai_id: 1,
    //   trangThai: 'Đúng thời hạn'
    // }
  ];
  dsTinhChuaGui = [
    // { id: 1, tenTinh: 'Hải Phòng' },
    // { id: 2, tenTinh: 'Quảng Ninh' },
    // { id: 3, tenTinh: 'Thái Bình' },
    // { id: 4, tenTinh: 'Nam Định' },
    // { id: 5, tenTinh: 'Ninh Bình' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noiDmbhxhService: NoiDmbhxhService,
    private bacCao: NoiBaoCaoTongHopService,
    private notificationService: NotificationService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.bcKQToanNganhForm = this.fb.group({
      nam: [(new Date).getFullYear()],
      phamViId: ['']
    });
    this.getListDSTinh();
    let fromDate = new Date(this.now.getFullYear(), this.now.getMonth() - 1, 1);
    this.bacCao.getListTinhChuaGui(fromDate.toISOString(), this.now.toISOString()).subscribe(res => {
      this.dsTinhChuaGui = res;
    });

    this.search(true);
  }
  getListDSTinh() {
    this.noiDmbhxhService.getDmBHXHBTinhAndTw().subscribe(req => {
      this.dsTinh = req;
    });
  }

  search(isResetPage?: boolean) {
    if(isResetPage) {
      this.paging.currentPage = 1;
    }

    let formValue = this.bcKQToanNganhForm.value;
    this.bacCao.getBaoCaoTongHopToanNganh({
      dmbhxhId: formValue.phamViId,
      nam: formValue.nam,
      page: this.paging.currentPage - 1,
      size: this.paging.itemsPerPage
    }).subscribe(res => {
      this.dsBaoCao = res.content;
      this.paging.totalItems = res.totalElements;  
    })
  }

  pageChanged(event) {
    this.paging.currentPage = event.page
    this.search();
  }

  chiTietBaoCao(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh/detail-bckq-nganh', index]);
  }

  goToKhChoDuyet() {
    this.router.navigate([`/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh/bc-kq-cho-duyet`]);
    return false;
  }

  popUpDsTinhChuaGui() {
    this.title = 'Danh sách các tỉnh chưa gửi';
    this.displayNoticeDelete = true;
    this.dsTinhChuaGuiModal.show();
  }

  close() {
    this.dsTinhChuaGuiModal.hide();
  }
 
  chooseTinh(item) {
    item.thongBao = !item.thongBao;
  }

  guiThongBao() {
    // @Todo: set thong bao
    let dsTinh = this.dsTinhChuaGui.filter(res => res.thongBao === true);

    console.log(dsTinh);
    if (dsTinh.length == 0) {
      this.alert.error('Vui lòng chọn tỉnh');
      return;
    }
    this.notificationService.sendNotification({
      title: 'Nhắc nhở gửi báo cáo tổng hợp tháng '+(this.now.getMonth() + 1)+' năm '+ this.now.getFullYear(),
      desc: 'Trung ương nhắc nhở tỉnh gửi báo cáo',
      path: '/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh',
      dsTinhHuyenId: dsTinh.map(res => res.tinhHuyenId),
      notifiType: NOTIFY_TYPE.TYPE_NHAC_NHO
    }).subscribe(res => {
      this.dsTinhChuaGui.map(res => {
        res.thongBao = false;
        return res;
      });
      this.alert.success('Gửi thành công');
      this.dsTinhChuaGuiModal.hide();
    })
  }
}
