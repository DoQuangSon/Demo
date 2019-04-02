// Message Tạo kế hoạch tỉnh
export const MESS_TAO_KH_TINH = {
  ERROR_CHECK_TINH_TAO_KH: 'Bạn không thể tạo 2 kế hoạch 1 năm',
  ERROR_MAX_SUM_ROW: 'Tổng số không được lớn hơn ',
  ERROR_FILE_QD: 'Bạn cần chọn file quyết định',
  SUCCESS_GUI_KE_HOACH: 'Gửi kế hoạch thành công'
};

export const MESS_FROM_TW = {
  SUCCESS_GIAO_KH: 'Giao kế hoạch thành công'
};

// Message Chi tiết kế hoạch tỉnh
export const MESS_CHI_TIET_KH_TINH = {
  ERROR_NHAP_LOI_NHAN: 'Bạn cần nhập lời nhắn',
  SUCCESS_GUI_KE_HOACH: 'Gửi kế hoạch thành công'
};

// Message Tạo kế hoạch TW
export const MESS_TAO_KH_TW = {
  ERROR_CHECK_TW_DA_TAO_KH: 'Bạn không thể tạo 2 kế hoạch 1 năm',
  ERROR_CHUA_DU_THONG_TIN_CHUNG: 'Bạn chưa điền đủ thông tin chung',
  ERROR_CHUA_THEM_DON_VI_TTKT: 'Bạn chưa thêm đơn vị Thanh Tra',
  ERROR_TAO_KE_HOACH: 'Tạo kế hoạch thất bại',
  SUCCESS_GUI_KH: 'Gửi kế hoạch thành công',
  SUCCESS_CAP_NHAT_KH: 'Cập nhật kế hoạch thành công',
  SUCCESS_TAO_KE_HOACH: 'Tạo kế hoạch thành công',
  SUCCESS_DUYET_KE_HOACH: 'Duyệt kế hoạch thành công',
};

// Message Tạo kế hoạch bảo hiểm xã hội việt nam
export const MESS_TAO_KH_BHXH_VN = {
  ERROR_CHECK_TINH_TAO_KH: 'Bạn không thể tạo 2 kế hoạch 1 năm',
  ERROR_CHUA_DU_THONG_TIN: 'Bạn chưa nhập đủ các trường',
  ERROR_THEM_DV_TK: 'Thêm đơn vị thanh tra',
  ERROR_NHAP_QUY_KH_LOAI_TTKT: 'Mời nhập "Quý kế hoạch" và "Loại hình TTKT"',
};

// Message quản lý nhóm người dùng + quản lý người dùng
export const MESS_QUAN_LY_NHOM_NGUOI_DUNG = {
  ERROR_XOA_USER: 'Xóa người dùng thất bại',
  ERROR_THEM_USER: 'Thêm người dùng vào nhóm thất bại',
  ERROR_THEM_NHOM_NGUOI_DUNG: 'Thêm nhóm người dùng vào nhóm thất bại',
  ERROR_PHAN_QUYEN: 'Phân quyền cho nhóm thất bại',
  SUCCESS_XOA_USER: 'Xóa người dùng thành công',
  SUCCESS_THEM_USER: 'Thêm người dùng vào nhóm thành công',
  SUCCESS_THEM_NHOM_NGUOI_DUNG: 'Thêm nhóm người dùng vào nhóm thành công',
  SUCCESS_PHAN_QUYEN: 'Phân quyền cho nhóm thành công',
  SUCCESS_XOA_USER_GROUP: 'Xóa nhóm người dùng thành công'
};

// Message success chung
export const COMMON_SUCCESS_MESS = {
  THEM_MOI: 'Thêm mới thành công',
  TAO_MOI: 'Tạo mới thành công',
  GUI: 'Gửi thành công',
  CAP_NHAT: 'Cập nhật thành công',
  DUYET: 'Đã duyệt quyết định'
};

// Message error chung
export const COMMON_ERROR_MESS = {
  THIEU_FIELD_REQUIRED: 'Bạn chưa điền đủ thông tin',
  THU_LAI: 'Vui lòng thử lại',
  THIEU_LOI_NHAN: 'Bạn cần nhập lời nhắn',
  LOI_CHUNG: 'Có lỗi xảy ra!',
  CAP_NHAT_LOI: 'Cập nhật không thành công',
  DUYET: 'Duyệt không thành công',
  GUI: 'Gửi không thành công',
  WRONG_NUMBER_FORMAT: 'Chỉ được nhập số!'
};

// Message Quản lý đơn vị TTKT
export const MESS_QL_DONVI_TTKT = {
  ERROR_DANH_SACH_DON_VI: 'Lỗi lấy danh sách đơn vị được TTKT',
  ERROR_DANH_SACH_TINH: 'Có lỗi khi lấy danh sách tỉnh',
  ERROR_GET_DANH_SACH_LICH_SU_TTKT_DONVI: 'Lỗi lấy DS lịch sử TTKT của đơn vị',
  ERROR_GET_DANH_SACH_LICH_SU_TTKT_TINH: 'Lỗi lấy danh sách lịch sử TTKT của tỉnh',
  ERROR_SEARCH_DANH_SACH_DON_VI: 'Lỗi tìm kiếm danh sách đơn vị được TTKT',
  SUCCESS_CREATE_LICH_SU_TTKT_DONVI: 'Thêm lịch sử TTKT thành công',
  ERROR_CREATE_LICH_SU_TTKT_DONVI: 'Lỗi thêm lịch sử TTKT',
  SUCCESS_EDIT_LICH_SU_TTKT_DONVI: 'Cập nhật lịch sử TTKT thành công',
  ERROR_EDIT_LICH_SU_TTKT_DONVI: 'Lỗi cập nhật lịch sử TTKT',
  ERROR_DELETE_LICH_SU_TTKT_DONVI: 'Lỗi xóa lịch sử TTKT',
  SUCCESS_DELETE_LICH_SU_TTKT_DONVI: 'Đã xóa lịch sử TTKT',
};

