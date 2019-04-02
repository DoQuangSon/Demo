import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietKhBhxhVnTinhComponent } from './chitiet-kh-bhxh-vn-tinh.component';

describe('ChitietKhBhxhVnTinhComponent', () => {
  let component: ChitietKhBhxhVnTinhComponent;
  let fixture: ComponentFixture<ChitietKhBhxhVnTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietKhBhxhVnTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietKhBhxhVnTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
