import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { NoiDtkhieunaiService } from '../../../../services/api/noi-dtkhieunai/noi-dtkhieunai.service';

@Component({
    selector: 'ttkt-pop-up-print',
    templateUrl: './pop-up-print.component.html',
    styleUrls: ['./pop-up-print.component.scss']
})
export class PopUpPrintComponent implements OnInit, AfterViewInit {

    // in mẫu 06-07-08-09

    loaiMauDonForm: FormGroup;
    @ViewChild('modalMauDon') modalMauDon: ModalDirective;
    @Input() typeMauDon: any;
    @Input() id: number;
    // @Input() editAble? = true;

    loaiMauDon: any = {
        id: 0, title: '',
        coQuan: false,
        dvBanHanh: false,
        so: false,
        vietTatdv: false,
        ngayBanHanh: false,
        ngayNhanDon: false,
        quyetDinhNgay: false,
        quyetDinhSo: false,
        tenCQChuyen: false,
        nhanDuocDon: false,
        diaChiCQ: false,
        tenNguoiKN: false,
        diaChiNguoiKN: false,
        KNTCviec: false,
        tenCoQuanDv: false,
        doiTuongKN: false,
        guiDonKhieuNaiToi: false,
        canCu: false,
        guiDonKNDen: false,
        quyenHanNguoiKy: false,
        nguoiKyVB: false,
        coQuanCoThamQuyen: false,
        kyHieuCuaVanBanChuyenDen: false,
        chuyenDon_KN_Hay_TC: false,
    };
    chuyenDon = 'kn';
    onSubmitCheckMauDonValid = false; // khi ấn vào nút In để kiểm tra dữ liệu của form in có hợp lệ hay không thì trường này thành true

    constructor(
        private builder: FormBuilder,
        private timeBuilder: TimeBuilderService,
        private noiDtkhieunaiService: NoiDtkhieunaiService,
    ) { }

    ngOnInit() {
        this.loaiMauDonForm = this.builder.group({
            coQuan: [''],
            dvBanHanh: ['', Validators.required],
            so: ['', Validators.required],
            vietTatdv: ['', Validators.required],
            ngayBanHanh: ['', Validators.required],
            ngayNhanDon: ['', Validators.required],
            quyetDinhNgay: ['', Validators.required],
            tenCQChuyen: ['', Validators.required],
            nhanDuocDon: ['', Validators.required],
            diaChiCQChuyen: ['', Validators.required],
            tenNguoiKN: ['', Validators.required],
            diaChi: ['', Validators.required],
            KNTCviec: ['', Validators.required],
            tenCQCBanHanh: ['', Validators.required],
            quyetDinh: ['', Validators.required],
            canCu: ['', Validators.required],
            guiDonKhieuNaiDen: ['', Validators.required],
            quyenHanNguoiKy: ['', Validators.required],
            nguoiKyVB: ['', Validators.required],
            coQuanCoThamQuyen: ['', Validators.required],
            kyHieuCuaVanBanChuyenDen: ['', Validators.required],
            guiDonKhieuNaiToi: ['', Validators.required],
            quyetDinhSo: ['', Validators.required],
            chuyenDon: ['kn', Validators.required],
        });

    }

    ngAfterViewInit(): void {
        this.loaiMauDon = this.typeMauDon;
        this.openModalMauDon(this.loaiMauDon.id);
    }

    resetLoaiMauDon() {
        this.loaiMauDon.coQuan = false;
        this.loaiMauDon.dvBanHanh = false;
        this.loaiMauDon.so = false;
        this.loaiMauDon.vietTatdv = false;
        this.loaiMauDon.ngayBanHanh = false;
        this.loaiMauDon.ngayNhanDon = false;
        this.loaiMauDon.quyetDinhNgay = false;
        this.loaiMauDon.quyetDinhSo = false;
        this.loaiMauDon.tenCQChuyen = false;
        this.loaiMauDon.nhanDuocDon = false;
        this.loaiMauDon.diaChiCQ = false;
        this.loaiMauDon.tenNguoiKN = false;
        this.loaiMauDon.diaChiNguoiKN = false;
        this.loaiMauDon.KNTCviec = false;
        this.loaiMauDon.tenCoQuanDv = false;
        this.loaiMauDon.doiTuongKN = false;
        this.loaiMauDon.guiDonKhieuNaiToi = false;
        this.loaiMauDon.canCu = false;
        this.loaiMauDon.guiDonKNDen = false;
        this.loaiMauDon.quyenHanNguoiKy = false;
        this.loaiMauDon.nguoiKyVB = false;
        this.loaiMauDon.coQuanCoThamQuyen = false;
        this.loaiMauDon.kyHieuCuaVanBanChuyenDen = false;
        this.loaiMauDon.chuyenDon_KN_Hay_TC = false;
    }

