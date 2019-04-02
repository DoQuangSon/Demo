import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienHanhTiepCdFormComponent } from './tien-hanh-tiep-cd-form.component';

describe('TienHanhTiepCdFormComponent', () => {
  let component: TienHanhTiepCdFormComponent;
  let fixture: ComponentFixture<TienHanhTiepCdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienHanhTiepCdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienHanhTiepCdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
