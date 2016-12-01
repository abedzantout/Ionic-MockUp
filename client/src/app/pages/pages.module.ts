import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { templateService } from "../services/template.service";
import { UserService } from "../services/user-service.service";

@NgModule({
	imports: [ CommonModule, NgaModule, routing ],
	declarations: [ Pages ],
	providers: [ templateService, UserService ]
})
export class PagesModule {
}
