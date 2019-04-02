import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TienHanhTtktService} from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MESS_GIAI_TRINH} from '../../../../../../constants/message.constants';
import {AlertService} from '../../../../../../services/api/alert.service';
import {GiaiTrinh} from '../model/GiaiTrinh';
import {FileResourceService} from '../../../../../../services/helper/file-resource.service';

@Component({
  selector: 'ttkt-chap-nhan-giai-trinh-don-vi-ttkt-form',
  templateUrl: './chap-nhan-giai-trinh-don-vi-ttkt-form.component.html',
  styleUrls: ['./chap-nhan-giai-trinh-don-vi-ttkt-form.component.scss']
})
export class ChapNhanGiaiTrinhDonViTtktFormComponent implements OnInit {

    giaiTrinhFormGroup: FormGroup;
    giaiTrinhFormArray: FormArray;

    thanhLapDoanID: any;
    doiTuongTTKTID: any;
    dataTable= [];

  constructor(
      private route: ActivatedRoute,
      private tienHanhTTKTService: TienHanhTtktService,
      private fb: FormBuilder,
      private location: Location,
      private alertService: AlertService,
      private fileResource: FileResourceService,
  ) { }

  ngOnInit() {
      this.giaiTrinhFormArray = this.fb.array([]);
      this.initForm();
      this.route.params.subscribe(params => {
          if (params['thanhLapDoanID']) {
              this.thanhLapDoanID = params['thanhLapDoanID'];
          }
          if (params['doiTuongTTKTID']) {
              this.doiTuongTTKTID = params['doiTuongTTKTID'];
          }
          this.initData();
      });
  }

    initForm() {
        this.giaiTrinhFormGroup = this.fb.group({
            lyDoChapNhanGiaiTrinh: ['', Validators.required],
            quyetDinhGiaiTrinh: ['', Validators.required],
        });
    }

  initFormArayItem(id, dmChiTietND_ID, item) {
      return this.fb.group({
          id: [id],
          dmChiTietND_ID: [dmChiTietND_ID, Validators.required],

          soLuotNguoiViPham: [item.chiTietHistoryDTO.soLuotNguoiViPham],
          soTienViPham: [item.chiTietHistoryDTO.soTienViPham],
          soSoViPham: [item.chiTietHistoryDTO.soSoViPham],

          soLuotNguoiChapHanh: [item.chiTietHistoryDTO.soLuotNguoiChapHanh],
          soTienChapHanh: [item.chiTietHistoryDTO.soTienChapHanh],
          soSoChapHanh: [item.chiTietHistoryDTO.soSoChapHanh],

          sLGiaiTrinhSoNguoi: [0, Validators.required], // so lieu giai trinh
          sLGiaiTrinhSoTien: [0, Validators.required],
          sLGiaiTrinhSoThe: [0, Validators.required],

          kQSauGiaiTrinhSoNguoi: [0, Validators.required], // so lieu giai trinh
          kQSauGiaiTrinhSoTien: [0, Validators.required],
          kQSauGiaiTrinhSoThe: [0, Validators.required],

          soChapHanhBSSoNguoi: [0, Validators.required], // so chap hanh bo sung
          soChapHanhBSSoTien: [0, Validators.required],
          soChapHanhBSSoThe: [0, Validators.required],

          soConLaiPTHSoNguoi: [0, Validators.required], // so con lai phai thuc hien
          soConLaiPTHSoTien: [0, Validators.required],
          soConLaiPTHSoThe: [0, Validators.required],
      });
  }


    initData() {
      this.tienHanhTTKTService.getDataForGiaiTrinh(this.thanhLapDoanID, this.doiTuongTTKTID).subscribe(res => {
          this.dataTable = res;
          console.log(res);

          this.dataTable.forEach(item => {
              this.giaiTrinhFormArray.push(this.initFormArayItem(null, item.dmChiTietNDDTO.id, item));
          });

          if (this.dataTable && this.dataTable.length > 0) {
              // xem có chưa, nếu có rồi thì load vào bảng, và trở thành update, nếu chưa có thì là tạo mới
              this.tienHanhTTKTService.getGiaiTrinhByTienHanhTTKT_ID(this.dataTable[0].tienHanhTTKT_ID).subscribe(res1 => {
                  console.log(res1);
                  if (res1) {
                      this.createdGiaiTrinh = new GiaiTrinh(res1);
                      this.viewStatus = 2;
                      this.loadDataForUpdate(res1);
                      this.giaiTrinhFormArray.controls.forEach(item => this.tinhToan(item));
                  }
              });
          }
      });
  }

  createdGiaiTrinh: GiaiTrinh;
  viewStatus = 1; // 1-tạo mới; 2 - detail;  3- update


    setViewUpdate() {
        this.viewStatus = 3;
        this.alertService.success(MESS_GIAI_TRINH.SUCCESS_CHANGE_VIEW_UPDATE);
    }

    goBack() {
        this.location.back();
    }

