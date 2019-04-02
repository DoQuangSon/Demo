import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiSoTheodoiTiepnhanTinhComponent } from './taomoi-so-theodoi-tiepnhan-tinh.component';

describe('TaomoiSoTheodoiTiepnhanTinhComponent', () => {
  let component: TaomoiSoTheodoiTiepnhanTinhComponent;
  let fixture: ComponentFixture<TaomoiSoTheodoiTiepnhanTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiSoTheodoiTiepnhanTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiSoTheodoiTiepnhanTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
