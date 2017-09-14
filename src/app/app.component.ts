import { Component } from '@angular/core';
import { AddressTranslatorService } from '../app/services/address.translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AddressTranslatorService]
})
export class AppComponent {
  public addressToTranslate: string;
  private result: string;

  constructor(private Translator: AddressTranslatorService) {
    this.addressToTranslate = '1JJFrtJN2PLgaWqGfS1JziXmXBHkrmTUF9';
  }

  translateAddress(addr: string) {
    console.log('Address to translate: ' + addr);
    this.result = this.Translator.translate(addr) || 'Could not translate address: ' + addr;
  }
}
