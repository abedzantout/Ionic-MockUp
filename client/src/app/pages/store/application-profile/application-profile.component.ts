import {
    Component, ViewEncapsulation, trigger, state,
    style, transition, animate, Input, OnChanges, OnInit
} from '@angular/core';
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
             menuState: string = 'out';

    constructor() {
        this.slideOut();
    }

    private clickEvent() {
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

    ngOnInit() {
        this.slideOut();
    }

    ngOnChanges() {
        console.log(this.input);
        this.slideIn();
    }

    private slideOut(): void {
        console.log('slide out called');
        this.menuState = 'out';
    }

    private slideIn(): void {
        this.menuState = 'in';
    }


}
