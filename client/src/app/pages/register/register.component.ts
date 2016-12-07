import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { UserService } from '../../services/user-service.service';
import { Router } from "@angular/router";
import { BaThemeConfigProvider } from "../../theme/theme.configProvider";

@Component({
    selector: 'register',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./register.scss') ],
    template: require('./register.html')
})
export class Register {

    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;

    public userType: Object;

    private errorMessage: string;
    private signUpClicked: boolean = false;

    private isEmailAvailable: boolean;
    private color: string = this._baConfig.get().colors.danger;

    public submitted: boolean = false;


    constructor( fb: FormBuilder, private userService: UserService, private router: Router, private _baConfig: BaThemeConfigProvider, private ngZone: NgZone ) {
        this.isEmailAvailable = false;
        this.form             = fb.group({
            'name': [ '', Validators.compose([ Validators.required, Validators.minLength(2) ]) ],
            'email': [ '', Validators.compose([ Validators.required, EmailValidator.validate, EmailValidator.furtherValidation ]) ],
            'passwords': fb.group({
                'password': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
                'repeatPassword': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
        });

        this.userType = {
            type: "none"
        };

        this.name           = this.form.controls[ 'name' ];
        this.email          = this.form.controls[ 'email' ];
        this.passwords      = <FormGroup> this.form.controls[ 'passwords' ];
        this.password       = this.passwords.controls[ 'password' ];
        this.repeatPassword = this.passwords.controls[ 'repeatPassword' ];
    }

    public onSubmit( values: Object ): void {
        this.submitted = true;

        console.log(values);

        console.log(this.userType);

        if ( this.form.valid ) {

            let name: string             = values[ "name" ];
            let email: string            = values[ "email" ];
            let password: string         = values[ "passwords" ][ "password" ];
            let repeatedPassword: string = values[ "passwords" ][ "repeatPassword" ];

            let isDeveloper: boolean = (this.userType['type'] == 2);

            this.userService.register(name, email, password, isDeveloper).subscribe(( result ) => {

                console.log(result[ 'success' ]);
                    if ( result[ 'success' ] == true ) {

                        this.ngZone.run(() => {
                                this.isEmailAvailable = true;
                                // this.errorMessage     = "Please check your email";
                                // this.signUpClicked = true;
                                this.router.navigate([ 'login' ]);
                            }
                        );
                    }
                }
                ,
                err => {console.log(err)},
                () => {}
            );

        }
    }

    private changeBackground(): string {
        return this.color;
    }
}
