import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'director-detail.html'
})
export class DirectorDetailPage {
  director: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.director = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }
}
