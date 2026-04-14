import { TestBed } from '@angular/core/testing';

import { FridgeService } from './fridge';

describe('FridgeService', () => {
  let service: FridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
