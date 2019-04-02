export const CAP_QUAN_LY = [
  {
    id: 0,
    name: 'Trung ương'
  },
  {
    id: 1,
    name: 'Cấp tỉnh'
  },
  {
    id: 2,
    name: 'Cấp huyện'
  }
];

// Fake data
export const DATA = [
  {
    id: 1, name: '00-giangnx_cs - Ngô Xuân Giang'
  },
  {
    id: 2, name: '00-hoangnh - Nguyễn Huy Hoàng'
  },
  {
    id: 3, name: '00-hoanlq - Lương Quốc Hoàn'
  },
  {
    id: 4, name: '00-huongptt - Phạm Thị Thu Hương'
  },
  {
    id: 5, name: '00-khovp - Trần Thị Thu Hiền'
  },
  {
    id: 6, name: '00-ndcuong - Nguyễn Đức Cường'
  },
  {
    id: 7, name: '00-qls - Quản lý sổ'
  },
  {
    id: 8, name: '00-giangnx_cs - Ngô Xuân Giang'
  },
  {
    id: 9, name: '00-hoangnh - Nguyễn Huy Hoàng'
  },
  {
    id: 10, name: '00-hoanlq - Lương Quốc Hoàn'
  },
  {
    id: 11, name: '00-huongptt - Phạm Thị Thu Hương'
  },
  {
    id: 12, name: '00-khovp - Trần Thị Thu Hiền'
  },
  {
    id: 13, name: '00-ndcuong - Nguyễn Đức Cường'
  },
  {
    id: 14, name: '00-qls - Quản lý sổ'
  },
  {
    id: 15, name: '00-hoangnh - Nguyễn Huy Hoàng'
  },
  {
    id: 16, name: '00-hoanlq - Lương Quốc Hoàn'
  },
  {
    id: 17, name: '00-huongptt - Phạm Thị Thu Hương'
  },
  {
    id: 18, name: '00-khovp - Trần Thị Thu Hiền'
  },
  {
    id: 19, name: '00-ndcuong - Nguyễn Đức Cường'
  },
  {
    id: 20, name: '00-qls - Quản lý sổ'
  }
];

export const NHOM_USER_LIST = [
  {
    id: 1,
    name: 'ROLE_CHINHSACH_VPHANOI',
    title: 'Chinh sách chốt BLTN',
    description: 'Nhóm chính sách chốt sổ bảo lưu TN',
    capQuanLy: 0
  },
  {
    id: 2,
    name: 'ROLE_NSD_SOTHE_VPHANOI',
    title: 'Duyệt sổ thẻ VP HN',
    description: 'Nhóm duyệt sổ thẻ VP HN',
    capQuanLy: 0
  },
  {
    id: 3,
    name: 'ROLE_NSD_THU_VPHANOI',
    title: 'Nhóm TBB HN',
    description: '	Nhóm TBB VP thành phố Hà Nội',
    capQuanLy: 0
  },
  {
    id: 4,
    name: 'ROLE_NSD_THU_TN_VPHANOI',
    title: 'Nhóm TTN HN',
    description: 'Nhóm TTN VP thành phố Hà Nội',
    capQuanLy: 0
  },
  {
    id: 5,
    name: 'ROLE_QLT_THU_VPHANOI',
    title: 'QL thu HN',
    description: 'QL thu VP thành phố Hà Nội',
    capQuanLy: 0
  },
  {
    id: 6,
    name: 'ROLE_XEMBAOCAO_VPHANOI',
    title: 'Nhóm xem báo cáo HN',
    description: 'Nhóm xem báo cáo VP thành phố Hà Nội',
    capQuanLy: 1
  },
  {
    id: 7,
    name: 'ROLE_QLS_THU_ST_VPHANOI',
    title: 'Nhóm thu sổ thẻ HN',
    description: 'Nhóm thu sổ thẻ VP thành phố Hà Nội',
    capQuanLy: 1
  },
  {
    id: 8,
    name: 'ROLE_CHINHSACH',
    title: 'Chinh sách chốt BLTN',
    description: 'Nhóm chính sách chốt sổ bảo lưu TN',
    capQuanLy: 1
  },
  {
    id: 9,
    name: 'ROLE_NSD_INSO_VPHANOI',
    title: 'Nhóm in sổ VP HN',
    description: 'Nhóm in sổ VP Hà Nội',
    capQuanLy: 1
  },
  {
    id: 10,
    name: 'ROLE_NSD_SOTHE_VPHANOI',
    title: 'Duyệt sổ thẻ VP HN',
    description: 'Nhóm duyệt sổ thẻ VP HN',
    capQuanLy: 1
  },
  {
    id: 11,
    name: 'ROLE_QT_VPHANOI',
    title: 'Nhóm quản trị	',
    description: 'Nhóm quản trị	',
    capQuanLy: 1
  }
];

