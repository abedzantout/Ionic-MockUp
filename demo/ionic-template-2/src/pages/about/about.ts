import { Component } from '@angular/core';
import { iConfigProvider } from "../../providers/iconfig.provider";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    private jsonContent: Object;
            defaultSelect: string;
    private counter: number;
    public movieDate: string;
    public locations: Array<Object>;

    constructor( private _iConfigProvider: iConfigProvider ) {
        this.counter     = -1;
        this.jsonContent = this._iConfigProvider.getJson().subscribe(
            ( data ) => {this.jsonContent = data;},
            ( err ) => {console.log(err);},
            () => {
                this._iConfigProvider.setJsonContent(this.jsonContent);
                this.setJsonLocally();
            }
        );
    }


    private setJsonLocally() {
        this.jsonContent    = JSON.parse(this._iConfigProvider.getJsonContent());
        let content         = this.jsonContent [ 'Application' ][ 'page' ][ 0 ][ 'page1' ];
        let defaultInstance = content[ 'default-instance' ];
        this.movieDate      = content [ 'instance' ] [ defaultInstance ][ 'instance' + defaultInstance ][ 'movieDate' ];

        this.locations      = content [ 'instance' ] [ defaultInstance ][ 'instance' + defaultInstance ][ 'location' ];
        let defaultLocation = content [ 'instance' ] [ defaultInstance ][ 'instance' + defaultInstance ][ 'default-location' ];
        this.defaultSelect  = this.locations[ defaultLocation ] [ 'location' + defaultLocation ][ 'value' ];

    }
    presentPopover( event ) {}

}
