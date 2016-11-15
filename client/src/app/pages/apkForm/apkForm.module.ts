import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import {apkForm} from './apkForm.component';
import { routing }       from './apkForm.routing';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        apkForm
    ]
})
export default class apkFormModule {}
