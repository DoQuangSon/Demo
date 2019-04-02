import { Component, OnInit, Input } from '@angular/core';
import { STATUS } from '../../../../../../../constants/ke-hoach-ttkt.constants';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';

@Component({
  selector: 'ttkt-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.scss']
})
export class ThongTinChungComponent implements OnInit {
  urlFileDownload: any;
  tenFile: any;
  isTWGiaoKH: boolean;
  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
    if (this._chiTietKH !== undefined && this._chiTietKH !== null) {
      if (this._chiTietKH.fileQuyetDinhTaoKH !== undefined && this._chiTietKH.fileQuyetDinhTaoKH !== null) {
        this.urlFileDownload = JSON.parse(this._chiTietKH.fileQuyetDinhTaoKH);
        if (this.urlFileDownload !== null) {
          this.tenFile = this.urlFileDownload[0].fileName;
        }
      }
      this.isTWGiaoKH = false;
      if (this._chiTietKH.status !== undefined && this._chiTietKH.status !== null) {
        if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH) {
          this.isTWGiaoKH = true;
        }
      }
    }
  }
  constructor(
    private fileResource: FileResourceService,
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line:curly
  }
  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
}
