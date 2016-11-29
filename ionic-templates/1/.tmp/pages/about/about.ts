import { Component } from '@angular/core';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  movieDate = '2016-05-17'; //DEFAULT INSTANCE

  constructor() { }

    presentPopover(event) {
        console.log('gaelle is stupid')
    }

}
