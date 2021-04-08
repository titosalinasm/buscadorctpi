import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusavanzadoComponent } from './busavanzado.component';

describe('BusavanzadoComponent', () => {
  let component: BusavanzadoComponent;
  let fixture: ComponentFixture<BusavanzadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusavanzadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusavanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
