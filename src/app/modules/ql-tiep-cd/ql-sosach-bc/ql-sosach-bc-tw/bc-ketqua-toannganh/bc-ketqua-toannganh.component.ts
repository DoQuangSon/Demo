import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BcKquaToanNganhService } from '../../../../../services/api/noi-tiepcongdan/bc-kqua-toan-nganh.service';
import { NoiDmbhxhService } from '../../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { Pagging } from '../../../../../shared/models/pagging.model';
@Component({
  selector: 'ttkt-bc-ketqua-toannganh',
  templateUrl: './bc-ketqua-toannganh.component.html',
  styleUrls: ['./bc-ketqua-toannganh.component.scss']
})
export class BcKetquaToannganhComponent implements OnInit {
  pagging: Pagging = new Pagging();
  bcKQToanNganhForm: FormGroup;
  dsBaoCao: any = [];
  searchAction = false;
  dataSearch: any = [];
  dsTinh: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private bcKetQuaService: BcKquaToanNganhService,
    private noiDmbhxhService: NoiDmbhxhService,
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.getDsTinhGuiBaoCao();
    this.bcKQToanNganhForm = this.fb.group({
      nam: [(new Date).getFullYear()],
      phamViId: ['']
    });
    this.getListDSTinh();
  }
  getListDSTinh() {
    this.noiDmbhxhService.getDmBHXHBymaCha('000').subscribe(req => {
      this.dsTinh = req;
    });
  }
  getDsTinhGuiBaoCao() {
    this.bcKetQuaService.getDviGuiBaoCao().subscribe(res => {
      this.dsBaoCao = res.content;
    });
  }
  chiTietBaoCao(baoCaoID) {
    this.router.navigate(['/ql-tiep-cd/ql-sosach-bc-tw/bc-ketqua-toannganh/chitiet', baoCaoID]);
  }
  search() {
    this.searchAction = true;
    const year = this.bcKQToanNganhForm.value.nam;
    const dmbhxhId = this.bcKQToanNganhForm.value.phamViId;
    this.bcKetQuaService.searchDviGuiBaoCao(dmbhxhId, year, this.pagging.currentPage, this.pagging.itemsPerPage).subscribe(res => {
      this.dataSearch = res.content;
      this.pagging.totalItems = res.totalElements;
    });
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page;
    this.search();
  }
}
