import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { NoiQuanLyTinhDuocTtktService } from './../../../../../services/api/noi-quan-ly-tinh-duoc-ttkt/noi-quan-ly-tinh-duoc-ttkt.service';
import { PaginationService } from '../../../../../services/helper/pagination.service';
import { AlertService } from './../../../../../services/api/alert.service';
import { NoiPhanloaiDoituongService } from './../../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { TldCommonService } from './../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/tld-common.service';
import { STT_LSU_TTKT } from './../../../../../constants/status.constants';
import { LOAIHINH_TTKT_NAME, NAME_LOAIHINH_TTKT } from './../../../../../constants/thanh-lap-doan.constants';
import { MESS_QL_DONVI_TTKT } from './../../../../../constants/message.constants';
import { Router } from '@angular/router';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { DmCanCuService } from '../../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { TienHanhTtktService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { NoiDmTinhHuyenService } from '../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { ThanhLapDoanService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AuthService } from '../../../../../auth/auth.service';
import { VALID } from '@angular/forms/src/model';
import { FormService } from '../../../../../shared/form-module/form.service';
import { DateCompareValidator } from '../../../../../shared/form-module/custom-validattion';

@Component({
    selector: 'ttkt-ds-donvi-form',
    templateUrl: './ds-donvi-form.component.html',
    styleUrls: ['./ds-donvi-form.component.scss']
})
export class DsDonviFormComponent implements OnInit {
    @ViewChild('historyModal') public historyModal: ModalDirective;
    @ViewChild('lichSuDuocTTKTModal') public lichSuDuocTTKTModal: ModalDirective;
    @ViewChild('modalLichSuTTKT') public modalLichSuTTKT: ModalDirective;
    @ViewChild('modalLichSuDuocTTKT') public modalLichSuDuocTTKT: ModalDirective;
    @Input() public typeAccount: string = '';
    @Input() donviID: number;
    @Input() statusActive: string = '';

    public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
    isCollapseDirectiveDSDonVi: boolean = false;
    thongtintimkiemFormDSDonVi: FormGroup;
    currentPage: number = 0;
    currentPageTaiDonVi: number = 0;
    pageSize: number = 30;
    isSearching: boolean = false;
    // set modal lichSuTTKT
    public lichSuTTKTForm: FormGroup;
    public titleModal: string;
    public iconModalHeader: string;
    public typeModal: string;
    public nameButtonSave: string;
    public iconButtonSave: string;
    public colorButtonSave: string;
    public indexSelected: number;
    cacDonViChuTri: any = [];
    cacDonViPhoiHop: any = [];
    donViPhoiHop: string;
    currentdoiTuongTTKTId: number;
    listLoaiHinh: any = LOAIHINH_TTKT_NAME;
    loaihinhdv = [];
    formBodyTLD: any;
    formBodyTienHanh: any;
    isCustomTaiDonVi: boolean = null;
    isCustomDuocTTKT: boolean = null;
    public tingTrangOption = [
        { id: STT_LSU_TTKT.STATUS_TAT_CA, text: 'Tất cả' },
        { id: STT_LSU_TTKT.STATUS_DA_TTKT, text: 'Đã TTKT' },
        { id: STT_LSU_TTKT.STATUS_CHUA_TTKT, text: 'Chưa TTKT' }
    ];
    dsDonViQuanLy: any = [];
    public dsLichSuTTKT: any[] = [];
    public dsLichSuTTKTOwner: any[] = [];
    pagerLichSuTTKTOwner: any = {};
    pagerLichSuTTKTTaiDonVi: any = {};
    pagerDanhSachDonVi: any = {};
    public namOption: any[] = [];
    public dmTinh: any[] = [];
    tinh: any;
    huyen: any;
    countLichSuDuocTTKT: any;
    dsDvDcTTKTS: any[] = [];
    currentDoiTuongDcTTKTId: any;
    isCheckTTKT: Boolean;

