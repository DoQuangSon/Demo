import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNhomDtComponent } from './create-nhom-dt.component';

describe('CreateNhomDtComponent', () => {
  let component: CreateNhomDtComponent;
  let fixture: ComponentFixture<CreateNhomDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNhomDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNhomDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
