import { HOST } from './api-port.constants';

export const FILE = {
  download: HOST + '/api/file/download',
  exportFileKeHoachToanNganh: HOST + '/api/file/export-ke-hoach-toan-nganh',
  importFile: HOST + '/api/file/import-file',
  upload: HOST + '/api/file/upload'
};

export const LICHTIEPCD = {
  createNewLichtiepCd: HOST + '/api/lich-tiep-dans',
  searchLichTiepCd: HOST + '/api/lich-tiep-dans/search-new',
  getListCanBo: HOST + '/api/lich-tiep-dans/get-info-canBo-by-dmBHXH',
  getListCanBoHomNay: HOST + '/api/lich-tiep-dans/search-date'
};

export const LYDOKHONGTHULYTC = {
  getAll: HOST + '/api/d-m-ly-do-ko-thu-ly-tcs',
  crud: HOST + '/api/d-m-ly-do-ko-thu-ly-tcs',
  search: HOST + '/api/d-m-ly-do-ko-thu-ly-tcs/search-ly-do-ko-thu-ly'
};

export const LYDOTUCHOITIEPCDS = {
  getAll: HOST + '/api/d-m-ly-do-tu-choi-tiep-cds',
  search: HOST + '/api/d-m-ly-do-tu-choi-tiep-cds/search-by-noi-dung-ly-do'
};

export const DMMAUDON = {
  getAll: HOST + '/api/d-m-mau-dons',
  searchByName: HOST + '/api/d-m-mau-dons/search-by-ten-mau'
};

export const DMPHANLOAINOIDUNG = {
  getAll: HOST + '/api/d-m-phan-loai-noi-dungs'
};

export const CHECKSOCONGVAN = {
  check: HOST + '/api/don-thu/check-so-cong-van-den'
};

export const DMTINHTRANGTAILIEU = {
  getAll: HOST + '/api/d-m-tinh-trang-tai-lieus',
  searchByName: HOST + '/api/d-m-tinh-trang-tai-lieus/search-by-ten-tinh-trang'
};

export const DMBHXH = {
  getAll: HOST + '/api/d-mbhxhs',
  search: HOST + '/api/d-mbhxhs/find-by-ten-and-ma-don-vi',
  getByMaCha: HOST + '/api/d-mbhxhs/get-by-ma-cha'
};

export const TIEUCHITTKT = {
  root: HOST + '/api/tieu-chi-ttkts',
};

export const TIEPCONGDAN = {
  createNewCongdan: HOST + '/api/tiep-cong-dans',
  getCdByCmt: HOST + '/api/tiep-cong-dans/cong-dan-va-so-lan-den',
  historyTiepCongDan: HOST + '/api/tiep-cong-dans/search-lich-su-tiep-cong-dans',
  searchHistoryTiepCongDan: HOST + '/api/tiep-cong-dans/search-lich-su-tiep-cong-dans-new',
  detailHistoryTiepCongDan: HOST + '/api/tiep-cong-dans/',
  getTiepCongDanInfor: HOST + '/api/tiep-cong-dans/search',
  searchByName: HOST + '/api/tiep-cong-dans/search-ho-ten',
  searchDonThu: HOST + '/api/tiep-cong-dans/search-don-thu'
};

export const DTKHIEUNAI = {
  resource: HOST + '/api/d-t-khieu-nais',
  getDTKhieuNaiByDTId: HOST + '/api/d-t-khieu-nais/get-by-don-thu-id',
  PRINT_MAU_05: HOST + '/api/d-t-khieu-nais/print-mau-05',
  PRINT_MAU_06: HOST + '/api/d-t-khieu-nais/print-mau-06',
  PRINT_MAU_07: HOST + '/api/d-t-khieu-nais/print-mau-07',
  PRINT_MAU_08: HOST + '/api/d-t-khieu-nais/print-mau-08',
  PRINT_MAU_09: HOST + '/api/d-t-khieu-nais/print-mau-09',
};

