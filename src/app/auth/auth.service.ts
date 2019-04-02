import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { HOST } from '../constants/api-port.constants';
import { IUser, IPermission } from '../interfaces/account.interface';


export interface UpdatePassword {
  newPassword: any;
  oldPassword: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  public allPermission: Array<String>;
  public currentUser: IUser;
  public accountType: string;
  public eventChange: Subject<any> = new Subject();

  private _key_save = '5g3efge6djsnjdsdh';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const temp = JSON.parse(localStorage.getItem(this._key_save));
    if (temp) {
      this.currentUser = temp.user_info;
      this.token = temp.id_token;
      this.allPermission = temp.permissions;
      this.accountType = localStorage.getItem('accountType');
      // set something else
    }
  }

  getToken() {
    return this.token;
  }

  notifyDonViChange(): any {
    this.eventChange.next(this.currentUser);
  }

  public isAuthenticated(): boolean {
    console.log(this.currentUser, this.token);
    if (!this.token) {
      return false;
    }
    // Check whether the current time is past the
    // access token's expiry time
    // const expire_time = localStorage.getItem('expires_at');
    // if (expire_time == null || expire_time === '') {
    //   return false;
    // }
    // const expiresAt = new Date(expire_time).getTime();

    // return new Date().getTime() < expiresAt;
    return true;
  }

  logout(): void {
    this.removeAccount();
    this.router.navigateByUrl('/auth/login');
  }

  removeAccount() {
    this.token = null;
    this.currentUser = null;
    this.allPermission = null;
    localStorage.removeItem(this._key_save);
  }

  login(body, accountType: string): Observable<any> {
    return this.http.post(HOST + '/api/authenticate',
    body)
    .pipe(
      map((res: any) => {
        console.log(res);
        try {
          if (res) {
            const permissions = res.permissions;
            res.user_info.permissions = this.getPathFromPermissionList(permissions);
            res.permissions = this.getPathFromPermissionList(permissions, true);
            this.currentUser = res.user_info;
            this.token = res.id_token;
            this.accountType = accountType;
            this.allPermission = res.permissions;
            localStorage.setItem(this._key_save, JSON.stringify(res));
            localStorage.setItem('accountType', accountType);
          }
          return true;
        } catch (ex) {
          console.log(ex);
          return false;
        }
      }) // or any other operator
    );
  }
  updatePassword(data: UpdatePassword): Observable<any> {
    return this.http.post(HOST + '/api/account/change-password', data, {
      responseType: 'text'
    });
  }
  // refreshToken(): Observable<TokenChaneEvent> {
  //   const body = {
  //     token: this._state.token
  //   };

  //   return this._api.post(API.auth.login, body)
  //     .do(this._setTokenTtl)
  //     .do(this._fireLoginEvent)
  //     .flatMap(() => this.onTokenRefresh);
  // }


  getPermission() {
    if (this.currentUser && this.currentUser.permissions) {
      return this.currentUser.permissions;
    }
    return [];
  }

  getPermissionAll() {
    if (this.allPermission) {
      return this.allPermission;
    }

    return [];
  }

  checkPermission(path: any) {
    if (!this.token || !this.getPermission() || !this.getPermissionAll()) {
      return false;
    }
    if (!this.checkPermissionExist(path, this.getPermissionAll())) {
      return true;
    }

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

  getPathFromPermissionList(listPermission, all = false): Array<string> {
    const listPath = [];
    for (const permission of listPermission) {
      if (permission.path) {
        if (all) {
          listPath.push(permission.path);
        }
        if (!all && permission.checked) {
          listPath.push(permission.path);
        }
      }
      if (permission.children) {
        listPath.push(...this.getPathFromPermissionList(permission.children, all));
      }
    }
    return listPath;
  }
}
