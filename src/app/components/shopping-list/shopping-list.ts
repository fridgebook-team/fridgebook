import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptScanService } from '../../services/receipt-scan';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService, ShoppingItem } from '../../services/shopping-list';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList implements OnInit {

  @ViewChild('newItemInput') newItemInputRef!: ElementRef;
  @ViewChild('cameraInput') cameraInput!: ElementRef;

  isScanning = false;
  statusMessage = '';

  constructor(
    private receiptScanService: ReceiptScanService,
    private fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.shoppingListService.loadItems();
    this.cdr.detectChanges(); // FORCE UI UPDATE
  }

  get items() {
    return this.shoppingListService.items;
  }

  async addItem(inputElement: HTMLInputElement) {
    const result = await this.shoppingListService.addItem(inputElement.value);

    if (result === 'duplicate') {
      this.statusMessage = 'Bereits vorhanden';
      this.cdr.detectChanges();

      setTimeout(() => {
        this.statusMessage = '';
        this.cdr.detectChanges();
      }, 2000);

      return;
    }

    // wenn alles ok
    inputElement.value = '';
    this.statusMessage = '';
    this.cdr.detectChanges();
  }

  async removeItem(item: ShoppingItem) {
    await this.shoppingListService.removeItem(item);
    this.cdr.detectChanges();
  }

  openCamera() {
    this.cameraInput.nativeElement.click();
  }

  async onPhotoTaken(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isScanning = true;
    this.statusMessage = 'Bon wird analysiert...';
    this.cdr.detectChanges();

    try {
      const base64 = await this.fileToBase64(file);

      // Schritt 1: Produkte vom Bon lesen
      const scannedProducts = await this.receiptScanService.scanReceipt(base64);

      // Schritt 2: ALLE Lebensmittel in den Kühlschrank
      scannedProducts.forEach(scanned => {
        this.fridgeService.addItem({
          name: scanned.name,
          quantity: scanned.quantity ?? 1,
          unit: scanned.unit ?? 'Stück',
          expiry: scanned.expiry
        });
      });

      // Schritt 3: Fuse.js Matching gegen Einkaufsliste
      let removed = 0;

      for (const scanned of scannedProducts) {

      const fuse = new Fuse(this.items, { //immer aktuelle Liste
        keys: ['name'],
        threshold: 0.4,
        includeScore: true
      });

      const results = fuse.search(scanned.name.toLowerCase());

      if (results.length > 0 && results[0].score! < 0.4) {
        const match = results[0].item;

        await this.shoppingListService.removeItem(match);
        removed++;
      }
    }

      this.statusMessage = removed > 0
        ? `${removed} Produkte von der Liste entfernt!`
        : 'Bon gespeichert — keine Produkte von der Liste gefunden.';

    } catch (error) {
      this.statusMessage = 'Fehler beim Scannen. Bitte nochmal versuchen.';
    }

    this.isScanning = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.statusMessage = '';
      this.cdr.detectChanges();
    }, 3000);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}