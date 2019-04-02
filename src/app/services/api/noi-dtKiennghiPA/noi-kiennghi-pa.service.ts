import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DTKIENNGHIPA } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiKiennghiPaService {

  constructor(
    private http: HttpClient,
  ) { }

  createNewDtKiennghiPA(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DTKIENNGHIPA.resource, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateNewDtKiennghiPA(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DTKIENNGHIPA.resource, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getDtKienNghiPAPAById({id}): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DTKIENNGHIPA.getDTKienNghiPAByDTId + '?donThuId=' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
