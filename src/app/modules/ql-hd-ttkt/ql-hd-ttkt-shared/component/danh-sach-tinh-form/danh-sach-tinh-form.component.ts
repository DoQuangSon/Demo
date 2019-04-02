import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';

import { ModalDirective } from 'ngx-bootstrap';
import { NoiQuanLyTinhDuocTtktService } from '../../../../../services/api/noi-quan-ly-tinh-duoc-ttkt/noi-quan-ly-tinh-duoc-ttkt.service';
import { AlertService } from '../../../../../services/api/alert.service';

import { TldCommonService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { MESS_QL_DONVI_TTKT } from "../../../../../constants/message.constants";
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { NoiDmTinhHuyenService } from '../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { LOAIHINH_TTKT_NAME } from '../../../../../constants/thanh-lap-doan.constants';
import { STT_LSU_TTKT } from '../../../../../constants/status.constants';
import { DmCanCuService } from '../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { ThanhLapDoanService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
    selector: 'ttkt-danh-sach-tinh-form',
    templateUrl: './danh-sach-tinh-form.component.html',
    styleUrls: ['./danh-sach-tinh-form.component.scss']
})
export class DanhSachTinhFormComponent implements OnInit {
    @ViewChild('historyModal') public historyModal: ModalDirective;
    @ViewChild('modalLichSuTTKT') public modalLichSuTTKT: ModalDirective;
    @Input() public typeAccount: string = '';
    @Input() statusActive: string = '';

    public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
    public isCollapseDirective: boolean = false;
    public thongtintimkiemForm: FormGroup;
    public lichSuTTKTForm: FormGroup;
    public titleModal: string;
    public iconModalHeader: string;
    public typeModal: string;
    public nameButtonSave: string;
    public iconButtonSave: string;
    public colorButtonSave: string;
    public indexSelected: number;
    public dmTinh: any[] = [];
    public namOption: any[] = [];
    isSearching: boolean = false;
    actionName: string = '';
    public tingTrangOption = [
        { id: STT_LSU_TTKT.STATUS_TAT_CA, text: 'Tất cả' },
        { id: STT_LSU_TTKT.STATUS_DA_TTKT, text: 'Đã TTKT' },
        { id: STT_LSU_TTKT.STATUS_CHUA_TTKT, text: 'Chưa TTKT' }
    ];
    public dsLichSuTTKT: any[] = [];
    public tmpArrDsLichsu: any[] = [];
    cacDonViChuTri: any = [];
    cacDonViPhoiHop: any = [];
    donViPhoiHop: string;
    disabled: boolean = false;
    currentPViId: number;
    listLoaiHinh: any = LOAIHINH_TTKT_NAME;
    currentPage: number = 0;
    pageSize: number = 10;
    pagerDSLichSuTTKT: any = {};
    formBodyTLD: any;
    tinh: any;
    danhSachTinh = [];
    isCustom: boolean = null;
    showDvPhoiHop: Boolean;

    constructor(
        private fb: FormBuilder,
        private builder: FormBuilder,
        private router: Router,
        private noiQuanLyTinhDuocTtktService: NoiQuanLyTinhDuocTtktService,
        private timeBuilder: TimeBuilderService,
        private _alert: AlertService,
        private noiDmTinhHuyenService: NoiDmTinhHuyenService,
        private location: Location,
        private tldCommon: TldCommonService,
        private canCuService: DmCanCuService,
        private pagination: PaginationService,
        private thanhLapDoanService: ThanhLapDoanService,
        private auth: AuthService
    ) {
        this.tmpArrDsLichsu = this.dsLichSuTTKT;
    }

