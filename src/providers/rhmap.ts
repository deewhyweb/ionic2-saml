import * as $fh from "fh-js-sdk";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CloudOptions } from "../fh-js-sdk";
 
@Injectable()
export class RhmapProvider {
  token: string;
  constructor() {
  }
  setToken(token: string){
      this.token = token;
  }
  cloud(options: CloudOptions){

      return new Promise((resolve: Function, reject: Function) => {
        if (!this.token){
            reject('Missing token');
        } else {
        options.headers = {
            "Authorization": "Basic " + this.token
        }
        $fh.cloud(options,
          (data: any, status: any, xhr: XMLHttpRequest) => {
            resolve(data);
          },
          (message: string, error: $fh.DefaultCallbackError) =>  {
            //resolve(true);
            reject(message);
          })
        };
      });
  }
}