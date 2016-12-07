import {
	Component, ViewEncapsulation, trigger, state,
	style, transition, animate, Input, OnChanges, OnInit, Output, EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';

declare const require: any;
@Component({
	selector: 'application-profile',
	encapsulation: ViewEncapsulation.Emulated,
	styles: [ require('./application-profile.component.scss') ],
	template: require('./application-profile.component.html'),
	animations: [
		trigger('slideInOut', [
			state('in', style({
				transform: 'translate3d(0, 0, 0)'
			})),
			state('out', style({
				transform: 'translate3d(100%, 0, 0)'
			})),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		]),
	]
})
export class ApplicationProfileComponent implements OnChanges, OnInit {
	@Input() applicationInfo;
	@Input() appName;
	private menuState: string;
	private screenshots: Array<string>;
	private loadProfile: boolean;
	private loadFrames: boolean;
	@Output() resetAppName = new EventEmitter<string>();

	constructor( private _router: Router ) {
		this.loadFrames  = false;
		this.loadProfile = false;
		this.screenshots = [];
	}

	ngOnInit() {
		this.loadFrames  = false;
		this.loadProfile = false;
		this.screenshots = [];
	}

	ngOnChanges() {
		this.screenshots = [];
		this.loadFrames  = false;
		this.loadProfile = false;
		if ( this.appName != '' ) {
			this.menuState = this.menuState === 'out' ? 'in' : 'out';
			if ( this.menuState === 'in' ) {
				jQuery('.store-container').toggle('with-scroll')
			}
			if ( this.menuState == undefined ) {
				this.menuState = 'out';
			}
			if ( this.applicationInfo !== undefined ) {
				this.loadProfile = true;
				this.fillApplicationInformation();
			}

		}
	}

	private slideOut(): void {
		this.menuState = 'out';
		jQuery('.store-container').toggle('no-scroll');
		this.resetAppName.emit(null);
	}

	private goToEditor() {
		this._router.navigate([ 'dashboard' ]);
	}

	private fillApplicationInformation() {
		this.applicationInfo[ 'screenshots' ].forEach(screenshot => this.screenshots.push(screenshot));
		if ( this.screenshots.length > 0 ) {
			this.loadFrames = true;
		}
	}

}
