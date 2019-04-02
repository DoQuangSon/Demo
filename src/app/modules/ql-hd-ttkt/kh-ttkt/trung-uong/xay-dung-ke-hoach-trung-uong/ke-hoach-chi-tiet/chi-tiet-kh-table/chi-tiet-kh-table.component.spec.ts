import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKhTableComponent } from './chi-tiet-kh-table.component';

describe('ChiTietKhTableComponent', () => {
  let component: ChiTietKhTableComponent;
  let fixture: ComponentFixture<ChiTietKhTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietKhTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKhTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
