import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHinhQuyComponent } from './cauhinh-quy.component';

describe('CauHinhQuyComponent', () => {
  let component: CauHinhQuyComponent;
  let fixture: ComponentFixture<CauHinhQuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauHinhQuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhQuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
