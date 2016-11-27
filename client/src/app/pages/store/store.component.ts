import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
declare const require: any;
@Component({
    selector: 'store',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./store.component.scss') ],
    template: require('./store.component.html')
})
export class StoreComponent {

    private countCards: Array<string>;

    constructor() {
        this.countCards = [ 'assets/app-icons/classic-diner-icon.jpg',
            'assets/app-icons/conference-icon.jpg',
            'assets/app-icons/mean-critique-icon.jpg',
            'assets/app-icons/Ticket-Vender-icon.jpg' ]
    }

}
