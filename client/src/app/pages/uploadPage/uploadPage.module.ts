import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { uploadPageComponent } from "./upload-page.component";
import { routing } from "./uploadPage.routing";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgaModule,
		routing
	],
	declarations: [
		uploadPageComponent,
	],
	providers: [],
})
export default class uploadPageModule {
}