    constructor(
        private builder: FormBuilder,
        private noiQuanLyTinhDuocTtktService: NoiQuanLyTinhDuocTtktService,
        private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
        private timeBuilder: TimeBuilderService,
        private pagination: PaginationService,
        private _alert: AlertService,
        private location: Location,
        private tldCommon: TldCommonService,
        private canCuService: DmCanCuService,
        private tienHanhTtktService: TienHanhTtktService,
        private router: Router,
        private noiDmTinhHuyenService: NoiDmTinhHuyenService,
        private thanhLapDoanService: ThanhLapDoanService,
        private auth: AuthService,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.tinh = this.auth.currentUser.tenTinhHuyen;
        this.getDanhSachTinhThanh();
        this.getAllLichSuTTKTCuaTinh();
        this.createNamOption();
        this.getDanhSachDonVi();
        this.getDanhSachDoituong();
        this.getDvChuTriPhoiHop();
        this.createFormSearch();
        this.createFormValue();
    }

    updateValueAndValidity(form: FormGroup, control: string, validators: any) {
        form.controls[control].setValidators(validators);
        form.controls[control].updateValueAndValidity();
    }

    // Begin Common
    createFormSearch() {
        this.thongtintimkiemFormDSDonVi = this.builder.group({
            keHoachNamDSTinh: [0],
            tenDonViDSTinh: [''],
            loaiHinhdvDSTinh: [''],
            lichSuTtktDSTinh: [0],
            maThu: [''],
        });
    }
    createFormValue() {
        this.lichSuTTKTForm = this.builder.group({
            loaiHinh_InForm: ['', Validators.required],
            ngayBatDau_InForm: ['', [Validators.required, DateCompareValidator('ngayKetThuc_InForm', true)]],
            ngayKetThuc_InForm: ['', [Validators.required, DateCompareValidator('ngayBatDau_InForm', false)]],
            dvChuTri_InForm: ['', Validators.required],
            donViPhoiHop: [''],
            ghiChu_InForm: [''],
            id: [''],
            isCustom: ['']
        });
        this.lichSuTTKTForm.get('loaiHinh_InForm').valueChanges.subscribe(Value => {
            if (Value == NAME_LOAIHINH_TTKT.THANH_TRA_LIEN_NGANH || Value == NAME_LOAIHINH_TTKT.KIEM_TRA_LIEN_NGANH) {
                this.updateValueAndValidity(this.lichSuTTKTForm, 'donViPhoiHop', [Validators.required]);
                this.isCheckTTKT = true;
            } else {
                this.updateValueAndValidity(this.lichSuTTKTForm, 'donViPhoiHop', null);
                this.isCheckTTKT = false;
            }
        });
    }
    createNamOption() {
        const year = (new Date()).getFullYear();
        for (let i = year; i < year + 3; i++) {
            const _el: any = {
                id: i,
                text: i.toString()
            };
            this.namOption.push(_el);
        }
        this.namOption.unshift({ id: 1, text: 'Tất cả các năm' });
    }
    showhistory(id) { this.getAllLichSuTTKTDONVI(id); this.historyModal.show(); }
    closeHistoryModal() { this.historyModal.hide(); }
    closeLichSuDuocTTKTModal() { this.lichSuDuocTTKTModal.hide(); }
    openModalLichSu() { this.modalLichSuTTKT.show(); }
    openModalLichSuDuocTTKT() { this.modalLichSuDuocTTKT.show(); }
    closeModalLichSu() { this.historyModal.show(); this.modalLichSuTTKT.hide(); }
    closeModalLichSuDuocTTKT() { this.lichSuDuocTTKTModal.show(); this.modalLichSuDuocTTKT.hide(); }
    onBack() { this.location.back(); }
    mapLoaiHinhTTKTName(loaiHinhTTKT: number) {
        let loaiHinhname: string = '';
        for (const item of LOAIHINH_TTKT_NAME) {
            if (Number(loaiHinhTTKT) === Number(item.id)) {
                loaiHinhname = item.name;
            }
        }
        return loaiHinhname;
    }
    // cap nhat gia tri multi select
    refreshValueDVPH(value: any): void { this.donViPhoiHop = value; }
    getDanhSachTinhThanh() {
        this.noiDmTinhHuyenService.getDanhSachTinhThanh().subscribe(res => {
            this.dmTinh = res.map(el => {
                const _el: any = {};
                _el.id = el.id;
                _el.text = el.tenTinhHuyen;
                return _el;
            });
        }, err => { });
    }
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
    getDanhSachDoituong() {
        this.noiPhanloaiDoituongService.getAllDoituong({ page: 0, size: 100 })
            .subscribe(res => {
                const content = res['content'];
                this.loaihinhdv = content.map(el => {
                    const _el: any = {};
                    _el.id = el.id;
                    _el.text = el.tenDanhMuc;
                    return _el;
                });
            }, err => { }
            );
    }
    mapDonViPHName(dmCTriPHopId) {
        let donViPHName: string = '';
        this.cacDonViPhoiHop.map(el => {
            if (Number(dmCTriPHopId) === el.id) {
                donViPHName = el.text;
            }
        });
        return donViPHName;
    }

