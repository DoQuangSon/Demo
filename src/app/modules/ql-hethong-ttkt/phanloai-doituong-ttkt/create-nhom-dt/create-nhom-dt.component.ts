import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoiPhanloaiDoituongService } from '../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-create-nhom-dt',
  templateUrl: './create-nhom-dt.component.html',
  styleUrls: ['./create-nhom-dt.component.scss']
})
export class CreateNhomDtComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  private _listThemMoi: Array<Object>;
  @Input()
  public get listThemMoi(): Array<Object> {
    return this._listThemMoi;
  }
  public set listThemMoi(value: Array<Object>) {
    this._listThemMoi = value;
  }
  // tslint:disable-next-line:member-ordering
  chuaCoNhom = { id: -1, tenDanhMuc: 'Nhóm đối tượng khác', actived: true };
  // tslint:disable-next-line:member-ordering
  nhomDuocSelect: any;
  // tslint:disable-next-line:member-ordering
  isDisabledOk: boolean;
  // tslint:disable-next-line:member-ordering
  listNhomDVDialog: any[];
  // tslint:disable-next-line:member-ordering

  constructor( private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
  private alertService: AlertService) { }
  ngOnInit() {
  this.isDisabledOk = false;
  this.nhomDuocSelect = null;
  this.isDisabledOk = false;
  this.getNhomDonViInfo();
  }
  getNhomDonViInfo() {
    this.noiPhanloaiDoituongService.getNhomDonVi(0, 10).subscribe(
      res => {
        this.listNhomDVDialog = res['content'];
        // tslint:disable-next-line:no-shadowed-variable
        this.listNhomDVDialog.push(this.chuaCoNhom);
        this.listNhomDVDialog.map(resonse => {
          resonse.text = resonse.tenDanhMuc;
        });
      }
    );
  }
  updateNhomDT () {
    this.noiPhanloaiDoituongService.updateNhomPhanLoaiDT (this._listThemMoi).subscribe(res => {
      this.closeModal.emit(true);

      this.alertService.success ('Cập nhật thành công!');
    }, err => {
      this.alertService.error('Cập nhật thất bại');
    });
  }

  changeNhom(event) {
    this.isDisabledOk = true;
    this.nhomDuocSelect = event;
    this._listThemMoi.map(res => {
      res['dmPhanLoaiDtId'] = this.nhomDuocSelect.id;
    });
  }
  clickOk() {

    if (this.nhomDuocSelect !== null || this.nhomDuocSelect !== undefined) {
      this.updateNhomDT();
    } else {
      this.isDisabledOk = false;
    }
  }
}
