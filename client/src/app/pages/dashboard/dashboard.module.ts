import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import { JsonTreeComponent } from "./json-tree/json-tree.component";
import { TreeModule } from "angular2-tree-component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        TreeModule,
        routing
    ],
    declarations: [
        Dashboard,
        JsonTreeComponent
    ],
    providers: []
})
export default class DashboardModule {
}
