import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLayoutFieldComponent } from './material-layout-field.component';

describe('MaterialLayoutFieldComponent', () => {
  let component: MaterialLayoutFieldComponent;
  let fixture: ComponentFixture<MaterialLayoutFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialLayoutFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialLayoutFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
