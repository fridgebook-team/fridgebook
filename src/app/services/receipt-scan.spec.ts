import { TestBed } from '@angular/core/testing';

import { ReceiptScan } from './receipt-scan';

describe('ReceiptScan', () => {
  let service: ReceiptScan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptScan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