// Message Quản lý báo cáo TTKT
export const MESS_QL_BAOCAO_TTKT = {
  // Sổ theo dõi chi tiết
  ERROR_GET_DS_SO_THEODOI_CHITIET: 'Lỗi lấy danh sách sổ theo dõi chi tiết',
  ERROR_SEARCH_DS_SO_THEODOI_CHITIET: 'Bạn phải chọn ngày tìm kiếm',
  ERROR_GET_THONG_TIN_SO_THEODOI_CHITIET: 'Lỗi lấy danh sách đơn vị được TTKT',
  ERROR_GET_SO_THEODOI_CHITIET_DONVI: 'Lỗi lấy thông tin sổ theo dõi chi tiết',
  SUCCESS_SAVE_SO_THEODOI_CHITIET_DONVI: 'Lưu thành công sổ theo dõi chi tiết',
  ERROR_SAVE_SO_THEODOI_CHITIET_DONVI: 'Lỗi lưu sổ theo dõi chi tiết',
  // Báo cáo tổng hợp
  SUCCESS_SAVE_BC_TONGHOP: 'Lưu báo cáo thành công',
  SUCCESS_SAVE_EDIT_BC_TONGHOP: 'Sửa báo cáo thành công',
  SUCCESS_DUYET_BC_TONGHOP: 'Đã duyệt báo cáo tổng hợp',
  SUCCESS_GUI_BC_TONGHOP: 'Đã gửi báo cáo tổng hợp',
};

// Message quản lý đoàn
export const QUAN_LY_DOAN = {
  SUCCESS_CONG_BO_QUYET_DINH: 'Công bố quyết định thành công',
  SUCCESS_BAOCAO: 'Báo cáo kết quả đoàn thành công',
  SUCCESS_KETLUAN: 'Kết luận kết quả đoàn thành công',
  ERROR_CONG_BO_QUYET_DINH: 'Công bố quyết định không thành công',
  ERROR_GET_DT_TTKT: 'Có lỗi khi lấy danh sách đối tượng TTKT',
  SUCCESS_HOAN_TIEN_HANH: 'Hoãn tiến hành thanh tra kiểm tra thành công!',
  SUCCESS_KETTHUC_TIEN_HANH: 'Kết thúc tiến hành thanh tra kiểm tra tại đơn vị!',
  ERROR_THIEU_LOAI_HINH_DON_VI: 'Bạn chưa chọn loại hình đơn vị'
};

// Message Phân loại đối tượng TTKT
export const MESS_PHAN_LOAI_DOI_TUONG_TTKT = {
  ERROR_GET_DS_PHAN_LOAI: 'Lỗi lấy danh sách phân loại đối tượng TTKT!',
  ERROR_GET_DS_CHUA_PHAN_LOAI: 'Lỗi lấy danh sách đối tượng TTKT!',
};
// Message Chi phí khám bệnh
export const MESS_CHI_PHI_KHAM_BENH = {
  SUCCESS_THEM_CHI_PHI_KHAM_BENH : 'Thêm chi phí khám chữa bệnh thành công',
  ERROR_THEM_CHI_PHI_KHAM_BENH : 'Thêm chi phí khám chữa bệnh thất bại',
  SUCCESS_CAP_NHAT_CHI_PHI_KHAM_BENH : 'Cập nhật chi phí khám chữa bệnh thành công',
  ERROR_CAP_NHAT_CHI_PHI_KHAM_BENH : 'Cập nhật chi phí khám chữa bệnh thất bại',
  SUCCESS_XOA_CHI_PHI_KHAM_BENH : 'Xóa chi phí khám chữa bệnh thành công',
  ERROR_XOA_CHI_PHI_KHAM_BENH : 'Xóa chi phí khám chữa bệnh thất bại',
};
export const MESS_NGHIEP_VU = {
  SUCCESS_THEM_NGHIEP_VU: 'Thêm nghiệp vụ thành công',
  ERROR_THEM_NGHIEP_VU: 'Thêm nghiệp vụ thất bại',
  SUCCESS_CAP_NHAT_NGHIEP_VU: 'Cập nhật nghiệp vụ thành công',
  ERROR_CAP_NHAT_NGHIEP_VU: 'Cập nhật nghiệp vụ thất bại',
  SUCCESS_XOA_NGHIEP_VU: 'Xóa nghiệp vụ thành công',
  ERROR_XOA_NGHIEP_VU: 'Xóa nghiệp vụ thất bại',
};

export const MESS_GIAI_TRINH = {
    SUCCESS_THEM_GIAI_TRINH: 'Thêm giải trình thành công',
    SUCCESS_CAP_NHAT_GIAI_TRINH: 'Cập nhật giải trình thành công',
    ERROR_CAP_NHAT_GIAI_TRINH: 'Cập nhật giải trình thất bại',
    ERROR_CHUA_CO_FILE: 'Bạn chưa chọn file quyết định',
    SUCCESS_CHANGE_VIEW_UPDATE: 'Bạn có thể chỉnh sửa',
};
