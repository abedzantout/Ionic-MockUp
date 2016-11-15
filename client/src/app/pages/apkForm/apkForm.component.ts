import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';


import { BaThemeConfigProvider } from "../../theme/theme.configProvider";

import { Router } from "@angular/router";
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

    constructor( fb: FormBuilder, private router: Router, private _baConfig: BaThemeConfigProvider, private ngZone: NgZone ) {

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

}