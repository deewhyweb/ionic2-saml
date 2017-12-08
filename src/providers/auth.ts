import { Injectable } from '@angular/core';
import { RhmapProvider } from './rhmap';
import { CloudOptions } from "../fh-js-sdk";

 
@Injectable()
export class AuthProvider {
  constructor(private rhmapProvider: RhmapProvider) {
  }

  generateBasicAuthToken(username: string, password: string){
    var token: string = username + ':' + password;
    var hash: string = btoa(token);
    return hash;
  }

  verify(username: string, password: string){
    if (!username || !password){
        return Promise.reject('Missing argument');
    } else {
        this.rhmapProvider.setToken(this.generateBasicAuthToken(username, password));
        var options: CloudOptions = {
            path : 'verify'
        }
        return this.rhmapProvider.cloud(options);
        
    }
  }
}