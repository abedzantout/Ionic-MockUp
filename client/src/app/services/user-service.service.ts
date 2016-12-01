import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private loggedIn = false;


    constructor( private http: Http ) {
        this.loggedIn = !!localStorage.getItem("auth_token");
    }


    login( email, password ) {

        let resHeader: Object = {};
        let headers           = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(
                '/authenticate',
                JSON.stringify({ email, password }),
                { headers }
            )
            .map(res => res.json())
            .map(( res ) => {
            console.log(res);
                if ( res[ 'success' ] === 'true' ) {
                    console.log("logged in!");
                    localStorage.setItem("auth_token", res[ "auth_token" ]);
                    this.loggedIn = true;
                    resHeader     = { success: true};
                }

                return resHeader;
            });
    }


    register( name, email, password ) {

        let resHeader: Object = {};
        let headers           = new Headers();
        headers.append('Content-Type', 'application/json');


        return this.http
            .post('/register',
                JSON.stringify({ name, email, password }),
                { headers }
            )
            .map(res => res.json())
            .map(( res ) => {
                console.log(res);
                if ( res[ 'success' ] === 'true') {
                    return { success: true };
                }

                return {success: false};

            });


    }


    logout() {
        localStorage.removeItem("auth_token");
        this.loggedIn = false;
    }

    isLoggedIn() {

        return this.loggedIn;
    }


}