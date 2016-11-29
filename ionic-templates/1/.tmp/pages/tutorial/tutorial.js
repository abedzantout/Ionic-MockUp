import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ConferenceData } from '../../providers/conference-data';
export var TutorialPage = (function () {
    //READ JSON FILE
    function TutorialPage(navCtrl, menu, confData) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.confData = confData;
        this.slides = [];
        this.showSkip = true;
        confData.getSlide().then(function (slides) {
            _this.slides = slides;
        });
    }
    TutorialPage.prototype.startApp = function () {
        this.navCtrl.push(TabsPage);
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd;
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    TutorialPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-tutorial',
                    templateUrl: 'tutorial.html'
                },] },
    ];
    /** @nocollapse */
    TutorialPage.ctorParameters = [
        { type: NavController, },
        { type: MenuController, },
        { type: ConferenceData, },
    ];
    return TutorialPage;
}());
//# sourceMappingURL=tutorial.js.map