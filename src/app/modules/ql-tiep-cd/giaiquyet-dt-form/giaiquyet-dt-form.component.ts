import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';

import {
  IS_ENOUGH_CONDITION,
  SELECT_ENOUGH_CONDITION,
  SIGNATURE,
  STATE_CONTENT,
} from './../../../constants/giaiquyet-dt.constants';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../constants';
import { DONTHU_STATUS } from '../../../constants/tiep-cong-dan.constants';
import { NoiDmphanloainoidungService } from '../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
import { TimeBuilderService } from '../../../services/helper/time-builder.service';
import { NoiDonthuService } from '../../../services/api/noi-donthu/noi-donthu.service';
import { FormService } from '../../../shared/form-module/form.service';
import { DialogLSTiepCDComponent } from './dialog-ls-tiep-cd/dialog-ls-tiep-cd.component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'ttkt-giaiquyet-dt-form',
  templateUrl: './giaiquyet-dt-form.component.html',
  styleUrls: ['./giaiquyet-dt-form.component.scss']
})
export class GiaiquyetDtFormComponent implements OnInit {
  @ViewChild('kiemTraLichSuModal') public kiemTraLichSuModal: ModalDirective;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @Input() source?: Subject<any>;
  @Input() preview?: boolean = false;
  @Input() editAble?: boolean = true;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  public sourceDonThu: Subject<any> = new Subject();
  public data: any;
  date: Date = new Date();
  submitted: boolean;
  change: any;
  signature: any;
  condition: any;
  solvingLetter: FormGroup;
  selectType: any;
  enough_condition: any;
  no_enough_condition: any;
  selectType_default: any;
  selectType_kn: any;
  selectType_tc: any;
  selectType_knpa: any;
  signature_one: any;
  signature_many: any;
  soLanden: any = 3;
  currentDonThu: any;
  soCV: any;

  contentNew: any;
  contentOld: any;
  optionContent = [
    { id: 1, name: 'Yêu cầu thủ trưởng đơn vị cấp dưới giải quyết' },
    { id: 2, name: 'Đề nghị chấm dứt việc tố cáo: Mẫu 27/TC' }
  ];
  classificationOption: any[] = [];
  public coCMT: boolean = false;
  // classificationOption: any = [
  //   {
  //     id: 1,
  //     name: 'Khiếu nại'
  //   },
  //   {
  //     id: 2,
  //     name: 'Tố cáo'
  //   },
  //   {
  //     id: 3,
  //     name: 'Kiến nghị phản ánh'
  //   }
  // ];
  saveLetter: Boolean = false;
  // myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   // editableDateField: false,
  //   alignSelectorRight: true,
  //   // openSelectorOnInputClick: true
  // };
  lichSuCmt: any = [];
  listTrangThaiDt = DONTHU_STATUS;
  private destroy$ = new Subject();
  isExisted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private noiDmphanloainoidungService: NoiDmphanloainoidungService,
    private timeBuilder: TimeBuilderService,
    private donThuService: NoiDonthuService,
    private modalService: BsModalService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.date.setHours(0,0,0,0);
    this.solvingLetter = this.fb.group({
      id: [''],
      selectType: [''],
      soCongVanDen: ['', [Validators.required, Validators.pattern(/[^-\s]/), Validators.maxLength(50)]],
      ngayThang: [this.date.toISOString(), Validators.required],
      hoTenCd: ['', [Validators.required, Validators.pattern(/[^-\s]/)]],
      soCMND: [''],
      diaChi: ['', Validators.pattern(/[^-\s]/)],
      soLanDen: [''],
      noiDung: ['', [Validators.required, Validators.pattern(/[^-\s]/)]],
      stateContent: [''],
      contentNewYc: [''],
      contentNewDn: [''],
      quaTc: [''],
      tiepCongDanId: ['']
    });

