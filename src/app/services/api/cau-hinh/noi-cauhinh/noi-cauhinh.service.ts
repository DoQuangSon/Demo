import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CAU_HINH } from '../../../../constants/api-ttkt.constants';

@Injectable({   providedIn: 'root' })
export class NoiCauHinhService {

  constructor(
    private http: HttpClient,
  ) { }

  getCauHinhQuy(): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(CAU_HINH.CAU_HINH_QUY);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
