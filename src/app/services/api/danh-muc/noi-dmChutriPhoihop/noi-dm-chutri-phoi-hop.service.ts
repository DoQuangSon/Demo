import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DMCHUTRIPHOIHOP } from '../../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiDmChutriPhoiHopService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDmChutriPhoihop(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMCHUTRIPHOIHOP.getAll + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  getAllDmChutriPhoihopByType(page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMCHUTRIPHOIHOP.getAllByType + '?page=' + page + '&size=' + size);//, options)
      //.map(extractDataArray)
      //.catch(handleError);
  }

  createDmChutriPhoihop(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(DMCHUTRIPHOIHOP.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateDmChutriPhoihop(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(DMCHUTRIPHOIHOP.getAll, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteDmChutriPhoihop(id): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(DMCHUTRIPHOIHOP.getAll + '/' + id);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchAllDmChutriPhoihop(tenDonVi, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(DMCHUTRIPHOIHOP.search + '?tenDonVi=' + tenDonVi + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
}
