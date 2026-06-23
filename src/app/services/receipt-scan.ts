import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Product } from '../models/scan.models';

export type { Product };

@Injectable({
  providedIn: 'root',
})
export class ReceiptScanService {

  constructor(private http: HttpClient) {}

  async scanReceipt(base64Image: string): Promise<Product[]> {

    const body = {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          },
          {
            type: 'text',
            text: `Extrahiere alle Lebensmittel aus diesem Kassenbon.
                   Schreibe ALLE Abkürzungen vollständig aus:
                    - "KOPFSALATHERZEN S-BU" → "Kopfsalat"
                    - "DRESS. PREM 300ML" → "Dressing"
                    - "SBUDGET MEHL UNIV." → "Mehl"
                    - "SPAR PFEFFERONI BUNT" → "Pfefferoni"
                    Keine Hygieneartikel, Reinigungsmittel oder Non-Food Artikel.
                    Schätze Ablaufdatum basierend auf Kaufdatum und typischer Haltbarkeit.
                    Antworte AUSSCHLIESSLICH mit einem JSON-Array.
                    Jedes Objekt hat: name, preis, quantity, unit, expiry (YYYY-MM-DD).
                    Beispiel: [{"name":"Kopfsalat","preis":2.99,"quantity":1,"unit":"Stück","expiry":"2026-04-17"}]
                    Kein Text davor oder danach, keine Backticks.`
          }
        ]
      }],
      max_tokens: 1000
    };

    const response: any = await firstValueFrom(
      this.http.post(
        '/api/groq/openai/v1/chat/completions',
        body,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const text = response.choices[0].message.content;
    console.log('KI Antwort:', text);

    const clean = text.replace(/```json|```/g, '').replace(/\\n/g, '').trim();
    console.log('Bereinigt:', clean);

    const products = JSON.parse(clean);
    console.log('Produkte:', products);
    
    return products;
  }


}
