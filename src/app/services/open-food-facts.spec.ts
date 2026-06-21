import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { OpenFoodFactsService } from './open-food-facts';

describe('OpenFoodFactsService', () => {
  let service: OpenFoodFactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(OpenFoodFactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map a found product', async () => {
    const promise = service.getProductByBarcode('1234567890123');

    const request = httpMock.expectOne(
      'https://world.openfoodfacts.org/api/v2/product/1234567890123?fields=code,product_name,brands,image_front_url,image_url,quantity,product_quantity,product_quantity_unit'
    );

    request.flush({
      status: 1,
      product: {
        product_name: 'Tomatensauce',
        brands: 'Beispiel',
        quantity: '500 g',
        image_front_url: 'https://example.com/image.jpg',
      },
    });

    await expect(promise).resolves.toEqual({
      barcode: '1234567890123',
      name: 'Tomatensauce',
      brand: 'Beispiel',
      imageUrl: 'https://example.com/image.jpg',
      quantityLabel: '500 g',
      defaultQuantity: 500,
      defaultUnit: 'g',
    });
  });
});
