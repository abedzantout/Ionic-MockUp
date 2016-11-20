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
    contents: Object;

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
        this.jsonContent    = JSON.parse(this._service.getJsonContent());
        let defaultInstance = this._service.getDefaultInstance();

        let ObjectArray = this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'home' ][ 'instance' ];
        let valuesArray = ObjectArray.map(d => {
            return String(Object.keys(d));
        });
        this.contents   = this.jsonContent[ 'Application' ][ 'page' ][ 0 ][ 'home' ][ 'instance' ][ defaultInstance ][ valuesArray[ defaultInstance ] ];

        this.title   = this.contents[ 'title' ];
        this.content = [
            {
                title: this.contents[ 'content' ][ 0 ][ 'content0' ][ 'title' ],
                component: MenuPage
            },
            {
                title: this.contents[ 'content' ][ 1 ][ 'content1' ][ 'title' ],
                component: AboutPage
            },
            {
                title: this.contents[ 'content' ][ 2 ][ 'content2' ][ 'title' ],
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
