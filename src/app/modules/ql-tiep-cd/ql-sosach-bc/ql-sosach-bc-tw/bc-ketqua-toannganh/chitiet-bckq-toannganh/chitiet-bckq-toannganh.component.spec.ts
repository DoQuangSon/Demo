import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBckqToannganhComponent } from './chitiet-bckq-toannganh.component';

describe('ChitietBckqToannganhComponent', () => {
  let component: ChitietBckqToannganhComponent;
  let fixture: ComponentFixture<ChitietBckqToannganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBckqToannganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBckqToannganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
