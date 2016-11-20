import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Service } from "../../services/service";
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { MenuPage } from "../../pages/menu/menu";
/*
 Generated class for the Feedback page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'feedback-page',
    templateUrl: 'feedback.html'
})
export class FeedbackPage {
    @ViewChild(Nav) nav: Nav;

    private navPage: string;

    fields: Array<{ input: string }> = [];
    private jsonContent: Object;
    title: string;
    buttons: Array<any>;
    private buttonIndex: number;

    constructor( public navCtrl: NavController, private _service: Service ) {

        this.buttonIndex = -1;

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
        console.log(this.jsonContent[ 'Application' ][ 'page' ][ 1 ][ 'feedback' ][ 'default-instance' ]);
        let content  = this.jsonContent[ 'Application' ][ 'page' ][ 1 ][ 'feedback' ][ 'default-instance' ];
        this.title   = content[ 'title' ];
        this.fields  = content[ 'content' ];
        this.buttons = content[ 'buttons' ];
    }


    private mapClick( buttonOnClick ) {
        let component: Component = null;

        let linksTo = buttonOnClick[ 'linksTo' ];

        let page = parseInt(linksTo[1]);
        let instance = parseInt(linksTo[3]);

        switch (page) {
            case 0: {
                component = HomePage;
                this._service.setDefaultInstance(instance);
                break;
            }
            case 1: {
                component = FeedbackPage;
                break;
            }
            default:
                component = null;
        }


        return component;

    }

    private openPage( button ) {
        this.navCtrl.push(this.mapClick(button));
    }
}
