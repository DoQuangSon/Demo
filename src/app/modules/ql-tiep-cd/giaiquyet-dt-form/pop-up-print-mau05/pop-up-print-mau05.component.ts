import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { NoiDtkhieunaiService } from '../../../../services/api/noi-dtkhieunai/noi-dtkhieunai.service';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
    selector: 'ttkt-pop-up-print-mau05',
    templateUrl: './pop-up-print-mau05.component.html',
    styleUrls: ['./pop-up-print-mau05.component.scss']
})
export class PopUpPrintMau05Component implements OnInit, AfterViewInit {

    date: Date = new Date();
    mauDon05Form: FormGroup;
    @ViewChild('modalMauDon') modalMauDon: ModalDirective;

    onSubmitCheckMauDonValid = false; // khi ấn vào nút In để kiểm tra dữ liệu của form in có hợp lệ hay không thì trường này thành true
    public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
    public ngayBanHanh: any;
    public ngayNhanDon: any;
    constructor(
        private builder: FormBuilder,
        private timeBuilder: TimeBuilderService,
        private noiDtkhieunaiService: NoiDtkhieunaiService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        this.date.setHours(0, 0, 0, 0);
        this.mauDon05Form = this.builder.group({
            coQuanCapTren: [''], // 1
            dvBanHanh: ['', Validators.required], // 2
            so: ['', Validators.required],
            diaDiemBanHanh: ['', Validators.required],
            ngayBanHanh: ['', Validators.required],
            ngayNhanDon: ['', Validators.required],
            tenNguoi_CoQuanKN: ['', Validators.required], // 3
            diaChiNguoi_CoQuanKN: ['', Validators.required],
            lyDoKhieuNai: ['', Validators.required],
            lyDoDonKhongDuDieuKien: ['', Validators.required],
            canCuPhapLy: ['', Validators.required], // căn cứ pháp lý đã áp dụng để ban hành thông báo về việc khiếu nại không đủ điều kiện thụ lý
            thuTucBoSung: ['', Validators.required], // thủ tục cần thiết phải bổ sung theo quy định  để khiếu nại dduwwocj xem xét giải quyết
            vietTatdv: ['', Validators.required],
            chucVuNguoiKyVanBan: ['', Validators.required],
        });
        console.log(this.mauDon05Form);
    }

    ngAfterViewInit(): void {
        this.openModalMauDon();
    }

    printMauDon(type: number) {
        // type =1 in pdf , = 2 in word
        this.onSubmitCheckMauDonValid = true;
        this.printMauDon05(type);
    }

    printMauDon05(type: number) {
        if (this.mauDon05Form.invalid) {
            this.alertService.error('Bạn phải điền đầy đủ thông tin');
            return;
        }
        if (this.mauDon05Form.valid) {
            const mauDon05: any = {};

            mauDon05.coQuanCapTren = (this.mauDon05Form.controls.coQuanCapTren.value || '').trim();
            mauDon05.dvBanHanh = (this.mauDon05Form.controls.dvBanHanh.value || '').trim();
            mauDon05.so = (this.mauDon05Form.controls.so.value || '').trim();
            mauDon05.diaDiemBanHanh = (this.mauDon05Form.controls.diaDiemBanHanh.value || '').trim();
            mauDon05.tenNguoi_CoQuanKN = (this.mauDon05Form.controls.tenNguoi_CoQuanKN.value || '').trim();
            mauDon05.diaChiNguoi_CoQuanKN = (this.mauDon05Form.controls.diaChiNguoi_CoQuanKN.value || '').trim();
            mauDon05.lyDoKhieuNai = (this.mauDon05Form.controls.lyDoKhieuNai.value || '').trim();
            mauDon05.lyDoDonKhongDuDieuKien = (this.mauDon05Form.controls.lyDoDonKhongDuDieuKien.value || '').trim();
            mauDon05.canCuPhapLy = (this.mauDon05Form.controls.canCuPhapLy.value || '').trim();
            mauDon05.thuTucBoSung = (this.mauDon05Form.controls.thuTucBoSung.value || '').trim();
            mauDon05.vietTatdv = (this.mauDon05Form.controls.vietTatdv.value || '').trim();
            mauDon05.chucVuNguoiKyVanBan = (this.mauDon05Form.controls.chucVuNguoiKyVanBan.value || '').trim();

            mauDon05.ngayBanHanh = this.mauDon05Form.value.ngayBanHanh;

            mauDon05.ngayNhanDon = this.mauDon05Form.value.ngayNhanDon;
            this.noiDtkhieunaiService.printMau05(mauDon05, type);
        }
    }

    openModalMauDon() {
        this.onSubmitCheckMauDonValid = false;
        this.mauDon05Form.reset();
        this.mauDon05Form.patchValue({
            ngayBanHanh: this.date,
            ngayNhanDon: this.date
        });
        this.modalMauDon.show();
    }

    closeModalMauDon() {
        this.modalMauDon.hide();
    }

}
