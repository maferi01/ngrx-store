import { TestBed } from '@angular/core/testing';

import { MyLibDisplayService } from './my-lib-display.service';

describe('MyLibDisplayService', () => {
  let service: MyLibDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLibDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
