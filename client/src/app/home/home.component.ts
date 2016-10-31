import { Component, ViewChild } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';


import { JsonEditorComponent, JsonEditorOptions } from 'ng2-jsoneditor';
@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title,
        IconfigGetterService
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: [ './home.component.css' ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})


export class HomeComponent {

    private jsonContent: Object;
    private finishedLoading: boolean=false;

    private htmlString: string;


    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService, private _sanitizer: DomSanitizer ) {

        this.finishedLoading = false;
        this.htmlString = "";

        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => { this.jsonContent = data; },
            ( err ) => { console.log(err) },
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();

                this.finishedLoading = true;
            }
        );

    }

    ngOnInit() {

        // this.title.getData().subscribe(data => this.data = data);

    }


    private isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}


    private traverseArray(arr, level) {

    arr.forEach((x) => {
        this.traverse(x, level + "  ");
    });
}

    private traverseObject(obj, level) {



        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.htmlString += key + ": ";
                this.traverse(obj[key], level + "    ");
            }
        }




    }



    private traverse(x, level) {

    if (this.isArray(x)) {
        this.htmlString += "<br />";
        this.traverseArray(x, level);
        this.htmlString += "<br />";
    } else if ((typeof x === 'object') && (x !== null)) {
        this.htmlString += "<br />";
        this.traverseObject(x, level);
        this.htmlString += "<br />";
    } else {

        let inputString = '<input value="'+x+'" size="35" />';
        this.htmlString += inputString;

        this.htmlString += "<br />";
        this.htmlString += "<br />";

    }

}


    public get safeHtmlString() : SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.htmlString);
    }


    private getStringifiedContent(){
        return JSON.stringify(this.jsonContent, null, "<br/>");
    }


    private setJsonLocally() {

        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.traverse(this.jsonContent, 2);

    }


    private saveChanges(){

        console.log(this.htmlString);

    }


}
