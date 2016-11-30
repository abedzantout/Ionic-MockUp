import { Component } from '@angular/core';
import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { DirectorDetailPage } from '../director-detail/director-detail';

@Component({
  selector: 'page-director-list',
  templateUrl: 'director-list.html'
})
export class DirectorListPage {
  actionSheet: ActionSheet;
  directors = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: ConferenceData, public config: Config) {
    confData.getDirectors().then(directors => {
      this.directors = directors;
    });
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToDirectorDetail(directorName: string) {
    this.navCtrl.push(DirectorDetailPage, directorName);
  }

  goToDirectorTwitter(director) {
    // TODO FIX
    // let app = new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
    // app.on('loadstop').subscribe(
    //   (ev) => {
    //     console.log('InAppBrowser loaded!');
    //   });
  }

  openDirectorShare(director) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + director.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + director.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + director.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openContact(director) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact with ' + director.name,
      buttons: [
        {
          text: `Email ( ${director.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + director.email);
          }
        },
        {
          text: `Call ( ${director.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + director.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
