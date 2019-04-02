import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopToannganhComponent } from './chitiet-bc-tonghop-toannganh.component';

describe('ChitietBcTonghopToannganhComponent', () => {
  let component: ChitietBcTonghopToannganhComponent;
  let fixture: ComponentFixture<ChitietBcTonghopToannganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopToannganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopToannganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
