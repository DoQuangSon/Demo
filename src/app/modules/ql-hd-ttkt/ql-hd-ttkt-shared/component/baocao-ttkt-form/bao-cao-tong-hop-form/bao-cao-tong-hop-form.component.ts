import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NoiSoTonghopKqService} from '../../../../../../services/api/noi-ql-baocao-ttkt/noi-so-tonghop-kq/noi-so-tonghop-kq.service';
import {ActivatedRoute} from '@angular/router';
import {NoiDmPhanLoaiTieuThucService} from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import {TIME_OPTIONS} from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { sortBy } from 'lodash';

@Component({
  selector: 'ttkt-bao-cao-tong-hop-form',
  templateUrl: './bao-cao-tong-hop-form.component.html',
  styleUrls: ['./bao-cao-tong-hop-form.component.scss']
})
export class BaoCaoTongHopFormComponent implements OnInit {

    @Input() typeAccount: string;
    @Input()
    set data(data: any) {
        if (data) {
            console.log('666666666666666', data);
            this.soTongHop = data;
            this.mappingBaoCaoTongHop();
        }
    }
    @Input() passData = false;
    @Input() title = 'Sổ báo cáo tổng hợp';
    soTongHop: any;

    listDmTieuThucMapping: Array<any> = [];
    constructor(
        private location: Location,
        private baoCao: NoiSoTonghopKqService,
        private router: ActivatedRoute,
        private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService
    ) { }

    now: Date = new Date();

    get OPTIONS() {
        return TIME_OPTIONS;
    }

    ngOnInit() {
        this.router.params.subscribe(pm => {
            // get id -> call api get data
            if (!this.passData) {
                this.baoCao.getSoTHKQTTKTById(pm.id).subscribe(res => {
                    this.soTongHop = res;
                    this.mappingBaoCaoTongHop();
                });
            }
        });
    }

    mappingBaoCaoTongHop() {
        this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(0, 100) // this.pageSize)
            .subscribe(data => {
                this.listDmTieuThucMapping = data.content.map(el => {
                    el.children = this.soTongHop.soChiTiet ? this.soTongHop.soChiTiet.filter(req => req.dmPhanLoaiTtId == el.id) : [];
                });
                this.listDmTieuThucMapping = data.content.filter(req => !req.parentId);
                this.listDmTieuThucMapping = this.listDmTieuThucMapping.map(item => {
                    item.child = data.content.filter(req => req.parentId == item.id);

                    return item;
                });
                this.listDmTieuThucMapping.forEach(el => {
                    el.children = sortBy(el.children, ['theOrder']);
                    el.child = sortBy(el.child, ['theOrder']);
                });

                console.log(this.listDmTieuThucMapping);
                // console.log(this.soTongHop.soChiTiet);


                // item.tenPhanLoai === 'Các biện pháp xử lý vi phạm' id == 5
                this.soTongHop.cacBienPhapXuLyViPham = this.listDmTieuThucMapping.find(item => item.id == 5);
                this.listDmTieuThucMapping = this.listDmTieuThucMapping.filter(item => item.id != 5);
                console.log(this.soTongHop.cacBienPhapXuLyViPham);

                this.soTongHop.soDaThucHien.sort( (item1, item2) => item1.key - item2.key);
                this.soTongHop.soChuyenSangKySau.sort( (item1, item2) => item1.key - item2.key);
            });
    }

    onBack() {
        this.location.back();
    }

    // printExcel() {
    //     this.router.queryParams.subscribe(res => this.baoCao.printMauBaoCao03_DotXuat(res.fromDate, 2));
    // }

}
