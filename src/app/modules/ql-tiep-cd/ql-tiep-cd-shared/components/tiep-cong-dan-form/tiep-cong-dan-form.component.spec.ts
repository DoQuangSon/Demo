import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiepCongDanFormComponent } from './tiep-cong-dan-form.component';

describe('TiepCongDanFormComponent', () => {
  let component: TiepCongDanFormComponent;
  let fixture: ComponentFixture<TiepCongDanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiepCongDanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiepCongDanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
