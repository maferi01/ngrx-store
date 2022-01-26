import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLibDisplayComponent } from './my-lib-display.component';

describe('MyLibDisplayComponent', () => {
  let component: MyLibDisplayComponent;
  let fixture: ComponentFixture<MyLibDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLibDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLibDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
