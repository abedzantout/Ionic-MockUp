import { Component, ViewEncapsulation } from '@angular/core';
import { templateService } from '../../services/template.service';
declare const require: any;
import * as _ from 'lodash'
import { StoreService } from "../../services/store.service";
@Component({
	selector: 'store',
	encapsulation: ViewEncapsulation.None,
	styles: [ require('./store.component.scss') ],
	template: require('./store.component.html')
})
export class StoreComponent {

	private appName: string;
	private parentCardObject: Object;
	private keyValueStoreObject: Array<Object>;
	private selectedApplicationObject: Object;

	constructor( private _templateService: templateService, private _storeService: StoreService ) {
		this.parentCardObject    = {};
		this.keyValueStoreObject = [];
		this._storeService.getAllApps().subscribe(data => {
				this.parentCardObject = JSON.parse(data[ '_body' ]);
			},
			( err ) => console.log(err),
			() => this.fillStoreData());
	}

	private clickEvent( appName ) {
		this.appName = appName;
		this._templateService.setTemplateName(appName);
		this.selectedApplicationObject = this.parentCardObject[appName];
		console.log(this.selectedApplicationObject);
	}

	private resetAppName( event ) {
		this.appName = '';
	}

	private fillStoreData() {
		this.keyValueStoreObject = [];
		_(this.parentCardObject).forOwn(value => {
			let obj = {};
			_.assign(obj, value);
			this.keyValueStoreObject.push(obj);
		});
	}

}
