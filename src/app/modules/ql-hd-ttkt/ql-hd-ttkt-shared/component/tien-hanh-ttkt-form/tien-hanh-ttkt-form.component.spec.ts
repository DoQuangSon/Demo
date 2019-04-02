import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienHanhTtktFormComponent } from './tien-hanh-ttkt-form.component';

describe('TienHanhTtktFormComponent', () => {
  let component: TienHanhTtktFormComponent;
  let fixture: ComponentFixture<TienHanhTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienHanhTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienHanhTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
