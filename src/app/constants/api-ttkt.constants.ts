import { HOST } from './api-port.constants';

export const THANH_LAP_DOAN = {
  GET_ALL: HOST + '/api/thanh-lap-doans',
  GET_DS_BY_OWNERTW: HOST + '/api/thanh-lap-doans/get-by-is-owner-tw',
  SEARCH_BY_TEN_QD: HOST + '/api/thanh-lap-doans/search-by-ten-quyet-dinh-new',
  GET_SO_LAN_DIEU_CHINH_QD: HOST + '/api/thanh-lap-doans/get-have-old-thanh-lap-doan',
  CHANGE_STT: HOST + '/api/thanh-lap-doans/thanh-lap-doan-change-status',
  TW_GUI_TINH: HOST + '/api/thanh-lap-doans/tw-gui-tinh-kem-loi-nhan',
  GET_LIST_SCOPE_OF_YEAR: HOST + '/api/thanh-lap-doans/get-list-pham-vi-in-khduthao-of-year',
  GET_INFO_KHDUTHAO: HOST + '/api/thanh-lap-doans/get-info-khduthao-for-thanh-lap-doan'
};

export const THANH_LAP_DOAN_V2 = {
  DIEU_CHINH: HOST + '/api/thanh-lap-doans/v2-dieu-chinh-thanh-lap-doan',
  THEM_MOI: HOST + '/api/thanh-lap-doans/v2-them-moi-quyet-dinh-tld',
  TW_GUI_TINH: HOST + '/api/thanh-lap-doans/v2-tw-gui-quyet-dinh-thanh-lap-doan-cho-tinh',
  DUYET: HOST + '/api/thanh-lap-doans/v2-duyet-thanh-lap-doan',
  CONG_BO_QD: HOST + '/api/thanh-lap-doans/update-cong-bo-quyet-dinh',
  BAOCAO_KETLUAN: HOST + '/api/thanh-lap-doans/update-bb-bc-ket-luan',
  DUYET_DIEU_CHINH: HOST + '/api/thanh-lap-doans/v2-duyet-dieu-chinh-thanh-lap-doan',
  CHECK_DV_DA_TIEN_HANH: HOST + '/api/thanh-lap-doans/check-da-tien-hanh-ttkt-o-dv-ttkt',
  CHECK_TLD_KET_THUC: HOST + '/api/thanh-lap-doans/check-da-ket-thuc-ttkt',
  CHECK_DA_KETLUAN_DOAN: HOST + '/api/thanh-lap-doans/check-da-ket-luan-doan-ttkt',
  CHECK_DA_BAOCAO_DOAN: HOST + '/api/thanh-lap-doans/check-da-tao-bao-cao-ket-qua'
};

export const TIEN_HANH_TTKT = {
    GET_DS_CHI_TIET: HOST + '/api/tien-hanh-ttkts/get-danh-sach-chi-tiet-tien-hanh-ttkt',
    GET_THEO_DOI_HD_DOAN: HOST + '/api/tien-hanh-ttkts/theo-doi-hoat-dong-doan',
    GET_ALL: HOST + '/api/tien-hanh-ttkts',
    GET_BY_DVDCTTKT_ID: HOST + '/api/tien-hanh-ttkts/find-by-dsdvdc-ttkt-id?dsDvDcTtktId=',
    HOAN_TTKT: HOST + '/api/tien-hanh-ttkts/hoan-ttkt',
    HUY_HOAN_TTKT: HOST + '/api/bb-hoans',
    GET_DS_DOAN_TTKT: HOST + '/api/tien-hanh-ttkts/get-danh-sach-doan-ttkt',
    XEM_BAOCAO_KL: HOST + '/api/tien-hanh-ttkts/xem-bao-cao-ket-luan-theo-thanh-lap-doan-id',
    KET_THUC_TIENHANH: HOST + '/api/tien-hanh-ttkts/ket-thuc-ttkt',
    TONG_HOP_CHI_TIET_TTKT: HOST + '/api/tien-hanh-ttkts/tong-hop-chi-tiet-ttkt-by-thanh-lap-doan',
    TONG_HOP_CHI_TIET_TTKT_BY_THANH_LAP_DOAN_AND_DOI_TUONG_TTKT: HOST + '/api/tien-hanh-ttkts/tong-hop-chi-tiet-ttkt-by-thanh-lap-doan-and-doi-tuong-ttkt',
    PRINT_MAU_VI_PHAM_HANH_CHINH: HOST + '/api/tien-hanh-ttkts/print-mau-vi-pham-hanh-chinh',
    PRINT_MAU_XU_PHAT_VI_PHAM_HANH_CHINH: HOST + '/api/tien-hanh-ttkts/print-mau-xu-phat-vi-pham-hanh-chinh',
    GET_DS_DOAN_TTKT_HAS_TIEN_DO_EQUAL_1 : HOST + '/api/tien-hanh-ttkts/get-danh-sach-doan-ttkt-tien-do-bang-1',
    CREATE_GIAI_TRINH : HOST + '/api/giai-trinh',
  };

