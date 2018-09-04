import { Component } from '@angular/core';
import { AddressTranslatorService } from '../app/services/address.translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AddressTranslatorService]
})
export class AppComponent {

  public cashAddr: string;
  public copayAddr: string;
  public legacyAddr: string;
  public cashAddrUpperCase: string;
  public copiedFormat: string;
  public showCopyAlert: boolean;

  constructor(
    private addressTranslatorService: AddressTranslatorService
  ) {
    this.showCopyAlert = false;
  }

  public translateAddress(addr: string): void {
    this.legacyAddr = this.addressTranslatorService.translateLegacyAddress(addr);
    this.copayAddr = this.addressTranslatorService.translateCopayAddress(this.legacyAddr);
    this.cashAddr = this.addressTranslatorService.translateCashAddress(this.copayAddr);
    this.cashAddrUpperCase = this.cashAddr.toUpperCase();
  }

  public copyToClipboard(addr: string, format: string): void {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = addr;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showCopyAlert = true;
    this.copiedFormat = format;
  }

  public close(): void {
    this.showCopyAlert = false;
  }
}
