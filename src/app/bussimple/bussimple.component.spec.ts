import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussimpleComponent } from './bussimple.component';

describe('BussimpleComponent', () => {
  let component: BussimpleComponent;
  let fixture: ComponentFixture<BussimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