export const GIAI_TRINH_TTKT = {
    GET_GIAI_TRINH_BY_TIEN_HANH_TTKT_ID : HOST + '/api/giai-trinh/find-by-tien-hanh-ttkt-id',
};


export const QDINH_TTKT_BHXHVN = {
  FILTER_QUYET_DINH_THANH_LAP_DOAN: HOST + '/api/thanh-lap-doans/filter-quyet-dinh-thanh-lap-doan',
  GET_TLD_CUA_TW_GUI_TINH: HOST + '/api/thanh-lap-doans/get-thanhlapdoan-cua-tw-da-gui-tinh',
  SEARCH_BY_TEN_QD_ACC_TINH: HOST + '/api/thanh-lap-doans/search-by-ten-quyet-dinh-acc-tinh'
};

export const DANH_MUC = {
  // DM CANCU
  DM_CAN_CU_TTKT: HOST + '/api/dm-can-cu-ttkts',
  DEACTIVE_DM_CAN_CU_TTKT: HOST + '/api/dm-can-cu-ttkts/deactive',
  ACTIVE_DM_CAN_CU_TTKT: HOST + '/api/dm-can-cu-ttkts/active',

  DM_DV_C_TRI: HOST + '/api/dm-c-tri-p-hops',
  DM_DV_C_TRI_BY_TYPE: HOST + '/api/dm-c-tri-p-hops-by-type',
  NOI_DUNG_TTKT: HOST + '/api/dm-noi-dung-ttkts',
  GET_BY_IS_ND_TT: HOST + '/api/dm-noi-dung-ttkts/get-by-is-noi-dung-thanh-tra',
  PHAN_LOAI_DT: HOST + '/api/dm-phan-loai-dts',
  CHI_TIET_ND: HOST + '/api/dm-chi-tiet-nds',
  GET_BY_DM_NDTTKT_ID: HOST + '/api/dm-chi-tiet-nds/get-by-dm-noi-dung-ttkt-id',
  GET_BY_TEN_NOIDUNG: HOST + '/api/dm-chi-tiet-nds/get-by-ten-noi-dung',
  GET_BY_TEN_NOIDUNG_AND_DM_NOIDUNG_TTKT_ID: HOST + '/api/dm-chi-tiet-nds/get-by-ten-noi-dung-and-dm-noi-dung-ttkt-id',

  // DM Hanh Vi
  DM_HANH_VI: HOST + '/api/dm-hanh-vis',
  // DM VB Can Cu Xu Phat
  DM_VB_CAN_CU_XU_PHAT: HOST + '/api/dm-vb-can-cu-xu-phats',

  // DM TIEUTHUC
  DM_PHAN_LOAI_TIEUTHUC: HOST + '/api/dm-phan-loai-tts',
  DEACTIVE_PHAN_LOAI_TIEUTHUC: HOST + '/api/dm-phan-loai-tts/deactive',
  ACTIVE_PHAN_LOAI_TIEUTHUC: HOST + '/api/dm-phan-loai-tts/active',
  GET_CHI_TIET_TIEUTHUC: HOST + '/api/dm-tieu-thucs/get-by-phan-loai-tieu-thuc',
  DM_CHI_TIET_TIEUTHUC: HOST + '/api/dm-tieu-thucs',
  DEACTIVE_DM_CHI_TIET_TIEUTHUC: HOST + '/api/dm-tieu-thucs/deactive',
  ACTIVE_DM_CHI_TIET_TIEUTHUC: HOST + '/api/dm-tieu-thucs/active',
  GET_KET_LUAN: HOST + '/api/dm-phan-loai-tts/ketluan',
  SAVE_KET_LUAN: HOST + '/api/list-tt-ket-luans',
  // DM NOIDUNGTTKT
  DM_NOI_DUNG_TTKTS: HOST + '/api/dm-noi-dung-ttkts',
  DEACTIVE_DM_NOI_DUNG_TTKTS: HOST + '/api/dm-noi-dung-ttkts/deactive',
  ACTIVE_DM_NOI_DUNG_TTKTS: HOST + '/api/dm-noi-dung-ttkts/active',
  GET_CHI_TIET_NOI_DUNG_TTKT: HOST + '/api/dm-chi-tiet-nds/get-by-dm-noi-dung-ttkt-id',
  DM_CHI_TIET_NOI_DUNG_TTKT: HOST + '/api/dm-chi-tiet-nds',
  DEACTIVE_DM_CHI_TIET_NOI_DUNG_TTKT: HOST + '/api/dm-chi-tiet-nds/deactive',
  ACTIVE_DM_CHI_TIET_NOI_DUNG_TTKT: HOST + '/api/dm-chi-tiet-nds/active',
  GET_CHI_TIET_KET_LUAN: HOST + '/api/dm-tieu-thucs/get-by-phan-loai-tieu-thuc',

  GET_LIST_DM_TIEU_THUC: HOST + '/api/dm-tieu-thucs/get-list-danh-muc',
  GET_CHI_TIET: HOST + '/api/dm-tieu-thucs/get-by-tieu-thuc',
  REMOVE_CHI_TIET: HOST + '/api/tt-ket-luans',
  // Danh mục Phòng Ban
  DM_PHONG_BAN: HOST + '/api/d-m-phong-ban',
  CHI_PHI_KHAM_CHUA_BENH: HOST + '/api/chi-phi-kham-chua-benh',

  // Danh mục đơn vị nghiệp vụ
  DVI_NGHIEPVU: HOST + '/api/don-vi-nghiep-vus',
};

