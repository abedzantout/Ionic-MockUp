import { Component } from '@angular/core';
import { ActionSheetController, Config, NavController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { DirectorDetailPage } from '../director-detail/director-detail';
export var DirectorListPage = (function () {
    function DirectorListPage(actionSheetCtrl, navCtrl, confData, config) {
        var _this = this;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.confData = confData;
        this.config = config;
        this.directors = [];
        confData.getDirectors().then(function (directors) {
            _this.directors = directors;
        });
    }
    DirectorListPage.prototype.goToSessionDetail = function (session) {
        this.navCtrl.push(SessionDetailPage, session);
    };
    DirectorListPage.prototype.goToDirectorDetail = function (directorName) {
        this.navCtrl.push(DirectorDetailPage, directorName);
    };
    DirectorListPage.prototype.goToDirectorTwitter = function (director) {
        // TODO FIX
        // let app = new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
        // app.on('loadstop').subscribe(
        //   (ev) => {
        //     console.log('InAppBrowser loaded!');
        //   });
    };
    DirectorListPage.prototype.openDirectorShare = function (director) {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share ' + director.name,
            buttons: [
                {
                    text: 'Copy Link',
                    handler: function () {
                        console.log('Copy link clicked on https://twitter.com/' + director.twitter);
                        if (window['cordova'] && window['cordova'].plugins.clipboard) {
                            window['cordova'].plugins.clipboard.copy('https://twitter.com/' + director.twitter);
                        }
                    }
                },
                {
                    text: 'Share via ...',
                    handler: function () {
                        console.log('Share via clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    DirectorListPage.prototype.openContact = function (director) {
        var mode = this.config.get('mode');
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Contact with ' + director.name,
            buttons: [
                {
                    text: "Email ( " + director.email + " )",
                    icon: mode !== 'ios' ? 'mail' : null,
                    handler: function () {
                        window.open('mailto:' + director.email);
                    }
                },
                {
                    text: "Call ( " + director.phone + " )",
                    icon: mode !== 'ios' ? 'call' : null,
                    handler: function () {
                        window.open('tel:' + director.phone);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    DirectorListPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-director-list',
                    templateUrl: 'director-list.html'
                },] },
    ];
    /** @nocollapse */
    DirectorListPage.ctorParameters = [
        { type: ActionSheetController, },
        { type: NavController, },
        { type: ConferenceData, },
        { type: Config, },
    ];
    return DirectorListPage;
}());
//# sourceMappingURL=director-list.js.map