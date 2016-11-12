import { Component, ViewEncapsulation } from '@angular/core';

declare var require: any;
@Component({
    selector: 'ion-frame',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./ionic-frame.component.scss') ],
    template: require('./ionic-frame.component.html')
})
export class IonicFrame {

    constructor() {
    }

}
