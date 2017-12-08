import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from './detail/detail';
import { RhmapProvider } from '../../providers/rhmap';
import { CloudOptions } from "../../fh-js-sdk";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items: any;
  constructor(public navCtrl: NavController,private rhmapProvider: RhmapProvider) {
    var self = this;
    var options: CloudOptions = {
      path : 'api/v1/items'
    }
    this.rhmapProvider.cloud(options)
    .then( items => {

      self.items = items;
    })
    .catch(err => {
      console.log(err);
    })
  }

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {item: item});
  }

}
