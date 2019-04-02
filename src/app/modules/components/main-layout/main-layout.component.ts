import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainLayoutService } from '../../../services/dom-events/main-layout.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'ttkt-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('main') mainRef: ElementRef;

  constructor(private mainLayoutService: MainLayoutService) { }

  ngOnInit() {
    fromEvent(this.mainRef.nativeElement, 'click').subscribe(() => {
      this.mainLayoutService.click();
    })
  }

}