  loadDataForUpdate(objGiaiTrinh) {
        console.log(objGiaiTrinh);
      this.giaiTrinhFormGroup.patchValue({
          lyDoChapNhanGiaiTrinh: objGiaiTrinh.lyDo,
          quyetDinhGiaiTrinh: objGiaiTrinh.fileQuyetDinh
      });

      for (let i = 0; i < this.dataTable.length; i++) {
          const chiTietGiaiTrinh = objGiaiTrinh.listChiTietGiaiTrinh.find( chiTietGiaiTrinhItem => chiTietGiaiTrinhItem.dmChiTietND_ID == this.dataTable[i].dmChiTietNDDTO.id);
          if (chiTietGiaiTrinh) {
              this.giaiTrinhFormArray.controls[i].patchValue({
                  id: chiTietGiaiTrinh.id,
                  sLGiaiTrinhSoNguoi: chiTietGiaiTrinh.sLGiaiTrinhSoNguoi,
                  sLGiaiTrinhSoTien: chiTietGiaiTrinh.sLGiaiTrinhSoTien,
                  sLGiaiTrinhSoThe: chiTietGiaiTrinh.sLGiaiTrinhSoThe,

                  kQSauGiaiTrinhSoNguoi: chiTietGiaiTrinh.kQSauGiaiTrinhSoNguoi,
                  kQSauGiaiTrinhSoTien: chiTietGiaiTrinh.kQSauGiaiTrinhSoTien,
                  kQSauGiaiTrinhSoThe: chiTietGiaiTrinh.kQSauGiaiTrinhSoThe,

                  soChapHanhBSSoNguoi: chiTietGiaiTrinh.soChapHanhBSSoNguoi,
                  soChapHanhBSSoTien: chiTietGiaiTrinh.soChapHanhBSSoTien,
                  soChapHanhBSSoThe: chiTietGiaiTrinh.soChapHanhBSSoThe
              });
          }
      }
  }

  updateGiaiTrinh() {
      if (this.giaiTrinhFormGroup.valid && this.giaiTrinhFormArray.valid && this.dataTable.length > 0 && this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh) {
          this.createdGiaiTrinh.setLydo(this.giaiTrinhFormGroup.value.lyDoChapNhanGiaiTrinh)
                               .setFileQuyetDinh(JSON.stringify(this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh))
                               .setTienHanhTTKT_ID(this.dataTable[0].tienHanhTTKT_ID)
                               .setListChiTietGiaiTrinh(this.giaiTrinhFormArray.value);

          this.tienHanhTTKTService.updateGiaiTrinh(this.createdGiaiTrinh).subscribe(res => {
              this.alertService.success(MESS_GIAI_TRINH.SUCCESS_CAP_NHAT_GIAI_TRINH);
          });
          this.location.back();
      } else if (!this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh) {
          this.alertService.error(MESS_GIAI_TRINH.ERROR_CHUA_CO_FILE);
      }
  }

   createGiaiTrinh() {
       const objGiaiTrinh = new GiaiTrinh(null);

       if (this.giaiTrinhFormGroup.valid && this.giaiTrinhFormArray.valid && this.dataTable.length > 0 && this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh) {
           objGiaiTrinh.setTienHanhTTKT_ID(this.dataTable[0].tienHanhTTKT_ID)
               .setLydo(this.giaiTrinhFormGroup.value.lyDoChapNhanGiaiTrinh)
               .setFileQuyetDinh(JSON.stringify(this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh))
               .setListChiTietGiaiTrinh(this.giaiTrinhFormArray.value);

           this.tienHanhTTKTService.createGiaiTrinh(objGiaiTrinh).subscribe(res => {
               this.alertService.success(MESS_GIAI_TRINH.SUCCESS_THEM_GIAI_TRINH);
           });
           this.location.back();
       } else if (!this.giaiTrinhFormGroup.value.quyetDinhGiaiTrinh) {
           this.alertService.error(MESS_GIAI_TRINH.ERROR_CHUA_CO_FILE);
       }
   }

  saveGiaiTrinh() {
      // update giai trinh
      if (this.createdGiaiTrinh) {
          this.updateGiaiTrinh();
          return;
      }
      // create new giai trinh
      this.createGiaiTrinh();
  }

  tinhToan(item) {
      let v = Number(item.controls.kQSauGiaiTrinhSoNguoi.value) - Number(item.controls.soChapHanhBSSoNguoi.value) -
          Number(item.controls.soLuotNguoiChapHanh.value);
      item.controls.soConLaiPTHSoNguoi.setValue(v >= 0 ? v : 0);

      v = Number(item.controls.kQSauGiaiTrinhSoTien.value) - Number(item.controls.soChapHanhBSSoTien.value) -
          Number(item.controls.soTienChapHanh.value);
      item.controls.soConLaiPTHSoTien.setValue(v >= 0 ? v : 0);

      v = Number(item.controls.kQSauGiaiTrinhSoThe.value) - Number(item.controls.soChapHanhBSSoThe.value) -
          Number(item.controls.soSoChapHanh.value);
      item.controls.soConLaiPTHSoThe.setValue(v >= 0 ? v : 0);
  }

    downloadFile() {
        const file = JSON.parse(this.createdGiaiTrinh.fileQuyetDinh);
        console.log(file[0]);
        this.fileResource.downloadFile(file[0].url).subscribe(blob => {
            this.fileResource.saveFile(blob, file[0].fileName);
        }, err => { });
    }

    getFileName() {
        const file = JSON.parse(this.createdGiaiTrinh.fileQuyetDinh);
        return file[0].fileName;
    }

}