export const ACCOUNT = {
  getAccount: HOST + '/api/account',
  getDonvi: HOST + '/api/account/get-info-dmbhxh-by-ma-don-vi'
};

export const NOI_JWT_CONTROLLER = {
  getAuthenticate: HOST + '/api/authenticate'
};

export const DTTOCAO = {
  resource: HOST + '/api/d-t-to-caos',
  getDTToCaoByDTId: HOST + '/api/d-t-to-caos/get-by-don-thu-id',
  printMauDonTuChoi: HOST + '/api/d-t-to-caos/printMauDonTuChoi',
};
export const DTKIENNGHIPA = {
  resource: HOST + '/api/d-t-kien-nghi-pas',
  getDTKienNghiPAByDTId: HOST + '/api/d-t-kien-nghi-pas/get-by-don-thu-id'
};
export const DONTHU = {
  getDonthu: HOST + '/api/don-thus',
  updateDonthu: HOST + '/api/don-thus/dieu-chinh',
  traCuu: HOST + '/api/don-thus/tra-cuu-lich-su-cong-dan',
  getLichSuByCmt: HOST + '/api/don-thus/get-lich-su-cong-dan-by-so-cmt',
  getInfoByCmt: HOST + '/api/don-thus/get-info-cong-dan-by-so-cmt',
  searchDonThu: HOST + '/api/don-thus/search-don-thu',
  getDonThuChuaGQ: HOST + '/api/don-thus/get-don-thu-chua-gq',
  getDonThuDieuChinhByDmbhxhId: HOST + '/api/don-thus/get-don-thu-gq-dieu-chinh-by-dmbhxhid',
  getDonThuSoCvDenNotNull: HOST + '/api/don-thus/get-don-thu-so-cv-den-not-null'
};

export const DMCHUTRIPHOIHOP = {
  getAll: HOST + '/api/dm-c-tri-p-hops',
  getAllByType: HOST + '/api/dm-c-tri-p-hops-by-type',
  search: HOST + '/api/dm-c-tri-p-hops/search-by-ten-don-vi'
};

export const DMTINHHUYEN = {
  resource: HOST + '/api/dm-tinh-huyens',
  danhSachTinhThanh: HOST + '/api/dm-tinh-huyens/get-all-tinh-thanh',
  danhSachHuyenOfTinh: HOST + '/api/dm-tinh-huyens/get-huyen-by-tinh-thanh-id',
  searchTinhHuyen: HOST + '/api/dm-tinh-huyens/search-by-ten-and-ma-tinh-huyen'
};

export const DMCHUCDANH = {
  getAll: HOST + '/api/d-m-chuc-danh-users',
  crud: HOST + '/api/d-m-chuc-danh-users',
  search: HOST + '/api/d-m-chuc-danh-users/search-chuc-danh'
};

export const KHDUTHAO = {
  create: HOST + '/api/kh-du-thaos',
  getOwnerTW: HOST + '/api/kh-du-thaos/search-by-owner-tw',
  changeStatus: HOST + '/api/kh-du-thaos/change-status',
  khOld: HOST + '/api/kh-du-thaos/get-have-kh-du-thao-old?Id=',
  loiNhan: HOST + '/api/kh-du-thaos/tinh-gui-kh-den-tw',
  tuChoiKeHoach: HOST + '/api/kh-du-thaos/tw-tu-choi-kh',
  tuchoiKhDieuChinh: HOST + '/api/kh-du-thaos/tw-tu-choi-xin-dieu-chinh',
  getCurr: HOST + '/api/kh-du-thaos/get-have-kh-du-thao-old?Id=',
  getThongTinDieuChinh: HOST + '/api/kh-du-thaos/get-next-version?khDuThaoId=',
};

