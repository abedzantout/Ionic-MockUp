import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { FeedbackPage } from '../feedback/feedback';
import { Service } from "../../services/service";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    content: Array<{ title: string, component: any }>;
    title: string;
    jsonContent: Object;

    constructor( private navCtrl: NavController, private _service: Service ) {

        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => { this.jsonContent = data; },
            ( err ) => { console.log(err); },
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();
            }
        );
    }

    private setJsonLocally() {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.title       = this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'page1' ][ 'instance' ][0]['instance1'][ 'title' ];
        this.content     = [
            {
                title:  this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'page1' ]['instance'][0]['instance1']['content'][0]['content1']['title'],
                component: MenuPage
            },
            {
                title:  this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'page1' ]['instance'][0]['instance1']['content'][1]['content2']['title'],
                component: AboutPage
            },
            {
                title: this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'page1' ]['instance'][0]['instance1']['content'][2]['content3']['title'],
                component: FeedbackPage
            }
        ]

    }

    private getLocalContent() {
        return this.jsonContent;
    }

    goToPage( page ) {
        this.navCtrl.push(page.component);
    }
}
