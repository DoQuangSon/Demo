import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinChungTinhComponent } from './thong-tin-chung-tinh.component';

describe('ThongTinChungTinhComponent', () => {
  let component: ThongTinChungTinhComponent;
  let fixture: ComponentFixture<ThongTinChungTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinChungTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinChungTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
