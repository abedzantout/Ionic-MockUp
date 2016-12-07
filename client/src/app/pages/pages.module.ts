import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { templateService } from "../services/template.service";
import { UserService } from "../services/user-service.service";
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
	imports: [ CommonModule, NgaModule, routing, SlimLoadingBarModule.forRoot()],
	declarations: [ Pages ],
	providers: [ templateService, UserService ]
})
export class PagesModule {
}
