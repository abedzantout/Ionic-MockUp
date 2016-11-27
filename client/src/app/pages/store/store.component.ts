import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
declare const require: any;
@Component({
    selector: 'store',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./store.component.scss') ],
    template: require('./store.component.html')
})
export class StoreComponent {

    private countCards: Array<number>;
    constructor() {
        this.countCards = Array(10).fill(10).map((x,i)=>i);
    }

}