    isMauDon8Valid() {
        return this.loaiMauDonForm.controls.dvBanHanh.valid &&
            this.loaiMauDonForm.controls.so.valid &&
            this.loaiMauDonForm.controls.vietTatdv.valid &&
            this.loaiMauDonForm.controls.ngayBanHanh.valid &&
            this.loaiMauDonForm.controls.ngayNhanDon.valid &&
            this.loaiMauDonForm.controls.tenNguoiKN.valid &&
            this.loaiMauDonForm.controls.diaChi.valid &&
            this.loaiMauDonForm.controls.KNTCviec.valid &&
            this.loaiMauDonForm.controls.guiDonKhieuNaiDen.valid &&
            this.loaiMauDonForm.controls.quyenHanNguoiKy.valid &&
            this.loaiMauDonForm.controls.coQuanCoThamQuyen.valid;
    }

    isMauDon6Valid() {
        if (this.loaiMauDonForm.controls.dvBanHanh.valid &&
            this.loaiMauDonForm.controls.so.valid &&
            this.loaiMauDonForm.controls.vietTatdv.valid &&
            this.loaiMauDonForm.controls.ngayBanHanh.valid &&
            this.loaiMauDonForm.controls.ngayNhanDon.valid &&
            this.loaiMauDonForm.controls.KNTCviec.valid &&
            this.loaiMauDonForm.controls.guiDonKhieuNaiDen.valid &&
            this.loaiMauDonForm.controls.quyenHanNguoiKy.valid &&
            this.loaiMauDonForm.controls.coQuanCoThamQuyen.valid &&
            this.loaiMauDonForm.controls.canCu.valid) {
            if (this.loaiMauDonForm.controls.chuyenDon.value === 'tc') {
                return this.loaiMauDonForm.controls.tenNguoiKN.valid &&
                    this.loaiMauDonForm.controls.diaChi.valid;
            }
            return true;
        }
        return false;
    }

    isMauDon9Valid() {
        return this.loaiMauDonForm.controls.dvBanHanh.valid &&
            this.loaiMauDonForm.controls.so.valid &&
            this.loaiMauDonForm.controls.vietTatdv.valid &&
            this.loaiMauDonForm.controls.ngayBanHanh.valid &&
            this.loaiMauDonForm.controls.ngayNhanDon.valid &&
            this.loaiMauDonForm.controls.tenCQChuyen.valid &&
            this.loaiMauDonForm.controls.tenNguoiKN.valid &&
            this.loaiMauDonForm.controls.diaChi.valid &&
            this.loaiMauDonForm.controls.KNTCviec.valid &&
            this.loaiMauDonForm.controls.guiDonKhieuNaiDen.valid &&
            this.loaiMauDonForm.controls.quyenHanNguoiKy.valid &&
            this.loaiMauDonForm.controls.kyHieuCuaVanBanChuyenDen.valid;
    }

    isMauDon7Valid() {
        if (this.loaiMauDonForm.controls.dvBanHanh.valid &&
            this.loaiMauDonForm.controls.so.valid &&
            this.loaiMauDonForm.controls.vietTatdv.valid &&
            this.loaiMauDonForm.controls.ngayBanHanh.valid &&
            this.loaiMauDonForm.controls.ngayNhanDon.valid &&
            this.loaiMauDonForm.controls.quyetDinhNgay.valid &&
            this.loaiMauDonForm.controls.tenCQCBanHanh.valid &&
            this.loaiMauDonForm.controls.tenCQChuyen.valid &&
            this.loaiMauDonForm.controls.tenNguoiKN.valid &&
            this.loaiMauDonForm.controls.diaChi.valid &&
            this.loaiMauDonForm.controls.KNTCviec.valid &&
            this.loaiMauDonForm.controls.guiDonKhieuNaiDen.valid &&
            this.loaiMauDonForm.controls.quyenHanNguoiKy.valid &&
            this.loaiMauDonForm.controls.quyetDinhSo.valid &&
            this.loaiMauDonForm.controls.canCu.valid) {
            const quyetDinh = (this.loaiMauDonForm.controls.quyetDinh.value || '').trim().toLowerCase();
            if (quyetDinh.toString().indexOf('hanhvivebhxh') !== 0) {
                return this.loaiMauDonForm.controls.guiDonKhieuNaiToi.valid;
            }
            return true;
        }
        return false;
    }

