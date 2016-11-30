import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class iConfigProvider {

    private jsonContent: Object;

    constructor( private http: Http ) {
        this.getJson();
    }

    getJson() {
        return this.http.get('assets/iconfig.json').map(( res: Response ) =>res);
    }

    setJsonContent( content ) {
        this.jsonContent = content;
    }

    getJsonContent() {
        return this.jsonContent[ "_body" ];
    }

}