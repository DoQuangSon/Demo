




export class GiaiTrinh {
    id: null;
    lyDo: null;
    fileQuyetDinh: null;
    listChiTietGiaiTrinh: null;
    tienHanhTTKT_ID: null;

    constructor(res) {
        if (res) {
            this.id = res.id;
            this.lyDo = res.lyDo;
            this.fileQuyetDinh = res.fileQuyetDinh;
            this.listChiTietGiaiTrinh = res.listChiTietGiaiTrinh;
            this.tienHanhTTKT_ID = res.tienHanhTTKT_ID;
        }
    }

    setLydo(lyDo) {
        this.lyDo = lyDo;
        return this;
    }

    setTienHanhTTKT_ID(tienHanhTTKT_ID) {
        this.tienHanhTTKT_ID = tienHanhTTKT_ID;
        return this;
    }

    setFileQuyetDinh(fileQuyetDinh) {
        this.fileQuyetDinh = fileQuyetDinh;
        return this;
    }

    setListChiTietGiaiTrinh(listChiTietGiaiTrinh) {
        this.listChiTietGiaiTrinh = listChiTietGiaiTrinh;
        return this;
    }


}