    changeChuyenDonValue(res) {
        this.chuyenDon = res;
        this.loaiMauDon.diaChiNguoiKN = this.chuyenDon.toString() !== 'tc';

        if (this.chuyenDon.toString() === 'tc') {
            this.loaiMauDonForm.controls.canCu.setValue('Luật Tố cáo số 03/2011/QH13 ngày 11 tháng 11 năm 2011');
        } else {
            this.loaiMauDonForm.controls.canCu.setValue('Luật Khiếu nại số 02/2011/QH13 ngày 11 tháng 11 năm 2011');
        }
    }

    changeDoiTuongKN() {
        const ChonQuyetDinh = (this.loaiMauDonForm.value.quyetDinh);
        if (ChonQuyetDinh === 'hanhViVeBHXH') {
            this.loaiMauDonForm.patchValue({
                canCu: 'Khoản 3 Điều 119 Luật Bảo hiểm xã hội số 58/2014/QH13 ngày 20 tháng 11 năm 2014'
            });
        } else if (ChonQuyetDinh === 'kyLuat') {
            this.loaiMauDonForm.patchValue({
                canCu: 'Khoản 3 Điều 51 Luật Khiếu nại số 02/2011/QH13 ngày 11 tháng 11 năm 2011'
            });
        }
    }

    printMauDon(id: number, type: number) {
        this.onSubmitCheckMauDonValid = true;
        switch (id) {
            case 1:
                this.printMauDon08(type);
                break;
            case 2:
                this.printMauDon06(type);
                break;
            case 3:
                this.printMauDon09(type);
                break;
            case 4:
                this.printMauDon07(type);
                break;
        }
    }

    printMauDon08(type: number) {
        if (this.isMauDon8Valid()) {
            const mauDon08: any = {};

            mauDon08.coQuanCapTren = (this.loaiMauDonForm.controls.coQuan.value || '').trim();
            mauDon08.dvBanHanh = (this.loaiMauDonForm.controls.dvBanHanh.value || '').trim();
            mauDon08.so = (this.loaiMauDonForm.controls.so.value || '').trim();
            mauDon08.dvVietTat = (this.loaiMauDonForm.controls.vietTatdv.value || '').trim();
            mauDon08.ngayBanHanh = this.loaiMauDonForm.controls.ngayBanHanh.value;
            if (mauDon08.ngayBanHanh !== null) {
                mauDon08.ngayBanHanh = this.timeBuilder.fromTimeDatePicker(mauDon08.ngayBanHanh).setUTC().toISOString();
            }
            mauDon08.ngayNhanDon = this.loaiMauDonForm.controls.ngayNhanDon.value;
            if (mauDon08.ngayNhanDon !== null) {
                mauDon08.ngayNhanDon = this.timeBuilder.fromTimeDatePicker(mauDon08.ngayNhanDon).setUTC().toISOString();
            }
            // mauDon08.tenCoQuanGuiDon = (this.loaiMauDonForm.controls.tenCQChuyen.value || '').trim();
            mauDon08.tenNguoiKhieuNai = (this.loaiMauDonForm.controls.tenNguoiKN.value || '').trim();
            mauDon08.diaChiNguoiKhieuNai = (this.loaiMauDonForm.controls.diaChi.value || '').trim();
            mauDon08.khieuNaiVeViec = (this.loaiMauDonForm.controls.KNTCviec.value || '').trim();
            mauDon08.guiDonKhieuNaiDen = (this.loaiMauDonForm.controls.guiDonKhieuNaiDen.value || '').trim();
            mauDon08.chucVuNguoiKy = (this.loaiMauDonForm.controls.quyenHanNguoiKy.value || '').trim();
            mauDon08.coQuanCoThamQuyen = (this.loaiMauDonForm.controls.coQuanCoThamQuyen.value || '').trim();

            this.noiDtkhieunaiService.printMau08(mauDon08, type);
        }
    }

