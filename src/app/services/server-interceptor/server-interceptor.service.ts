import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../helper/data.service';
import { AlertService } from '../api/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor {

  constructor(
    private loader: LoadingBarService,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('ignoreLoadingBar')) {
      return next.handle(req.clone({ headers: req.headers.delete('ignoreLoadingBar') }));
    }

    const handleRequest = next.handle(req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }));

    let started = false;
    const responseSubscribe = handleRequest.subscribe.bind(handleRequest);
    handleRequest.subscribe = (...args) => {
      this.loader.start();
      started = true;
      return responseSubscribe(...args);
    };

    return handleRequest.pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.handelOkResponses();
      }
    }, err => {
      this.handelFailResponses(err);
    }), finalize(() => started && this.loader.complete()),
    );
  }

  private handelOkResponses() {
    this.dataService.ErrorMsgFailRequest = null;

  }

  private handelFailResponses(response: HttpErrorResponse) {
    let msg = this.dataService.ErrorMsgFailRequest;
    this.dataService.ErrorMsgFailRequest = null;

    if (response.status == 401) {
      console.log(123);
      const returnUrl = this.router.url;
      this.authService.removeAccount();
      this.router.navigate(['/auth/login'], { queryParams: { login: '1', url: returnUrl } });
    } else {
      try {
        if (response.headers.has('X-thanhTraKiemTraApp-error')) {
          //Http dont support utf8 in header response, encoding solution
          let HError = response.headers.get('X-thanhTraKiemTraApp-error');
          msg = decodeURIComponent(HError.replace(/\+/g, ' '));
        }

        if (response.status == 400 && response.error) {
          const error = typeof response.error === 'string' ? JSON.parse(response.error) : response.error;
          msg = error.title;
        }
      } catch (ex) {

      } finally {
        if (msg) {
          this.alert.error(msg);
        } else {
          this.alert.error(response.message);
        }
      }
    }
  }
}
