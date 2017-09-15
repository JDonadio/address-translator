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
  public result: string;
  public error: string;

  constructor(private Translator: AddressTranslatorService) {

  }

  translateAddress(addr: string) {
    this.result = this.Translator.translateAddress(addr);
    if (!this.result) this.error = 'Could not translate address: ' + addr;
    else this.result.toString();
  }

  reset() {
    this.addressToTranslate = null;
    this.result = null;
  }
}
