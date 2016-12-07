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

    private finishedUpload: boolean = false;
    private fileSelected: boolean = false;
    private fileName: string;

	constructor() {
		this.filesToUpload = [];
		this.finishedUpload = false;
		this.fileSelected = false;
		this.fileName ="";
	}

	upload() {
		this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then(( result ) => {
			console.log(result);

			// show graph
            this.finishedUpload = true;

		}, ( error ) => {
			console.error(error);
		});
	}

	fileChangeEvent( fileInput: any ) {

        this.fileSelected = true;

        this.fileName = fileInput.target.files[0]['name']

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
