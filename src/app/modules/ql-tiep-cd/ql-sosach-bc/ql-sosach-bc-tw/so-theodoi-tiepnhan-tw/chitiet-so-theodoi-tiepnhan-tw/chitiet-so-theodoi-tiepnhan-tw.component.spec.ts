import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiTiepnhanTwComponent } from './chitiet-so-theodoi-tiepnhan-tw.component';

describe('ChitietSoTheodoiTiepnhanTwComponent', () => {
  let component: ChitietSoTheodoiTiepnhanTwComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiTiepnhanTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiTiepnhanTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiTiepnhanTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