    printMauDon06(type: number) {
        if (this.isMauDon6Valid()) {
            const mauDon06: any = {};

            mauDon06.coQuanCapTren = (this.loaiMauDonForm.controls.coQuan.value || '').trim();
            mauDon06.dvBanHanh = (this.loaiMauDonForm.controls.dvBanHanh.value || '').trim();
            mauDon06.so = (this.loaiMauDonForm.controls.so.value || '').trim();
            mauDon06.dvVietTat = (this.loaiMauDonForm.controls.vietTatdv.value || '').trim();

            mauDon06.ngayBanHanh = this.loaiMauDonForm.controls.ngayBanHanh.value;
            if (mauDon06.ngayBanHanh !== null) {
                mauDon06.ngayBanHanh = this.timeBuilder.fromTimeDatePicker(mauDon06.ngayBanHanh).setUTC().toISOString();
            }

            mauDon06.ngayNhanDon = this.loaiMauDonForm.controls.ngayNhanDon.value;
            if (mauDon06.ngayNhanDon !== null) {
                mauDon06.ngayNhanDon = this.timeBuilder.fromTimeDatePicker(mauDon06.ngayNhanDon).setUTC().toISOString();
            }

            mauDon06.tenNguoiKhieuNai = this.loaiMauDonForm.controls.chuyenDon.value === 'tc' ? 'công dân' : (this.loaiMauDonForm.controls.tenNguoiKN.value || '').trim();
            mauDon06.diaChiNguoiKhieuNai = this.loaiMauDonForm.controls.chuyenDon.value === 'tc' ? '' : (this.loaiMauDonForm.controls.diaChi.value || '').trim();
            // mauDon06.tenCoQuanGuiDon = (this.loaiMauDonForm.controls.tenCQChuyen.value || '').trim();
            mauDon06.khieuNaiVeViec = (this.loaiMauDonForm.controls.KNTCviec.value || '').trim();
            mauDon06.guiDonKhieuNaiDen = (this.loaiMauDonForm.controls.guiDonKhieuNaiDen.value || '').trim();
            mauDon06.chucVuNguoiKy = (this.loaiMauDonForm.controls.quyenHanNguoiKy.value || '').trim();
            mauDon06.coQuanCoThamQuyen = (this.loaiMauDonForm.controls.coQuanCoThamQuyen.value || '').trim();
            const canCu = (this.loaiMauDonForm.controls.canCu.value || '').trim();
            const i1 = canCu.indexOf('số');
            const i2 = canCu.indexOf('ngày');
            const i3 = canCu.indexOf('năm');
            mauDon06.canCuPhapLy = canCu.substring(0, i1).trim();
            mauDon06.quyetDinhSo = canCu.substring(i1 + 3, i2).trim();
            mauDon06.quyetDinhNgay = canCu.substring(i2, i3 + 8).trim();

            this.noiDtkhieunaiService.printMau06(mauDon06, type);
        }
    }

    printMauDon09(type: number) {
        if (this.isMauDon9Valid()) {
            const mauDon09: any = {};

            mauDon09.coQuanCapTren = (this.loaiMauDonForm.controls.coQuan.value || '').trim();
            mauDon09.dvBanHanh = (this.loaiMauDonForm.controls.dvBanHanh.value || '').trim();
            mauDon09.so = (this.loaiMauDonForm.controls.so.value || '').trim();
            mauDon09.dvVietTat = (this.loaiMauDonForm.controls.vietTatdv.value || '').trim();
            mauDon09.ngayBanHanh = this.loaiMauDonForm.controls.ngayBanHanh.value;
            if (mauDon09.ngayBanHanh !== null) {
                mauDon09.ngayBanHanh = this.timeBuilder.fromTimeDatePicker(mauDon09.ngayBanHanh).setUTC().toISOString();
            }
            mauDon09.ngayNhanDon = this.loaiMauDonForm.controls.ngayNhanDon.value;
            if (mauDon09.ngayNhanDon !== null) {
                mauDon09.ngayNhanDon = this.timeBuilder.fromTimeDatePicker(mauDon09.ngayNhanDon).setUTC().toISOString();
            }
            mauDon09.tenCoQuanGuiDon = (this.loaiMauDonForm.controls.tenCQChuyen.value || '').trim();
            mauDon09.tenNguoiKhieuNai = (this.loaiMauDonForm.controls.tenNguoiKN.value || '').trim();
            mauDon09.diaChiNguoiKhieuNai = (this.loaiMauDonForm.controls.diaChi.value || '').trim();
            mauDon09.khieuNaiVeViec = (this.loaiMauDonForm.controls.KNTCviec.value || '').trim();
            mauDon09.guiDonKhieuNaiDen = (this.loaiMauDonForm.controls.guiDonKhieuNaiDen.value || '').trim();
            mauDon09.chucVuNguoiKy = (this.loaiMauDonForm.controls.quyenHanNguoiKy.value || '').trim();
            mauDon09.kyHieuCuaVanBanChuyenDen = (this.loaiMauDonForm.controls.kyHieuCuaVanBanChuyenDen.value || '').trim();

            this.noiDtkhieunaiService.printMau09(mauDon09, type);
        }
    }

