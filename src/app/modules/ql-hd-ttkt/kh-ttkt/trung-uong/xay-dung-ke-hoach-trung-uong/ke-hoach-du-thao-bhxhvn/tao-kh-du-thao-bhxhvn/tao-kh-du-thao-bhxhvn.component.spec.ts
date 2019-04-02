import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoKhDuThaoBhxhvnComponent } from './tao-kh-du-thao-bhxhvn.component';

describe('TaoKhDuThaoBhxhvnComponent', () => {
  let component: TaoKhDuThaoBhxhvnComponent;
  let fixture: ComponentFixture<TaoKhDuThaoBhxhvnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoKhDuThaoBhxhvnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoKhDuThaoBhxhvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
