import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AboutUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html'
})
export class AboutUsPage {
  headerText: String;
  image: String;
  description: String;

  constructor(public navCtrl: NavController) {
    this.headerText = "Restaurant Name";
    this.image = "../../assets/images/restaurant.jpg";
    this.description = "We are a new restaurant open on Bliss Street, Beirut, Lebanon.";
  }


  ionViewDidLoad() {
    console.log('Hello AboutUs Page');
  }

}
