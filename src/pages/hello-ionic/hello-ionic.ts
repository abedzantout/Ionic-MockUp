import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { AboutUsPage } from '../about-us/about-us';
import { FeedbackPage } from '../feedback/feedback';


@Component({
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    pages: Array<{title: string, component: any}>;

    constructor( private navCtrl: NavController ) {

        this.pages = [
            { title: 'Menu', component: MenuPage },
            { title: 'About us', component: AboutUsPage },
            { title: 'feedback', component: FeedbackPage }
        ];

    }

    goToPage( page ) {
        this.navCtrl.push(page.component);
    }
}
