import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { AboutUsPage } from '../about-us/about-us';
import { FeedbackPage } from '../feedback/feedback';
import { Service } from "../../services/service";


@Component({
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    content: Array<{title: string, component: any}>;
    private title: string = "Main Page";

    constructor( private navCtrl: NavController, private _service: Service ) {

        this.content = [
            { title: 'Menu', component: MenuPage },
            { title: 'About us', component: AboutUsPage },
            { title: 'feedback', component: FeedbackPage }
        ];
    }

    goToPage( page ) {
        this.navCtrl.push(page.component);
    }
}
