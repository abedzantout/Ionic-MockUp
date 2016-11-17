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

        let content         = this.jsonContent[ 'Application' ][ 'page' ][ 3 ][ 'page3' ];
        let defaultInstance = content[ 'default-instance' ];
        console.log(content);
        this.headerText  = content[ 'instance' ][ defaultInstance ][ 'instance' + defaultInstance ][ 'content' ][ 0 ][ 'content0' ][ 'headerText' ];
        this.image       = content[ 'instance' ][ defaultInstance ][ 'instance' + defaultInstance ][ 'content' ][ 0 ][ 'content0' ][ 'image' ];
        this.description = content[ 'instance' ][ defaultInstance ][ 'instance' + defaultInstance ][ 'content' ][ 0 ][ 'content0' ][ 'description' ];
        this.title       = content[ 'instance' ][ defaultInstance ][ 'instance' + defaultInstance ][ 'title' ];
    }

    ionViewDidLoad() {}

}

