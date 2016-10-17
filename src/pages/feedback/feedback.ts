import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from "../../services/service";

/*
 Generated class for the Feedback page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html'
})
export class FeedbackPage {
    fields: Array<{input: string}> = [];
    private jsonContent: Object;
    private title: string;

    constructor( public navCtrl: NavController, private _service: Service ) {

        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => {this.jsonContent = data;},
            ( err ) => {console.log(err);},
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();
            }
        );


    }

    private setJsonLocally() {

        this.jsonContent = JSON.parse(this._service.getJsonContent());
        let content      = this.jsonContent[ 'Application' ][ 'pages' ][1]['feedback'] ;
        this.title = content['title'];
        this.fields = content['content'];
    }
}
