import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';


import { BaThemeConfigProvider } from "../../theme/theme.configProvider";

import { Router } from "@angular/router";

@Component({
    selector: 'apk-form',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./apkForm.scss') ],
    template: require('./apkForm.html')
})


export class apkForm {


    public form: FormGroup;

    public keyPassword: AbstractControl;
    public name: AbstractControl;

    constructor(fb: FormBuilder, private router: Router, private _baConfig: BaThemeConfigProvider, private ngZone: NgZone){

        this.form             = fb.group({
            'keyPassword': [ '', Validators.compose([ Validators.required, Validators.minLength(2) ]) ],
            'name' : [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ]

    });

        this.keyPassword           = this.form.controls[ 'keyPassword' ];
        this.name           = this.form.controls[ 'name' ];


}

}