import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {FileResourceService} from '../../helper/file-resource.service';
import {HOST} from '../../../constants/api-port.constants';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(
    private http: HttpClient,
    private fileResourceService: FileResourceService
  ) { }

    printMau05(url, mau05, type): void {
        if (type === 1) {
            this.printPost(url + '?type=PDF', mau05);
        } else if (type === 2) {
            this.printPost_Word(url + '?type=WORD', mau05, 'Mẫu 05');
        }
    }

    // PRINT_MAU_08: HOST + '/api/d-t-khieu-nais/print-mau-08',
  printMau08(url, mau08, type): void {
      if (type === 1) {
          this.printPost(url + '?type=PDF', mau08);
      } else if (type === 2) {
          this.printPost_Word(url + '?type=WORD', mau08, 'Mẫu 08');
      }
  }

  printMau06(url, mau06, type): void {
      if (type === 1) {
          this.printPost(url + '?type=PDF', mau06);
      } else if (type === 2) {
          this.printPost_Word(url + '?type=WORD', mau06, 'Mẫu 06');
      }
  }

  printMau07(url, mau07, type): void {
      if (type === 1) {
          this.printPost(url + '?type=PDF', mau07);
      } else if (type === 2) {
          this.printPost_Word(url + '?type=WORD', mau07, 'Mẫu 07');
      }
  }

  printMau09(url, mau09, type): void {
      if (type === 1) {
          this.printPost(url + '?type=PDF', mau09);
      } else if (type === 2) {
          this.printPost_Word(url + '?type=WORD', mau09, 'Mẫu 09');
      }
  }

  printMau12(url, mau12, type): void {
      if (type === 1) {
          this.printPost(url + '?type=PDF', mau12);
      } else if (type === 2) {
          this.printPost_Word(url + '?type=WORD', mau12, 'Mẫu 12');
      }
  }

    printMauViPhamHanhChinh(url, type, data): void {
        if (type === 1) {
            this.printPost(url + '?type=PDF', data);
        }
    }

    printMauXuPhatViPhamHanhChinh(url, type, data): void {
        if (type === 1) {
            this.printPost(url + '?type=PDF', data);
        }
    }

    printMauBaoCao01(url, type): void {
        if (type === 1) {
            this.printGet(url + '&type=PDF');
        } else if (type === 2) {
            this.printGet_Excel(url + '&type=EXCEL', 'mau_01');
        }
    }

    printMauBaoCao02(url, type): void {
        if (type === 1) {
            this.printGet(url + '&type=PDF');
        } else if (type === 2) {
            this.printGet_Excel(url + '&type=EXCEL', 'mau_02');
        }
    }

    printMauBaoCao02_Cach2(url, data, type): void {
        if (type === 1) {
            this.printGet(url + '?type=PDF');
        } else if (type === 2) {
            this.printPost_Excel(url + '?type=EXCEL', data, 'mau_02');
        }
    }

    printMauBaoCao03(url, type): void {
        if (type === 1) {
            this.printGet(url + '&type=PDF');
        } else if (type === 2) {
            this.printGet_Excel(url + '&type=EXCEL', 'mau_03');
        }
    }

    printSoBaoCaoTongHopToanNganh(url, type): void {
        if (type === 1) {
            this.printGet(url + '&type=PDF');
        } else if (type === 2) {
            this.printGet_Excel(url + '&type=EXCEL', 'mau_01');
        }
    }

  printMauBaoCao28(url, type): void {
      if (type === 1) {
          this.printGet(url);
      } else if (type === 2) {
          this.printGet_Excel(url, 'mau_28');
      }
  }

  printMauBaoCao29(url, type): void {
      if (type === 1) {
          this.printGet(url);
      } else if (type === 2) {
          this.printGet_Excel(url, 'mau_29');
      }
  }

    printMauBaoCao29_Cach2(url, data, type): void {
        if (type === 1) {
            this.printGet(url);
        } else if (type === 2) {
            this.printPost_Excel(url, data, 'mau_29');
        }
    }

    private printGet_Excel(url, fileName): void {
        console.log('print get excel');
        this.http.get(url, {responseType: 'blob'}).subscribe(res => {
            this.fileResourceService.saveFile(res, fileName + '.xls');
        }, err => { console.log('in bị lỗi'); });
    }

    private printPost_Excel(url, data, fileName): void {
        console.log('print post excel');
        this.http.post(url, data, {responseType: 'blob'}).subscribe(res => {
            this.fileResourceService.saveFile(res, fileName + '.xls');
        }, err => { console.log('in bị lỗi'); });
    }

  private printGet(url: string): void {
    const options = {};
    options['responseType'] = 'text';
    options['content-type'] =  'application/json';
    this.http.get(url, options).subscribe(res => {
      if (typeof res === 'string') {
        const byteCharacters = atob(res);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new window.Blob([byteArray], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } else {
        console.log('in bị lỗi');
      }
    }, err => { console.log('in bị lỗi'); });

  }
  private printPost(url, data): void {
      const options = {};
      options['responseType'] = 'text';
      options['content-type'] =  'application/json';
      this.http.post(url, data, options).subscribe(res => {
        if (typeof res === 'string') {
          const byteCharacters = atob(res);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new window.Blob([byteArray], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        } else {
          console.log('in bị lỗi');
        }
      }, err => { console.log('in bị lỗi'); });
    }

    private printPost_Word(url, data, fileName): void {
      console.log('print post word');
        this.http.post(url, data, {
            responseType: 'blob'
        }).subscribe(res => {
            this.fileResourceService.saveFile(res, fileName + '.docx');
        }, err => { console.log('in bị lỗi'); });
    }







//   options = {};
//   options['responseType'] = 'text';
//   options['content-type'] =  'application/json';
//   this.http.post(DTKHIEUNAI.getDTKhieuNaiByDTId + '?donThuId=' + id, mau08, options).subscribe(res => {
//   if (typeof res === 'string') {
//   const byteCharacters = atob(res);
//   const byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//   byteNumbers[i] = byteCharacters.charCodeAt(i);
// }
// const byteArray = new Uint8Array(byteNumbers);
// const file = new window.Blob([byteArray], {type: 'application/pdf'});
// const fileURL = URL.createObjectURL(file);
// window.open(fileURL);
// } else {
//   console.log('in bị lỗi');
// }
// }, err => { console.log('in bị lỗi'); });
}
