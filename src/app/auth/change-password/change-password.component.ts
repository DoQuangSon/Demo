import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/api/alert.service';
import { Router } from '@angular/router';
import { FormService } from '../../shared/form-module/form.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;
  errMatchPassword: boolean;
  public successChangePassword = false;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private formService: FormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.changePassForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      reNewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });

  }
  matchPassword() {
    const formValue = this.changePassForm.value;
    if (formValue.newPassword !== formValue.reNewPassword) {
      this.errMatchPassword = true;
    } else {
      this.errMatchPassword = false;
    }
  }
  changePassword() {
    this.formService.touchAllInput(this.changePassForm);
    if (this.changePassForm.invalid) {
      console.log(this.formService.getErrorList(this.changePassForm));
      return;
    }
    if (this.errMatchPassword == true ) {
      return;
    }
    const formBody = this.changePassForm.getRawValue();
    this.authService.updatePassword(formBody).subscribe(res => {
      this.alertService.success(res);
      this.successChangePassword = true;
      this.authService.logout();
    }, err => {
      this.alertService.error(err);
    });
  }
}
