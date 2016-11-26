import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
declare const require: any;
@Component({
    selector: 'store',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./store.component.scss') ],
    template: require('./store.component.html')
})
export class StoreComponent {

    constructor() {}

}
