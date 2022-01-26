import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMatFieldComponent } from './text-mat-field.component';

describe('TextMatFieldComponent', () => {
  let component: TextMatFieldComponent;
  let fixture: ComponentFixture<TextMatFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMatFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMatFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
