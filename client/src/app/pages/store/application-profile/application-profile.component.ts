import {
    Component, ViewEncapsulation, trigger, state,
    style, transition, animate, Input, OnChanges, OnInit, Output, EventEmitter
} from '@angular/core';

import {Router} from '@angular/router';

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
    @Input() input;
    private menuState: string;
    @Output() resetAppName = new EventEmitter<string>();

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    ngOnChanges() {

        if(this.input != '') {
            this.menuState = this.menuState === 'out' ? 'in' : 'out';
            if (this.menuState == undefined) {
                this.menuState = 'out';
            }
        }
    }

    private slideOut(): void {
        this.menuState = 'out';
        this.resetAppName.emit(null);

    }


    private goToEditor(){

         // set template ID

            this._router.navigate(['dashboard']);
    }


}
