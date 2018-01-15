import { Injectable } from '@angular/core';
import * as bitcore from 'bitcore-lib';
import * as bitcoreCash from 'bitcore-lib-cash';

@Injectable()
export class AddressTranslatorService {

  constructor() {
  }

  public getAddressCoin(address: string): any {
    try {
      bitcore.Address(address);
      return 'btc';
    } catch (e) {
      try {
        bitcoreCash.Address(address);
        return 'bch';
      } catch (e) {
        return null;
      }
    }
  };

  public translateCashAddress(addressToTranslate: string): string {
    var origAddress = bitcore.Address(addressToTranslate);
    var origObj = origAddress.toObject();
    var resultAddress = bitcoreCash.Address.fromObject(origObj).toCashAddress();
    return resultAddress;
  }

  public translateCopayAddress(addressToTranslate: string): string {
    var origAddress = bitcore.Address(addressToTranslate);
    var origObj = origAddress.toObject();
    var resultAddress = bitcoreCash.Address.fromObject(origObj);
    return resultAddress;
  }

  public translateLegacyAddress(addressToTranslate: string): string {
    var origCoin = this.getAddressCoin(addressToTranslate);
    if (origCoin == 'btc') return addressToTranslate;

    var origAddress = bitcoreCash.Address(addressToTranslate);
    var origObj = origAddress.toObject();
    var resultAddress = bitcore.Address.fromObject(origObj);
    return resultAddress;
  }
}
