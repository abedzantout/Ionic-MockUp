import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Service } from "../../services/service";
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { MenuPage } from "../../pages/menu/menu";
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
	private buttonNames: Array<string>;


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
		this.buttonNames = [];

		this.jsonContent = JSON.parse(this._service.getJsonContent());

		let defaultInstance = this._service.getDefaultInstance();

		let content = null;
		if(defaultInstance == null) {
			 content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 1 ][ 'feedback' ][ 'default-instance' ];
		}else{
			content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 1 ][ 'instance' ][this._service.getDefaultInstance()];
			let key = Object.keys(content)[0];
			content = this.jsonContent[ 'Restaurant Review' ][ 'page' ][ 1 ][ 'instance' ][this._service.getDefaultInstance()][key];

			this._service.setDefaultInstance(null);
		}

		this.title   = content[ 'title' ];
		this.fields  = content[ 'content' ];

		this.buttons = content[ 'buttons' ];

		this.buttons.forEach(m => {
			let keys = Object.keys(m)[0];
			this.buttonNames.push(keys);
		});
		console.log(this.buttons);
	}

	private mapClick( buttonOnClick ) {
		console.log(buttonOnClick);
		let component: Component = null;

		let linksTo = buttonOnClick[ 'linksTo' ];

		let page     = parseInt(linksTo[ 1 ]);
		let instance = parseInt(linksTo[ 3 ]);

		console.log("PAGE IS: "+page);
		switch (page) {
			case 0: {
				component = HomePage;
				this._service.setDefaultInstance(instance);
				break;
			}
			case 1: {
				component = FeedbackPage;
				this._service.setDefaultInstance(instance);
				break;
			}
			case 2:{
				component = MenuPage;
				this._service.setDefaultInstance(instance);
				break;
			}

			case 3:{
				component = AboutPage;
				this._service.setDefaultInstance(instance);
				break;
			}
			default:
				component = null;
		}

		return component;

	}

	private openPage( button ) {
		this.navCtrl.push(this.mapClick(button));
	}
}
