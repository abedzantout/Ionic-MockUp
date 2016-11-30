import { Component, ViewEncapsulation } from '@angular/core';

declare const require: any;
import * as _ from 'lodash'
@Component({
    selector: 'upload-page',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./uploadPage.component.scss') ],
    template: require('./uploadPage.component.html')

})
export class uploadPageComponent {


    constructor() {

    }

}
