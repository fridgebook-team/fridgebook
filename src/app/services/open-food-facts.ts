import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface OpenFoodFactsProduct {
  barcode: string;
  name: string;
  brand: string;
  imageUrl: string;
  quantityLabel: string;
  defaultQuantity: number;
  defaultUnit: string;
}

const UNIT_ALIASES: Record<string, string> = {
  g: 'g',
  gr: 'g',
  gramm: 'g',
  gramms: 'g',
  kg: 'kg',
  kilogramm: 'kg',
  ml: 'ml',
  cl: 'ml',
  dl: 'ml',
  l: 'l',
  liter: 'l',
  st: 'Stueck',
  stk: 'Stueck',
  stueck: 'Stueck',
  piece: 'Stueck',
  pieces: 'Stueck',
  pc: 'Stueck',
  pcs: 'Stueck',
  packung: 'Packung',
  pack: 'Packung',
  paket: 'Packung',
};

interface OpenFoodFactsApiResponse {
  status: number;
  product?: {
    code?: string;
    product_name?: string;
    brands?: string;
    image_front_url?: string;
    image_url?: string;
    quantity?: string;
    product_quantity?: number;
    product_quantity_unit?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OpenFoodFactsService {
  private readonly apiBaseUrl = 'https://world.openfoodfacts.org/api/v2/product';

  constructor(private http: HttpClient) {}

  async getProductByBarcode(barcode: string): Promise<OpenFoodFactsProduct> {
    const url =
      `${this.apiBaseUrl}/${barcode}` +
      '?fields=code,product_name,brands,image_front_url,image_url,quantity,product_quantity,product_quantity_unit';

    const response = await firstValueFrom(
      this.http.get<OpenFoodFactsApiResponse>(url)
    );

    if (response.status !== 1 || !response.product?.product_name) {
      throw new Error('Produkt nicht gefunden');
    }

    const parsedQuantity = this.parseQuantity(
      response.product.quantity,
      response.product.product_quantity,
      response.product.product_quantity_unit
    );

    return {
      barcode,
      name: response.product.product_name,
      brand: response.product.brands ?? '',
      imageUrl: response.product.image_front_url ?? response.product.image_url ?? '',
      quantityLabel: response.product.quantity ?? '',
      defaultQuantity: parsedQuantity.quantity,
      defaultUnit: parsedQuantity.unit,
    };
  }

  private parseQuantity(
    quantityLabel?: string,
    quantityValue?: number,
    quantityUnit?: string
  ): { quantity: number; unit: string } {
    if (quantityValue && quantityUnit) {
      return {
        quantity: quantityValue,
        unit: this.normalizeUnit(quantityUnit),
      };
    }

    if (quantityLabel) {
      const match = quantityLabel.match(/(\d+(?:[.,]\d+)?)\s*([A-Za-z]+)/);
      if (match) {
        return {
          quantity: Number(match[1].replace(',', '.')),
          unit: this.normalizeUnit(match[2]),
        };
      }
    }

    return {
      quantity: 1,
      unit: 'Stueck',
    };
  }

  private normalizeUnit(unit: string): string {
    const normalized = unit.trim().toLowerCase();
    return UNIT_ALIASES[normalized] ?? unit.trim();
  }
}
