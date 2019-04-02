import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoiSoTheoDoiTiepCdService } from '../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theo-doi-tiep-cd/noi-so-theo-doi-tiep-cd.service';
import { AuthService } from '../../../../auth/auth.service';
import { ACCOUNTTYPE } from '../../../../constants/giaiquyet-dt.constants';

@Component({
  selector: 'ttkt-chi-tiet-so-theodoi-tiep-cd',
  templateUrl: './chi-tiet-so-theodoi-tiep-cd.component.html',
  styleUrls: ['./chi-tiet-so-theodoi-tiep-cd.component.scss']
})
export class ChiTietSoTheodoiTiepCdComponent implements OnInit {
  @Input() isLive: boolean = false;
  private router: any;
  private id: number;
  listData: any[] = [];
  typeAccount: string;
  @Input() 
  set dataSotn(data: any) {
    if (data) {
      this.listData = data;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private soTheoDoiTiepCdService: NoiSoTheoDoiTiepCdService,
    private routerAngular: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.typeAccount = this.auth.accountType;
    if (!this.isLive) {
      this.router = this.route.params.subscribe(params => {
        this.id = + params['id'];
        this.soTheoDoiTiepCdService.chitietSoTheoDoiTiepCd(this.id)
        .subscribe(res => {
          this.listData = res;
        });
      });
    }
  }
  onClose() {
    if(this.typeAccount === ACCOUNTTYPE.trunguong ){
      this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiep-cd/']);
    }else{
      this.routerAngular.navigate(['/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiep-cd']);
    }
  }

  getCheck (item: any, noiDungId: number) {
    return item === noiDungId ? 'X' : '';
  }

}
