import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-bao-cao-kq-cho-duyet',
  templateUrl: './bao-cao-kq-cho-duyet.component.html',
  styleUrls: ['./bao-cao-kq-cho-duyet.component.scss']
})
export class BaoCaoKqChoDuyetComponent implements OnInit {

  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('tuChoiModal') public tuChoiModal: ModalDirective;

  index: number;
  lyDoTuChoi: string;

  dsBaoCao: any = [
    {
      id: 1,
      name: 'Báo cáo kết quả TTKT của tỉnh Hà Nam quý II/2016',
      noiGui: 'Cơ quan tỉnh Hà Nam',
      ngayGui: '01/05/2016',
      trangthai: 0
    },
    {
      id: 2,
      name: 'Báo cáo kết quả TTKT của tỉnh Tuyên Quang quý II/2016',
      noiGui: 'Cơ quan tỉnh Tuyên Quang',
      ngayGui: '01/05/2016',
      trangthai: 0
    },
    {
      id: 3,
      name: 'Báo cáo kết quả TTKT của tỉnh Thanh Hóa quý II/2016',
      noiGui: 'Cơ quan tỉnh Thanh Hóa',
      ngayGui: '01/05/2016',
      trangthai: 0
    },
    {
      id: 4,
      name: 'Báo cáo kết quả TTKT của tỉnh Bắc Ninh quý II/2016',
      noiGui: 'Cơ quan tỉnh Bắc Ninh',
      ngayGui: '01/05/2016',
      trangthai: 0
    }
  ];

  constructor(
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  chiTietBaoCao(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh/detail-bckq-nganh', index]);
  }

  duyetBC(index) {
    this.duyetModal.show();
    this.index = index;
  }

  onSubmitDuyet() {
    this.duyetModal.hide();
    this.index = undefined;
    this.alertService.success('Đã duyệt báo cáo kết quả toàn ngành');
  }

  tuChoiBC(index) {
    this.lyDoTuChoi = null;
    this.tuChoiModal.show();
    this.index = index;
  }

  onSubmitTuChoi() {
    this.tuChoiModal.hide();
    this.index = undefined;
    this.alertService.success('Từ chối báo cáo kết quả');
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh']);
  }

}