export const KH_TINH_DAU_NAM = {
  SEARCH_KH_TINH: HOST + '/api/kh-du-thaos/search-All-Ke-Hoach-TW-Giao-By-Tinh-Huyen-ID-And-Year',
  SEARCH_KH_ALL_TINH_ALL_YEAR: HOST + '/api/kh-du-thaos/search-All-Ke-Hoach-TW-Giao-By-Tinh-Huyen-ID-All-Year',
  create: HOST + '/api/kh-du-thaos/tinh-create-ke-hoach-dau-nam',
  getKeHoachTinhDauNam: HOST + '/api/kh-du-thaos/tinh-xem-danh-sach-ke-hoach-dau-nam',
  searchKeHoachTinhDauNam: HOST + '/api/kh-du-thaos/tinh-search-ke-hoach-dau-nam',
  tinhDuyetKeHoachDauNam: HOST + '/api/kh-du-thaos/tinh-duyet-tao-ke-hoach-dau-nam',
  tinhGuiKeHoachDenTW: HOST + '/api/kh-du-thaos/tinh-gui-kh-den-tw',
  getKeHoachTWGiao: HOST + '/api/kh-du-thaos/tinh-xem-ke-hoach-tw-giao-xuong',
  tinhXinDieuChinhKHTWGiao: HOST + '/api/kh-du-thaos/tinh-gui-xin-dieu-chinh-ke-hoach-tw-giao',
  tinhXinDieuChinhKHBiTuChoi: HOST + '/api/kh-du-thaos/tinh-dieu-chinh-ke-hoach-bi-tu-choi',
  getKeHoachDieuChinh: HOST + '/api/kh-du-thaos/tinh-xem-ke-hoach-xin-dieu-chinh-da-gui-tw',
  GET_KH_TINH: HOST + '/api/kh-du-thaos/search-All-Ke-Hoach-TW-Giao-By-Tinh-Huyen-ID',
};

export const GHICHU = {
  create: HOST + '/api/ghi-chu-of-tws'
};

export const PHANLOAIDT = {
  resource: HOST + '/api/dm-phan-loai-dts',
  SEARCH_BY_TEN_DOI_TUONG: HOST + `/api/doi-tuong-ttkts/search-by-ten-doi-tuong`,
  GET_ALL: HOST + `/api/doi-tuong-ttkts`,
  DS_DOI_TUONG_TTKT_CHUA_PHAN_LOAI: HOST + '/api/doi-tuong-ttkts/get-ds-doituong-ttkt-chua-phan-loai',
  PHAN_LOAI_DOI_TUONG: HOST + '/api/doi-tuong-ttkts/phan-loai-doi-tuong-ttkt',
  DS_DOI_TUONG_TTKT: HOST + '/api/doi-tuong-ttkts/get-by-phan-loai-doi-tuong',
  XOA_PHAN_LOAI_DOI_TUONG: HOST + '/api/doi-tuong-ttkts/phan-loai-doi-tuong-ttkt-remove-doi-tuong-from-list',
  UPDATE_NHOM_PHAN_LOAI_DT: HOST + '/api/doi-tuong-ttkts',
  GET_TINH_HUYEN: HOST + `/api/dm-tinh-huyens/filter-tinh-huyen`,
};

export const QUAN_LY_TINH_DUOC_TTKT = {
  DANH_SACH_TINH_VI_QUAN_LY: HOST + '/api/quan-ly-tinh-duoc-ttkts/get-danh-sach-tinh-vi-quan-ly',
  DANH_SACH_DON_VI: HOST + '/api/quan-ly-tinh-duoc-ttkts/get-danh-sach-don-vi-quan-ly',
  SEARCH_DANH_SACH_TINH_QUAN_LY: HOST + '/api/quan-ly-tinh-duoc-ttkts/search-danh-sach-tinh-vi-quan-ly',
  SEARCH_DANH_SACH_DON_VI: HOST + '/api/quan-ly-tinh-duoc-ttkts/search-doi-tuong-ttkt',
  // DANH_SACH_LICH_SU_TTKT_DON_VI: HOST + '/api/quan-ly-tinh-duoc-ttkts/lich-su-ttkt-o-doi-tuong-ttkt',
  LICH_SU_TTKT_CUA_MINH: HOST + '/quan-ly-tinh-duoc-ttkts/tinh-xem-lich-su-ttkt-cua-minh',
};

