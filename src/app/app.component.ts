import { Component } from '@angular/core';
import * as Translator from 'npm-address-translator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public addressToTranslate: string;
  public result: string;
  public error: string;

  constructor() {
    this.reset();
  }

  translateAddress(address: string) {
    this.result = Translator.translateAddress(this.addressToTranslate);
    if (!this.result) {
      this.error = 'Could not translate address: ' + address;
    }
  }

  reset() {
    this.addressToTranslate = null;
    this.result = null;
  }
}
