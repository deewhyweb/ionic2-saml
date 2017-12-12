import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public formData : FormGroup;

  constructor(private iab: InAppBrowser,
    private formBuilder: FormBuilder, 
    public navCtrl: NavController, 
    private authProvider: AuthProvider,
    public alertCtrl: AlertController) {
    this.formData = this.formBuilder.group({});
  }

  showAlert(err: string) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }
  
  doLogin(event){
    var self = this;
    this.authProvider.login()
    .then((res: any) => {
      
      {
        console.log('sso host:' + res.sso);
        var browser = this.iab.create(res.sso, '_blank', 'location=yes');
        browser.on('loadstop')
        .subscribe(function(event) {
          //alert(JSON.stringify(event));
          if (event.url && event.url.indexOf('/login/ok') > -1) { // User now logged in!
            browser.close();
            self.navCtrl.push(TabsPage)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
          }
          
        })

        browser.on('loaderror')
        .subscribe(function(event) {
          browser.close();
          setTimeout(function() {
            self.showAlert('Error displaying SSO login page, please try again');
          }, 500);

          console.error('error: ' + event.message);
        });
        browser.on('exit').
        subscribe(function(event) {
          console.error(event.type);
        });
      }
    })
    .catch(err => {
      self.showAlert(err);
    })
  }
}
