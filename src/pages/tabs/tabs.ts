import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
// import { DetailPage } from './detail/detail';
import { NavController } from 'ionic-angular';
import { RhmapProvider } from '../../providers/rhmap';
import { CloudOptions } from "../../fh-js-sdk";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  name = 'tabsPage';
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private rhmapProvider: RhmapProvider, public navCtrl: NavController) {

  }
  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      var options: CloudOptions = {
        path : 'sso/session/valid',
        method: 'POST'
      }
      this.rhmapProvider.cloud(options)
      .then( res => {
        resolve(true);
      })
      .catch(err => {
        this.navCtrl.popToRoot();
        //alert(JSON.stringify(err));
        reject(false);
      })
    });
  }
}