export const LICH_SU_TTKT_TINH = {
  GET_DANH_SACH_LICH_SU_TTKT_TINH: HOST + '/api/thanh-lap-doans/get-all-history-ttkt-tinh',
  CREATE_LICH_SU_TTKT_TINH: HOST + '/api/thanh-lap-doans/create-thanh-lap-doan-history',
  DLETE_LICH_SU_TTKT_TINH: HOST + '/api/thanh-lap-doans',
};

export const LICH_SU_TTKT_DONVI = {
  GET_DANH_SACH_LICH_SU_TTKT_DONVI: HOST + '/api/tien-hanh-ttkts/get-lich-su-ttkt-o-doi-tuong-ttkt',
  CREATE_LICH_SU_TTKT_DONVI: HOST + '/api/tien-hanh-ttkts/create-tien-hanh-ttkt-history',
  DLETE_LICH_SU_TTKT_DONVI: HOST + '/api/tien-hanh-ttkts',
};

export const KE_HOACH_BHXH_TINH = {
  SEARCH_KH: HOST + '/api/kh-du-thaos/tw-xem-live-tinhdukien-of-tinh',
  GET_SO_LAN_DIEU_CHINH_KH: HOST + '/api/kh-du-thaos/get-have-kh-du-thao-old'
};

export const GHI_CHU_OFTWS = HOST + '/api/ghi-chu-of-tws';

export const QL_NHOM_NGUOI_DUNG = {
  GET_DS_NHOM_NGUOI_DUNG: HOST + '/api/authorities/get-by-dmbhxh-id',
  NHOM_NGUOI_DUNG_ALL: HOST + '/api/authorities',
  GET_USER_NOT_BELONG_TO_AUTHORITY: HOST + '/api/authorities/get-name-user-not-belong-to-authority-id',
  GET_USER_OF_AUTHORITY: HOST + '/api/authorities/get-name-user-by-authority-id',
  ADD_USER_FROM_AUTHORITY: HOST + '/api/authorities/add-user-from-authority',
  REMOVE_USER_FROM_AUTHORITY: HOST + '/api/authorities/remove-user-from-authority',
  GET_PERMISSION_TREEVIEW: HOST + '/api/permissions/get-permission-tree-view-of-role',
  UPDATE_PERMISSION_TREEVIEW: HOST + '/api/authority-permissions/update-permission-from-tree-view',
  GET_TIM_KIEM_NHOM_NGUOI_DUNG: HOST + '/api/authorities/search-tennhom',
};

export const QL_SOSACH_TIEP_CD = {
  GET_TONGHOP_SO_THEODOI_TIEPNHAN: HOST + '/api/so-saches/tong-hop-so-theo-doi-tiep-nhan',
  getAll: HOST + '/api/ql-so-sach',
  getAll_BCTH: HOST + '/api/so-theo-doi-tn',
  SO_THEO_DOI_TIEP_CONG_DAN_URL: HOST + '/api/ql-so-sach/filter-data-so-bc-tiep-cd',
  GUI_BAO_CAO_TINH: HOST + '/api/so-theo-doi-tn/tinh-gui-bc-tong-hop',
  PRINT_MAU_29: HOST + '/api/so-saches/so-theo-doi-tong-hop/print',
  PRINT_MAU_29_CACH_2: HOST + '/api/so-saches/so-theo-doi-tong-hop/print-cach-2',
  PRINT_SO_THEO_DOI_TIEP_NHAN: HOST + '/api/so-saches/so-theo-doi-tiep-nhan/print',

  GET_ALL_SO_TD_TIEPCD: HOST + '/api/so-td-tiep-cd',
};


