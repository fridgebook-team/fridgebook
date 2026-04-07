import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg [attr.viewBox]="viewBox" [attr.width]="size" [attr.height]="size"
         fill="none" 
         [attr.stroke]="isStrokeIcon ? 'currentColor' : 'none'"
         stroke-width="2" 
         stroke-linecap="round" 
         stroke-linejoin="round">
      
      <path [attr.d]="path" 
            [attr.fill]="isStrokeIcon ? 'none' : 'currentColor'" 
            [attr.stroke]="isStrokeIcon ? 'currentColor' : 'none'"/>
    </svg>
  `,
  styles: [`
    :host { 
      display: inline-flex; 
      align-items: center; 
      justify-content: center; 
      line-height: 0;
    }
    svg {
      display: block;
    }
  `]
})
export class Icon {
  @Input() name: 'fridge' | 'heart' | 'search' | 'home' | 'list'| 'leaf' = 'fridge';
  @Input() size: number = 24;

  private paths: Record<string, string> = {
    fridge: 'M18.031,2H6A2.006,2.006,0,0,0,4,4V9.016H8.009V6.009h2V9.016H20.036V4A2.006,2.006,0,0,0,18.031,2ZM10.013,15.029h-2V10.018H4V20.04a2.006,2.006,0,0,0,2,2H18.031a2.006,2.006,0,0,0,2-2V10.018H10.013Z',
    heart: 'M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5,2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3,19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z',
    search: 'M14.824,14.839l4.809,4.795m-2.772-9.7A6.931,6.931,0,1,1,9.931,3,6.931,6.931,0,0,1,16.861,9.931Z',
    home: 'M2.52,7.836C2,8.786,2,9.933,2,12.227v1.525c0,3.91,0,5.864,1.174,7.079s3.064,1.215,6.844,1.215h4.009c3.78,0,5.67,0,6.844-1.215s1.174-3.169,1.174-7.079V12.227c0-2.294,0-3.44-.52-4.391S20.053,6.3,18.152,5.115l-2-1.244C14.138,2.624,13.133,2,12.022,2S9.907,2.624,7.9,3.871l-2,1.244C3.991,6.3,3.041,6.885,2.52,7.836Zm8.75,10.2a.752.752,0,0,0,1.5,0V15.029a.752.752,0,1,0-1.5,0Z',
    list: 'M8.409,6.042H22.474M8.409,12.533H22.474M8.409,19.024H22.474M3.541,6.041h.011m-.011,6.491h.011m-.011,6.491h.011',
    leaf: 'M17,8C14.3,8,11.5,9.1,9.6,11C7.7,12.9,6.5,15.7,6.5,18.5V20H8V18.5C8,16,9,13.6,10.6,12.1C12.2,10.5,14.5,9.5,17,9.5H22V8H17ZM16,11C13.8,11,11.7,11.9,10.1,13.4C8.6,15,7.7,17.1,7.7,19.3V21H9.2V19.3C9.2,17.5,9.9,15.8,11.2,14.5C12.5,13.2,14.2,12.5,16,12.5H21V11H16Z'
  };

  get isStrokeIcon(): boolean {
    return this.name === 'list' || this.name === 'search';
  }

  get path() { return this.paths[this.name]; }
  get viewBox() { return '0 0 24 24'; }
}