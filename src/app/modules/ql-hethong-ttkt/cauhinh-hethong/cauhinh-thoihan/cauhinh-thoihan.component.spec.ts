import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauhinhThoihanComponent } from './cauhinh-thoihan.component';

describe('CauhinhThoihanComponent', () => {
  let component: CauhinhThoihanComponent;
  let fixture: ComponentFixture<CauhinhThoihanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhThoihanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauhinhThoihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