export const QL_BAOCAO_TTKT = {
  GET_DS_SO_THEODOI_CHITIET: HOST + '/api/so-sach-ttkt/so-theo-doi-chi-tiet-cong-tac-ttkt',
  SEARCH_DS_SO_THEODOI_CHITIET: HOST + '/api/so-sach-ttkt/search-so-theo-doi-chi-tiet',
  UPDATE_SO_CHI_TIET_D02: HOST + 'api/so-chi-tiets',
  GET_THONG_TIN_SO_THEODOI_CHITIET: HOST + '/api/so-sach-ttkt/so-chi-tiet-tai-don-vi',
  GET_SO_THEODOI_CHITIET_DONVI: HOST + '/api/so-sach-ttkt/so-theo-doi-ket-qua-thuc-hien-ttkt',
  SAVE_SO_THEODOI_CHITIET_DONVI: HOST + '/api/so-chi-tiets/ttkt/quan-ly-so-sach/luu-so-theo-doi-chi-tiet-02',
  UPDATE_SO_TONGHOP_KQ: HOST + '/api/so-sach-ttkt/update-so-03',
  GET_ALL_BAOCAO_TONGHOP: HOST + '/api/so-sach-ttkt/update-so-01',
  SEARCH_DS_BAO_CAO: HOST + '/api/so-03-s',
  GET_BAO_CAO: HOST + '/api/so-03-s',
  FILTER_DS_BAO_CAO: HOST + '/api/so-sach-ttkt/filter-so-03',
  SO_TH_KQ_TTKT: HOST + '/api/so-th-kq-ttkts',
  SO_TH_KQ_TTKT_SAVE: HOST + '/api/so-bcth',
  SO_TH_KQ_TTKT_LIVE: HOST + '/api/so-th-kq-ttkts/get-data-live',

  // GET_BAO_CAO_TONG_HOP_BY_MONTH: HOST + '/api/so-bcth',
  GET_BAO_CAO_TONG_HOP_BY_YEAR: HOST + '/api/so-bcth',
  CREATE_BAO_CAO_TONG_HOP: HOST + '/api/so-bcth',
  CHUYEN_BAO_CAO_TONG_HOP: HOST + '/api/so-bcth/chuyen-bc',
  BC_KET_QUA_TOAN_NGANH_ROOT: HOST + '/api/bc-th-toan-nganh',
  XEM_LICH_SU_SO_02: HOST + '/api/so-chi-tiets/get-data-so02-by-month',

    PRINT_MAU_01: HOST + '/api/so-sach-ttkt/so-bao-cao-tong-hop/print',
    PRINT_MAU_02: HOST + '/api/so-sach-ttkt/so-theo-doi-chi-tiet/print',
    PRINT_MAU_02_CACH_2: HOST + '/api/so-sach-ttkt/so-theo-doi-chi-tiet/print-cach-2',
    PRINT_MAU_03: HOST + '/api/so-sach-ttkt/so-tong-hop-ket-qua/print',
    PRINT_MAU_03_DOT_XUAT: HOST + '/api/so-sach-ttkt/so-tong-hop-ket-qua/print-dot-xuat',

    PRINT_SO_BAO_CAO_TONG_HOP_TOAN_NGANH: HOST + '/api/so-bcth/print',
};

export const CAU_HINH_NGAY_NGHI = {
  GET_ALL_NGAY_NGHI: HOST + '/api/cau-hinh-nn',
  CREATE_NGAY_NGHI: HOST + '/api/cau-hinh-nn',
  UPDATE_NGAY_NGHI: HOST + '/api/cau-hinh-nn',
  DELETE_NGAY_NGHI: HOST + '/api/cau-hinh-nn',
};

export const CAU_HINH_THAM_SO_HT = {
  GET_ALL_THAM_SO_HT: HOST + '/api/cau-hinh-tham-so-hts',
};

export const CAU_HINH_THOI_HAN = {
  GET_ALL_CAU_HINH_THOI_HAN: HOST + '/api/cau-hinh-thoi-hans',
};

