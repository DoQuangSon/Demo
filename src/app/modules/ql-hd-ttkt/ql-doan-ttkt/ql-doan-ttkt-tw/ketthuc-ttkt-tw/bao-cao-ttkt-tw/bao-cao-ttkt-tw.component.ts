import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { Pagging } from '../../../../../../shared/models/pagging.model';
import { TienHanhTtktService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-bao-cao-ttkt-tw',
  templateUrl: './bao-cao-ttkt-tw.component.html',
  styleUrls: ['./bao-cao-ttkt-tw.component.scss']
})
export class BaoCaoTtktTwComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

}