export const TREEVIEW_LIST_TEST_DATA = [
  {
    text: 'Quản trị hệ thống', value: 1, checked: false, id: 99999,
    children: [
      { text: 'Danh mục chức năng', value: 11, checked: false },
      { text: 'Cấu hình tham số hệ thống', value: 12, checked: false },
      { text: 'Danh sách người sử dụng', value: 13, checked: true },
      { text: 'Phân nhóm người sử dụng', value: 14 },
      { text: 'Nhóm người sử dụng', value: 15 }
    ]
  },
  {
    text: 'Danh mục chức năng', value: 2,
    children: [
      { text: 'Xem', value: 22 },
      { text: 'Thêm', value: 21 },
      { text: 'Sửa', value: 23 },
      { text: 'Xóa', value: 24 }
    ]
  },
  {
    text: 'TTKT', value: 3,
    children: [
      {
        text: 'Kế hoạch TTKT', value: 31,
        children: [
          {
            text: 'Xây dựng kế hoạch', value: 311,
            children: [
              { text: 'Xem', value: 3111 },
              { text: 'Thêm', value: 3112 },
              { text: 'Sửa', value: 3113 },
              { text: 'Xóa', value: 3114 },
              { text: 'Duyệt', value: 3115 },
              { text: 'Gửi', value: 3116 }
            ]
          },
          {
            text: 'Kế hoạch BHXH VN', value: 312,
            children: [
              {
                text: 'Kế hoạch BHXH VN TW giao', value: 3121,
                children: [
                  { text: 'Xem', value: 31211 },
                  { text: 'Thêm', value: 31212 },
                  { text: 'Sửa', value: 31213 },
                  { text: 'Xóa', value: 31214 },
                  { text: 'Gửi', value: 31215 }
                ]
              },
              {
                text: 'Kế hoạch BHXH VN TW từ chối điều chỉnh', value: 3122,
                children: [
                  { text: 'Xem', value: 31221 },
                  { text: 'Sửa', value: 31222 },
                  { text: 'Gửi', value: 31223 }
                ]
              }
            ]
          },
          {
            text: 'Kế hoạch BHXH Tỉnh/TP', value: 313,
            children: [
              { text: 'Thêm', value: 3131 },
              { text: 'Xem', value: 3132 },
              { text: 'Sửa', value: 3133 }
            ]
          },
        ]
      },
      {
        text: 'Quản lý đoàn TTKT', value: 32,
        children: [
          {
            text: 'Quyết định TTKT BHXH', value: 321,
            children: [
              { text: 'Xem', value: 3211 }
            ]
          },
          {
            text: 'Thành lập đoàn TTKT', value: 322,
            children: [
              { text: 'Thêm', value: 3221 },
              { text: 'Sửa', value: 3222 },
              { text: 'Duyệt', value: 3223 }
            ]
          },
          {
            text: 'Tiến hành TTKT', value: 323,
            children: [
              {
                text: 'Quyết định công bố', value: 3231,
                children: [
                  { text: 'Xem', value: 32311 },
                  { text: 'Thêm', value: 32312 },
                  { text: 'Sửa', value: 32313 },
                  { text: 'Duyệt', value: 32313 }
                ]
              },
              {
                text: 'Báo cáo kết quả đoàn TKTT', value: 3232,
                children: [
                  { text: 'Xem', value: 32321 },
                  { text: 'Thêm', value: 32322 },
                  { text: 'Sửa', value: 32323 },
                  { text: 'Duyệt', value: 32323 }
                ]
              },
              {
                text: 'Kết luận kết quả đoàn TKTT', value: 3233,
                children: [
                  { text: 'Xem', value: 32331 },
                  { text: 'Thêm', value: 32332 },
                  { text: 'Sửa', value: 32333 },
                  { text: 'Duyệt', value: 32333 }
                ]
              }
            ]
          }
        ]
      },
      {
        text: 'Quản lý đơn vị được TTKT', value: 33,
        children: [
          { text: 'Xem', value: 331 }
        ]
      },
      {
        text: 'Theo dõi, đôn đốc thực hiện KL', value: 34,
        children: [
          { text: 'Xem', value: 341 },
          { text: 'Sửa', value: 342 }
        ]
      },
      {
        text: 'Quản lý sổ sách, báo cáo tổng hợp', value: 35,
        children: [
          {
            text: 'Sổ theo dõi chi tiết', value: 351,
            children: [
              { text: 'Xem', value: 3511 }
            ]
          },
          {
            text: 'Sổ tổng hợp kết quả', value: 352,
            children: [
              { text: 'Xem', value: 3521 },
              { text: 'Thêm', value: 3522 },
              { text: 'Sửa', value: 3523 },
              { text: 'Duyệt', value: 3524 }
            ]
          },
          {
            text: 'Báo cáo tổng hợp', value: 353,
            children: [
              {
                text: 'Báo cáo tổng hợp kết quả', value: 3531,
                children: [
                  { text: 'Xem', value: 35311 },
                  { text: 'Thêm', value: 35312 },
                  { text: 'Sửa', value: 35313 },
                  { text: 'Duyệt', value: 35314 },
                  { text: 'Gửi', value: 35315 },
                ]
              },
              {
                text: 'Báo cáo lĩnh vực TTKT', value: 3532,
                children: [
                  { text: 'Xem', value: 35321 },
                  { text: 'Thêm', value: 35322 },
                  { text: 'Sửa', value: 35323 },
                  { text: 'Duyệt', value: 35324 },
                ]
              }
            ]
          }
        ]
      },
    ]
  },
  {
    text: 'Tiếp CD, GQKT', value: 4,
    children: [
      {
        text: 'Lịch tiếp CD', value: 41,
        children: [
          { text: 'Xem', value: 411 },
          { text: 'Thêm', value: 412 },
          { text: 'Sửa', value: 413 },
          { text: 'Xóa', value: 413 }
        ]
      },
      {
        text: 'Tiếp CD', value: 42, disabled: true,
        children: [
          { text: 'Tổ chức tiếp dân', value: 421 },
          { text: 'Tiến hành tiếp dân', value: 422 },
          { text: 'Từ chối tiếp dân', value: 423 }
        ]
      },
      { text: 'Lịch sử tiếp CD', value: 43, disabled: true },
      { text: 'Tra cứu lịch sử công dân', value: 44, disabled: true },
      { text: 'Giải quyết đơn thư KN, TC, KNPA', value: 45, disabled: true },
      { text: 'Danh sách đơn thư', value: 46, disabled: true },
      {
        text: 'Quản lý sổ sách, BC tổng hợp ', value: 47,
        children: [
          {
            text: 'Sổ theo dõi tiếp nhận, giải quyết đơn thư', value: 471,
            children: [
              { text: 'Xem', value: 4711 },
              { text: 'Thêm', value: 4712 },
              { text: 'Sửa', value: 4713 },
              { text: 'Duyệt', value: 4714 }
            ]
          },
          {
            text: 'Báo cáo kết quả toàn ngành', value: 472,
            children: [
              { text: 'Xem', value: 4721 },
              { text: 'Thêm', value: 4722 },
              { text: 'Sửa', value: 4723 },
              { text: 'Duyệt', value: 4724 },
              { text: 'Gửi', value: 4725 }
            ]
          },
        ]
      }
    ]
  }
];
