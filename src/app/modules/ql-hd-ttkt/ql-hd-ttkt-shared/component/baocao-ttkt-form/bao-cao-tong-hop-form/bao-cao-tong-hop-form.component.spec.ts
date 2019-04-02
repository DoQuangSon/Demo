import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTongHopFormComponent } from './bao-cao-tong-hop-form.component';

describe('BaoCaoTongHopFormComponent', () => {
  let component: BaoCaoTongHopFormComponent;
  let fixture: ComponentFixture<BaoCaoTongHopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTongHopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTongHopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
