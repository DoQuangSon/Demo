import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QUAN_LY_TINH_DUOC_TTKT, LICH_SU_TTKT_TINH, LICH_SU_TTKT_DONVI } from '../../../constants/api.constants';

@Injectable({   providedIn: 'root' })
export class NoiQuanLyTinhDuocTtktService {

    constructor(private http: HttpClient) { }

    // Screen QLTINH TTKT
    getDanhSachTinhViQuanLy({ year }): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.get(QUAN_LY_TINH_DUOC_TTKT.DANH_SACH_TINH_VI_QUAN_LY + `?thanhLapYear=${year}`);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    searchDanhSachTinh(formBody): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.post(QUAN_LY_TINH_DUOC_TTKT.SEARCH_DANH_SACH_TINH_QUAN_LY, formBody);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    getLichSuTTKTTinh({ phamViId, page, size }): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.get(LICH_SU_TTKT_TINH.GET_DANH_SACH_LICH_SU_TTKT_TINH + `?phamViId=${phamViId}&page=${page}&size=${size}`);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    createLichSuTTKTTinh(formBody): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.post(LICH_SU_TTKT_TINH.CREATE_LICH_SU_TTKT_TINH, formBody);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    deleteLichSuTTKTTinh(id): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.delete(LICH_SU_TTKT_TINH.DLETE_LICH_SU_TTKT_TINH + '/' + id);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    // Screen QLDONVI TTKT
    getDanhSachDonVi(formBody): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.post(QUAN_LY_TINH_DUOC_TTKT.DANH_SACH_DON_VI, formBody);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    searchDanhSachDonVi(formBody): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.post(QUAN_LY_TINH_DUOC_TTKT.SEARCH_DANH_SACH_DON_VI, formBody);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    getLichSuTTKTDonVi(doiTuongTTKTId, page, size): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.get(LICH_SU_TTKT_DONVI.GET_DANH_SACH_LICH_SU_TTKT_DONVI + `?doiTuongTTKTId=${doiTuongTTKTId}&page=${page}&size=${size}`);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    createLichSuTTKTDonVi(formBody): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.post(LICH_SU_TTKT_DONVI.CREATE_LICH_SU_TTKT_DONVI, formBody);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

    deleteLichSuTTKTDonVi(id): Observable<any> {
        //const options = createCommonHeaders(this.authService);
        return this.http.delete(LICH_SU_TTKT_DONVI.DLETE_LICH_SU_TTKT_DONVI + '/' + id);//, options)
            //.map(extractData)
            //.catch(handleError);
    }

}
