import * as $fh from "fh-js-sdk";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CloudOptions } from "../fh-js-sdk";
import { Device } from '@ionic-native/device';
 
@Injectable()
export class RhmapProvider {
  constructor(public device: Device) {
  }

  cloud(options: CloudOptions){
      var uuid;
      if (this.device && this.device.uuid){
        uuid = this.device.uuid
      } else {
        uuid = 'dummyId';
      }
      return new Promise((resolve: Function, reject: Function) => {
        if (!options){
          reject('No options object passed to cloud call');
        } else {
          if (options.data){
            options.data.token = uuid;
          } else {
            options.data = {
              "token": uuid
            }
          } 
          $fh.cloud(options,
            (data: any, status: any, xhr: XMLHttpRequest) => {
              resolve(data);
            },
            (message: string, error: $fh.DefaultCallbackError) =>  {
              reject(message);
            });
          }
      });
  }
}