//import { extractDataArray, handleError, createCommonHeaders, extractData } from './../../http-req';
import { DMPHANLOAINOIDUNG, CHECKSOCONGVAN } from './../../../../constants/api.constants';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({   providedIn: 'root' })
export class NoiDmphanloainoidungService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmPhanloainoidung(page?, size?): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMPHANLOAINOIDUNG.getAll + '?page=' + page + '&size=' + size)
      //.map(extractDataArray)
      //.catch(handleError);
  }
  createDmPhanloainoidung(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMPHANLOAINOIDUNG.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateDmPhanloainoidung(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMPHANLOAINOIDUNG.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteDmPhanloainoidung(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMPHANLOAINOIDUNG.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  checkSoCV(soCv): Observable<any> {
    return this.http.get(CHECKSOCONGVAN.check + '?soCv=' + soCv)
  }
}
