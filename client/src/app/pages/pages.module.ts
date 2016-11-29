import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { templateService } from "../services/template.service";

@NgModule({
	imports: [ CommonModule, NgaModule, routing ],
	declarations: [ Pages ],
	providers: [ templateService ]
})
export class PagesModule {
}
