import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheoDoiChiTietComponent } from './so-theo-doi-chi-tiet.component';

describe('SoTheoDoiChiTietComponent', () => {
  let component: SoTheoDoiChiTietComponent;
  let fixture: ComponentFixture<SoTheoDoiChiTietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheoDoiChiTietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheoDoiChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
