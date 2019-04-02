// import { extractData, handleError } from './../http-req';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {DTKHIEUNAI, QL_SOSACH_TIEP_CD} from '../../../constants/api.constants';
import {PrintService} from '../print/print.service';
import {HOST} from '../../../constants/api-port.constants';


@Injectable({   providedIn: 'root' })
export class NoiDtkhieunaiService {

  constructor(
    private http: HttpClient,
    private printService: PrintService,
  ) { }

    createNewDtKhieuNai(body): Observable<any> {
      // const options = createCommonHeaders(this.authService);
      return this.http.post(DTKHIEUNAI.resource, body); // , options)
        // .map(extractData)
        // .catch(handleError);
    }
    updateNewDtKhieuNai(body): Observable<any> {
      // const options = createCommonHeaders(this.authService);
      return this.http.put(DTKHIEUNAI.resource, body); // , options)
        // .map(extractData)
        // .catch(handleError);
    }
    getDtKhieuNaiById({id}): Observable<any> {
      // const options = createCommonHeaders(this.authService);
      return this.http.get(DTKHIEUNAI.getDTKhieuNaiByDTId + '?donThuId=' + id); // , options)
        // .map(extractData)
        // .catch(handleError);
    }
    printMau05(mau05, type): void {
        this.printService.printMau05(DTKHIEUNAI.PRINT_MAU_05, mau05, type);
    }
    printMau08(mau08, type): void {
      this.printService.printMau08(DTKHIEUNAI.PRINT_MAU_08, mau08, type);
    }
    printMau06(mau06, type): void {
      this.printService.printMau06(DTKHIEUNAI.PRINT_MAU_06, mau06, type);
    }
    printMau09(mau09, type): void {
      this.printService.printMau09(DTKHIEUNAI.PRINT_MAU_09, mau09, type);
    }
    printMau07(mau07, type): void {
      this.printService.printMau07(DTKHIEUNAI.PRINT_MAU_07, mau07, type);
    }



}
