import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'ttkt-ke-hoach-bhxh-tinh',
  template: ''
})
export class KHTTKTRedirectComponent implements OnInit {
    constructor(
        private router: Router,
        private auth: AuthService
    ) {}
    ngOnInit(): void {
        if (this.auth.accountType === 'tw')  {
            this.router.navigateByUrl('/ql-hd-ttkt/kh-ttkt/trung-uong');
        } else {
            this.router.navigateByUrl('/ql-hd-ttkt/kh-ttkt/tinh');
        }
    }
}
