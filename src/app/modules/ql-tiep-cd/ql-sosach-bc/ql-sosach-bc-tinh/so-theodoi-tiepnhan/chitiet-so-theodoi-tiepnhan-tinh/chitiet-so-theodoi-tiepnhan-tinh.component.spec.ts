import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiTiepnhanTinhComponent } from './chitiet-so-theodoi-tiepnhan-tinh.component';

describe('ChitietSoTheodoiTiepnhanTinhComponent', () => {
  let component: ChitietSoTheodoiTiepnhanTinhComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiTiepnhanTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiTiepnhanTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiTiepnhanTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
