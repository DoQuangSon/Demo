import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTongHopKetQuaComponent } from './so-tong-hop-ket-qua.component';

describe('SoTongHopKetQuaComponent', () => {
  let component: SoTongHopKetQuaComponent;
  let fixture: ComponentFixture<SoTongHopKetQuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTongHopKetQuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTongHopKetQuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