    mapTinhHuyenName(idDoiTuongTTKT) {
        let tinhHuyenName: string = '';
        this.dsDonViQuanLy.map(el => {
            if (idDoiTuongTTKT === el.id) {
                tinhHuyenName = el.tenDonVi;
            }
        });
        return tinhHuyenName;
    }
    setPageDSDonVi(number) { this.currentPage = number; this.isSearching ? this.onSearchDanhSachDonVi() : this.getDanhSachDonVi(); }
    setPageDSLichSuTTKT(number) { this.currentPage = number; this.getAllLichSuTTKTCuaTinh(); }
    setPageDSLichSuTTKTTaiDonVi(number) { this.currentPageTaiDonVi = number; this.getAllLichSuTTKTDONVI(this.currentdoiTuongTTKTId); }

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
    // End Common

    // Begin Quan ly tinh
    popUpLichSuDuocTTKT() { this.lichSuDuocTTKTModal.show(); }
    getAllLichSuTTKTCuaTinh() {
        const phamViId = this.auth.currentUser.dmTinhHuyenId;
        this.noiQuanLyTinhDuocTtktService.getLichSuTTKTTinh({ phamViId, page: this.currentPage, size: this.pageSize })
            .subscribe(res => {
                this.dsLichSuTTKTOwner = [];
                this.dsLichSuTTKTOwner = res.content;
                this.countLichSuDuocTTKT = res.totalElements;
                this.pagerLichSuTTKTOwner = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
            }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_GET_DANH_SACH_LICH_SU_TTKT_TINH); });

    }

    addLichSuDuocTTKT() {
        this.lichSuTTKTForm.reset();
        this.lichSuDuocTTKTModal.hide();
        this.isCustomDuocTTKT = true;
        this.setAddForm();
        this.openModalLichSuDuocTTKT();
    }
    createFormBodyDuocTTKT(formValue) {
        const formBody: any = {};
        const phamViId = this.auth.currentUser.dmTinhHuyenId;
        formBody.dmbhxhId = this.auth.currentUser.donViId;
        if (this.typeAccount === 'TW') { formBody.isOwnerTw = true; } else { formBody.isOwnerTw = false; }
        formBody.thanhLapYear = (new Date()).getFullYear();
        formBody.donViCTri = { id: formValue.dvChuTri_InForm } || {};
        formBody.ngayBatDau = formValue.ngayBatDau_InForm || '';
        formBody.ngayKetThuc = formValue.ngayKetThuc_InForm || '';
        formBody.ghiChu = formValue.ghiChu_InForm || '';
        formBody.phamViId = phamViId;
        formBody.loaiHinhTTKT = formValue.loaiHinh_InForm;
        const dvPhoiHop = (formValue.donViPhoiHop || []).map(el => { const _el: any = { dmCTriPHopId: el.id }; return _el; });
        formBody.dvPhoiHops = (dvPhoiHop || []);
        return formBody;
    }
    editLichSuDuocTTKT(thanhLapDoanId) {
        this.lichSuDuocTTKTModal.hide();
        this.setEditForm();
        this.indexSelected = Number(thanhLapDoanId);
        this.lichSuTTKTForm.reset();
        const lichSuThanhLapDoan = this.dsLichSuTTKTOwner.find((el) => el.thanhLapDoanId === thanhLapDoanId);
        this.thanhLapDoanService.getThanhLapDoanById(thanhLapDoanId).subscribe(res => { this.formBodyTLD = res; }, err => { });
        this.lichSuTTKTForm.patchValue({
            loaiHinh_InForm: lichSuThanhLapDoan.loaiHinhTTKT,
            ngayBatDau_InForm: lichSuThanhLapDoan.ngayBatDau,
            ngayKetThuc_InForm: lichSuThanhLapDoan.ngayKetThuc,
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
        this.isCustomDuocTTKT = lichSuThanhLapDoan.isCustom;
        this.openModalLichSuDuocTTKT();
    }
    deleteLichSuDuocTTKT(thanhLapDoanId) {
        this.lichSuDuocTTKTModal.hide();
        this.setDeleteForm();
        this.indexSelected = Number(thanhLapDoanId);
        this.lichSuTTKTForm.reset();
        const lichSuThanhLapDoan = this.dsLichSuTTKTOwner.find((el) => el.thanhLapDoanId === thanhLapDoanId);
        lichSuThanhLapDoan.dvPhoiHops.map(el => el.tenDonViChuTriPhoiHop);
        this.lichSuTTKTForm.patchValue({
            loaiHinh_InForm: lichSuThanhLapDoan.loaiHinhTTKT,
            ngayBatDau_InForm: lichSuThanhLapDoan.ngayBatDau,
            ngayKetThuc_InForm: lichSuThanhLapDoan.ngayKetThuc,
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
        this.openModalLichSuDuocTTKT();
    }
    saveLichSuDuocTTKT() {
        this.formService.touchAllInput(this.lichSuTTKTForm, true);
        if (this.lichSuTTKTForm.invalid) {
            return;
        }
        if (this.typeModal === 'add') {
            const formValue = this.lichSuTTKTForm.value;
            const formBody: any = this.createFormBodyDuocTTKT(formValue);
            if (formValue.donViPhoiHop != null) {
                formBody.dvPhoiHops = formValue.donViPhoiHop.map(el => {
                    const _el: any = {};
                    _el.dmCTriPHopId = el.id;
                    return _el;
                });
            }
            this.noiQuanLyTinhDuocTtktService.createLichSuTTKTTinh(formBody)
                .subscribe(res => {
                    this.getAllLichSuTTKTCuaTinh();
                    this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_CREATE_LICH_SU_TTKT_DONVI);
                }, err => {
                    this._alert.error(MESS_QL_DONVI_TTKT.ERROR_CREATE_LICH_SU_TTKT_DONVI);
                });
            this.closeModalLichSuDuocTTKT();
        } else if (this.typeModal === 'edit') {
            const formValue = this.lichSuTTKTForm.value;
            if (formValue.isCustom !== true) {
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
                    this.getAllLichSuTTKTCuaTinh();
                }, err => { });
            } else {
                const formBody: any = this.createFormBodyDuocTTKT(formValue);
                formBody.thanhLapDoanId = formValue.id;
                if (Number(formValue.loaiHinh_InForm) !== 3 && Number(formValue.loaiHinh_InForm !== 4 ) ) {
                    formBody.dvPhoiHops = [];
                }
                this.noiQuanLyTinhDuocTtktService.createLichSuTTKTTinh(formBody)
                    .subscribe(res => {
                        this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_EDIT_LICH_SU_TTKT_DONVI);
                        this.getAllLichSuTTKTCuaTinh();
                    }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_EDIT_LICH_SU_TTKT_DONVI); }
                    );
            }
            this.closeModalLichSuDuocTTKT();
        } else {
            const formValue = this.lichSuTTKTForm.value;
            const formBody: any = this.createFormBodyDuocTTKT(formValue);
            formBody.thanhLapDoanId = formValue.id;
            this.currentPage = 0;
            this.noiQuanLyTinhDuocTtktService.deleteLichSuTTKTTinh(formBody.thanhLapDoanId)
                .subscribe(res => {
                    this.getAllLichSuTTKTCuaTinh();
                    this._alert.error(MESS_QL_DONVI_TTKT.SUCCESS_DELETE_LICH_SU_TTKT_DONVI);
                }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DELETE_LICH_SU_TTKT_DONVI); }
                );
            this.closeModalLichSuDuocTTKT();
        }
        this.getAllLichSuTTKTCuaTinh();
    }
    // End Quan ly tinh

    // Begin Quan ly don vi
    getDanhSachDonVi() {
        this.isSearching = false;
        const formBody: any = {};
        const year = this.timeBuilder.current().get('year');
        formBody.dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
        formBody.thanhLapYear = year;
        formBody.page = this.currentPage;
        formBody.size = this.pageSize;
        this.noiQuanLyTinhDuocTtktService.getDanhSachDonVi(formBody)
            .subscribe(res => {
                const content = res['content'];
                content !== null ? this.dsDonViQuanLy = content : this.dsDonViQuanLy = [];
                if (this.dsDonViQuanLy !== null && this.dsDonViQuanLy.length > 0) {
                    this.dsDonViQuanLy = content.map(el => {
                        const _el: any = {};
                        _el.id = el.idDoiTuongTTKT;
                        _el.tenDonVi = el.tenDoiTuong || '';
                        _el.maThu = el.maThu || '';
                        _el.maDVSDLD = el.maSuDungLaoDong || '';
                        _el.diaChi = el.diaChi || '';
                        _el.quymo = el.quyMo || 0;
                        _el.lichsuttkt = el.countLichSuTTKT + ' lần';
                        el.namTtktGanNhat !== 0 ? _el.namTtktGanNhat = el.namTtktGanNhat : _el.namTtktGanNhat = '';
                        _el.tinhTrang = el.tinhTrang || '';
                        _el.trongkehoach = el.trongKeHoach || false;
                        _el.tienHanhTTKTId = el.tienHanhTTKTId || '';
                        _el.phanLoaiDoiTuong = el.phanLoaiDoiTuong;
                        _el.thanhLapDoanId = el.thanhLapDoanId;
                        _el.phanLoaiDoiTuongId = el.phanLoaiDoiTuongId;
                        return _el;
                    });
                    this.pagerDanhSachDonVi = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
                    console.log(this.dsDonViQuanLy);
                }
            }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DANH_SACH_DON_VI); }
            );
    }
    getAllLichSuTTKTDONVI(doiTuongTTKTId: number) {
        this.currentdoiTuongTTKTId = doiTuongTTKTId;
        this.noiQuanLyTinhDuocTtktService.getLichSuTTKTDonVi(this.currentdoiTuongTTKTId, this.currentPageTaiDonVi, this.pageSize)
            .subscribe(res => {
                this.dsLichSuTTKT = [];
                this.dsLichSuTTKT = res.content;
                this.pagerLichSuTTKTTaiDonVi = this.pagination.getPager(this.currentPageTaiDonVi, res.size, res.totalPages);
            }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_GET_DANH_SACH_LICH_SU_TTKT_DONVI); }
            );
    }
    onSearchDanhSachDonVi() {
        const formValue: any = this.thongtintimkiemFormDSDonVi.value || {};
        this.isSearching = true;
        const formBody: any = {};

        formBody.tenDoiTuong = formValue.tenDonViDSTinh || '';
        if (formValue.lichSuTtktDSTinh != null && (Array.isArray(formValue.lichSuTtktDSTinh) && formValue.lichSuTtktDSTinh.length > 0)) {
            formBody.lichSuTTKTOption = formValue.lichSuTtktDSTinh[0].id;
        } else { formBody.lichSuTTKTOption = null; }
        if (formValue.loaiHinhdvDSTinh != null && (Array.isArray(formValue.loaiHinhdvDSTinh) && formValue.loaiHinhdvDSTinh.length > 0)) {
            formBody.dmPhanLoaiDtId = formValue.loaiHinhdvDSTinh[0].id;
        } else { formBody.dmPhanLoaiDtId = null; }
        if (formValue.keHoachNamDSTinh != null && (Array.isArray(formValue.keHoachNamDSTinh) && formValue.keHoachNamDSTinh.length > 0)) {
            formBody.year = formValue.keHoachNamDSTinh[0].id;
        } else { formBody.year = null; }
        formBody.page = this.currentPage;
        formBody.size = this.pageSize;

        if (formValue.tenDonViDSTinh === ''
            && (formValue.lichSuTtktDSTinh === '')
            && (formValue.loaiHinhdvDSTinh === 0)
            && (formValue.keHoachNamDSTinh === 0)
        ) {
            this.getDanhSachDonVi();
        } else {
            this.noiQuanLyTinhDuocTtktService.searchDanhSachDonVi(formBody)
                .subscribe(res => {
                    const content = res['content'];
                    content !== null ? this.dsDonViQuanLy = content : this.dsDonViQuanLy = [];
                    if (this.dsDonViQuanLy !== null && this.dsDonViQuanLy.length > 0) {
                        this.dsDonViQuanLy = content.map((el) => {
                            const _el: any = {};
                            _el.id = 1;
                            _el.tenDonVi = el.tenDoiTuong || '';
                            _el.maThu = el.maThu || '';
                            _el.maDVSDLD = el.maSuDungLaoDong || '';
                            _el.diaChi = el.diaChi || '';
                            _el.quymo = el.quyMo || 0;
                            _el.lichsuttkt = el.countLichSuTTKT + ' lần' || '';
                            el.namTtktGanNhat !== 0 ? _el.namTtktGanNhat = el.namTtktGanNhat : _el.namTtktGanNhat = '';
                            _el.tinhTrang = el.tinhTrang || '';
                            _el.trongkehoach = el.trongKeHoach || false;
                            _el.tienHanhTTKTId = el.tienHanhTTKTId || '';
                            _el.phanLoaiDoiTuong = el.phanLoaiDoiTuong;
                            _el.thanhLapDoanId = el.thanhLapDoanId;
                            _el.phanLoaiDoiTuongId = el.phanLoaiDoiTuongId;
                            return _el;
                        });
                        this.pagerDanhSachDonVi = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
                    }
                }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_SEARCH_DANH_SACH_DON_VI); }
                );
        }
    }
    addLichSu() {
        this.lichSuTTKTForm.reset();
        this.historyModal.hide();
        this.isCustomTaiDonVi = true;
        this.setAddForm();
        this.openModalLichSu();
    }
    editLichSuDSDonVi(tienHanhTTKTId) {
        this.historyModal.hide();
        this.setEditForm();
        this.indexSelected = Number(tienHanhTTKTId);
        this.lichSuTTKTForm.reset();
        this.tienHanhTtktService.getTienHanhTTKTById(tienHanhTTKTId).subscribe(res => {
            this.patchValue(res);
        }, err => { });
        this.openModalLichSu();
    }
    patchValue(res) {
        let donViCTri: any;
        let donViPH: any[] = [];
        let loaiHinhTTKT: any;
        let isCustom: any;
        if (res.isCustom !== true) {
            const lichSuTienHanhTTKT = this.dsLichSuTTKT.find((el) => {
                return el.tienHanhTTKTId === res.id;
            });
            donViCTri = lichSuTienHanhTTKT.chuTriId;
            isCustom = lichSuTienHanhTTKT.isCustom;
            if (lichSuTienHanhTTKT.phoiHopIds != null && lichSuTienHanhTTKT.phoiHopIds !== []) {
                donViPH = lichSuTienHanhTTKT.phoiHopIds.map(el => { const _el: any = { id: el, text: this.mapDonViPHName(el) }; return _el; });
            }
            loaiHinhTTKT = lichSuTienHanhTTKT.loaiHinhTTKT;
        } else {
            if (res.customPhoiHops != null && res.customPhoiHops.trim() !== '') {
                donViPH = res.customPhoiHops.trim().split(', ').map(el => { const _el: any = { id: el, text: this.mapDonViPHName(el) }; return _el; });
            }
            isCustom = res.isCustom;
            donViCTri = res.customChuTriId;
            loaiHinhTTKT = res.customLoaiHinhTTKT;
        }
        this.formBodyTienHanh = res;
        this.lichSuTTKTForm.patchValue({
            loaiHinh_InForm: loaiHinhTTKT,
            ngayBatDau_InForm: this.timeBuilder.fromString(res.ngayBatDau).toTimeDatePickerValue(),
            ngayKetThuc_InForm: this.timeBuilder.fromString(res.ngayKetThuc).toTimeDatePickerValue(),
            dvChuTri_InForm: donViCTri,
            donViPhoiHop: donViPH,
            ghiChu_InForm: res.ghiChu,
            id: res.id,
            isCustom: isCustom,
        });
        this.isCustomTaiDonVi = isCustom;
    }
    deleteLichSuDSDonVi(tienHanhTTKTId) {

        this.setDeleteForm();
        this.indexSelected = Number(tienHanhTTKTId);
        this.lichSuTTKTForm.reset();
        this.historyModal.hide();
        this.tienHanhTtktService.getTienHanhTTKTById(tienHanhTTKTId).subscribe(res => {
            this.patchValue(res);
        }, err => { });
        this.openModalLichSu();
        console.log(this.lichSuTTKTForm.controls);
    }
    saveLichSuDSDonVi() {
        const formValue = this.lichSuTTKTForm.value;
        const formBody: any = this.createFormBodyDSDonVi(formValue);
        if (this.typeModal === 'add') {
            this.noiQuanLyTinhDuocTtktService.createLichSuTTKTDonVi(formBody)
                .subscribe(res => {
                    this.getAllLichSuTTKTDONVI(formBody.doiTuongTTKTId);
                    this.getDanhSachDonVi();
                    this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_CREATE_LICH_SU_TTKT_DONVI);
                }, err => {
                    this._alert.error(MESS_QL_DONVI_TTKT.ERROR_CREATE_LICH_SU_TTKT_DONVI);
                });
            this.closeModalLichSu();
        } else if (this.typeModal === 'edit') {
            if (formValue.isCustom !== true) {
                this.formBodyTienHanh.ghiChu = formValue.ghiChu_InForm;
                this.tienHanhTtktService.updateTienHanhTTKT(this.formBodyTienHanh).subscribe(res => {
                    this.getAllLichSuTTKTDONVI(formBody.doiTuongTTKTId);
                    this.getDanhSachDonVi();
                    this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_EDIT_LICH_SU_TTKT_DONVI);
                }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_EDIT_LICH_SU_TTKT_DONVI); });
            } else {
                if (Number(formValue.loaiHinh_InForm) !== 3 && Number(formValue.loaiHinh_InForm !== 4) ) {
                    formBody.phoiHopIds = [];
                }
                formBody.tienHanhTTKTId = formValue.id;
                this.noiQuanLyTinhDuocTtktService.createLichSuTTKTDonVi(formBody)
                    .subscribe(res => {
                        this.getAllLichSuTTKTDONVI(formBody.doiTuongTTKTId);
                        this.getDanhSachDonVi();
                        this._alert.success(MESS_QL_DONVI_TTKT.SUCCESS_EDIT_LICH_SU_TTKT_DONVI);
                    }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_EDIT_LICH_SU_TTKT_DONVI); }
                    );
            }
            this.closeModalLichSu();
        } else {
            formBody.tienHanhTTKTId = formValue.id;
            this.currentPageTaiDonVi = 0;
            this.noiQuanLyTinhDuocTtktService.deleteLichSuTTKTDonVi(formBody.tienHanhTTKTId)
                .subscribe(res => {
                    this.getAllLichSuTTKTDONVI(formBody.doiTuongTTKTId);
                    this.getDanhSachDonVi();
                    this._alert.error(MESS_QL_DONVI_TTKT.SUCCESS_DELETE_LICH_SU_TTKT_DONVI);
                }, err => { this._alert.error(MESS_QL_DONVI_TTKT.ERROR_DELETE_LICH_SU_TTKT_DONVI); }
                );
            this.getAllLichSuTTKTDONVI(formBody.doiTuongTTKTId);
            this.closeModalLichSu();
        }
    }
    createFormBodyDSDonVi(formValue) {
        const formBody: any = {};
        formBody.dmbhxhId = this.auth.currentUser.donViId;
        formBody.chuTriId = formValue.dvChuTri_InForm ? formValue.dvChuTri_InForm : null;
        formBody.ngayBatDau = this.timeBuilder.fromTimeDatePicker(formValue.ngayBatDau_InForm).setUTC().toISOString() || '';
        formBody.ngayKetThuc = this.timeBuilder.fromTimeDatePicker(formValue.ngayKetThuc_InForm).setUTC().toISOString() || '';
        formBody.ghiChu = formValue.ghiChu_InForm || '';
        formBody.doiTuongTTKTId = this.currentdoiTuongTTKTId;
        formBody.loaiHinhTTKT = formValue.loaiHinh_InForm;
        let dvPhoiHop: any;
        if (formValue.donViPhoiHop) {
            dvPhoiHop = (formValue.donViPhoiHop || []).map(el => el.id);
        } else { dvPhoiHop = []; }
        formBody.phoiHopIds = (dvPhoiHop || []);
        return formBody;
    }

    xemTienDo(idTLD, idDoiTuongTTKT) {
        console.log('Xem tiến độ!');
        console.log('tld: ' + idTLD);
        console.log('doituong: ' + idDoiTuongTTKT);
        this.tienHanhTtktService.getTheoDoiHdDoan(idTLD).subscribe(res => {
            this.dsDvDcTTKTS = res.dsDvDcTTKTS;
            console.log(idDoiTuongTTKT);
            console.log(this.dsDvDcTTKTS);
            for (const item of this.dsDvDcTTKTS) {
                if (Number(item.doiTuongTTKT.id) === idDoiTuongTTKT) {
                    this.currentDoiTuongDcTTKTId = item.doiTuongTTKT.id;
                }
            }
            this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt/theodoi-hd-ttkt/' + idTLD + '/chitiet-hoatdong-donvi/' + `${this.currentDoiTuongDcTTKTId},${idTLD}`]);
        }, err => { });
    }
    // End Quan ly don vi
}
