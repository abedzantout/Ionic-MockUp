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


        let defaultInstance = this._service.getDefaultInstance();

        let content = null;
        if(defaultInstance == null) {
             content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 3 ][ 'about' ][ 'default-instance' ];
        }else{
            content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 3 ][ 'about' ][ 'instance' ][this._service.getDefaultInstance()];
            let key = Object.keys(content)[0];
            content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 3 ][ 'about' ][ 'instance' ][this._service.getDefaultInstance()][key];

            this._service.setDefaultInstance(null);
        }

        this.headerText  = content[ 'content' ][ 0 ][ 'content0' ][ 'headerText' ];
        this.image       = content[ 'content' ][ 0 ][ 'content0' ][ 'image' ];
        this.description = content[ 'content' ][ 0 ][ 'content0' ][ 'description' ];
        this.title       = content[ 'title' ];

    }

    ionViewDidLoad() {}

}

