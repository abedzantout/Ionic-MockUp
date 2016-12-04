import { Component, ViewEncapsulation } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


declare var require: any;
@Component({
    selector: 'ion-frame',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./ionic-frame.component.scss') ],
    template: require('./ionic-frame.component.html')
})
export class IonicFrame {

    private frameSrc: SafeResourceUrl;
    private port: string;

    constructor(private http: Http, private domSanitizer : DomSanitizer) {

        this.getFrameSrc().subscribe(

            (data) => {console.log(data);this.port = data['_body'];},
            (err)=> console.log(err),
            () => {this.setFrameSrc(this.port)}

        );

    }


    setFrameSrc(port){
        this.frameSrc = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:"+port);
    }


    getFrameSrc(): Observable<Response>{

        return this.http.get('http://localhost:3000/ionicPort').map((res:Response)=>res);

    }

}
