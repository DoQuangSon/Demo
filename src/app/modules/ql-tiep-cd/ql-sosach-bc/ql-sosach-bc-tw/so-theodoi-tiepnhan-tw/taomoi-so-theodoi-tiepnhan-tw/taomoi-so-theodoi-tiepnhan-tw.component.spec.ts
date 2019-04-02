import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiSoTheodoiTiepnhanTwComponent } from './taomoi-so-theodoi-tiepnhan-tw.component';

describe('TaomoiSoTheodoiTiepnhanTwComponent', () => {
  let component: TaomoiSoTheodoiTiepnhanTwComponent;
  let fixture: ComponentFixture<TaomoiSoTheodoiTiepnhanTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiSoTheodoiTiepnhanTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiSoTheodoiTiepnhanTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
