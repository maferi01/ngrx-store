import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexFieldComponent } from './complex-field.component';

describe('ComplexFieldComponent', () => {
  let component: ComplexFieldComponent;
  let fixture: ComponentFixture<ComplexFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
