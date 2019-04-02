import { Component, OnInit, Input } from '@angular/core';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';

@Component({
  selector: 'ttkt-thong-tin-chung-tinh',
  templateUrl: './thong-tin-chung-tinh.component.html',
  styleUrls: ['./thong-tin-chung-tinh.component.scss']
})
export class ThongTinChungTinhComponent implements OnInit {

  urlFileDownload: any;
  tenFile: any;
  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
    if (this._chiTietKH.fileQuyetDinhTaoKH !== undefined) {
      this.urlFileDownload = JSON.parse(this._chiTietKH.fileQuyetDinhTaoKH);
      if ( this.urlFileDownload !== null) {
        this.tenFile = this.urlFileDownload[0].fileName;
      }
    }
  }
  constructor(
    private fileResource: FileResourceService,
  ) {
  }

  ngOnInit() {
  }
  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
}