    printMauDon07(type: number) {
        if (this.isMauDon7Valid()) {
            const mauDon07: any = {};

            mauDon07.coQuanCapTren = (this.loaiMauDonForm.controls.coQuan.value || '').trim();
            mauDon07.dvBanHanh = (this.loaiMauDonForm.controls.dvBanHanh.value || '').trim();
            mauDon07.so = (this.loaiMauDonForm.controls.so.value || '').trim();
            mauDon07.dvVietTat = (this.loaiMauDonForm.controls.vietTatdv.value || '').trim();

            mauDon07.ngayBanHanh = this.loaiMauDonForm.controls.ngayBanHanh.value;
            if (mauDon07.ngayBanHanh !== null) {
                mauDon07.ngayBanHanh = this.timeBuilder.fromTimeDatePicker(mauDon07.ngayBanHanh).setUTC().toISOString();
            }

            mauDon07.ngayNhanDon = this.loaiMauDonForm.controls.ngayNhanDon.value;
            if (mauDon07.ngayNhanDon !== null) {
                mauDon07.ngayNhanDon = this.timeBuilder.fromTimeDatePicker(mauDon07.ngayNhanDon).setUTC().toISOString();
            }

            mauDon07.quyetDinhNgay = this.loaiMauDonForm.controls.quyetDinhNgay.value;
            if (mauDon07.quyetDinhNgay !== null) {
                mauDon07.quyetDinhNgay = this.timeBuilder.fromTimeDatePicker(mauDon07.quyetDinhNgay).setUTC().toISOString();
            }

            mauDon07.canCu = (this.loaiMauDonForm.controls.canCu.value || '').trim();
            const quyetDinh = (this.loaiMauDonForm.controls.quyetDinh.value || '').trim().toLowerCase();

            if (quyetDinh.toString().indexOf('hanhvivebhxh') === 0) {
                mauDon07.guiDonKhieuNaiToiCoQuan = 'Cơ quan quản lý nhà nước về lao động cấp tỉnh hoặc khởi kiện tại Tòa án';
            } else {
                mauDon07.guiDonKhieuNaiToiCoQuan = (this.loaiMauDonForm.controls.guiDonKhieuNaiToi.value || '').trim();
            }
            mauDon07.coQuanBanHanhQuyetDinhGiaiQuyetKhieuNai = (this.loaiMauDonForm.controls.tenCQCBanHanh.value || '').trim();
            mauDon07.tenCoQuanGuiDon = (this.loaiMauDonForm.controls.tenCQChuyen.value || '').trim();
            mauDon07.tenNguoiKhieuNai = (this.loaiMauDonForm.controls.tenNguoiKN.value || '').trim();
            mauDon07.diaChiNguoiKhieuNai = (this.loaiMauDonForm.controls.diaChi.value || '').trim();
            mauDon07.khieuNaiVeViec = (this.loaiMauDonForm.controls.KNTCviec.value || '').trim();
            mauDon07.guiDonKhieuNaiDen = (this.loaiMauDonForm.controls.guiDonKhieuNaiDen.value || '').trim();
            mauDon07.chucVuNguoiKy = (this.loaiMauDonForm.controls.quyenHanNguoiKy.value || '').trim();
            // mauDon07.coQuanCoThamQuyen = (this.loaiMauDonForm.controls.coQuanCoThamQuyen.value || '').trim();
            // mauDon07.kyHieuCuaVanBanChuyenDen = (this.loaiMauDonForm.controls.kyHieuCuaVanBanChuyenDen.value || '').trim();
            mauDon07.quyetDinhSo = (this.loaiMauDonForm.controls.quyetDinhSo.value || '').trim();

            this.noiDtkhieunaiService.printMau07(mauDon07, type);
        }
    }

