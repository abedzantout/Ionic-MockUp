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
	private contentKeys: Array<string>;

	constructor( private _service: Service ) {

		this.contentKeys = [];

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
		let parentContent   = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 2 ][ 'Restaurant Menu' ];
		let defaultInstance = this._service.getDefaultInstance();

		if ( defaultInstance == null ) {
			this.contents = parentContent[ 'default-instance' ][ 'content' ];
		} else {
			this.contents = parentContent[ 'instance' ][ this._service.getDefaultInstance() ];
			let key       = Object.keys(this.contents)[ 0 ];
			this.contents = parentContent[ 'instance' ][ this._service.getDefaultInstance() ][ key ];
			this.contents['content'].forEach(d => {
				let keys = Object.keys(d);
				this.contentKeys.push(keys[0]);
			});
			this.contents = this.contents['content'];
			this._service.setDefaultInstance(null);
		}
	}

}
