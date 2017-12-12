import * as $fh from "fh-js-sdk";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CloudOptions } from "../fh-js-sdk";
import { Device } from '@ionic-native/device';
 
@Injectable()
export class RhmapProvider {
  uuid: string;
  constructor(public device: Device) {
  }

  getDeviceId(){
    if (!this.uuid){
      if (this.device && this.device.uuid){
        this.uuid = this.device.uuid;
      } else {
        this.uuid = 'dummyId';
      }
    }
    return this.uuid;
  }

  cloud(options: CloudOptions){

      return new Promise((resolve: Function, reject: Function) => {
        if (!options){
          reject('No options object passed to cloud call');
        } else {
          if (options.data){
            options.data.token = this.getDeviceId();
          } else {
            options.data = {
              "token": this.getDeviceId()
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