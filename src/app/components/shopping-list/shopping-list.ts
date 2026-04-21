
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceiptScanService } from '../../services/receipt-scan';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService, ShoppingItem } from '../../services/shopping-list';
import {
  OpenFoodFactsProduct,
  OpenFoodFactsService,
} from '../../services/open-food-facts';
import Fuse from 'fuse.js';

type BarcodeDetectorResult = {
  rawValue?: string;
};

type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<BarcodeDetectorResult[]>;
};

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorInstance;

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})

export class ShoppingList implements OnInit, OnDestroy {
  @ViewChild('newItemInput') newItemInputRef!: ElementRef;
  @ViewChild('cameraInput') cameraInput!: ElementRef;
  @ViewChild('barcodeVideo') barcodeVideo?: ElementRef<HTMLVideoElement>;

  isScanning = false;
  statusMessage = '';
  isBarcodeScannerOpen = false;
  isBarcodeLookupLoading = false;
  barcodeStatusMessage = '';
  barcodeErrorMessage = '';
  detectedBarcode = '';
  manualBarcode = '';
  scannedProduct: BarcodeDraft | null = null;
  private barcodeStream: MediaStream | null = null;
  private barcodeDetector: BarcodeDetectorInstance | null = null;
  private barcodeScanFrameId: number | null = null;
  private barcodeDetectionInProgress = false;
  readonly unitOptions = ['Stueck', 'g', 'kg', 'ml', 'l', 'Packung'];

