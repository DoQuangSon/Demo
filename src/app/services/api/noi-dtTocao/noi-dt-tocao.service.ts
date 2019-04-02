import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {DTKHIEUNAI, DTTOCAO} from '../../../constants/api.constants';
import {PrintService} from '../print/print.service';

@Injectable({   providedIn: 'root' })
export class NoiDtTocaoService {

  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

  createNewDtTocao(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(DTTOCAO.resource, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  updateNewDtTocao(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.put(DTTOCAO.resource, body); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  getDtToCaoById({id}): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.get(DTTOCAO.getDTToCaoByDTId + '?donThuId=' + id); // , options)
      // .map(extractData)
      // .catch(handleError);
  }

  printDonTuChoi(mauDon12, type): void {
      this.printService.printMau12(DTTOCAO.printMauDonTuChoi, mauDon12, type);
  }
}
