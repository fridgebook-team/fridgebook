import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ReceiptScanService } from './receipt-scan';

describe('ReceiptScanService', () => {
  let service: ReceiptScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ReceiptScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