    ngOnInit() {
        const year = (new Date()).getFullYear();
        for (let i = year; i < year + 3; i++) {
            const _el: any = {
                id: i,
                text: i.toString()
            };
            this.namOption.push(_el);
        }
        this.namOption.unshift({ id: 1, text: 'Tất cả các năm' });
        this.getDanhSachTinhViQuanLy();
        this.getDanhSachTinhThanh();
        this.getDvChuTriPhoiHop();
        this.thongtintimkiemForm = this.builder.group({
            yearFrom: null,
            yearTo: null,
            tinhHuyenId: null,
            lichSuTtkt: null
        });
        this.lichSuTTKTForm = this.builder.group({
            loaiHinh_InForm: ['', Validators.required],
            ngayBatDau_InForm: ['', Validators.required],
            ngayKetThuc_InForm: ['', Validators.required],
            dvChuTri_InForm: ['', Validators.required],
            donViPhoiHop: [''],
            ghiChu_InForm: [''],
            id: [''],
            isCustom: ['']
        });
        this.lichSuTTKTForm.get('loaiHinh_InForm').valueChanges.subscribe(value => {
            if (value == 3 || value == 4) {
                this.updateValueAndValidity(this.lichSuTTKTForm, 'donViPhoiHop', [Validators.required]);
                this.showDvPhoiHop = true;
            }else{
                this.updateValueAndValidity(this.lichSuTTKTForm, 'donViPhoiHop', null);
                this.showDvPhoiHop = false;
            }
        });
    }
    // updatevalidate
    updateValueAndValidity(form: FormGroup, control: string, validators: any) {
        form.controls[control].setValidators(validators);
        form.controls[control].updateValueAndValidity();
    }

    mapLoaiHinhTTKTName(loaiHinhTTKT: number) {
        let loaiHinhname: string = '';
        for (const item of LOAIHINH_TTKT_NAME) {
            if (Number(loaiHinhTTKT) === Number(item.id)) {
                loaiHinhname = item.name;
            }
        }
        return loaiHinhname;
    }

    mapTenTinhHuyen(idTinhHuyen: number) {
        let tenTinhHuyen: string = '';
        for (let item of this.danhSachTinh) {
            if (idTinhHuyen === item.id) {
                tenTinhHuyen = item.tinh;
            }
        }
        return tenTinhHuyen;
    }

    refreshValueDVPH(value: any): void { this.donViPhoiHop = value; }

    getDvChuTriPhoiHop() {
        this.canCuService.getDmDviCtri().subscribe(res => {
            this.cacDonViPhoiHop = this.cacDonViChuTri = res.content || [];
            this.cacDonViPhoiHop = this.cacDonViPhoiHop.map(el => {
                const _el: any = {};
                _el.id = el.id;
                _el.text = el.tenDonViChuTriPhoiHop;
                return _el;
            });
        }, err => { });
    }

