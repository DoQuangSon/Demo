import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiDoanTtktFormComponent } from './tao-moi-doan-ttkt-form.component';

describe('TaoMoiDoanTtktFormComponent', () => {
  let component: TaoMoiDoanTtktFormComponent;
  let fixture: ComponentFixture<TaoMoiDoanTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMoiDoanTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMoiDoanTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
