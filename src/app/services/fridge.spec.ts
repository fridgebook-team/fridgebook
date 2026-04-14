import { TestBed } from '@angular/core/testing';

import { Fridge } from './fridge';

describe('Fridge', () => {
  let service: Fridge;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fridge);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
