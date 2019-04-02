import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiTiepnhanFormComponent } from './so-theodoi-tiepnhan-form.component';

describe('SoTheodoiTiepnhanFormComponent', () => {
  let component: SoTheodoiTiepnhanFormComponent;
  let fixture: ComponentFixture<SoTheodoiTiepnhanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiTiepnhanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiTiepnhanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
