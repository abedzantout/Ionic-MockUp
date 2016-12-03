import { Component, ViewEncapsulation } from '@angular/core';

declare const require: any;
import * as _ from 'lodash'
@Component({
	selector: 'upload-page',
	encapsulation: ViewEncapsulation.None,
	styles: [ require('./uploadPage.component.scss') ],
	template: require('./uploadPage.component.html')

})
export class uploadPageComponent {

	filesToUpload: Array<File>;

	constructor() {
		this.filesToUpload = [];
	}

	upload() {
		console.log(this.filesToUpload);
		this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then(( result ) => {
			console.log('sent');
			console.log(result);
		}, ( error ) => {
			console.error(error);
		});
	}

	fileChangeEvent( fileInput: any ) {
		this.filesToUpload = <Array<File>> fileInput.target.files;
	}

	makeFileRequest( url: string, params: Array<string>, files: Array<File> ) {
		return new Promise(( resolve, reject ) => {
			let formData: any = new FormData();
			let xhr           = new XMLHttpRequest();
			for ( let i = 0; i < files.length; i++ ) {
				formData.append("uploads[]", files[ i ], files[ i ].name);
			}
			xhr.onreadystatechange = function () {
				if ( xhr.readyState == 4 ) {
					if ( xhr.status == 200 ) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			};
			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}
