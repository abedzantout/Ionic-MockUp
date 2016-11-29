import { Component, ViewEncapsulation } from '@angular/core';
import { templateService } from '../../services/template.service';
declare const require: any;
import * as _ from 'lodash'
@Component({
	selector: 'store',
	encapsulation: ViewEncapsulation.None,
	styles: [ require('./store.component.scss') ],
	template: require('./store.component.html')
})
export class StoreComponent {

	private appName: string;
	private countCards: Array<Object>;

	constructor( private _templateService: templateService ) {
		this.countCards = [ {
			"image": 'assets/app-icons/classic-diner-icon.jpg',
			"title": "Restaurant Review",
			"description": "Restaurant menu application"
		} ]
	}

	private clickEvent( appName ) {
		this.appName = appName;
		this._templateService.setTemplateName(appName);
	}

	private resetAppName( event ) {
		this.appName = '';
	}

}
