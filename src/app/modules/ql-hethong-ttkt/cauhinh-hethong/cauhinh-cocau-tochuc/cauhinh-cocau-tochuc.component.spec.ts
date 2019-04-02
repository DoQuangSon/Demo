import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHinhCoCauToChucComponent } from './cauhinh-cocau-tochuc.component';

describe('CauHinhCoCauToChucComponent', () => {
  let component: CauHinhCoCauToChucComponent;
  let fixture: ComponentFixture<CauHinhCoCauToChucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauHinhCoCauToChucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhCoCauToChucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
