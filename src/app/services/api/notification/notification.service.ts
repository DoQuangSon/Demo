import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HOST } from '../../../constants/api-port.constants';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import {createHttpHeader } from '../http-req';
import { NoiAuthenticationService } from '../noi-authentication/noi-authentication.service';
import { AuthService } from '../../../auth/auth.service';
import { NotificationDTO } from '../../../shared/models/notification/notification.interface';

@Injectable({   providedIn: 'root' })
export class NotificationService {
    API_LINK = {
        GET_NOTI_TW: HOST + '/api/notifications/get-notification-by-tw',
        GET_NOTI_TINH: HOST + '/api/notifications/get-notification-by-tinh',
        POST_NOTI_UPDATE:HOST+'/api/notifications/update-seen-status',
        NOTI_ROOT: HOST + '/api/notifications'
    };

    constructor(
        private httpClient: HttpClient,
        private http: Http,
        private authService: AuthService
      ) { }

    getNotificationTW(page = 0, size = 10): Observable<any> {
        const options = createHttpHeader(this.authService);
        return this.http.get(`${this.API_LINK.GET_NOTI_TW}?page=${page}&size=${size}`, options)
        .pipe(map(res => res.json()));//, options);
    }

    getNotificationTINH(dmTinhHuyenId, page = 0, size = 10): Observable<any> {
        const options = createHttpHeader(this.authService);
        return this.http.get(`${this.API_LINK.GET_NOTI_TINH}?dmTinhHuyenId=${dmTinhHuyenId}&page=${page}&size=${size}`, options)
        .pipe(map(res => res.json()));//, options);
    }
    updateNotifiSeen(body){
        const options = createHttpHeader(this.authService);
        return this.http.post(this.API_LINK.POST_NOTI_UPDATE, body, options)
        .pipe(map(res => res.json()));
          //.map(extractData)
          //.catch(handleError);
    }

    sendNotification(noti: NotificationDTO): any {
        return this.httpClient.post(this.API_LINK.NOTI_ROOT + '/send-to', noti);
    }
}
