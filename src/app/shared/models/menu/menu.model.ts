import { Menu } from "./menu.interface";


export class MenuModel {
}

export const SIDE_MENU: Menu = {
  items: [
    {
      path: 'ql-hethong-ttkt',
      name: 'Hệ thống',
      activeSlug: '/ql-hethong-ttkt/',
      class: '',
      children: [
        // Side-menu Quản lý vai trò
        {
          path: '/ql-hethong-ttkt/quanly-nhomnguoidung',
          name: 'Quản lý nhóm người dùng',
          url: '/ql-hethong-ttkt/quanly-nhomnguoidung',
          urlImage: 'assets/images/icon_quan_ly_nguoi_dung.svg',
          class: 'tinh',
        },
        {
          path: '/ql-hethong-ttkt/quanly-nhomnguoidung',
          name: 'Quản lý nhóm người dùng',
          url: '/ql-hethong-ttkt/quanly-nhomnguoidung',
          urlImage: 'assets/images/icon_quan_ly_nguoi_dung.svg',
          class: 'tw',
        },
        // Side-menu Quản lý người dùng
        {
          path: '/ql-hethong-ttkt/quanly-nguoidung',
          name: 'Quản lý người dùng',
          url: '/ql-hethong-ttkt/quanly-nguoidung',
          urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
          class: 'tinh',
        },
        {
          path: '/ql-hethong-ttkt/quanly-nguoidung',
          name: 'Quản lý người dùng',
          url: '/ql-hethong-ttkt/quanly-nguoidung',
          urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
          class: 'tw',
        },
        // Side-menu Phân loại đối tượng TTKT
        {
          path: '/ql-hethong-ttkt/phanloai-doituong-ttkt',
          name: 'Phân loại đối tượng TTKT',
          url: '/ql-hethong-ttkt/phanloai-doituong-ttkt',
          urlImage: 'assets/images/danh_muc_co_quan_bao_hiem.svg',
          class: 'tinh',
        },
        {
          path: '/ql-hethong-ttkt/phanloai-doituong-ttkt',
          name: 'Phân loại đối tượng TTKT',
          url: '/ql-hethong-ttkt/phanloai-doituong-ttkt',
          urlImage: 'assets/images/danh_muc_co_quan_bao_hiem.svg',
          class: 'tw',
        },
        // Side-menu Danh mục hệ thống
        {
          path: '/ql-hethong-ttkt/danhmuc-hethong/tinh',
          name: 'Danh mục hệ thống (DM)',
          urlImage: 'assets/images/icon_thong_ke_danh_sach_dn.svg',
          class: 'tinh',
          children: [
            {
              name: 'DM cơ quan BHXH',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-co-quan-bhxh',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            // {
            //   name: 'DM tỉnh/huyện',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-tinh-huyen',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tinh'
            // },
            {
              name: 'DM tình trạng tài liệu',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-tinh-trang-tai-lieu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            // {
            //   name: 'DM phân loại nội dung',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-phan-loai-noi-dung',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tinh'
            // },
            {
              name: 'DM phân loại tiêu thức',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-phan-loai-tieu-thuc',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM từ chối Tiếp CD',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-tu-choi-tiep-cong-dan',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM lý do không thụ lý tố cáo',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-ly-do-khong-thu-ly-tc',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM đơn vị chủ trì phối hợp',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-chu-tri-phoi-hop',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM chức danh',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-chuc-danh',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM nội dung TTKT',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-noi-dung-ttkt',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            // {
            //   name: 'DM phân loại đối tượng',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-phan-loai-dt',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tinh'
            // },
            // {
            //   name: 'DM chi tiết nội dung',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-chi-tiet-noi-dung',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tinh'
            // },
            {
              name: 'DM căn cứ',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-can-cu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM đơn vị nghiệp vụ',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danh-muc-don-vi-nghiep-vu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM Hành Vi',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danhmuc-hanhvi',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            },
            {
              name: 'DM VB căn cứ xử phạt',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tinh/danhmuc-vb-cancu-xuphat',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tinh'
            }
          ]
        },
        {
          path: '/ql-hethong-ttkt/danhmuc-hethong/tw',
          name: 'Danh mục hệ thống (DM)',
          urlImage: 'assets/images/icon_thong_ke_danh_sach_dn.svg',
          class: 'tw',
          children: [
            {
              name: 'DM cơ quan BHXH',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-co-quan-bhxh',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            // {
            //   name: 'DM tỉnh/huyện',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-tinh-huyen',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tw'
            // },
            {
              name: 'DM tình trạng tài liệu',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-tinh-trang-tai-lieu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM đơn vị',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-phong-ban',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            // {
            //   name: 'DM phân loại nội dung',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-phan-loai-noi-dung',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tw'
            // },
            {
              name: 'DM phân loại tiêu thức',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-phan-loai-tieu-thuc',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            // {
            //   name: 'DM mẫu đơn',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-mau-don',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tw'
            // },
            {
              name: 'DM từ chối Tiếp CD',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-tu-choi-tiep-cong-dan',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM lý do không thụ lý tố cáo',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-ly-do-khong-thu-ly-tc',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM đơn vị chủ trì phối hợp',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-chu-tri-phoi-hop',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM chức danh',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-chuc-danh',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM nội dung TTKT',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-noi-dung-ttkt',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            // {
            //   name: 'DM phân loại đối tượng',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-phan-loai-dt',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tw'
            // },
            // {
            //   name: 'DM chi tiết nội dung',
            //   url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-chi-tiet-noi-dung',
            //   urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
            //   class: 'tw'
            // },
            {
              name: 'DM căn cứ',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-can-cu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM đơn vị nghiệp vụ',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danh-muc-don-vi-nghiep-vu',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM Hành Vi',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danhmuc-hanhvi',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            },
            {
              name: 'DM VB căn cứ xử phạt',
              url: '/ql-hethong-ttkt/danhmuc-hethong/tw/danhmuc-vb-cancu-xuphat',
              urlImageli: 'assets/images/danh_muc_quy_trinh.svg',
              class: 'tw'
            }
          ]
        },
        // Side-menu Cấu hình hệ thống
        {
          path: '/ql-hethong-ttkt/cauhinh-hethong/tinh',
          name: 'Cấu hình hệ thống',
          urlImage: 'assets/images/icon_cau_hinh_chung_he_thong.svg',
          class: 'tinh',
          children: [
            {
              name: 'Cấu hình tham số hệ thống',
              url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-thamso-hethong',
              urlImageli: 'assets/images/icon_cau_hinh_ma_so_thue_dac_biet.svg',
              class: 'tinh'
            },
            {
              name: 'Cấu hình thời hạn',
              url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-thoihan',
              urlImageli: 'assets/images/icon_cau_hinh_ma_so_thue_dac_biet.svg',
              class: 'tinh'
            },
            // {
            //   name: 'Cấu hình cơ cấu tổ chức',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-cocau-tochuc',
            //   urlImageli: 'assets/images/icon_cau_hinh_phong_ban.svg',
            //   class: 'tinh'
            // },
            // {
            //   name: 'Cấu hình quý',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-quy',
            //   urlImageli: 'assets/images/icon_cau_hinh_ngay_lam_viec.svg',
            //   class: 'tinh'
            // },
            // {
            //   name: 'Cấu hình ngày nghỉ',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-ngaynghi',
            //   urlImageli: 'assets/images/icon_cau_hinh_ngay_lam_viec.svg',
            //   class: 'tinh'
            // },
            // {
            //   name: 'Cấu hình ca làm việc',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tinh/cauhinh-calamviec',
            //   urlImageli: 'assets/images/icon_cau_hinh_ca_lam_viec.svg',
            //   class: 'tinh'
            // },
          ]
        },
        {
          name: 'Thông báo',
          url: '/ql-hethong-ttkt/view-all-notification',
          class: 'tinh'
        },
        {
          path: '/ql-hethong-ttkt/cauhinh-hethong/tw',
          name: 'Cấu hình hệ thống',
          urlImage: 'assets/images/icon_cau_hinh_chung_he_thong.svg',
          class: 'tw',
          children: [
            {
              name: 'Cấu hình tham số hệ thống',
              url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-thamso-hethong',
              urlImageli: 'assets/images/icon_cau_hinh_ma_so_thue_dac_biet.svg',
              class: 'tw'
            },
            {
              name: 'Cấu hình thời hạn',
              url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-thoihan',
              urlImageli: 'assets/images/icon_cau_hinh_ma_so_thue_dac_biet.svg',
              class: 'tw'
            },
            // {
            //   name: 'Cấu hình cơ cấu tổ chức',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-cocau-tochuc',
            //   urlImageli: 'assets/images/icon_cau_hinh_phong_ban.svg',
            //   class: 'tw'
            // },
            // {
            //   name: 'Cấu hình quý',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-quy',
            //   urlImageli: 'assets/images/icon_cau_hinh_ngay_lam_viec.svg',
            //   class: 'tw'
            // },
            // {
            //   name: 'Cấu hình ngày nghỉ',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-ngaynghi',
            //   urlImageli: 'assets/images/icon_cau_hinh_ngay_lam_viec.svg',
            //   class: 'tw'
            // },
            // {
            //   name: 'Cấu hình ca làm việc',
            //   url: '/ql-hethong-ttkt/cauhinh-hethong/tw/cauhinh-calamviec',
            //   urlImageli: 'assets/images/icon_cau_hinh_ca_lam_viec.svg',
            //   class: 'tw'
            // },
          ]
        },
        {
          name: 'Thông báo',
          url: '/ql-hethong-ttkt/view-all-notification',
          class: 'tw'
        }
      ]
    },
    {
      path: 'ql-hd-ttkt',
      name: 'TTKT',
      activeSlug: '/ql-hd-ttkt/',
      class: '',
      children: [
        // Side-menu Kế hoạch TTKT
        {
          path: '/ql-hd-ttkt/kh-ttkt/tinh',
          name: 'Kế hoạch TTKT',
          urlImage: 'assets/images/icon_thong_ke_danh_sach_dn.svg',
          class: 'tinh',
          children: [
            {
              name: 'Xây dựng kế hoạch năm',
              url: '/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tinh'
            },
            {
              name: 'Kế hoạch BHXH VN',
              url: '/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-vn',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tinh'
            },
            {
              name: 'Kế hoạch BHXH Tỉnh/TP',
              url: '/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tinh'
            }
          ]
        },
        {
          path: '/ql-hd-ttkt/kh-ttkt/trung-uong',
          name: 'Kế hoạch TTKT',
          urlImage: 'assets/images/icon_thong_ke_danh_sach_dn.svg',
          class: 'tw',
          children: [
            {
              name: 'Kế hoạch dự kiến',
              url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tw',
              children: [
                {
                  name: 'Kế hoạch chờ duyệt',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-cho-duyet',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
                {
                  name: 'Kế hoạch đã duyệt',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ds-ke-hoach-da-duyet',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
                {
                  name: 'Kế hoạch dự thảo BHXH VN',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
              ]
            },
            {
              name: 'Kế hoạch BHXH VN giao',
              url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tw',
              children: [
                {
                  name: 'Tiến hành giao KH',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/giao-ke-hoach-cho-cac-tinh',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
                {
                  name: 'Kế hoạch đã giao',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/ke-hoach-da-giao-cho-tinh',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
                {
                  name: 'Xin điều chỉnh chờ duyệt',
                  url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/ds-tinh-dieuchinh',
                  urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                  class: 'tw'
                },
                // {
                //   name: 'Điều chỉnh được duyệt',
                //   url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-xin-dieu-chinh-duoc-chap-nhan',
                //   urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
                //   class: 'tw'
                // }
              ]
            },
            {
              name: 'Kế hoạch BHXH VN',
              url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tw'
            },
            {
              name: 'Kế hoạch BHXH Tỉnh/TP',
              url: '/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-tinh',
              urlImageli: 'assets/images/icon_ho_so_dang_thu_ly.svg',
              class: 'tw'
            },
          ]
        },
        // Side-menu Quản lý đoàn TTKT
        {
          path: '/ql-hd-ttkt/ql-doan-ttkt/tinh',
          name: 'Quản lý đoàn TTKT',
          urlImage: 'assets/images/icon_ho_so_da_tra.svg',
          class: 'tinh',
          children: [
            {
              name: 'Quyết định TTKT BHXHVN',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/qd-ttkt-bhxh-vn',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tinh'
            },
            {
              name: 'Thành lập đoàn TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tinh'
            },
            {
              name: 'Tiến hành TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/tienhanh-ttkt',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tinh'
            },
            {
              name: 'Kết thúc TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tinh',
              children: [
                {
                  name: 'Báo cáo đoàn TTKT',
                  url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh/bao-cao-ttkt-tinh',
                  urlImageli: '',
                  class: 'tinh'
                },
                {
                  name: 'Kết luận đoàn TTKT',
                  url: '/ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh/ket-luan-ttkt-tinh',
                  urlImageli: '',
                  class: 'tinh'
                }

              ]
            }
          ]
        },
        {
          path: '/ql-hd-ttkt/ql-doan-ttkt/tw',
          name: 'Quản lý đoàn TTKT',
          urlImage: 'assets/images/icon_ho_so_da_tra.svg',
          class: 'tw',
          children: [
            {
              name: 'Thành lập đoàn TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tw'
            },
            {
              name: 'Tiến hành TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tw'
            },
            {
              name: 'Kết thúc TTKT',
              url: '/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw',
              urlImageli: 'assets/images/icon_ho_so_da_tra.svg',
              class: 'tw',
              children: [
                {
                  name: 'Báo cáo đoàn TTKT',
                  url: '/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/bao-cao-ttkt-tw',
                  urlImageli: '',
                  class: 'tw'
                },
                {
                  name: 'Kết luận đoàn TTKT',
                  url: '/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/ket-luan-ttkt-tw',
                  urlImageli: '',
                  class: 'tw'
                },
                // {
                //   name: 'Giải trình/Chấp hành',
                //   url: '/ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/giai-trinh-chap-hanh-ttkt-tw',
                //   urlImageli: '',
                //   class: 'tw'
                // }
              ]

            },
          ]
        },
        // Side-menu Quản lý đơn vị được TTK
        {
          path: '/ql-hd-ttkt/ql-donvi-ttkt/tinh',
          name: 'Quản lý đơn vị được TTKT',
          url: '/ql-hd-ttkt/ql-donvi-ttkt/tinh/ds-donvi',
          urlImage: 'assets/images/icon_ho_so_da_duyet.svg',
          class: 'tinh',
        },
        {
          path: '/ql-hd-ttkt/ql-donvi-ttkt/tw',
          name: 'Quản lý tỉnh được TTKT',
          url: '/ql-hd-ttkt/ql-donvi-ttkt/tw/ds-tinh',
          urlImage: 'assets/images/icon_thong_ke_danh_sach_dn.svg',
          class: 'tw',
        },
        // Side-menu Theo dõi đôn đốc
        {
          path: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tinh',
          name: 'Theo dõi đôn đốc',
          url: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tinh/danhsach-sotheodoi-ttkt',
          urlImage: 'assets/images/icon_ho_so_dang_thu_ly.svg',
          class: 'tinh',
        },
        {
          path: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw',
          name: 'Theo dõi đôn đốc',
          url: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw/ds-sotheodoi-kl',
          urlImage: 'assets/images/icon_ho_so_dang_thu_ly.svg',
          class: 'tw',
          // children: [
          //   {
          //     name: 'Theo dõi, đôn đốc kết luận',
          //     url: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw/ds-sotheodoi-kl',
          //     urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
          //     class: 'tw'
          //   },
          //   {
          //     name: 'Sổ theo dõi, đôn đốc Tỉnh/TP',
          //     url: '/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw/ds-sotheodoi-tinh',
          //     urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
          //     class: 'tw'
          //   },
          // ]
        },
        // Side-menu Quản lý sổ sách và báo cáo
        {
          path: '/ql-hd-ttkt/ql-baocao-ttkt/tinh',
          name: 'Quản lý sổ sách và báo cáo',
          urlImage: 'assets/images/icon_bao_cao_tong_hop_theo_thu_tuc.svg',
          class: 'tinh',
          children: [
            {
              name: 'Sổ theo dõi chi tiết',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tinh/so-theodoi-chitiet',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tinh'
            },
            {
              name: 'Sổ tổng hợp kết quả',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tinh/so-tonghop-kq',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tinh'
            },
            {
              name: 'Báo cáo tổng hợp',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tinh'
            },
          ]
        },
        {
          path: '/ql-hd-ttkt/ql-baocao-ttkt/tw',
          name: 'Quản lý sổ sách và báo cáo',
          urlImage: 'assets/images/icon_bao_cao_tong_hop_theo_thu_tuc.svg',
          class: 'tw',
          children: [
            {
              name: 'Sổ theo dõi chi tiết',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tw/so-theo-doi-chi-tiet',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
            {
              name: 'Sổ tổng hợp kết quả',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tw/so-tong-hop-kq',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
            {
              name: 'Báo cáo tổng hợp',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tong-hop',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
            {
              name: 'Báo cáo kết quả toàn ngành',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-kq-nganh',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
            {
              name: 'Báo cáo tổng hợp toàn ngành',
              url: '/ql-hd-ttkt/ql-baocao-ttkt/tw/bao-cao-tonghop-nganh',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
          ]
        },
      ]
    },
    // Side-menu Tiếp CD,GQKT
    {
      path: 'ql-tiep-cd',
      name: 'Tiếp CD,GQKT',
      url: '/ql-tiep-cd',
      activeSlug: '/ql-tiep-cd',
      class: '',
      children: [
        {
          name: 'Tiếp công dân',
          path: '/ql-tiep-cd',
          urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
          class: 'tinh',
          children: [
            {
              name: 'Lịch tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/lich-tiep-cong-dan',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tinh',
            },
            {
              name: 'Tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/tiep-cong-dan',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tinh',
            },
            {
              name: 'Lịch sử tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/ls-tiep-cd',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tinh',
            },
            {
              name: 'Đơn thư tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/dt-tiep-cd',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tinh',
            }
          ]
        },
        // {
        //   name: 'Tra cứu lịch sử công dân',
        //   url: '/ql-tiep-cd/tra-cuu-lich-su-cong-dan',
        //   urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
        //   class: 'tinh',
        // },
        // giai quyet khieu to tinh
        {
          name: 'Giải Quyết khiếu tố',
          path: '/ql-tiep-cd/gq-kt',
          urlImage: 'assets/images/icon_ho_so_trinh_ky.svg',
          class: 'tinh',
          children: [
            {
              name: 'Giải quyết đơn thư,KN,TC,KNPA',
              url: '/ql-tiep-cd/gq-kt/giai-quyet-don-thu',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tinh'
            },
            {
              name: 'Danh sách đơn thư',
              url: '/ql-tiep-cd/gq-kt/danh-sach-don-thu',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tinh'
            },
            {
              name: 'Tra cứu lịch sử công dân',
              url: '/ql-tiep-cd/gq-kt/tra-cuu-lich-su-cong-dan',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tinh',
            },
          ]
        },
        // {
        //   name: 'Giải quyết đơn thư,KN,TC,KNPA',
        //   url: '/ql-tiep-cd/giai-quyet-don-thu',
        //   urlImage: 'assets/images/icon_ho_so_trinh_ky.svg',
        //   class: 'tinh'
        // },
        // {
        //   name: 'Danh sách đơn thư',
        //   url: '/ql-tiep-cd/giai-quyet-don-thu/danh-sach-don-thu',
        //   urlImage: 'assets/images/icon_ho_so_cho_thu_ly.svg',
        //   class: 'tinh'
        // },
        {
          path: '/ql-tiep-cd/ql-sosach-bc-tinh',
          url: '/ql-tiep-cd/ql-sosach-bc-tinh',
          name: 'Quản lý sổ sách và báo cáo ',
          urlImage: 'assets/images/icon_bao_cao_tong_hop_theo_thu_tuc.svg',
          class: 'tinh',
          children: [
            {
              name: 'Sổ theo dõi tiếp nhận',
              url: '/ql-tiep-cd/ql-sosach-bc-tinh',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tinh',
              children: [
                {
                  name: 'Sổ theo dõi tiếp nhận GQKT',
                  url: '/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiepnhan',
                  class: 'tinh'
                },
                {
                  name: 'Sổ theo dõi tiếp nhận TCD',
                  url: '/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiep-cd',
                  class: 'tinh'
                }
              ]
            },
            {
              name: 'Báo cáo tổng hợp',
              url: '/ql-tiep-cd/ql-sosach-bc-tinh/so-tonghop-kq',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tinh'
            },
            // {
            //   name: 'Sổ theo dõi tiếp công dân',
            //   url: '/ql-tiep-cd/ql-sosach-bc-tinh/so-theodoi-tiep-cd',
            //   urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
            //   class: 'tinh'
            // },
          ]
        },
        // {
        //   name: 'Lịch tiếp công dân',
        //   url: '/ql-tiep-cd/lich-tiep-cong-dan',
        //   urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
        //   class: 'tw',
        // },
        // tiếp công dân tw
        {
          name: 'Tiếp công dân',
          path: '/ql-tiep-cd',
          urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
          class: 'tw',
          children: [
            {
              name: 'Lịch tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/lich-tiep-cong-dan',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tw',
            },
            {
              name: 'Tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/tiep-cong-dan',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tw',
            },
            {
              name: 'Lịch sử tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/ls-tiep-cd',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tw',
            },
            {
              name: 'Đơn thư tiếp công dân',
              url: '/ql-tiep-cd/tiep-cd/dt-tiep-cd',
              urlImageli: 'assets/images/icon_danh_sach_nguoi_dung.svg',
              class: 'tw',
            }

          ]
        },
        // {
        //   name: 'Lịch sử tiếp công dân',
        //   url: '/ql-tiep-cd/ls-tiep-cd',
        //   urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
        //   class: 'tw',
        // },
        // giai quyet khieu to tw
        {
          name: 'Giải Quyết Khiếu Tố',
          path: '/ql-tiep-cd/gq-kt',
          urlImage: 'assets/images/icon_ho_so_trinh_ky.svg',
          class: 'tw',
          children: [
            {
              name: 'Giải quyết đơn thư,KN,TC,KNPA',
              url: '/ql-tiep-cd/gq-kt/giai-quyet-don-thu',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tw'
            },
            {
              name: 'Danh sách đơn thư',
              url: '/ql-tiep-cd/gq-kt/danh-sach-don-thu',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tw'
            },
            {
              name: 'Tra cứu lịch sử công dân',
              url: '/ql-tiep-cd/gq-kt/tra-cuu-lich-su-cong-dan',
              urlImageli: 'assets/images/icon_ho_so_trinh_ky.svg',
              class: 'tw',
            },
          ]
        },
        // {
        //   name: 'Tra cứu lịch sử công dân',
        //   url: '/ql-tiep-cd/tra-cuu-lich-su-cong-dan',
        //   urlImage: 'assets/images/icon_danh_sach_nguoi_dung.svg',
        //   class: 'tw',
        // },
        // {
        //   name: 'Giải quyết đơn thư,KN,TC,KNPA',
        //   url: '/ql-tiep-cd/giai-quyet-don-thu',
        //   urlImage: 'assets/images/icon_ho_so_trinh_ky.svg',
        //   class: 'tw'
        // },
        // {
        //   name: 'Danh sách đơn thư',
        //   url: '/ql-tiep-cd/giai-quyet-don-thu/danh-sach-don-thu',
        //   urlImage: 'assets/images/icon_ho_so_cho_thu_ly.svg',
        //   class: 'tw'
        // },
        {
          path: '/ql-tiep-cd/ql-sosach-bc-tw',
          name: 'Quản lý sổ sách và báo cáo ',
          urlImage: 'assets/images/icon_bao_cao_tong_hop_theo_thu_tuc.svg',
          class: 'tw',
          children: [
            {
              name: 'Sổ theo dõi tiếp nhận',
              url: '/ql-tiep-cd/ql-sosach-bc-tw',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw',
              children: [
                {
                  name: 'Sổ theo dõi tiếp nhận GQKT',
                  url: '/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiepnhan',
                  class: 'tw'
                },
                {
                  name: 'Sổ theo dõi tiếp nhận TCD',
                  url: '/ql-tiep-cd/ql-sosach-bc-tw/so-theodoi-tiep-cd',
                  class: 'tw'
                }
              ]
            },
            {
              name: 'Báo cáo tổng hợp',
              url: '/ql-tiep-cd/ql-sosach-bc-tw/so-tonghop-kq',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
            {
              name: 'Báo cáo kết quả toàn ngành',
              url: '/ql-tiep-cd/ql-sosach-bc-tw/bc-ketqua-toannganh',
              urlImageli: 'assets/images/icon_ho_so_da_duyet.svg',
              class: 'tw'
            },
          ]
        },
      ]
    },
    {
      name: 'Xử lý dữ liệu',
      // url: '/c',
      activeSlug: '',
      class: '',
      children: [
        {
          name: '',
          // url: 'abc',
          class: ''
        }
      ]
    },
    {
      name: 'Cảnh báo',
      // url: '/x',
      activeSlug: '',
      class: '',
      children: [
        {
          name: '',
          // url: 'abc',
          class: ''
        }
      ]
    },
    {
      name: 'Tiện ích',
      // url: '/y',
      activeSlug: '',
      class: '',
      children: [
        {
          name: '',
          // url: 'abc',
          class: ''
        }
      ]
    },
  ]
};

