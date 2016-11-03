import { Component } from '@angular/core';
import { Service } from "../../services/service";
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
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

