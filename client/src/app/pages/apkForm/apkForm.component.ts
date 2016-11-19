import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';


import { BaThemeConfigProvider } from "../../theme/theme.configProvider";

import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { RequestOptions, Headers } from "@angular/http";
declare var require: any;

@Component({
    selector: 'apk-form',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./apkForm.scss') ],
    template: require('./apkForm.html')
})


export class apkForm {
    public form: FormGroup;
    public keyPassword: AbstractControl;
    public authorsName: AbstractControl;
    public organizationalUnit: AbstractControl;
    public organizationName: AbstractControl;
    public cityName: AbstractControl;
    public stateName: AbstractControl;
    public countryCode: AbstractControl;

    constructor( fb: FormBuilder, private router: Router, private _baConfig: BaThemeConfigProvider, private ngZone: NgZone, private http: Http ) {

        this.form = fb.group({
            'keyPassword': [ '', Validators.compose([ Validators.required, Validators.minLength(2) ]) ],
            'authorsName': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ],
            'organizationalUnit': [ '', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
            'organizationName': [ '', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
            'cityName': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ],
            'stateName': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ],
            'countryCode': [ '', Validators.compose([ Validators.required, Validators.minLength(2) ]) ],
        });

        this.keyPassword        = this.form.controls[ 'keyPassword' ];
        this.authorsName        = this.form.controls[ 'authorsName' ];
        this.organizationalUnit = this.form.controls[ 'organizationalUnit' ];
        this.organizationName   = this.form.controls[ 'organizationName' ];
        this.cityName           = this.form.controls[ 'cityName' ];
        this.stateName          = this.form.controls[ 'stateName' ];
        this.countryCode        = this.form.controls[ 'countryCode' ];
    }


    private download(): Observable<any> {

        return this.http.get('/downloadApk');

    }

    private sendObject( obj ): Observable<void> {

        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post('/downloadApk', obj, options).map(( res: Response ) => {

            if ( res[ '_body' ] === 'success' ) {
                this.download().subscribe(
                    ( data ) => {console.log(data);},
                    ( err ) => {console.log(err);},
                    () => {console.log("DONE!!!");}
                );
            }

        });

    }


    private onSubmit( values: Object ): void {


        let object = {

            keyPassword: values[ 'keyPassword' ],
            authorsName: values[ 'authorsName' ],
            organizationalUnit: values[ 'organizationalUnit' ],
            organizationName: values[ 'organizationName' ],
            cityName: values[ 'cityName' ],
            stateName: values[ 'stateName' ],
            countryCode: values[ 'countryCode' ]

        };

        this.sendObject(object).subscribe(
            ( data ) => {console.log(data);},
            ( err ) => {console.log(err);},
            () => console.log("finished.")
        );


    }


}