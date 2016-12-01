import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../services/user-service.service";
import { Router } from "@angular/router";
import { BaThemeConfigProvider } from "../../theme/theme.configProvider";

@Component({
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./login.scss') ],
    template: require('./login.html')
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    private errorMessage: string;
    private color: string     = this._baConfig.get().colors.danger;
    private validated: boolean;

    constructor( fb: FormBuilder, private userService: UserService, private router: Router, private _baConfig: BaThemeConfigProvider ) {
        this.validated = false;
        this.form      = fb.group({
            'email': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ],
            'password': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ]
        });

        this.email    = this.form.controls[ 'email' ];
        this.password = this.form.controls[ 'password' ];
    }

    public onSubmit( values: Object ): void {
        this.submitted = true;
        if ( this.form.valid ) {
            // your code goes here
            let email: string    = values[ "email" ];
            let password: string = values[ "password" ];

            this.userService.login(email, password).subscribe(( result: Object ) => {
                    console.log(result);
                    console.log(result[ 'success' ]);
                    if ( result[ 'success' ] === true ) {
                        this.router.navigate([ 'pages' ]);
                    }
                    else if ( result[ 'success' ] === true ) {
                        this.errorMessage = "Please confirm your Email by clicking on the link we sent you";
                    }
                    else {
                        this.validated    = false;
                        this.errorMessage = "Incorrect username/password combination.";
                    }

                },

                err => {console.log(err)},
                () => {}
            );

        }
    }

    private changeBackground(): string {
        return this.color;
    }
}
