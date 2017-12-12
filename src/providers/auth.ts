import { Injectable } from '@angular/core';
import { RhmapProvider } from './rhmap';
import { CloudOptions } from "../fh-js-sdk";

 
@Injectable()
export class AuthProvider {
  constructor(private rhmapProvider: RhmapProvider) {
  }

  login(){
      var options: CloudOptions = {
          path : 'sso/session/login_host',
          method: 'POST'
      }
      return this.rhmapProvider.cloud(options);
      
  }
  isValid(){
    return new Promise((resolve, reject) => {
      var options: CloudOptions = {
        path : 'sso/session/valid',
        method: 'POST'
      }
      this.rhmapProvider.cloud(options)
      .then( res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    });
  }
}