import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcTonghopToannganhComponent } from './taomoi-bc-tonghop-toannganh.component';

describe('TaomoiBcTonghopToannganhComponent', () => {
  let component: TaomoiBcTonghopToannganhComponent;
  let fixture: ComponentFixture<TaomoiBcTonghopToannganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcTonghopToannganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcTonghopToannganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
