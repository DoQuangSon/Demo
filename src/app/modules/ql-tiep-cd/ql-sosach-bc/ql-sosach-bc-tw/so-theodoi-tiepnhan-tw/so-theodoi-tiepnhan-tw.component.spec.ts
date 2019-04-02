import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw.component';

describe('SoTheodoiTiepnhanTwComponent', () => {
  let component: SoTheodoiTiepnhanTwComponent;
  let fixture: ComponentFixture<SoTheodoiTiepnhanTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiTiepnhanTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiTiepnhanTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
