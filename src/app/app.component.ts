import { Component } from '@angular/core';
import { AddressTranslatorService } from '../app/services/address.translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AddressTranslatorService]
})
export class AppComponent {

  public cashAddr: any;
  public copayAddr: any;
  public legacyAddr: any;

  constructor(
    private addressTranslatorService: AddressTranslatorService
  ) {
  }

  public translateAddress(addr: string): void {
    this.legacyAddr = this.addressTranslatorService.translateLegacyAddress(addr);
    this.copayAddr = this.addressTranslatorService.translateCopayAddress(this.legacyAddr);
    this.cashAddr = this.addressTranslatorService.translateCashAddress(this.copayAddr);
  }
}
