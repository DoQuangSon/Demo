import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlDoanTtktTwComponent } from './tl-doan-ttkt-tw.component';

describe('TlDoanTtktTwComponent', () => {
  let component: TlDoanTtktTwComponent;
  let fixture: ComponentFixture<TlDoanTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlDoanTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlDoanTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
