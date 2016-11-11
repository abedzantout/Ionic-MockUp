import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Service } from "../../services/service";
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
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
        console.log(this.jsonContent[ 'Application' ][ 'page' ][ 1 ][ 'page2' ]);
        let content  = this.jsonContent[ 'Application' ][ 'page' ][ 1 ][ 'page2' ][ 'instance' ][ this.getDefaultInstance() ]['instance3'][ 'feedback' ];
        this.title   = content[ 'title' ];
        this.fields  = content[ 'content' ];
        this.buttons = content[ 'buttons' ];
        for ( let button of this.buttons ) {
            console.log(button);
        }
    }


    private static mapClick(buttonOnClick){

        let component: Component = null;
        switch (buttonOnClick) {
            case "HomePage":
                component = HomePage;
                break;
            case "AboutPage":
                component = AboutPage;
                break;
            default: component = null;
        }

        return component;

    }

    private openPage( button ) {
        // this.buttonIndex += 1;
        this.navCtrl.push(FeedbackPage.mapClick(button['onClick']));
    }

    private getDefaultInstance() {
        return this.jsonContent[ 'Application' ][ 'page' ][ 1 ][ 'page2' ][ 'default-instance' ];
    }
}
