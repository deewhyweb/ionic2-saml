import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public formData : FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public navCtrl: NavController, 
    private authProvider: AuthProvider,
    public alertCtrl: AlertController) {
    this.formData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
    this.authProvider.verify(this.formData.value.username, this.formData.value.password)
    .then(() => {
      
      self.navCtrl.setRoot(TabsPage);
    })
    .catch(err => {
      self.showAlert(err);
    })
  }
}
