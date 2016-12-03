import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { StoreComponent } from "./store.component";
import { routing } from "./store.routing";
import { ApplicationProfileComponent } from "./application-profile/application-profile.component";
import { StoreService } from "../../services/store.service";


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
    providers: [StoreService]
})
export default class StoreModule {
}
