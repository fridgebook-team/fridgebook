import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptScanService, Product } from '../../services/receipt-scan';

@Component({
  selector: 'app-scan-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scan-page.html',
  styleUrls: ['./scan-page.css']
})
export class ScanPageComponent {

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  cameraActive = false;
  capturedImage: string | null = null;
  statusMessage = '';
  products: Product[] = [];
  isLoading = false;

  constructor(private receiptScanService: ReceiptScanService,
              private cdr: ChangeDetectorRef
  ) {}

  // Kamera starten
  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.videoElement.nativeElement.srcObject = stream;
      this.cameraActive = true;
      this.statusMessage = '';
    } catch (error) {
      this.statusMessage = 'Kamera konnte nicht geöffnet werden.';
    }
  }

  // Foto aufnehmen und direkt scannen
  async takePicture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    // Bild als Base64 speichern
    this.capturedImage = canvas.toDataURL('image/jpeg');

    // Kamera stoppen
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    this.cameraActive = false;

    // KI-Scan starten
    await this.scanReceipt();
  }

  // Bon scannen
  async scanReceipt() {
    if (!this.capturedImage) return;

    this.isLoading = true;
    this.statusMessage = 'Bon wird analysiert...';

    try {
      // Base64 Header entfernen (nur die reinen Bilddaten schicken)
      const base64 = this.capturedImage.split(',')[1];
      this.products = await this.receiptScanService.scanReceipt(base64);
      this.statusMessage = `${this.products.length} Produkte erkannt!`;
    } catch (error) {
      this.statusMessage = 'Fehler beim Scannen. Bitte nochmal versuchen.';
    }
    this.cdr.detectChanges();
    this.isLoading = false;
  }

  // Zurücksetzen
  reset() {
    this.capturedImage = null;
    this.statusMessage = '';
    this.products = [];
    this.cameraActive = false;
  }
}