  constructor(
    private receiptScanService: ReceiptScanService,
    private fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
    private openFoodFactsService: OpenFoodFactsService,
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

  async startBarcodeScanner() {
    const BarcodeDetectorApi = (
      window as Window & { BarcodeDetector?: BarcodeDetectorConstructor }
    ).BarcodeDetector;

    this.resetBarcodeUi();
    this.isBarcodeScannerOpen = true;

    if (!navigator.mediaDevices?.getUserMedia) {
      this.barcodeErrorMessage = 'Kamera wird auf diesem Geraet nicht unterstuetzt.';
      this.barcodeStatusMessage = 'Du kannst den Barcode unten manuell eingeben.';
      return;
    }

    if (!BarcodeDetectorApi) {
      this.barcodeErrorMessage =
        'Automatischer Barcode-Scan wird von diesem Browser leider nicht unterstuetzt.';
      this.barcodeStatusMessage = 'Du kannst den Barcode unten manuell eingeben.';
      return;
    }
    this.barcodeStatusMessage = 'Halte den Barcode in den markierten Bereich.';

    try {
      this.barcodeStream = await this.requestBarcodeStream();

      this.barcodeDetector = new BarcodeDetectorApi({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'],
      });

      this.cdr.detectChanges();

      const videoElement = this.barcodeVideo?.nativeElement;
      if (!videoElement) {
        throw new Error('Video nicht verfuegbar');
      }

      videoElement.srcObject = this.barcodeStream;
      videoElement.setAttribute('autoplay', 'true');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('playsinline', 'true');
      await this.waitForVideoReady(videoElement);
      await videoElement.play();
      this.scanBarcodeFrame();
    } catch (error) {
      this.closeBarcodeScanner();
      this.barcodeErrorMessage =
        'Die Kamera konnte nicht fuer den Barcode-Scan gestartet werden.';
    }
  }

  closeBarcodeScanner() {
    if (this.barcodeScanFrameId !== null) {
      cancelAnimationFrame(this.barcodeScanFrameId);
      this.barcodeScanFrameId = null;
    }

    this.barcodeDetectionInProgress = false;

    if (this.barcodeStream) {
      this.barcodeStream.getTracks().forEach(track => track.stop());
      this.barcodeStream = null;
    }

    const videoElement = this.barcodeVideo?.nativeElement;
    if (videoElement) {
      videoElement.pause();
      videoElement.srcObject = null;
    }

    this.isBarcodeScannerOpen = false;
  }

  async lookupManualBarcode() {
    const barcode = this.manualBarcode.trim();
    if (!barcode) {
      this.barcodeErrorMessage = 'Bitte gib einen Barcode ein.';
      return;
    }

    await this.handleBarcodeDetected(barcode);
  }

  increaseDraftQuantity(step = 1) {
    if (!this.scannedProduct) {
      return;
    }

    this.scannedProduct.quantity = Number(
      (this.scannedProduct.quantity + step).toFixed(2)
    );
  }

  decreaseDraftQuantity(step = 1) {
    if (!this.scannedProduct) {
      return;
    }

    const nextQuantity = this.scannedProduct.quantity - step;
    this.scannedProduct.quantity = Number(Math.max(nextQuantity, 0.1).toFixed(2));
  }

  addScannedProductToFridge() {
    if (!this.scannedProduct) {
      return;
    }

    this.fridgeService.addItem({
      name: this.scannedProduct.name,
      quantity: this.scannedProduct.quantity,
      unit: this.scannedProduct.unit,
    });

    this.removeMatchingShoppingItem(this.scannedProduct.name);

    this.statusMessage = `${this.scannedProduct.name} wurde dem Kuehlschrank hinzugefuegt.`;
    this.scannedProduct = null;
    this.detectedBarcode = '';
    this.manualBarcode = '';
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

  private async requestBarcodeStream(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
    } catch {
      return navigator.mediaDevices.getUserMedia({
        video: true,
      });
    }
  }

  private waitForVideoReady(videoElement: HTMLVideoElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resolve();
        return;
      }

      const onLoadedMetadata = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error('Video-Metadaten konnten nicht geladen werden.'));
      };

      const cleanup = () => {
        videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
        videoElement.removeEventListener('error', onError);
      };

      videoElement.addEventListener('loadedmetadata', onLoadedMetadata, {
        once: true,
      });
      videoElement.addEventListener('error', onError, { once: true });
      videoElement.load();
    });
  }

  ngOnDestroy() {
    this.closeBarcodeScanner();
  }

  private scanBarcodeFrame() {
    if (!this.isBarcodeScannerOpen) {
      return;
    }

    const videoElement = this.barcodeVideo?.nativeElement;
    if (!videoElement || !this.barcodeDetector) {
      return;
    }

    if (
      videoElement.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      this.barcodeDetectionInProgress
    ) {
      this.barcodeScanFrameId = requestAnimationFrame(() =>
        this.scanBarcodeFrame()
      );
      return;
    }

    this.barcodeDetectionInProgress = true;

    this.barcodeDetector
      .detect(videoElement)
      .then(codes => {
        const barcode = codes.find(code => code.rawValue)?.rawValue;

        if (barcode) {
          void this.handleBarcodeDetected(barcode);
          return;
        }

        this.barcodeScanFrameId = requestAnimationFrame(() =>
          this.scanBarcodeFrame()
        );
      })
      .catch(() => {
        this.barcodeStatusMessage =
          'Barcode konnte noch nicht erkannt werden. Bitte neu ausrichten.';
        this.barcodeScanFrameId = requestAnimationFrame(() =>
          this.scanBarcodeFrame()
        );
      })
      .finally(() => {
        this.barcodeDetectionInProgress = false;
      });
  }

  private async handleBarcodeDetected(barcode: string) {
    this.detectedBarcode = barcode;
    this.manualBarcode = barcode;
    this.barcodeStatusMessage = `Barcode ${barcode} erkannt. Produkt wird geladen...`;
    this.barcodeErrorMessage = '';
    this.isBarcodeLookupLoading = true;

    this.closeBarcodeScanner();

    try {
      const product = await this.openFoodFactsService.getProductByBarcode(barcode);
      this.scannedProduct = this.createBarcodeDraft(product);
      this.barcodeErrorMessage = '';
    } catch (error) {
      this.barcodeErrorMessage =
        'Kein passendes Produkt gefunden. Bitte versuche es erneut.';
      this.scannedProduct = null;
    } finally {
      this.isBarcodeLookupLoading = false;
      this.cdr.detectChanges();
    }
  }

  private createBarcodeDraft(product: OpenFoodFactsProduct): BarcodeDraft {
    return {
      barcode: product.barcode,
      name: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      packageLabel: product.quantityLabel,
      quantity: product.defaultQuantity,
      unit: this.normalizeUnit(product.defaultUnit),
    };
  }

  private normalizeUnit(unit: string): string {
    const normalized = unit.trim();
    const supportedUnit = this.unitOptions.find(
      option => option.toLowerCase() === normalized.toLowerCase()
    );

    return supportedUnit ?? 'Stueck';
  }

  private removeMatchingShoppingItem(productName: string) {
    const fuse = new Fuse(this.items, {
      keys: ['name'],
      threshold: 0.35,
      includeScore: true,
    });

    const results = fuse.search(productName);
    if (results.length > 0 && (results[0].score ?? 1) < 0.35) {
      this.shoppingListService.removeItem(results[0].item);
    }
  }

  private resetBarcodeUi() {
    this.barcodeErrorMessage = '';
    this.barcodeStatusMessage = '';
    this.detectedBarcode = '';
    this.manualBarcode = '';
    this.scannedProduct = null;
  }
}

interface BarcodeDraft {
  barcode: string;
  name: string;
  brand: string;
  imageUrl: string;
  packageLabel: string;
  quantity: number;
  unit: string;
}
