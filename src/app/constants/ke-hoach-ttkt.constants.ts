export const TRANG_THAI = [
    { id: 1, name: 'Quá hạn' },
    { id: 2, name: 'Đúng hạn' },
    { id: 3, name: 'Chưa gửi' }
];

export const DIEU_CHINH = [
    { id: 1, name: 'Có điều chỉnh' },
    { id: 2, name: 'Không điều chỉnh' }
];

export const TRANG_THAI_DUYET = [
    { id: 1, name: 'Chưa duyệt' },
    { id: 2, name: 'Đã duyệt' }
];

export const DIEU_CHINH_DETAIL = [
    { id: 1, name: 'Hoãn TTKT' },
    { id: 2, name: 'Chuyển loại hình TTKT' },
    { id: 3, name: 'Thay đổi đơn vị chủ trì' },
    { id: 4, name: 'Thay đổi đơn vị phối hợp' },
    { id: 5, name: 'Thay đổi thời gian thực hiện' },
    { id: 6, name: 'Thay thế tỉnh' }
];

export const QUY = [
    { id: 1, name: 'Quý I' },
    { id: 2, name: 'Quý II' },
    { id: 3, name: 'Quý III' },
    { id: 4, name: 'Quý IV' }
];

export const THANG = [
    {id: 1, name: 'Tháng 1'},
    {id: 2, name: 'Tháng 2'},
    {id: 3, name: 'Tháng 3'},
    {id: 4, name: 'Tháng 4'},
    {id: 5, name: 'Tháng 5'},
    {id: 6, name: 'Tháng 6'},
    {id: 7, name: 'Tháng 7'},
    {id: 8, name: 'Tháng 8'},
    {id: 9, name: 'Tháng 9'},
    {id: 10, name: 'Tháng 10'},
    {id: 11, name: 'Tháng 11'},
    {id: 12, name: 'Tháng 12'}
];

export const LOAI_HINH_TTKT = [
    { id: 1, name: 'Thanh tra' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Liên ngành' }
];

export const CHECK_LOAIHINH_TTKT = {
    TT: 1,
    KT: 2,
    TTLN: 3,
    KTLN: 4
};

export const DON_VI_CHU_TRI = [
    { id: 1, name: 'Thanh tra Bộ LĐTB&XH' },
    { id: 2, name: 'Vụ Thanh tra - Kiểm tra' }
];

export const DON_VI_PHOI_HOP = [
    { id: 1, name: 'Các đơn vị trực thuộc Bảo hiểm xã hội Việt Nam' },
    { id: 2, name: 'Vụ Thanh tra - Kiểm tra' }
];

export const TRANG_THAI_TTKT = [
    { id: 1, name: 'Đã được thanh tra kiểm tra' },
    { id: 2, name: 'Chưa được thanh tra kiểm tra' }
];

export const KEHOACH_OPTIONS = {
    kehoach: 1,
    thucte: 2,
};
export const NOI_DUNG_TT = [
    'Nội dung thanh tra 1',
    'Nội dung thanh tra 2',
    'Nội dung thanh tra 3'
];

export const STATUS = {
    STATUS_KHDUTHAO_TW_CHO_DUYET_TAO_KH: 1001,
    STATUS_KHDUTHAO_TW_DA_DUOC_DUYET_TAO_KH: 1002,
    STATUS_KHDUTHAO_TW_CHO_DUYET_DIEU_CHINH: 1003,
    STATUS_KHDUTHAO_TW_DA_DUOC_DUYET_DIEU_CHINH: 1004,
    STATUS_KHDUTHAO_TINH_CHO_DUYET_TAO_KH: 5005,
    STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH: 5006,
    STATUS_KHDUTHAO_TINH_CHO_TW_DUYET: 5007,
    STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH: 5008,
    STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_KH: 5009,
    STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH: 5010,
    STATUS_KHDUTHAO_TINH_KE_HOACH_DA_DUOC_DIEU_CHINH: 5011,
    STATUS_KHDUTHAO_TINH_XIN_DIEU_CHINH: 5012,
    STATUS_KHDUTHAO_TINH_CHO_DUYET_XIN_DIEU_CHINH: 5013,
    STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH: 5014,
    STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH: 5015,
    STATUS_TINH_DU_KIEN_CHO_DUYET: 301,
    STATUS_TINH_DU_KIEN_DA_DUOC_DUYET: 302,
    STATUS_TINH_DU_KIEN_CHO_DUYET_DIEU_CHINH: 303,
    STATUS_TINH_DU_KIEN_DA_DUOC_DUYET_DIEU_CHINH: 304
};

export const TRANG_THAI_KH = [
    { code: 1, name: 'Hoãn TTKT'},
    { code: 2, name: 'Chưa TTKT'},
    { code: 3, name: 'Đang TTKT'},
    { code: 4, name: 'Đã TTKT'},
    { code: 5005, name: '' },
    { code: 5006, name: '' },
    { code: 5007, name: 'Trung ương chưa duyệt' },
    { code: 5008, name: 'Từ chối kế hoạch' },
    { code: 5009, name: 'Trung ương đã duyệt' },
    { code: 5010, name: 'Trung ương giao kế hoạch' },
    { code: 5011, name: 'Kế hoạch đã được điều chỉnh' },
    { code: 5012, name: 'Chờ Trung ương duyệt điều chỉnh' },
    { code: 5013, name: 'Chờ Trung ương duyệt điều chỉnh' },
    { code: 5014, name: 'Trung ương từ chối điều chỉnh' },
    { code: 5015, name: 'Trung ương chấp nhận điều chỉnh' },
];
export const LOAIHINHTTKT = [
    {
        id: 1,
        name: 'Thanh tra'
    },
    {
        id: 2,
        name: 'Kiểm tra'
    },
    {
        id: 3,
        name: 'Thanh tra liên ngành'
    },
    {
        id: 4,
        name: 'Kiểm tra liên ngành'
    }
];

export const TYPE_KE_HOACH = {
    KE_HOACH_DAU_NAM: 1,
    KE_HOACH_DAU_NAM_DIEU_CHINH: 2,
    KE_HOACH_TW_GIAO: 3,
    KE_HOACH_TINH_XIN_DIEU_CHINH: 4,
    KE_HOACH_TINH_DU_KIEN: 5,
    KE_HOACH_TINH_DU_KIEN_DIEU_CHINH: 6
};