    this.enough_condition = IS_ENOUGH_CONDITION.ENOUGH_CONDITION;
    this.no_enough_condition = IS_ENOUGH_CONDITION.NO_ENOUGH_CONDITION;
    this.selectType_default = SELECT_ENOUGH_CONDITION.default;
    this.selectType_kn = SELECT_ENOUGH_CONDITION.khieunai;
    this.selectType_tc = SELECT_ENOUGH_CONDITION.tocao;
    this.selectType_knpa = SELECT_ENOUGH_CONDITION.kiennghiphananh;
    this.signature_one = SIGNATURE.motnguoi;
    this.signature_many = SIGNATURE.nhieunguoi;

    this.contentNew = STATE_CONTENT.moi;
    this.contentOld = STATE_CONTENT.cu;

    // this.solvingLetter.get('soCMND').valueChanges
    // .takeUntil(this.destroy$)
    // .debounceTime(1000)
    // .subscribe(soCMND => {
    //   this.changeCmt(soCMND);
    // });
    if (this.preview) {
      this.source
        .takeUntil(this.destroy$).subscribe(res => {
          try {
            res.main.quaTc = false;

            if (res.detail.tiepCongDanId) {
              res.main.quaTc = true;
              res.main.tiepCongDanId = res.detail.tiepCongDanId;
            }
          } catch (ex) {
            console.log('ex',ex);
          }

          this.data = res;
          this.fillData(res);
        });
    }
    this.noiDmphanloainoidungService
      .getAllDmPhanloainoidung(0, 10)
      .takeUntil(this.destroy$)
      .subscribe((res: any) => {
        this.classificationOption = res.content;
        console.log(this.classificationOption);
      });
    this.solvingLetter.get('selectType').valueChanges
      .takeUntil(this.destroy$)
      .subscribe(res => {
        this.changeType(res);
      });
  } // End ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //   errSpacesWhite: boolean = false;

  //   noWhitespaceValidator() {
  //     const formValue = this.solvingLetter.value;
  //     if(formValue.soCongVanDen.trim().length === 0){
  //       return this.errSpacesWhite = true;
  //     }
  //     return this.errSpacesWhite = false;
  // }
  changeSo(event) {
    this.soCV = this.solvingLetter.controls.soCongVanDen.value;
    this.noiDmphanloainoidungService.checkSoCV(this.soCV).subscribe( res => {
      console.log(res);
      this.isExisted = false;
    },err => {
      this.isExisted = true;
     });
  }
  onClickQuaTC(event) {
    // console.log(this.solvingLetter.value);
    if (this.solvingLetter.get('quaTc').value !== true) {
      // show dialog
      let bs = this.modalService.show(DialogLSTiepCDComponent, {
        class: 'modal-lg'
      });
      this.modalService.onHide
        .takeUntil(this.destroy$)
        .subscribe(req => {
          this.currentDonThu = bs.content.currentItem;
          console.log(req, this.currentDonThu);
          if (!this.currentDonThu) {
            return this.solvingLetter.get('quaTc').setValue(false);
          } else {
            this.solvingLetter.get('hoTenCd').disable();
            this.solvingLetter.get('diaChi').disable();
            this.solvingLetter.get('selectType').disable();
            this.solvingLetter.get('quaTc').setValue(true);
          }
          this.solvingLetter.patchValue({
            tiepCongDanId: this.currentDonThu.tiepCongDanId,
            id: this.currentDonThu.id,
            selectType: this.currentDonThu.phanLoaiNoiDungId,
            noiDung: this.currentDonThu.congDanTrinhBay,
            hoTenCd: this.currentDonThu.hoTenCongDan,
            soCMND: this.currentDonThu.soCMTND,
            diaChi: this.currentDonThu.diaChiCongDan,
            ngayThang: this.date.toISOString()
          });
        });
      // set value after show dialog
    }
  }

  fillData(data: any) {
    console.log('get donthus', data);
    const soCongVanDen = data.main.soCongVanDen;
    const ngayThang = data.main.ngayCongVan;
    const hoTenCd = data.main.hoTenCongDan;
    const diaChi = data.main.diaChiCongDan;
    const soCMND = data.main.soCMTND;
    const noiDung = data.main.noiDung;
    const selectType = data.main.phanLoaiNoiDungId;
    const _data: any = {};
    _data.soCongVanDen = soCongVanDen;
    _data.ngayThang = ngayThang;
    _data.hoTenCd = hoTenCd;
    _data.diaChi = diaChi;
    _data.soCMND = soCMND;
    _data.noiDung = noiDung;
    _data.selectType = selectType;
    _data.quaTc = data.main.quaTc;
    _data.tiepCongDanId = data.main.tiepCongDanId;
    this.patchData(_data);
  }

  patchData(data: any) {
    this.solvingLetter.patchValue({
      soCongVanDen: data.soCongVanDen,
      ngayThang: data.ngayThang,
      hoTenCd: data.hoTenCd,
      diaChi: data.diaChi,
      soCMND: data.soCMND || '',
      noiDung: data.noiDung,
      selectType: data.selectType || 0,
      quaTc: data.quaTc,
      tiepCongDanId: data.tiepCongDanId
    });
    if(data.selectType !== 0){
      this.solvingLetter.get('selectType').disable();
    }
    this.changeType(data.selectType);
  }

  changeCmt(soCMND) {
    if (!soCMND) {
      this.coCMT = false;
      // this.solvingLetter.patchValue({
      //   hoTenCd: '',
      //   diaChi: '',
      //   // soCMND: ''
      // });
    } else {
      // this.donThuService.getInfoByCmt({ soCMND })
      // .takeUntil(this.destroy$).subscribe(res => {
      //   console.log(res);
      //   if (Object.keys(res).length > 0) {
      //     this.coCMT = true;
      //     this.solvingLetter.patchValue({
      //       hoTenCd: res.hoten || '',
      //       diaChi: res.diachi || '',
      //       soCMND: res.cmtnd || ''
      //     });
      //   } else {
      //     this.coCMT = false;
      //   }
      // }, err => {
      //   this.coCMT = false;
      // this.solvingLetter.patchValue({
      //   hoTenCd: '',
      //   diaChi: '',
      //   // soCMND: ''
      // });
      // });
    }
  }

  changeType(selectType) {
    this.selectType = selectType;
    if (this.preview) {
      setTimeout(() => {
        this.sourceDonThu.next(this.data);
      }, 0);
    }
    this.solvingLetter.patchValue({
      stateContent: null,
      contentNewYc: null,
      contentNewDn: null,
      condition: null,
      signature: null,
      authority: null
    });
    this.condition = 0;
  }

  changeCondition() {
    this.condition = this.solvingLetter.value.condition;
    console.log(this.condition);
    // tslint:disable-next-line:triple-equals
    if (this.condition == this.enough_condition) {
      this.solvingLetter.patchValue({ saveLetter: false });
      this.saveLetter = false;
      // tslint:disable-next-line:triple-equals
    } else if (this.condition == this.no_enough_condition) {
    }
  }

  onSave() {
    this.formService.touchAllInput(this.solvingLetter, true);
    if (this.solvingLetter.valid) {
      const formValue = this.solvingLetter.value;
      console.log(formValue);
      const jframe = document.getElementById('iframePrint');
      // tslint:disable-next-line:triple-equals
      if (formValue.condition == 2 && formValue.saveLetter) {
        jframe.setAttribute(
          'src',
          '../../../../assets/print-document/04_KN_Phieudexuatxulydon.html'
        );
        this.printDocument.show();
      }
    }
  }

  openModalLichSu() {
    this.kiemTraLichSuModal.show();
    this.donThuService
      .getLichSuCDByCmt(this.solvingLetter.value.soCMND)
      .takeUntil(this.destroy$)
      .subscribe(
        res => {
          this.lichSuCmt = res;
          this.getSttName();
        },
        err => { }
      );
  }

  getSttName() {
    this.lichSuCmt.forEach(el => {
      this.listTrangThaiDt.forEach(el2 => {
        if (el.status === el2.id) {
          el.status = el2.name;
        }
      });
    });
  }

  onSubmitted() {
    this.submitted = true;
  }
}
