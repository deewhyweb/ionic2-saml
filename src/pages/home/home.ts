import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from './detail/detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items: any;
  constructor(public navCtrl: NavController) {
    this.items = [];
    this.items.push({label:'Item 1', description: 'Description for Item 1'});
    this.items.push({label:'Item 2', description: 'Description for Item 2'});
    this.items.push({label:'Item 3', description: 'Description for Item 3'});
    this.items.push({label:'Item 4', description: 'Description for Item 4'});
    this.items.push({label:'Item 5', description: 'Description for Item 5'});
  }

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {item: item});
  }

}
