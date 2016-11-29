import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionDetailPage } from '../session-detail/session-detail';
export var DirectorDetailPage = (function () {
    function DirectorDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.director = this.navParams.data;
    }
    DirectorDetailPage.prototype.goToSessionDetail = function (session) {
        this.navCtrl.push(SessionDetailPage, session);
    };
    DirectorDetailPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-speaker-detail',
                    templateUrl: 'director-detail.html'
                },] },
    ];
    /** @nocollapse */
    DirectorDetailPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
    ];
    return DirectorDetailPage;
}());
//# sourceMappingURL=director-detail.js.map