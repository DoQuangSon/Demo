export interface DanhSachDoan {
    hoVaTen: string;
    kieuChucVu: string;
    chucVu: string;
    tenDonViChuTriPhoiHop: string;
    dmCTriPHopId: number;
    id: string;
}

export interface NoiDungKT {
    dmNoiDungTTKTId: number;
    isNoiDungThanhTra: boolean;
}

export interface DsDvDcTTKT {
    actived: boolean;
    dmPhanLoaiDtId: number;
    doiTuongTTKTId: number;
    noiDungKTS: NoiDungKT[];
}

export interface NoiDungTTKT {
    dmNoiDungTTKTId: number;
}

export interface TldBody {
    danhSachDoans: DanhSachDoan[];
    coQuanBanHanh: string;
    dmCanCuTTKTId: string;
    dmbhxhId: string;
    donViCTriId: string;
    dvPhoiHops: any[];
    dsDvDcTTKTS: DsDvDcTTKT[];
    fileTaiLieuLienQuan: string;
    fileQuyetDinhThanhLap: string;
    noiDungTTKTS: NoiDungTTKT[];
    ngayCongBo: Date;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    ngayQuyetDinh: Date;
    dmChucDanhId: string;
    nguoiKyQuyetDinh: string;
    soQuyetDinh: string;
    tenQuyetDinh: string;
    thoiHanThucHien: number;
    isOwnerTw: boolean;
    isTrongKeHoach: string;
    actived: boolean;
    thanhLapYear: number;
    isNoiDungThanhTra: boolean;
    loaiHinhTTKT: number;
    phamViId: number;
    ngayDieuChinh: string;
    soQuyetDinhDieuChinh: string;
    lyDoDieuChinh: string;
    fileQuyetDinhDieuChinh: string;
}