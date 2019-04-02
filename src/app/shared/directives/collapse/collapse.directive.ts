/* tslint:disable */
import { Directive, Input, HostBinding, ElementRef, AfterViewInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[ttktCollapse]'
})

export class CollapseDirective implements AfterViewInit, OnChanges {
  h: number = 0;
  timeOut: number;

  @HostBinding('class.collapsing')
  private isCollapsing: boolean = true;

  @HostBinding('class.collapsed')
  private isCollapsed: boolean = true;

  // style
  @HostBinding('style.height')
  private height: string;

  @HostBinding('class.ttkt-collapse')
  private collapse: boolean = true;

  @Input()
  private set ttktCollapse(value: boolean) {
    if (value !== undefined) {
      if (!value) {
        this.hide();
      } else {
        this.show();
      }
    }
    //
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.measureHeight();
    if (!this.isCollapsed) {
      this.height = 'auto';
    } else {
      this.height = '0px';
    }
  }

  constructor(public el: ElementRef) {

    this.measureHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.measureHeight();
  }

  ngAfterViewInit(): void {
    this.measureHeight();
  }

  measureHeight() {
    const elem = this.el.nativeElement;
    // elem.className = elem.className.replace('ttktCollapse', '');
    this.h = elem.scrollHeight;

  }
  hide() {
    this.clearTimeout();
    this.height = this.h + 'px';
    setTimeout(() => {
      this.height = '0px';
      this.isCollapsed = true;
    }, 50);
  }

  setTimeout(cb) {
    this.timeOut = setTimeout(cb, 350);
  }

  clearTimeout() {
    clearTimeout(this.timeOut);
  }

  show() {
    this.clearTimeout();
    this.height = '0px';
    setTimeout(() => {
      this.height = this.h + 'px';
    }, 50);
    this.setTimeout(() => {
      this.isCollapsed = false;
    });
  }

}

