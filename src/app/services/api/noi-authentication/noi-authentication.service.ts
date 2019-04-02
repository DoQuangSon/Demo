import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

// import { JwtHelper } from 'angular2-jwt/angular2-jwt';
// import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class NoiAuthenticationService {

  private token: string = '';
  // private jwtHelper: JwtHelper = new JwtHelper();
  private account: any;
  private permission: Array<any>;
  private permissionAll: Array<any>;

  constructor(
    private auth: AuthService
  ) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }

    if (localStorage.getItem('account')) {
      this.account = this.auth.currentUser;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setDmbhxhIdAndTinhHuyen(bhxhId, dmTinhHuyenId, tenTinhHuyen) {
    localStorage.setItem('dmbhxhId', bhxhId);
    localStorage.setItem('dmTinhHuyenId', dmTinhHuyenId);
    localStorage.setItem('tenTinhHuyen', tenTinhHuyen);
  }

  setAccountLocal(res) {
    localStorage.setItem('account', JSON.stringify(res));
  }

  getAccount() {
    return this.account;
  }

  getPermission() {
    if (this.permission) {
      return this.permission;
    }

    if (localStorage.getItem('permissions')) {
      this.permission = JSON.parse(localStorage.getItem('permissions'));
    }

    return this.permission;
  }

  getPermissionAll() {
    if (this.permissionAll) {
      return this.permissionAll;
    }

    if (localStorage.getItem('permissionAll')) {
      this.permissionAll = JSON.parse(localStorage.getItem('permissionAll'));
    }

    return this.permissionAll;
  }

  removeAccountLocal() {
    localStorage.removeItem('account');
  }

  removeDmbhxhIdAndTinhHuyen() {
    localStorage.removeItem('dmbhxhId');
    localStorage.removeItem('dmTinhHuyenId');
    localStorage.removeItem('tenTinhHuyen');
  }

  checkPermission(path: any) {
    if (!this.token || !this.getPermission() || !this.getPermissionAll()) {
      return false;
    }
    if (!this.checkPermissionExist(path, this.getPermissionAll())) {
      return true;
    }

    // console.log(path, this.permission.indexOf(path));
    if (this.checkPermissionExist(path, this.getPermission())) {// co
      return true;
    }

    return false;
  }

  // Check ton tai permission
  checkPermissionExist(path: any, permissions: Array<any>) {
    if (!path) {
      return true;
    }

    for (const permission of permissions) {
      if (permission.indexOf(path) > -1) {
        return true;
      }
    }

    return false;
  }
}
