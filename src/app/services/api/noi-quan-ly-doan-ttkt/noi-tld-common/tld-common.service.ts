import { Injectable } from '@angular/core';
import { flattenDeep as LD_flattenDeep } from 'lodash';
import { LOAIHINH_TTKT_NAME } from '../../../../constants/thanh-lap-doan.constants';
import { LOAIHINH_TKKT } from '../../../../constants/status.constants';

@Injectable({   providedIn: 'root' })
export class TldCommonService {

  constructor() { }

  getLoaiHinhName(loaiHinhId) {
    let loaiHinhname: string = '';
    for (const item of LOAIHINH_TTKT_NAME) {
      if (Number(loaiHinhId) === Number(item.id)) {
        loaiHinhname = item.name;
      }
    }
    return loaiHinhname;
  }

  getDvDcTTKTS(noiDungTTKT) {
    let listDvi = (noiDungTTKT || []).map(el => {
      const tmp: any = [];
      (el.children || []).forEach(item => {
        let ndTTKTS: any = [];
        (item.noiDungKT || []).map(it1 => {
          it1.isNoiDungThanhTra = false;
        });
        (item.noiDungTT || []).map(it2 => {
          it2.isNoiDungThanhTra = true;
        });
        ndTTKTS = ((item || {}).noiDungKT || []).concat((item || {}).noiDungTT);
        const listNDId = [];
        for (const nd of ndTTKTS) {
          if (nd) {
            if (Object.keys(nd).length) {
              let id: number;
              if (nd.dmNoiDungTTKTId) {
                id = nd.dmNoiDungTTKTId;
              } else {
                id = nd.id;
              }
              listNDId.push({
                dmNoiDungTTKTId: id,
                isNoiDungThanhTra: nd.isNoiDungThanhTra,

              });
            }
          }
        }
        const _el: any = {};
        _el.actived = true;
        _el.dmPhanLoaiDtId = (item || {}).dmPhanLoaiDtId;
        _el.doiTuongTTKTId = (item || {}).id;
        _el.noiDungKTS = listNDId || [];
        _el.doiTuongTTKT_MaCoSoKhamChuaBenh = (item || {}).maCoSoKhamChuaBenh;
        if (item.elementId) { _el.id = item.elementId; }
        tmp.push(_el);
      });
      return tmp;
    });
    listDvi = LD_flattenDeep(listDvi);
    return listDvi;
  }

  getLoaiHinhTTKT(value1, value2) {
    if (value1 === 'lienNganh' && value2 === 'thanhTra') {
      return LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA_LIEN_NGANH;
    } else if (value1 === 'khongLienNganh' && value2 === 'kiemTra') {
      return LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA;
    } else if (value1 === 'lienNganh' && value2 === 'kiemTra') {
      return LOAIHINH_TKKT.STATUS_LOAI_HINH_KIEM_TRA_LIEN_NGANH;
    } else if (value1 === 'khongLienNganh' && value2 === 'thanhTra') {
      return LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA;
    } else {
      return null;
    }
  }

  getNoiDungTTKTName(content) {
    content.forEach(item => {
      item.children.map(el => {
        el.noiDungTT = (el.noiDungTTKTS || []).filter(element => {
          return element.isNoiDungThanhTra === true;
        });
        el.arrayTT = (el.noiDungTT || []).map(el2 => {
          return el2.tenNoiDungTTKT;
        }); 
        el.noiDungTTName = el.arrayTT.join('; ');
        console.log(el.noiDungTTName);
        el.noiDungKT = (el.noiDungTTKTS || []).filter(element => {
          return element.isNoiDungThanhTra === false;
        });
        el.arrayKT = (el.noiDungKT || []).map(el2 => {
          return el2.tenNoiDungTTKT;
        });
        el.noiDungKTName = el.arrayKT.join('; ');
      });
    });
    return content;
  }

  getListDmTTKTngSelect(res, type) {
    let listDm: any[] = [];
    listDm = res.content.filter(el => {
      return el.loaiHinh === type;
    });
    listDm.map(el => {
      el.text = el.tenNoiDung;
    });
    return listDm;
  }

  patchValuenoiDungTTKTS(res, listDm) {
    const listNoiDungTTKTS = res.noiDungTTKTS;
    const listNoiDung: any = [];
    for (const item of listNoiDungTTKTS) {
      for (const el of listDm) {
        if (item.dmNoiDungTTKTId === el.id) {
          listNoiDung.push(el);
        }
      }
    }
    console.log('listNoiDung',listNoiDung)
    return listNoiDung;
  }

  getListDonViConLai(listAll, listHienTai) {
    listHienTai.forEach(el => {
      const index = listAll.findIndex(it => {
        return it.id === el.id;
      });
      listAll.splice(index, 1);
    });
    return listAll;
  }

  getNoiDungTTKT(res, type) {
    const noiDungTTKT = res.noiDungKTS.filter(el => {
      return el.isNoiDungThanhTra === type;
    });
    let noiDungArrayName: string = '';
    let comma: string = '';
    noiDungTTKT.forEach(item => {
      noiDungArrayName = noiDungArrayName + comma + item.tenNoiDungTTKT;
      comma = ', ';
    });
    return noiDungArrayName;
  }

  getCurrentNoiDungIndex(currentItem, listAll) {
    const currentIndex = listAll.findIndex(item => {
      if (item.dmPhanLoaiDtId) {
        return item.dmPhanLoaiDtId === currentItem.dmPhanLoaiDtId;
      } else {
        return item.id === currentItem.id;
      }
    });
    return currentIndex;
  }
}
