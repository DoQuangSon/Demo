import { Component, OnInit, Input } from '@angular/core';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pagging } from '../../../../../../shared/models/pagging.model';
import { IMyDpOptions } from 'mydatepicker';
import { Router } from '@angular/router';
import { TienHanhTtktService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-bao-cao-ttkt-tinh',
  templateUrl: './bao-cao-ttkt-tinh.component.html',
  styleUrls: ['./bao-cao-ttkt-tinh.component.scss']
})
export class BaoCaoTtktTinhComponent implements OnInit {
  
  constructor() { }
  ngOnInit(){

  }


}
