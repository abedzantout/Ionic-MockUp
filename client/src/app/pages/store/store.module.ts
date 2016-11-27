import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { StoreComponent } from "./store.component";
import { routing } from "./store.routing";
import { ApplicationProfileComponent } from "./application-profile/application-profile.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        StoreComponent,
        ApplicationProfileComponent
    ],
    providers: []
})
export default class StoreModule {
}
