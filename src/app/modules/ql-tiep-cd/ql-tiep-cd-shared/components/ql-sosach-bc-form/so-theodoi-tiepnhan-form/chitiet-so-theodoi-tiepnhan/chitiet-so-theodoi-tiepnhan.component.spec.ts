import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiTiepnhanComponent } from './chitiet-so-theodoi-tiepnhan.component';

describe('ChitietSoTheodoiTiepnhanComponent', () => {
  let component: ChitietSoTheodoiTiepnhanComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiTiepnhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiTiepnhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiTiepnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
