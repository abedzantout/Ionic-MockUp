import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {
	constructor( private http: Http ) {}

	getAllApps() {
		return this.http.get('http://localhost:3000/store/').map(( res: Response ) => res);
	}
}