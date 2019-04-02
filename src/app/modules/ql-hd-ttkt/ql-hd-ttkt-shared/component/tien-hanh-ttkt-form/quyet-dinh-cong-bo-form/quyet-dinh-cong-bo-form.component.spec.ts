import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyetDinhCongBoFormComponent } from './quyet-dinh-cong-bo-form.component';

describe('QuyetDinhCongBoFormComponent', () => {
  let component: QuyetDinhCongBoFormComponent;
  let fixture: ComponentFixture<QuyetDinhCongBoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyetDinhCongBoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyetDinhCongBoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
