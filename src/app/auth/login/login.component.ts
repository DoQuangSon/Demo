import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NoiAccountService } from '../../services/api/noi-account/noi-account.service';
import { FormService } from '../../shared/form-module/form.service';
import { AlertService } from '../../services/api/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  authenticationError: boolean;
  coquan: any = {};
  accoutType = 'tinh';
  isCheckMaDonVi: boolean;
  listCoquan = [
    {
      ma: '001',
      coquan: 'bhxh_tinh'
    },
    {
      ma: '002',
      coquan: 'bhxh_tw'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private noiAccountService: NoiAccountService,
    private formService: FormService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      maDonVi: [''],
      coquanbaohiem: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  changeMa(event) {
    const ma = event.target.value;
    if (ma === null || ma === '' || typeof ma === 'undefined') {
      return;
    }
    this.noiAccountService.getDonvi(ma)
      .subscribe(res => {
        this.coquan = res.dmbhxh || {};
        this.loginForm.patchValue({
          coquanbaohiem: this.coquan.tenDonVi
        });
        if (res.isOwnerTw) {
          this.accoutType = 'tw';
        } else {
          this.accoutType = 'tinh';
        }
        this.isCheckMaDonVi = false;
      }, err => {
        this.isCheckMaDonVi = true;
      });
  }

  login() {
    this.formService.touchAllInput(this.loginForm);
    if (this.isCheckMaDonVi === true) {
      return;
    }
    if (this.loginForm.invalid && this.isCheckMaDonVi === false) {
      this._alert.error('Bạn cần nhập đầy đủ thông tin');
      console.log(this.formService.getErrorList(this.loginForm));
      return;
    }
    this.authService.login(this.loginForm.value, this.accoutType).subscribe((res) => {
      console.log(this.authService.currentUser);
      if (res) {
        this.router.navigate(['']);
      } else {
        this._alert.error('Có lỗi xảy ra');
      }
    }, err => {
      // this._alert.error('Tên đăng nhập hoặc mật khẩu không chính xác');
    });
  }
}
