import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenFoodFactsProduct, OpenFoodFactsService } from '../../services/open-food-facts';
import { BarcodeDraft } from '../../models/barcode.models';

type BarcodeDetectorResult = { rawValue?: string };
type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<BarcodeDetectorResult[]>;
};
type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => BarcodeDetectorInstance;

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barcode-scanner.html',
  styleUrls: ['./barcode-scanner.css'],
})
export class BarcodeScannerComponent implements OnDestroy {
  @ViewChild('barcodeVideo') barcodeVideo?: ElementRef<HTMLVideoElement>;
  @Output() productScanned = new EventEmitter<BarcodeDraft>();

  isOpen = false;
  isLookupLoading = false;
  statusMessage = '';
  errorMessage = '';
  detectedBarcode = '';
  manualBarcode = '';
  scannedProduct: BarcodeDraft | null = null;

  readonly unitOptions = ['Stueck', 'g', 'kg', 'ml', 'l', 'Packung'];

  private barcodeStream: MediaStream | null = null;
  private barcodeDetector: BarcodeDetectorInstance | null = null;
  private scanFrameId: number | null = null;
  private detectionInProgress = false;

  constructor(
    private openFoodFactsService: OpenFoodFactsService,
    private cdr: ChangeDetectorRef
  ) {}

  async open() {
    this.resetUi();
    this.isOpen = true;

    const BarcodeDetectorApi = (window as Window & { BarcodeDetector?: BarcodeDetectorConstructor }).BarcodeDetector;

    if (!navigator.mediaDevices?.getUserMedia) {
      this.errorMessage = 'Kamera wird auf diesem Geraet nicht unterstuetzt.';
      this.statusMessage = 'Du kannst den Barcode unten manuell eingeben.';
      return;
    }

    if (!BarcodeDetectorApi) {
      this.errorMessage = 'Automatischer Barcode-Scan wird von diesem Browser leider nicht unterstuetzt.';
      this.statusMessage = 'Du kannst den Barcode unten manuell eingeben.';
      return;
    }

    this.statusMessage = 'Halte den Barcode in den markierten Bereich.';

    try {
      this.barcodeStream = await this.requestStream();
      this.barcodeDetector = new BarcodeDetectorApi({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'],
      });

      this.cdr.detectChanges();

      const video = this.barcodeVideo?.nativeElement;
      if (!video) throw new Error('Video nicht verfuegbar');

      video.srcObject = this.barcodeStream;
      video.setAttribute('autoplay', 'true');
      video.setAttribute('muted', 'true');
      video.setAttribute('playsinline', 'true');
      await this.waitForVideoReady(video);
      await video.play();
      this.scanFrame();
    } catch {
      this.close();
      this.errorMessage = 'Die Kamera konnte nicht fuer den Barcode-Scan gestartet werden.';
    }
  }

  close() {
    if (this.scanFrameId !== null) {
      cancelAnimationFrame(this.scanFrameId);
      this.scanFrameId = null;
    }
    this.detectionInProgress = false;

    if (this.barcodeStream) {
      this.barcodeStream.getTracks().forEach(t => t.stop());
      this.barcodeStream = null;
    }

    const video = this.barcodeVideo?.nativeElement;
    if (video) {
      video.pause();
      video.srcObject = null;
    }

    this.isOpen = false;
  }

  async lookupManual() {
    const barcode = this.manualBarcode.trim();
    if (!barcode) {
      this.errorMessage = 'Bitte gib einen Barcode ein.';
      return;
    }
    await this.handleDetected(barcode);
  }

  increaseQuantity(step = 1) {
    if (!this.scannedProduct) return;
    this.scannedProduct.quantity = Number((this.scannedProduct.quantity + step).toFixed(2));
  }

  decreaseQuantity(step = 1) {
    if (!this.scannedProduct) return;
    this.scannedProduct.quantity = Number(Math.max(this.scannedProduct.quantity - step, 0.1).toFixed(2));
  }

  confirmProduct() {
    if (!this.scannedProduct) return;
    this.productScanned.emit(this.scannedProduct);
    this.scannedProduct = null;
    this.detectedBarcode = '';
    this.manualBarcode = '';
  }

  ngOnDestroy() {
    this.close();
  }

  private async handleDetected(barcode: string) {
    this.detectedBarcode = barcode;
    this.manualBarcode = barcode;
    this.statusMessage = `Barcode ${barcode} erkannt. Produkt wird geladen...`;
    this.errorMessage = '';
    this.isLookupLoading = true;
    this.close();

    try {
      const product = await this.openFoodFactsService.getProductByBarcode(barcode);
      this.scannedProduct = this.createDraft(product);
      this.errorMessage = '';
    } catch {
      this.errorMessage = 'Kein passendes Produkt gefunden. Bitte versuche es erneut.';
      this.scannedProduct = null;
    } finally {
      this.isLookupLoading = false;
      this.cdr.detectChanges();
    }
  }

  private createDraft(product: OpenFoodFactsProduct): BarcodeDraft {
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
    return this.unitOptions.find(o => o.toLowerCase() === normalized.toLowerCase()) ?? 'Stueck';
  }

  private resetUi() {
    this.errorMessage = '';
    this.statusMessage = '';
    this.detectedBarcode = '';
    this.manualBarcode = '';
    this.scannedProduct = null;
  }

  private async requestStream(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
    } catch {
      return navigator.mediaDevices.getUserMedia({ video: true });
    }
  }

  private waitForVideoReady(video: HTMLVideoElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) { resolve(); return; }
      video.addEventListener('loadedmetadata', () => resolve(), { once: true });
      video.addEventListener('error', () => reject(new Error('Video-Fehler')), { once: true });
      video.load();
    });
  }

  private scanFrame() {
    if (!this.isOpen) return;
    const video = this.barcodeVideo?.nativeElement;
    if (!video || !this.barcodeDetector) return;

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || this.detectionInProgress) {
      this.scanFrameId = requestAnimationFrame(() => this.scanFrame());
      return;
    }

    this.detectionInProgress = true;
    this.barcodeDetector.detect(video)
      .then(codes => {
        const barcode = codes.find(c => c.rawValue)?.rawValue;
        if (barcode) { void this.handleDetected(barcode); return; }
        this.scanFrameId = requestAnimationFrame(() => this.scanFrame());
      })
      .catch(() => {
        this.statusMessage = 'Barcode konnte noch nicht erkannt werden. Bitte neu ausrichten.';
        this.scanFrameId = requestAnimationFrame(() => this.scanFrame());
      })
      .finally(() => { this.detectionInProgress = false; });
  }
}
