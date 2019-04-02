import { PatternValidator } from "@angular/forms";

export const MESSAGE_VALIDATION = {
    ngayDieuChinh: {// name control
        required: 'Bạn phải chọn Ngày điều chỉnh'// rule with msg
    },
    soQDdieuChinh: {
        required: 'Bạn phải nhập Số quyết định'
    },
    lyDoDieuChinh: {
        required: 'Bạn phải nhập Lý do điều chỉnh'
    },
    ngayBatDau: {
        dateFrom: 'Ngày bắt đầu không được lớn hơn ngày kết thúc'
    },
    ngayKetThuc: {
        dateTo: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu'
    },
    ngayCoHieuLuc: {
        dateFrom: 'Ngày có hiệu lực không được lớn hơn ngày hết hiệu lực'
    },
    ngayHetHieuLuc: {
        dateTo: 'Ngày hết hiệu lực không được nhỏ hơn ngày có hiệu lực'
    },
    hieuLucUyQuyenFrom: {
        dateFrom: 'Ngày có hiệu lực không được lớn hơn ngày hết hiệu lực ủy quyền'
    },
    hieuLucUyQuyenTo: {
        dateTo: 'Ngày hết hiệu lực không được nhỏ hơn ngày có hiệu lực ủy quyền'
    },
    dmTinhHuyenId: {
        required: 'Tỉnh, thành phố không được bỏ trống'
    },
    hoVaTen:{
        required: 'Bạn phải nhập vào họ tên',
        pattern: 'Bạn không được để khoảng trắng'
    },
    chucVuDoan: {
        required: 'Chức vụ đoàn không được để trống',
        pattern: 'Bạn không được để khoảng trắng'
    },
    chucVuCongTac: {
        required: 'Chức vụ công tác không được để trống',
        pattern: 'Bạn không được để khoảng trắng'
    },
    loaiHinh_InForm: {
        required: 'Loại hình TTKT không được để trống'
    },
    ngayBatDau_InForm:{
        required: 'Ngày bắt đầu không được để trống'
    },
    ngayKetThuc_InForm:{
        required: 'Ngày kết thúc không được để trống',
        dateTo: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu'
    },
    dvChuTri_InForm:{
        required: 'Đơn vị chủ trì không được để trống'
    }, 
    tenBaoCao:{
        required : 'Bạn không được bỏ trống trường này',
        pattern:'Bạn không được để khoảng trắng'
    },
    denNgay:{
        required : 'Bạn không được bỏ trống trường này',
        pattern:'Bạn không được để khoảng trắng'
    },
    tuNgay:{
        required : 'Bạn không được bỏ trống trường này',
        pattern:'Bạn không được để khoảng trắng'
    },
    donViPhoiHop: {
        required : 'Bạn chưa chọn đơn vị phối hợp'
    },
    soNguoi: {
        max: 'Số người không thể vượt quá Danh sách doàn viên'
    },
    soVanBan: {
        maxlength: 'Số văn bản không được dài quá 50 kí tự'
    },
    soQDTL: {
        maxlength: 'Số quyết định thụ lý không được dài quá 50 kí tự'
    },
    soCongVanDen: {
        maxlength: 'Số công văn đến không được dài quá 50 kí tự'
    },
    soQuyetDinh: {
        maxlength: 'Số quyết định không được dài quá 50 kí tự'
    },
    tenNguoiDaiDienCb: {
        maxlength: 'Tên người đại diện không được dài quá 30 kí tự'
    },
    soGiayUyQuyenCb: {
        maxlength: 'Số giấy ủy quyền không được dài quá 30 kí tự'
    },
    
}

export const MESSAGE_VALIDATION_RULE = {
    required: 'Không được bỏ trống trường này',
}




