import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { CloudOptions } from "../../fh-js-sdk";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  name = 'tabsPage';
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private authProvider: AuthProvider, public navCtrl: NavController) {
  }
  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.authProvider.isValid()
      .then( res => {
        resolve(true);
      })
      .catch(err => {
        this.navCtrl.popToRoot();
        reject(false);
      })
    });
  }
}
