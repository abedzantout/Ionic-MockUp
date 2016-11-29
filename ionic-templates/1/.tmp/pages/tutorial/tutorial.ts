import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ConferenceData } from '../../providers/conference-data';
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides=[];
  showSkip = true;
  //READ JSON FILE
  constructor(public navCtrl: NavController, public menu: MenuController,public confData: ConferenceData) {
    confData.getSlide().then(slides => {
      this.slides = slides;
    });
  }

  startApp() {
    this.navCtrl.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
