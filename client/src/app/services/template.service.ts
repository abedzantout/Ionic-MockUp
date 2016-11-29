import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class templateService {
	private templateName: string;

	setTemplateName( name ) {
		this.templateName = name;
	}

	getTemplateName() {
		console.log(this.templateName);
		return this.templateName;
	}

}