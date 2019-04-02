import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '../../../../../../../../node_modules/@angular/forms';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { AuthService } from '../../../../../../auth/auth.service';
@Component({
  selector: 'ttkt-form-thong-tin-dieu-chinh',
  templateUrl: './form-thong-tin-dieu-chinh.component.html',
  styleUrls: ['./form-thong-tin-dieu-chinh.component.scss']
})
export class FormThongTinDieuChinhComponent implements OnInit {
  @ViewChild('fileQuyetDinhDCKH') fileInputRef1: ElementRef;
  @Input() thongTinDCForm: FormGroup = new FormGroup({});
  tenFile: any;
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };
  constructor(private fb: FormBuilder,
    private timeBuilder: TimeBuilderService,
    private fileResource: FileResourceService,
    private alertService: AlertService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.thongTinDCForm.addControl('ngayDieuChinh', new FormControl(this.date,[Validators.required]));
    this.thongTinDCForm.addControl('soQDDC', new FormControl('', [Validators.required]));
    this.thongTinDCForm.addControl('lyDoDC', new FormControl('',[Validators.required]));
    this.thongTinDCForm.addControl('nguoiTao', new FormControl('',[Validators.required]));
    this.thongTinDCForm.addControl('fileQD', new FormControl('',[Validators.required]));
    this.thongTinDCForm.addControl('nguoiKi', new FormControl('',[Validators.required]));
    this.thongTinDCForm.patchValue(
      { nguoiTao: this.auth.currentUser.tenHienThi}
    );
  }
  upFileQuyetDinhDCKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        if (res !== 0) {
          this.thongTinDCForm.patchValue(
            { fileQD: res}
          );
          this.tenFile = res[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }
  chonNgay() {
    this.thongTinDCForm.patchValue(
      { ngayDieuChinh: this.timeBuilder.fromTimeDatePicker(this.thongTinDCForm.value.ngayDieuChinh).setUTC().toISOString()}
    );
  }
  
}