    getDanhSachTinhThanh() {
        this.noiDmTinhHuyenService.getDanhSachTinhThanh()
            .subscribe(res => {
                this.dmTinh = res.map(el => {
                    const _el: any = {};
                    _el.id = el.id;
                    _el.text = el.tenTinhHuyen;
                    return _el;
                });
                this.dmTinh.unshift({ id: 1000, text: 'Tất cả' });
            }, err => {
                this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DANH_SACH_TINH);
            });
    }

    getDanhSachTinhViQuanLy() {
        const year = (new Date()).getFullYear();
        this.noiQuanLyTinhDuocTtktService.getDanhSachTinhViQuanLy({ year: year })
            .subscribe(res => {
                this.danhSachTinh = [];
                this.danhSachTinh = res.map((el) => {
                    const tinhObj: any = {};
                    tinhObj.id = el.idTinhHuyen || 0;
                    tinhObj.matinh = el.maTinhHuyen || '';
                    tinhObj.tinh = el.tenTinhHuyen || '';
                    tinhObj.quymo = el.quyMo || 0;
                    tinhObj.lichsuttkt = el.countLichSuTTKT + ' lần';
                    tinhObj.trongkehoach = el.trongKeHoach;
                    tinhObj.namTtktGanNhat = el.namTtktGanNhat;
                    tinhObj.thanhLapDoanId = el.thanhLapDoanId;
                    return tinhObj;
                });
            }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DANH_SACH_TINH); });
    }

    getAllLichSuTTKTCuaTinh(phamViId: number) {
        this.currentPViId = phamViId;
        this.noiQuanLyTinhDuocTtktService.getLichSuTTKTTinh({ phamViId: this.currentPViId, page: this.currentPage, size: this.pageSize })
            .subscribe(res => {
                const content = res['content'];
                this.dsLichSuTTKT = [];
                this.dsLichSuTTKT = res.content;
                this.pagerDSLichSuTTKT = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
            }, err => {
                this._alert.error(MESS_QL_DONVI_TTKT.ERROR_GET_DANH_SACH_LICH_SU_TTKT_TINH);
            });
    }

    setAddForm() {
        this.titleModal = 'Thêm lịch sử TTKT';
        this.iconModalHeader = 'fa fa-plus-circle';
        this.typeModal = 'add';
        this.nameButtonSave = 'Lưu';
        this.iconButtonSave = 'fa fa-floppy-o';
        this.colorButtonSave = 'btn btn-primary';
    }

    setEditForm() {
        this.titleModal = 'Sửa lịch sử TTKT';
        this.iconModalHeader = 'fa fa-pencil';
        this.typeModal = 'edit';
        this.nameButtonSave = 'Cập nhật';
        this.iconButtonSave = 'fa fa-floppy-o';
        this.colorButtonSave = 'btn btn-primary';
    }

    setDeleteForm() {
        this.titleModal = 'Xóa lịch sử TTKT';
        this.iconModalHeader = 'fa fa-exclamation-triangle';
        this.typeModal = 'delete';
        this.nameButtonSave = 'Đồng ý';
        this.iconButtonSave = 'fa fa-trash';
        this.colorButtonSave = 'btn btn-danger';
    }

    addLichSu() {
        this.lichSuTTKTForm.reset();
        this.historyModal.hide();
        this.isCustom = true;
        this.setAddForm();
        this.openModalLichSu();
    }

    editLichSu(thanhLapDoanId) {
        this.historyModal.hide();
        this.setEditForm();
        this.indexSelected = Number(thanhLapDoanId);
        this.lichSuTTKTForm.reset();
        const lichSuThanhLapDoan = this.dsLichSuTTKT.find((el) => { return el.thanhLapDoanId === thanhLapDoanId; });
        this.thanhLapDoanService.getThanhLapDoanById(thanhLapDoanId).subscribe(res => { this.formBodyTLD = res; }, err => { });
        this.lichSuTTKTForm.patchValue({
            loaiHinh_InForm: lichSuThanhLapDoan.loaiHinhTTKT,
            ngayBatDau_InForm: this.timeBuilder.fromString(lichSuThanhLapDoan.ngayBatDau).toTimeDatePickerValue(),
            ngayKetThuc_InForm: this.timeBuilder.fromString(lichSuThanhLapDoan.ngayKetThuc).toTimeDatePickerValue(),
            dvChuTri_InForm: lichSuThanhLapDoan.donViCTri.id,
            donViPhoiHop: lichSuThanhLapDoan.dvPhoiHops.map(el => {
                const _el: any = {};
                _el.id = el.dmCTriPHopId;
                _el.text = el.tenDonViChuTriPhoiHop;
                return _el;
            }),
            ghiChu_InForm: lichSuThanhLapDoan.ghiChu,
            id: lichSuThanhLapDoan.thanhLapDoanId,
            isCustom: lichSuThanhLapDoan.isCustom,
        });
        this.isCustom = lichSuThanhLapDoan.isCustom;
        this.openModalLichSu();
    }

    deleteLichSu(thanhLapDoanId) {
        this.historyModal.hide();
        this.setDeleteForm();
        this.indexSelected = Number(thanhLapDoanId);
        this.lichSuTTKTForm.reset();
        const lichSuThanhLapDoan = this.dsLichSuTTKT.find((el) => { return el.thanhLapDoanId === thanhLapDoanId; });
        lichSuThanhLapDoan.dvPhoiHops.map(el => { return el.tenDonViChuTriPhoiHop; });
        this.lichSuTTKTForm.patchValue({
            loaiHinh_InForm: lichSuThanhLapDoan.loaiHinhTTKT,
            ngayBatDau_InForm: this.timeBuilder.fromString(lichSuThanhLapDoan.ngayBatDau).toTimeDatePickerValue(),
            ngayKetThuc_InForm: this.timeBuilder.fromString(lichSuThanhLapDoan.ngayKetThuc).toTimeDatePickerValue(),
            dvChuTri_InForm: lichSuThanhLapDoan.donViCTri.id,
            donViPhoiHop: lichSuThanhLapDoan.dvPhoiHops.map(el => {
                const _el: any = {};
                _el.id = el.dmCTriPHopId;
                _el.text = el.tenDonViChuTriPhoiHop;
                return _el;
            }),
            ghiChu_InForm: lichSuThanhLapDoan.ghiChu,
            id: lichSuThanhLapDoan.thanhLapDoanId
        });
        this.openModalLichSu();
    }

    saveLichSu() {
        if (this.typeModal === 'add') {
            const formValue = this.lichSuTTKTForm.value;
            const formBody: any = this.creatFormBody(formValue);
            if (formValue.donViPhoiHop != null) {
                formBody.dvPhoiHops = formValue.donViPhoiHop.map(el => {
                    const _el: any = {};
                    _el.dmCTriPHopId = el.id;
                    return _el;
                });
            }
            this.noiQuanLyTinhDuocTtktService.createLichSuTTKTTinh(formBody)
                .subscribe(res => {
                    this.getAllLichSuTTKTCuaTinh(this.currentPViId);
                    this.getDanhSachTinhViQuanLy();
                    this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_CREATE_LICH_SU_TTKT_DONVI);
                }, err => {
                    this._alert.error(MESS_QL_DONVI_TTKT.ERROR_CREATE_LICH_SU_TTKT_DONVI);
                });
            this.closeModalLichSu();
        } else if (this.typeModal === 'edit') {
            const formValue = this.lichSuTTKTForm.value;
            if (formValue.isCustom != true) {
                this.formBodyTLD.phamVi = {
                    id: this.formBodyTLD.phamViId
                };
                if (this.formBodyTLD.tLDoanOldId != null) {
                    this.formBodyTLD.tLDoanOld = {
                        id: this.formBodyTLD.tLDoanOldId
                    };
                }
                this.formBodyTLD.donViCTri = { id: this.formBodyTLD.donViCTriId } || {};
                this.formBodyTLD.ghiChu = formValue.ghiChu_InForm;
                this.thanhLapDoanService.editThanhLapDoan(this.formBodyTLD).subscribe(res => {
                    this.getAllLichSuTTKTCuaTinh(this.currentPViId);
                    this.getDanhSachTinhViQuanLy();
                }, err => { });
            } else {
                const formBody: any = this.creatFormBody(formValue);
                formBody.thanhLapDoanId = formValue.id;
                if (formValue.loaiHinh_InForm != 3 && formValue.loaiHinh_InForm != 4) {
                    formBody.dvPhoiHops = [];
                }
                this.noiQuanLyTinhDuocTtktService.createLichSuTTKTTinh(formBody)
                    .subscribe(res => {
                        this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_EDIT_LICH_SU_TTKT_DONVI)
                        this.getAllLichSuTTKTCuaTinh(this.currentPViId);
                        this.getDanhSachTinhViQuanLy();
                    }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_EDIT_LICH_SU_TTKT_DONVI); }
                    );
            }
            this.closeModalLichSu();
        } else {
            const formValue = this.lichSuTTKTForm.value;
            const formBody: any = this.creatFormBody(formValue);
            formBody.thanhLapDoanId = formValue.id;
            this.currentPage = 0;
            this.noiQuanLyTinhDuocTtktService.deleteLichSuTTKTTinh(formBody.thanhLapDoanId)
                .subscribe(res => {
                    this.getAllLichSuTTKTCuaTinh(this.currentPViId);
                    this.getDanhSachTinhViQuanLy();
                    this._alert.error(MESS_QL_DONVI_TTKT.SUCCESS_DELETE_LICH_SU_TTKT_DONVI);
                }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DELETE_LICH_SU_TTKT_DONVI); }
                );
            this.closeModalLichSu();
        }
        this.getAllLichSuTTKTCuaTinh(this.currentPViId);
    }

    creatFormBody(formValue) {
        const formBody: any = {};
        formBody.dmbhxhId = this.auth.currentUser.donViId;
        if (this.typeAccount === 'TW') { formBody.isOwnerTw = true; } else { formBody.isOwnerTw = false; }
        formBody.thanhLapYear = (new Date()).getFullYear();
        formBody.donViCTri = { id: formValue.dvChuTri_InForm } || {};
        formBody.ngayBatDau = this.timeBuilder.fromTimeDatePicker(formValue.ngayBatDau_InForm).setUTC().toISOString() || '';
        formBody.ngayKetThuc = this.timeBuilder.fromTimeDatePicker(formValue.ngayKetThuc_InForm).setUTC().toISOString() || '';
        formBody.ghiChu = formValue.ghiChu_InForm || '';
        formBody.phamViId = this.currentPViId;
        formBody.loaiHinhTTKT = formValue.loaiHinh_InForm;
        const dvPhoiHop = (formValue.donViPhoiHop || []).map(el => { const _el: any = { dmCTriPHopId: el.id }; return _el; });
        formBody.dvPhoiHops = (dvPhoiHop || []);
        return formBody;
    }

    onSearchDanhSachTinhViQuanLy() {
        const formBody: any = {};
        const formValue: any = this.thongtintimkiemForm.value || {};
        if (formValue.lichSuTtkt != null && (Array.isArray(formValue.lichSuTtkt) && formValue.lichSuTtkt.length > 0)) {
            formBody.lichSuTTKTOption = formValue.lichSuTtkt[0].id;
        } else {
            formBody.lichSuTTKTOption = null;
        }
        if (formValue.tinhHuyenId != null && (Array.isArray(formValue.tinhHuyenId) && formValue.tinhHuyenId.length > 0 && formValue.tinhHuyenId[0].id != 1000)) {
            formBody.tinhHuyenId = formValue.tinhHuyenId[0].id;
        } else {
            formBody.tinhHuyenId = null;
        }
        if (formValue.yearFrom != null && (Array.isArray(formValue.yearFrom) && formValue.yearFrom.length > 0)) {
            formBody.yearFrom = formValue.yearFrom[0].id;
        } else {
            formBody.yearFrom = null;
        }
        if (formValue.yearTo != null && (Array.isArray(formValue.yearTo) && formValue.yearTo.length > 0)) {
            formBody.yearTo = formValue.yearTo[0].id;
        } else {
            formBody.yearTo = null;
        }
        this.noiQuanLyTinhDuocTtktService.searchDanhSachTinh(formBody)
            .subscribe(res => {
                if (res) {
                    this.danhSachTinh = [];
                    this.danhSachTinh = res.map((el) => {
                        const tinhObj: any = {};
                        tinhObj.id = el.idTinhHuyen || 0;
                        tinhObj.matinh = el.maTinhHuyen || '';
                        tinhObj.tinh = el.tenTinhHuyen || '';
                        tinhObj.quymo = el.quyMo || 0;
                        tinhObj.lichsuttkt = el.countLichSuTTKT + ' lần';
                        tinhObj.trongkehoach = el.trongKeHoach;
                        tinhObj.namTtktGanNhat = el.namTtktGanNhat;
                        tinhObj.thanhLapDoanId = el.thanhLapDoanId;
                        return tinhObj;
                    });
                }
            }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_SEARCH_DANH_SACH_DON_VI); }
            );
    }

    openModalLichSu() { this.modalLichSuTTKT.show(); }
    closeModalLichSu() { this.historyModal.show(); this.modalLichSuTTKT.hide(); }
    showhistory(id) { this.getAllLichSuTTKTCuaTinh(id); this.historyModal.show(); }
    close() { this.historyModal.hide(); }
    chiTietDvTTKT(idTinh) {
        this.tinh = this.mapTenTinhHuyen(idTinh);
        if (this.statusActive === 'KH_TTKT') {
            this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/chitiet-donvi', idTinh]);
        } else {
            this.router.navigate(['/ql-hd-ttkt/ql-donvi-ttkt/tw/ds-tinh/chitiet-tinh', idTinh]);
        }
    }
    xemTienDo(thanhLapDoanId) { this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw/chi-tiet', thanhLapDoanId]); }
    onBack() { this.location.back(); }

    setPageDSLichSuTTKT(number) {
        this.currentPage = number;
        this.getAllLichSuTTKTCuaTinh(this.currentPViId);
    }

    mapTinhHuyenName(idTinhHuyen) {
        let tinhHuyenName: string = '';
        this.danhSachTinh.map(el => {
            if (idTinhHuyen === el.id) {
                tinhHuyenName = el.tinh;
            }
        });
        return tinhHuyenName;
    }
}
