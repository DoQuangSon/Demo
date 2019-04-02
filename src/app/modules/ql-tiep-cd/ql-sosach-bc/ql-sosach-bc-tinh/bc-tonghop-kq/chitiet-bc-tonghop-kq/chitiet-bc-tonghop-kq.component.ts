import { Component, OnInit } from '@angular/core';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-bc-tonghop-kq',
  templateUrl: './chitiet-bc-tonghop-kq.component.html',
  styleUrls: ['./chitiet-bc-tonghop-kq.component.scss']
})
export class ChitietBcTonghopKqComponent implements OnInit {
  public typeAccount = 'TINH';
  private router: any;
  private id: number;
  public daGuiTinh: any;
  constructor(
    private noiSoTheoDoiTiepNhanService: NoiSoTheodoiTiepnhanService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router = this.route.params.subscribe(params => {
      this.id = + params['id'];
      this.daGuiTinh = params['daGuiTinh'] === 'true';
    });
  }

  guiTinh() {
    this.noiSoTheoDoiTiepNhanService.guiBaoCaoTinh(this.id).subscribe( response => {
      this.alertService.success('Gửi báo cáo thành công!');
    }, err => {
    });
  }
}
