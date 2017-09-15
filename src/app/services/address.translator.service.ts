import { Injectable } from '@angular/core';
import * as bitcore from 'bitcore-lib';
import * as bitcoreCash from 'bitcore-lib-cash';

@Injectable()
export class AddressTranslatorService {

  public addressResult: string;
  private newAddress: any;
  private Bitcore: any;

  constructor() {
    this.Bitcore = {
      'btc': {
        lib: bitcore,
        translateTo: 'bch'
      },
      'bch': {
        lib: bitcoreCash,
        translateTo: 'btc'
      }
    };
  }

  getAddressCoin(address: string) {
    try {
      new this.Bitcore['btc'].lib.Address(address);
      return 'btc';
    } catch (e) {
      try {
        new this.Bitcore['bch'].lib.Address(address);
        return 'bch';
      } catch (e) {
        return null;
      }
    }
  };

  translateAddress(address: string) {
    var origCoin = this.getAddressCoin(address);
    if (!origCoin) return;

    var origAddress = new this.Bitcore[origCoin].lib.Address(address);
    var origObj = origAddress.toObject();

    var resultCoin = this.Bitcore[origCoin].translateTo;
    var resultAddress = this.Bitcore[resultCoin].lib.Address.fromObject(origObj);
    return {
      origCoin: origCoin.toUpperCase(),
      origAddress: address,
      resultCoin: resultCoin.toUpperCase(),
      resultAddress: resultAddress.toString()
    };
  };
}
