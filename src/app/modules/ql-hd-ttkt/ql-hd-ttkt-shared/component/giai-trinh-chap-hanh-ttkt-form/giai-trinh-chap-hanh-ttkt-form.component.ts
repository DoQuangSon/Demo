import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../../auth/auth.service';
import {NoiSoTheodoiChitietService} from '../../../../../services/api/noi-ql-baocao-ttkt/noi-so-theodoi-chitiet/noi-so-theodoi-chitiet.service';
import {Router} from '@angular/router';
import {TienHanhTtktService} from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import {TimeBuilderService} from '../../../../../services/helper/time-builder.service';

@Component({
  selector: 'ttkt-giai-trinh-chap-hanh-ttkt-form',
  templateUrl: './giai-trinh-chap-hanh-ttkt-form.component.html',
  styleUrls: ['./giai-trinh-chap-hanh-ttkt-form.component.scss']
})
export class GiaiTrinhChapHanhTtktFormComponent implements OnInit {

    @Input() typeAccount: string;
    isTW = false;
    listThanhLapDoan = [];
    dmbhxhId: any;
    currentPage = 0;
    pageSize = 10;

    constructor(
        private auth: AuthService,
        private noiSoTheodoiChitietService: NoiSoTheodoiChitietService,
        private tienHanhTTKTService: TienHanhTtktService,
        private router: Router,
        private timeBuilder: TimeBuilderService
    ) { }

    ngOnInit() {
        this.isTW = this.typeAccount === 'TW';
        this.dmbhxhId = this.auth.currentUser.donViId;
        this.loadDataSoTheoDoi();
    }

    loadDataSoTheoDoi() {

        // const tuNgay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.tungay).setUTC().toISOString() || '';
        // const denngay = this.timeBuilder.fromTimeDatePicker(this.searchForm.value.denngay).setUTC().toISOString() || '';
        const tuNgay = '';
        const denNgay = '';

        this.tienHanhTTKTService.getDsDoanTTKTTienDoEqual1(this.isTW, this.dmbhxhId, tuNgay, denNgay, false, this.currentPage, this.pageSize)
            .subscribe(res => {
                this.processDataToShow(res);
            }, error => { }
        );
    }

    processDataToShow(data) {
        // this.pager = this.pagination.getPager(this.currentPage, data.size, data.totalPages);
        if (data.content && data.content.length) {
            data.content.map(item => item.ngayQuyetDinh = new Date(item.ngayQuyetDinh));
        }
        this.listThanhLapDoan = data.content;
    }

    detailThanhLapDoan(index) {
        if (this.isTW) {
            this.router.navigate(['ql-hd-ttkt/ql-doan-ttkt/tw/ket-thuc-ttkt-tw/giai-trinh-chap-hanh-ttkt-tw', index]);
        } else {
            // this.router.navigate(['ql-hd-ttkt/ql-doan-ttkt/tinh/ket-thuc-ttkt-tinh/giai-trinh-chap-hanh-ttkt-yinh', index]);
        }
    }

}
