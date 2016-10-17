import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from "../../services/service";

/*
 Generated class for the AboutUs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-about-us',
    templateUrl: 'about-us.html'
})
export class AboutUsPage {
    private jsonContent: Object;
            headerText: string;
            image: string;
            description: string;
            title: string;

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
        let content      = this.jsonContent[ 'Application' ][ 'pages' ][ 3 ] [ 'about-us' ];
        this.headerText  = content[ 'content' ][ 'headerText' ];
        this.image       = content[ 'content' ][ 'image' ];
        this.description = content[ 'content' ][ 'description' ];
        this.title       = content[ 'title' ];
    }

    ionViewDidLoad() {}

}

