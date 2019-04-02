import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'selenium-webdriver';
import { AlertType } from '../../shared/models/alert';

@Injectable({   providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  private timeoutTime:  number = 2000;

  // tslint:disable-next-line:no-unused-variable
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }
  
  nospaceValidator(control: AbstractControl): string {
    let re = / /;
    if (control.value && control.value.trim() === '') {
      if (control.value.match(re)) {
        return 'không được nhập toàn khoảng trắng';
      }
    }
  }

  success(message: string, { keepAfterRouteChange = false, delay = 0 }: any = {}) {
    // setTimeout(() => {
      // console.log(message);
      this.toastr.success(this.getMessageHtml(message));
    // }, delay);
    // this.alert(AlertType.Success, message, { keepAfterRouteChange, delay });
  }
  getMessageHtml(message: String): any {
    return "<div class='toast-title'>"+message+"</div>";
  }

  error(message: string, { keepAfterRouteChange = false, delay = 0 }: any = {}) {
    // this.alert(AlertType.Error, message, { keepAfterRouteChange, delay });
    // setTimeout(() => {
      
      // this.toastr.error("", message);
      this.toastr.error(this.getMessageHtml(message));
    // }, delay);
  }

  info(message: string, { keepAfterRouteChange = false, delay = 0 }: any = {}) {
    // this.alert(AlertType.Info, message, { keepAfterRouteChange, delay });
    // setTimeout(() => {
      this.toastr.info(this.getMessageHtml(message));
    // }, delay);
  }

  warn(message: string, { keepAfterRouteChange = false, delay = 0 }: any = {}) {
    // this.alert(AlertType.Warning, message, { keepAfterRouteChange, delay });
    // setTimeout(() => {
      this.toastr.warning(this.getMessageHtml(message));
    // }, delay);
  }

  alert(type: AlertType, message: string, { keepAfterRouteChange = false, delay = 0 }) {
    // this.keepAfterRouteChange = keepAfterRouteChange;
    // if (delay > 0) {
    //   setTimeout(() => {
    //     this.subject.next(<Alert>{ type: type, message: message, duration: this.timeoutTime, visible: '' });
    //   }, delay);
    // } else {
    //   this.subject.next(<Alert>{ type: type, message: message, duration: this.timeoutTime, visible: '' });
    // }
    // setTimeout(() => {
      this.toastr.show(this.getMessageHtml(message));
    // }, delay);
  }

  clear() {
    // clear alerts
    this.toastr.clear();
  }
}
