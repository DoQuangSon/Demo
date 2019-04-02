import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongboQdTwComponent } from './congbo-qd-tw.component';

describe('CongboQdTwComponent', () => {
  let component: CongboQdTwComponent;
  let fixture: ComponentFixture<CongboQdTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongboQdTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongboQdTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
