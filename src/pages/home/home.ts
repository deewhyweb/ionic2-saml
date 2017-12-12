import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
// // import { DetailPage } from './detail/detail';
import { App, NavController } from 'ionic-angular';
import { RhmapProvider } from '../../providers/rhmap';
import { CloudOptions } from "../../fh-js-sdk";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public formData : FormGroup;
  constructor( private formBuilder: FormBuilder,  public navCtrl: NavController, public rhmapProvider: RhmapProvider, private app:App) {
    this.formData = this.formBuilder.group({});
    
  }
  
  doLogout() {
    var options: CloudOptions = {
      path : 'sso/logout',
      method: 'POST'
    }
    this.rhmapProvider.cloud(options)
    .then( res => {
      this.app.getRootNav().setRoot(LoginPage);
    })
    .catch(err => {
      //alert(JSON.stringify(err));
      alert(err);
    })
  }
}