export const DOI_TUONG = {
  GET_BY_PLOAI_DT: HOST + '/api/doi-tuong-ttkts/get-by-phan-loai-doi-tuong',
  SEARCH_BY_TEN_DT: HOST + '/api/doi-tuong-ttkts/search-by-ten-doi-tuong-for-thanh-lap-doan'
};

export const SO_THEO_DOI_KET_LUAN = {
  GET_ALL: HOST + '/api/theo-doi-don-docs/get-danh-sach-so-theo-doi?',
  GET_BY_ID: HOST + '/api/theo-doi-don-docs/get-thong-tin-so-theo-doi-thuc-hien-ket-luan',
  UPDATE_SO_THEO_DOI: HOST + '/api/theo-doi-don-docs/cap-nhat-so-theo-doi-thuc-hien-ket-luan',
  STD_KETLUAN: HOST + '/api/so-td-thkls',
  GET_DS_CHI_TIET_BY_DATE: HOST + '/api/theo-doi-don-docs/get-danh-sach-chi-tiet-so-theo-doi-by-date'
};

export const KE_HOACH = {
  TW_SEARCH_BY_STT: HOST + '/api/kh-du-thaos/search-by-status-use-by-tw-only?',
  SEARCH_BY_STT: HOST + '/api/kh-du-thaos/search-by-status?',
  TINH_CHUAGUI: HOST + '/api/kh-du-thaos/search-tinh-chua-gui?',
  SEARCH: HOST + '/api/kh-du-thaos/search-by-owner-tw?isOwnerTW=',
  LIST_TINH_HUYEN_DUKIEN: HOST + '/api/kh-du-thaos/get-danh-sach-tinhhuyen-du-kien?',
  TINH_TAO_KE_HOACH_DU_KIEN: HOST + '/api/kh-du-thaos//tinh-tao-ke-hoach-du-kien',
  TINH_XEM_LIST_KE_HOACH_DU_KIEN: HOST + '/api/kh-du-thaos/tinh-xem-danh-sach-ke-hoach-du-kien',
  TINH_DUYET_KE_HOACH_DU_KIEN: HOST + '/api/kh-du-thaos/tinh-duyet-ke-hoach-du-kien',
  GET_TINHDUKIEN_WITH_LIVEDATA: HOST + '/api/kh-du-thaos/get-tinhdukien-with-live-data',
  TINH_DIEU_CHINH_KH_DUKIEN: HOST + '/api/kh-du-thaos/tinh-dieu-chinh-ke-hoach-du-kien',
  TW_XEM_TIEN_DO_TINH_THUC_HIEN: HOST + '/api/kh-du-thaos/tw-xem-tien-do-tinh-thuc-hien',
  GET_SO_LIEU_THONG_KE_TINH_THUC_HIEN_KE_HOACH: HOST + '/api/kh-du-thaos/so-lieu-thong-ke-thuc-hien-ke-hoach',
  TW_CHECK_STATUS_KH: HOST + '/api/kh-du-thaos/check-status-thuc-hien-o-tw',
  TINH_CHECK_STATUS_KH: HOST + '/api/kh-du-thaos/tinh-check-trang-thai'
};

export const CAU_HINH = {
  CAU_HINH_QUY: HOST + '/api/cau-hinh-quy'
};

