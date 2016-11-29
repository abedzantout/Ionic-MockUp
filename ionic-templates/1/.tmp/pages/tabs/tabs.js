import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { DirectorListPage } from '../director-list/director-list';
export var TabsPage = (function () {
    function TabsPage(navParams) {
        // set the root pages for each tab
        this.tab1Root = SchedulePage;
        this.tab2Root = DirectorListPage;
        this.tab3Root = MapPage;
        this.tab4Root = AboutPage;
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
                },] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = [
        { type: NavParams, },
    ];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map