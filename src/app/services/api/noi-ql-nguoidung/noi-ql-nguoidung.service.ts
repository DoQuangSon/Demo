import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QL_NGUOI_DUNG } from '../../../constants/api-ql-nguoidung';
import { text } from '../../../../../node_modules/@angular/core/src/render3/instructions';
import { Context } from 'vm';

@Injectable({   providedIn: 'root' })
export class NoiQLNguoiDungService {

  constructor(
    private http: HttpClient,
  ) { }

  createUser(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(QL_NGUOI_DUNG.CREATE_USER, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  updateUser(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.put(QL_NGUOI_DUNG.CREATE_USER, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  deleteUser(login): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.delete(QL_NGUOI_DUNG.CREATE_USER + '/' + login);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getAllUserByDMBHXH(dmbhxhId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NGUOI_DUNG.GET_ALL_USER_BY_DMBHXH + '?dmbhxhId=' + dmbhxhId + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  getChucDanhOfBHXH(dmbhxhId, page, size): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NGUOI_DUNG.GET_CHUC_DANH_OF_BHXH + '?dmbhxhId=' + dmbhxhId + '&page=' + page + '&size=' + size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  searchUser(donViId, searchValue, page): Observable<any> {
    const param: any = {
      size: page.size,
      page: page.page,
      dmbhxhId: donViId || '',
      login: searchValue.tenDangNhap ? searchValue.tenDangNhap.trim() : '',
      tenHienThi: searchValue.tenHienThi ? searchValue.tenHienThi.trim() : '',
      chucDanh: searchValue.chucDanh ? searchValue.chucDanh.trim() : '',
      donViCongTac: searchValue.donViCongTac ? searchValue.donViCongTac.trim() : '',
      authorityId: searchValue.nhomQuyen || '',
    }
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NGUOI_DUNG.SEARCH_USER + '?login=' + param.login + '&dmbhxhId=' + param.dmbhxhId + '&tenHienThi='
      + param.tenHienThi + '&authorityId=' + param.authorityId + '&chucDanh=' + param.chucDanh + '&donViCongTac='
      + param.donViCongTac + '&page=' + param.page + '&size=' + param.size);//, options)
      //.map(extractData)
      //.catch(handleError);
  }
  checkExitst(valueExitst): Observable<any> {
    const valueCheck = valueExitst.trim();
    return this.http.get(QL_NGUOI_DUNG.CHECK_EXITST +'?valueCheck=' + valueCheck, {
      responseType: 'text'});
  }

}
