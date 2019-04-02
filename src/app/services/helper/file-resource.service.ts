import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FILE } from '../../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileResourceService {

  constructor(
    private http: HttpClient,
  ) { }

  downloadFile(path): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    // options.responseType = ResponseContentType.Blob;
    return this.http.get(FILE.download + `?path=${path}`, {
      responseType: 'blob'
    });
      // .map(extractData)
      // .catch(handleError);
  }

  importFile(files: File[]) {
    // const options = createCommonHeaders(this.authService, '');
    const formData = new FormData();
    [].forEach.call(files, (file, index) => {
      formData.append('files[]', file);
    });
    // console.log('uploadForm', formData);
    return this.http.post(FILE.importFile, formData);
  }

  exportFileKeHoachToanNganh(body): Observable<any> {
    // const options = createCommonHeaders(this.authService);
    return this.http.post(FILE.exportFileKeHoachToanNganh, body);
  }

  uploadFile(files: File[], location): Observable<any> {
    // const options = createCommonHeaders(this.authService, '');
    const formData = new FormData();
    [].forEach.call(files, (file, index) => {
      // console.log('file', file);
      formData.append('files', file);
      formData.append('location', location);
    });
    return this.http.post(FILE.upload, formData);
  }

  saveFile(blob, fileName) {
    // if (navigator.msSaveBlob) { // IE 10+
    //   navigator.msSaveBlob(blob, fileName);
    // } else {
    //   const link = document.createElement('a');
    //   if (link.download !== undefined) { // feature detection
    //     // Browsers that support HTML5 download attribute
    //     const url = URL.createObjectURL(blob);
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', fileName);
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // }
    // use file saver
    saveAs(blob, fileName);
  }

  getFileObj(fileString) {
    if (typeof fileString === 'object') {
      return fileString;
    } else {
      try {
        return JSON.parse(fileString);
      } catch (e) {
        return {};
      }
    }
  }

  getFileString(files) {
    if (typeof files === 'string') {
      return files;
    } else {
      try {
        return JSON.stringify(files);
      } catch (e) {
        return '';
      }
    }
  }
}
