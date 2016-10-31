import {Component, ViewChild} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from './title';
import {IconfigGetterService} from '../services/iconfigGetter.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


import {JsonEditorComponent, JsonEditorOptions} from 'ng2-jsoneditor';
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
    styleUrls: ['./home.component.css'],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})


export class HomeComponent {

    private jsonContent: Object;
    private newJsonContent: string;

    private finishedLoading: boolean = false;

    private htmlString: string;

    private valuesInJson: Array<string>;
    private inputValues: Array<string>;

    private valueID: number;

    private arrCounter: number;


    constructor(public appState: AppState, public title: Title, private _service: IconfigGetterService, private _sanitizer: DomSanitizer) {

        this.finishedLoading = false;
        this.htmlString = "";
        this.valuesInJson = [];
        this.inputValues = [];
        this.valueID = -1;
        this.newJsonContent = "";
        this.arrCounter = 0;


        this.jsonContent = this._service.getJson().subscribe(
            (data) => {
                this.jsonContent = data;
            },
            (err) => {
                console.log(err)
            },
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

        if (level == 99) {
            this.newJsonContent += "[";
        }
        this.arrCounter = arr.length;
        let counter = 0;


        arr.forEach((x) => {
            this.traverse(x, level + "  ");
        });

        if (level == 99) {
            this.newJsonContent += "],";
        }
        if (level == 99) {
            this.newJsonContent = this.newJsonContent.replace(",]", "]");
        }


    }

    private traverseObject(obj, level) {

        if (level == 99) {
            this.newJsonContent += "{";
        }


        for (var key in obj) {

            if (obj.hasOwnProperty(key)) {

                this.htmlString += key + ": ";
                if (level == 99) {
                    this.newJsonContent += '"' + key + '":';
                }
                this.traverse(obj[key], level + "    ");
            }
        }

        if (level == 99) {
            this.newJsonContent += "},";
        }
        if (level == 99) {
            this.newJsonContent = this.newJsonContent.replace(",}", "}");
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


            this.valuesInJson.push(x);

            let inputString = '<input value="' + x + '" size="35" />';
            this.htmlString += inputString;

            this.htmlString += "<br />";
            this.htmlString += "<br />";

            if (level == 99) {
                this.valueID += 1;

                this.newJsonContent += '"' + this.inputValues[this.valueID] + '",';
            }


        }

    }


    public get safeHtmlString(): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.htmlString);
    }


    private getStringifiedContent() {
        return JSON.stringify(this.jsonContent, null, "<br/>");
    }


    private setJsonLocally() {

        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.traverse(this.jsonContent, 2);

    }


    private saveChanges() {


        let inputs = document.getElementsByTagName('input');


        for (let index = 0; index < inputs.length; ++index) {
            // deal with inputs[index] element.

            this.inputValues.push(inputs[index]['value']);

        }

        console.log(this.valuesInJson);
        console.log(this.inputValues);

        this.traverse(this.jsonContent, 99);

        this.newJsonContent = this.newJsonContent.substring(0, this.newJsonContent.length - 1);

        console.log(this.newJsonContent);

        console.log(JSON.parse(this.newJsonContent));

    }


}
