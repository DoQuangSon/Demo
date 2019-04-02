import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChiPhiKhamChuaBenhService} from '../../../../services/api/danh-muc/noi-chiPhiKhamChuaBenh/chi-phi-kham-chua-benh.service';
import {subscribeToResult} from 'rxjs/util/subscribeToResult';
import {error} from 'util';
import { Pagging } from '../../../../shared/models/pagging.model';
import { MESS_CHI_PHI_KHAM_BENH } from '../../../../constants/message.constants';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-chiphikhamchuabenh',
  templateUrl: './chiphikhamchuabenh.component.html',
  styleUrls: ['./chiphikhamchuabenh.component.scss'],
  providers: [ChiPhiKhamChuaBenhService]
})
export class ChiphikhamchuabenhComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalChiPhiKhamChuaBenh') modalChiPhiKhamChuaBenh: ModalDirective;
  detailChiPhiKhamChuaBenhForm: FormGroup;

  listChiPhiKhamChuaBenh: any[] = [];

  formDetailChiPhiKhamChuaBenh_title: string = '';
  formDetailChiPhiKhamChuaBenh_action: string = '';

  pager: any = {};
  isNoiDungError: boolean = false;
  // number: number = 0;


  constructor(
    private fb: FormBuilder,
    private chiPhiKhamChuaBenhService: ChiPhiKhamChuaBenhService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.getAll('get');
    this.detailChiPhiKhamChuaBenhForm = this.fb.group({
      id: [''],
      noiDung: ['', Validators.required]
    });
  }

  showFormDetailChiPhiKhamChuaBenh(action, chiPhiKhamChuaBenhID = '') {
    this.detailChiPhiKhamChuaBenhForm.reset();
    switch (action) {
      case 'add':
        this.formDetailChiPhiKhamChuaBenh_title = 'Thêm chi phí khám chữa bệnh';
        break;
      case 'update':
        this.formDetailChiPhiKhamChuaBenh_title = 'Cập nhật chi phí khám chữa bệnh';
        break;
      case 'delete':
        this.formDetailChiPhiKhamChuaBenh_title = 'Xóa chi phí khám chữa bệnh';
        break;
    }
    if (action !== 'add') {
      const chiPhiKhamChuaBenh = this.listChiPhiKhamChuaBenh.find(item => item.id === chiPhiKhamChuaBenhID );
      this.detailChiPhiKhamChuaBenhForm.patchValue({
        id: chiPhiKhamChuaBenh.id,
        noiDung: chiPhiKhamChuaBenh.noiDung,
      });
    }
    this.formDetailChiPhiKhamChuaBenh_action = action;
    this.isNoiDungError = false;

    this.modalChiPhiKhamChuaBenh.show();
  }

  processDataToShow(res) {
    this.listChiPhiKhamChuaBenh = res['content'];
    this.pagging.totalItems = res.totalElements;
  }

  getAll(action) {
    if (action === 'get') {
      this.chiPhiKhamChuaBenhService.getAllChiPhiKhamChuaBenh(this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe( res => this.processDataToShow(res), error => {});
    } else if (action === 'delete') {
      if (this.listChiPhiKhamChuaBenh.length === 1) {
        this.pagging.currentPage -= 1;
      }
      this.chiPhiKhamChuaBenhService.getAllChiPhiKhamChuaBenh(this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe( res => this.processDataToShow(res), error => {});
    }
  }

  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAll('get');
  }
 

  doAction(action) {

    if (action === 'delete') {
      this.chiPhiKhamChuaBenhService.deleteChiPhiKhamChuaBenh(this.detailChiPhiKhamChuaBenhForm.value.id).
      subscribe(result =>{
        this.getAll('delete');
        this.alertService.success(MESS_CHI_PHI_KHAM_BENH.SUCCESS_XOA_CHI_PHI_KHAM_BENH);
      }, error => {
        this.alertService.error(MESS_CHI_PHI_KHAM_BENH.ERROR_XOA_CHI_PHI_KHAM_BENH);
      });
    } else {
      if (!this.isNoiDungError) {
        const chiPhiKhamChuaBenh: any = {};
        chiPhiKhamChuaBenh.noiDung = this.detailChiPhiKhamChuaBenhForm.value.noiDung.trim();
        switch (action) {
          case 'add':
            this.chiPhiKhamChuaBenhService.createChiPhiKhamChuaBenh(chiPhiKhamChuaBenh).subscribe(
              result => {
                this.getAll('get');
                this.alertService.success(MESS_CHI_PHI_KHAM_BENH.SUCCESS_THEM_CHI_PHI_KHAM_BENH);
            }, error => {
              this.alertService.error(MESS_CHI_PHI_KHAM_BENH.ERROR_THEM_CHI_PHI_KHAM_BENH);
            });
            break;
          case 'update':
            chiPhiKhamChuaBenh.id = this.detailChiPhiKhamChuaBenhForm.value.id;
            this.chiPhiKhamChuaBenhService.updateChiPhiKhamChuaBenh(chiPhiKhamChuaBenh).subscribe(result =>{
              this.getAll('get');
              this.alertService.success(MESS_CHI_PHI_KHAM_BENH.SUCCESS_CAP_NHAT_CHI_PHI_KHAM_BENH);
            }, error => {
              this.alertService.error(MESS_CHI_PHI_KHAM_BENH.ERROR_CAP_NHAT_CHI_PHI_KHAM_BENH);
            });
            break;
        }
      }
    }
    this.modalChiPhiKhamChuaBenh.hide();
  }

  validate() {
    if (this.detailChiPhiKhamChuaBenhForm.value.noiDung === null ||
      this.detailChiPhiKhamChuaBenhForm.value.noiDung.trim() === '') {
      this.isNoiDungError = true;
    } else {
      this.isNoiDungError = false;
    }
  }
}