    openModalMauDon(id: number, loaiMauDon?) {
        this.chuyenDon = 'kn';
        this.onSubmitCheckMauDonValid = false;
        this.loaiMauDonForm.reset();
        this.loaiMauDonForm.get('chuyenDon').setValue('kn');
        // const _loaiMauDon = this.noAuthorityOptions.filter(el => el.id === id)[0] || {};
        if (loaiMauDon !== null && loaiMauDon !== undefined) {
            this.loaiMauDon = loaiMauDon;
        }
        switch (id) {
            case 1:
                this.resetLoaiMauDon();
                this.loaiMauDon.coQuan = true;
                this.loaiMauDon.dvBanHanh = true;
                this.loaiMauDon.so = true;
                this.loaiMauDon.vietTatdv = true;
                this.loaiMauDon.ngayBanHanh = true;
                this.loaiMauDon.ngayNhanDon = true;
                this.loaiMauDon.tenNguoiKN = true;
                this.loaiMauDon.diaChiNguoiKN = true;
                this.loaiMauDon.guiDonKNDen = true;
                this.loaiMauDon.quyenHanNguoiKy = true;
                this.loaiMauDon.KNTCviec = true;
                this.loaiMauDon.coQuanCoThamQuyen = true;
                break;
            case 2:
                this.resetLoaiMauDon();
                this.loaiMauDon.coQuan = true;
                this.loaiMauDon.dvBanHanh = true;
                this.loaiMauDon.so = true;
                this.loaiMauDon.vietTatdv = true;
                this.loaiMauDon.ngayBanHanh = true;
                this.loaiMauDon.ngayNhanDon = true;
                this.loaiMauDon.guiDonKNDen = true;
                this.loaiMauDon.chuyenDon_KN_Hay_TC = true;
                this.loaiMauDon.tenNguoiKN = true;
                this.loaiMauDon.diaChiNguoiKN = true;
                this.loaiMauDon.canCu = true;
                this.loaiMauDon.KNTCviec = true;
                this.loaiMauDon.coQuanCoThamQuyen = true;
                this.loaiMauDon.quyenHanNguoiKy = true;
                this.loaiMauDonForm.patchValue({
                    canCu: 'Luật Khiếu nại số 02/2011/QH13 ngày 11 tháng 11 năm 2011',
                });
                break;
            case 3:
                this.resetLoaiMauDon();
                this.loaiMauDon.coQuan = true;
                this.loaiMauDon.dvBanHanh = true;
                this.loaiMauDon.so = true;
                this.loaiMauDon.vietTatdv = true;
                this.loaiMauDon.ngayBanHanh = true;
                this.loaiMauDon.guiDonKNDen = true;
                this.loaiMauDon.ngayNhanDon = true;
                this.loaiMauDon.tenNguoiKN = true;
                this.loaiMauDon.diaChiNguoiKN = true;
                this.loaiMauDon.KNTCviec = true;
                this.loaiMauDon.quyenHanNguoiKy = true;
                this.loaiMauDon.tenCQChuyen = true;
                this.loaiMauDon.kyHieuCuaVanBanChuyenDen = true;
                // this.loaiMauDon.coQuanCoThamQuyen = true;
                // this.loaiMauDon.guiDonKNDen = true;
                // this.loaiMauDon.quyetDinhSo = true;
                break;
            case 4:
                this.resetLoaiMauDon();
                this.loaiMauDon.coQuan = true;
                this.loaiMauDon.dvBanHanh = true;
                this.loaiMauDon.so = true;
                this.loaiMauDon.vietTatdv = true;
                this.loaiMauDon.ngayBanHanh = true;
                this.loaiMauDon.guiDonKNDen = true;
                this.loaiMauDon.ngayNhanDon = true;
                this.loaiMauDon.quyetDinhNgay = true;
                this.loaiMauDon.tenNguoiKN = true;
                this.loaiMauDon.diaChiNguoiKN = true;
                this.loaiMauDon.KNTCviec = true;
                this.loaiMauDon.quyenHanNguoiKy = true;
                this.loaiMauDon.tenCQChuyen = true;
                this.loaiMauDon.kyHieuCuaVanBanChuyenDen = true;
                this.loaiMauDon.doiTuongKN = true;
                this.loaiMauDon.canCu = true;
                this.loaiMauDon.quyetDinhSo = true;
                this.loaiMauDon.guiDonKhieuNaiToi = true;
                this.loaiMauDon.tenCoQuanDv = true;
        }
        this.modalMauDon.show();
    }

    closeModalMauDon() {
        this.modalMauDon.hide();
    }

}
