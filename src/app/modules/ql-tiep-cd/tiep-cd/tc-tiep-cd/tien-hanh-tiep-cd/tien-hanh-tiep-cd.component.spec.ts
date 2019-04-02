import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienHanhTiepCdComponent } from './tien-hanh-tiep-cd.component';

describe('TienHanhTiepCdComponent', () => {
  let component: TienHanhTiepCdComponent;
  let fixture: ComponentFixture<TienHanhTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienHanhTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienHanhTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
