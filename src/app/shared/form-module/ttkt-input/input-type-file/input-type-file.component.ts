import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { IDataFile, InputTypeBase } from '../input-type.interface';
import { FileResourceService } from '../../../../services/helper/file-resource.service';
import { FILE } from '../../../../constants/api-file.constants';
@Component({
  selector: 'input-type-file',
  templateUrl: './input-type-file.component.html',
  styleUrls: ['./input-type-file.component.scss']
})
export class TtktInputTypeFileComponent extends InputTypeBase<IDataFile> implements OnInit {
  @ViewChild('fileInput') fileInputRef: ElementRef;

  ten: string = '';
  _data: IDataFile = {
    placeholder : '',
    type: FILE.FILE_OTHER
  };

  constructor(
    private fileService: FileResourceService
  ) {
    super();
  }

  ngOnInit(): void {
    // console.log(this.data);
    // throw new Error("Method not implemented.");
    //set if have value
    let value = this.formControlInput.value;
    if (value) {
      if (typeof value == 'string') {
        value = JSON.parse(value);
      }

      this.ten = value.fileName;
      console.log(value, this.ten);
    }

    this.formControlInput.valueChanges.subscribe(res => {
      if (res) {
        console.log(res);
        if (typeof res == 'string') {
            res = JSON.parse(res);
        }
        if (res.length > 0) {
          this.ten = res[0].fileName;
        }
      }
    });
  }

  onAttachFile() {
    const fileEl = this.fileInputRef.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileService.uploadFile(files, this.data.type).subscribe(res => {
        // this.fileQD = res;
        //set formhiden
        //@todo support muti file
        this.formControlInput.setValue(res);
        // this.urlFileDownload = res;
        // if (this.urlFileDownload.length !== 0) {
        // }
      }, err => {
        // this.alertService.error(err.title);
        console.log(err);
      });
    } else { }
  }
}
