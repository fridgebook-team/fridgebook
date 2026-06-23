import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptScanService } from '../../services/receipt-scan';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService } from '../../services/shopping-list';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-receipt-scan-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-scan-button.html',
})
export class ReceiptScanButtonComponent {
  @ViewChild('cameraInput') cameraInput!: ElementRef;
  @Output() statusChange = new EventEmitter<string>();

  isScanning = false;

  constructor(
    private receiptScanService: ReceiptScanService,
    private fridgeService: FridgeService,
    private shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {}

  openCamera() {
    this.cameraInput.nativeElement.click();
  }

  async onPhotoTaken(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isScanning = true;
    this.statusChange.emit('Bon wird analysiert...');
    this.cdr.detectChanges();

    try {
      const base64 = await this.fileToBase64(file);
      const scannedProducts = await this.receiptScanService.scanReceipt(base64);

      scannedProducts.forEach(p => {
        this.fridgeService.addItem({
          name: p.name,
          quantity: p.quantity ?? 1,
          unit: p.unit ?? 'Stück',
          expiry: p.expiry,
        });
      });

      let removed = 0;
      for (const p of scannedProducts) {
        const fuse = new Fuse(this.shoppingListService.items, {
          keys: ['name'],
          threshold: 0.4,
          includeScore: true,
        });
        const results = fuse.search(p.name.toLowerCase());
        if (results.length > 0 && results[0].score! < 0.4) {
          await this.shoppingListService.removeItem(results[0].item);
          removed++;
        }
      }

      this.statusChange.emit(
        removed > 0
          ? `${removed} Produkte von der Liste entfernt!`
          : 'Bon gespeichert — keine Produkte von der Liste gefunden.'
      );
    } catch {
      this.statusChange.emit('Fehler beim Scannen. Bitte nochmal versuchen.');
    }

    this.isScanning = false;
    this.cdr.detectChanges();

    setTimeout(() => this.statusChange.emit(''), 3000);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
