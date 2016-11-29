import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodItemsProvider } from '../../providers/food-items-provider';
import { Service } from "../../services/service";

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
    providers: [ FoodItemsProvider ]
})

export class MenuPage {

    title: string;
    contents: Object;
    private jsonContent: Object;

    constructor( private _service: Service ) {

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
        let parentContent   = this.jsonContent[ 'Application' ][ 'page' ][ 2 ][ 'menu' ];
        let defaultInstance = this._service.getDefaultInstance();
        this.contents       = parentContent[ 'instance' ][ defaultInstance ][ 'instance' + defaultInstance ][ 'content' ];
    }

}
