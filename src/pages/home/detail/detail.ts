import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  public item: string;
  constructor(public navCtrl: NavController,  public navParams: NavParams) {
      this.item = navParams.get('item');
  }



}
