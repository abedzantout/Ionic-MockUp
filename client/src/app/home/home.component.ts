import { Component, ViewChild } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';


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
    public editorOptions: JsonEditorOptions;

    public data: any = {
        "Array": [ 1, 2, 3 ],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": { "a": "b", "c": "d" },
        "String": "Hello World"
    };

    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;


    private loadEditor() {

    }

    private onEditorReady() {

    }


    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService ) {

        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => { this.jsonContent = data; },
            ( err ) => { console.log(err) },
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();
            }
        );
        this.editorOptions = new JsonEditorOptions();

    }

    ngOnInit() {
        this.loadEditor();

        // this.title.getData().subscribe(data => this.data = data);
    }


    private setJsonLocally() {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        console.log(this.jsonContent);
    }


    public setTreeMode() {
        this.editor.set(this.data);
        this.editor.setMode('tree');
    }

}
