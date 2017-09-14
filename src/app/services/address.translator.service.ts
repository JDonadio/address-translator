import { Injectable } from '@angular/core';
import * as bitcore from 'bitcore-lib';
import * as bitcoreCash from 'bitcore-lib-cash';

@Injectable()
export class AddressTranslatorService {

  public addressResult: string;
  public newAddress: any;

  translate(address: string) {
    try {
      this.newAddress = bitcore.Address(address);
      var hash = this.newAddress.toObject().hash;

      var buf = this.newAddress.toBuffer();
      var ver = buf[0];

      this.addressResult = bitcore.Address.fromBuffer(buf);
      if (ver == 0) buf[0] = 28;
      if (ver == 5) buf[0] = 40;

      this.addressResult = bitcoreCash.Address.fromBuffer(buf);
    } catch (e) {
      console.error(e);
      try {
        this.newAddress = bitcoreCash.Address(address);
        var hash = this.newAddress.toObject().hash;

        var buf = this.newAddress.toBuffer();
        var ver = buf[0];

        this.addressResult = bitcoreCash.Address.fromBuffer(buf);
        if (ver == 0x28) buf[0] = 0;
        if (ver == 0x40) buf[0] = 5;

        this.addressResult = bitcore.Address.fromBuffer(buf);
      } catch (e) {
        console.error(e);
        return null;
      };
    };
    return this.addressResult;
  };
}
