export const PHANLOAI = [
  { id: 1, name: 'Khiếu nại' },
  { id: 2, name: 'Tố cáo' },
  { id: 3, name: 'Kiến nghị phản ánh' }
];

export const CUMOI = [
  { id: false, name: 'Cũ' },
  { id: true, name: 'Mới' }
];

export const DIEUKIENXULY = [
  { id: true, name: 'Đủ điều kiện' },
  { id: false, name: 'Không đủ điều kiện' }
];

export const TINHTRANG = [
  { id: 1, name: 'Bản gốc' },
  { id: 2, name: 'Bản photo có công chứng' },
  { id: 3, name: 'Photo không công chứng' }
];

export const DIEUKIENUQ = {
  co: 1,
  khong: 2
};

export const TIME_OPTIONS = {
  quy: 1,
  thang: 2,
  luyKe: 3
};

export const QUYENHAN = [
  { id: 1, name: 'Được ủy quyền' },
  { id: 2, name: 'Ủy quyền' }
];

export const DONTHU_STATUS = [
  {
    id: 1,
    name: 'Đang xử lí',
    nameStt: 'DON_THU_STATUS_DANG_XU_LY'
  },
  {
    id: 0,
    name: 'Chưa xử lí',
    nameStt: 'DON_THU_STATUS_CHUA_XU_LY'
  },
  {
    id: 2,
    name: 'Đã xử lí',
    nameStt: 'DON_THU_STATUS_DA_XU_LY'
  },
  {
    id: 3,
    name: 'Đã thụ lý chưa có quyết định',
    nameStt: 'DON_THU_STATUS_DA_THU_LY_CHUA_CO_QD'
  },
  {
    id: 4,
    name: 'Đã thụ lý đã có quyết định',
    nameStt: 'DON_THU_STATUS_DA_THU_LY_DA_CO_QD'
  },
  {
    id: 5,
    name: 'Đã có bản án của Tòa án hoặc kết quả xử lý sau TC',
    nameStt: 'DON_THU_STATUS_CO_KQ_TOA_AN'
  }
];

