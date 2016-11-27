import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
declare const require: any;
@Component({
    selector: 'store',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./store.component.scss') ],
    template: require('./store.component.html')
})
export class StoreComponent {

    private countCards: Array<Object>;

    constructor() {
        this.countCards = [ {
            "image": 'assets/app-icons/classic-diner-icon.jpg',
            "title": "Classic Diner",
            "description": "Restaurant menu application"
        },
            {
                "image": 'assets/app-icons/conference-icon.jpg',
                "title": "Conference",
                "description": "Conference event scheduling"
            },

            {
                "image": 'assets/app-icons/mean-critique-icon.jpg',
                "title": "Mean Critique",
                "description": "movie review application"
            },
            {
                "image": 'assets/app-icons/Ticket-Vender-icon.jpg',
                "title": "Ticket Vender",
                "description": "selling event tickets"
            } ]
    }

}
