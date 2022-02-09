import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMatFieldComponent } from './number-mat-field.component';

describe('NumberMatFieldComponent', () => {
  let component: NumberMatFieldComponent;
  let fixture: ComponentFixture<NumberMatFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMatFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberMatFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
