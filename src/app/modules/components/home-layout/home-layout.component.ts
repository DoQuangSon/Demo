import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MainLayoutService } from '../../../services/dom-events/main-layout.service';
import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';

@Component({
  selector: 'ttkt-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('main') mainRef: ElementRef;

  constructor(private mainLayoutService: MainLayoutService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //fixed demo

    setTimeout(res => {
      if (this.mainRef)
      fromEvent(this.mainRef.nativeElement, 'click').subscribe(() => {
        this.mainLayoutService.click();
      })
    }, 1000);
  }
}
