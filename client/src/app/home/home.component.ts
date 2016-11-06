import {
    Component, ViewChild, ElementRef, Renderer, Injector, ViewContainerRef
} from '@angular/core';

import { Http, RequestOptions, RequestMethod, Headers, Request, Response } from '@angular/http';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Observable } from 'rxjs/Rx';

import { JsonEditorComponent, JsonEditorOptions } from 'ng2-jsoneditor';
@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title,
        IconfigGetterService,
        BrowserDomAdapter
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: [ './home.component.css' ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})


export class HomeComponent {

    private jsonContent: Object;
    private newJsonContent: string;
    private objectId: number;
    private buttonValues: Array<string>;
    private treeJson: string;
    @ViewChild('jsonEditorContainer', {read: ViewContainerRef}) jsonContainer;

    private finishedLoading: boolean = false;

    private htmlString: string;

    private valuesInJson: Array<string>;
    private inputValues: Array<string>;

    private valueID: number;

    private arrCounter: number;

    private changesMessage: string;

    private skip: boolean;

    private isInObject: boolean;
    private isInArray: boolean;
            domAdapter: BrowserDomAdapter;


    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService, private _sanitizer: DomSanitizer, private http: Http, private elementRef: ElementRef, private renderer: Renderer, injector: Injector) {

        this.domAdapter = new BrowserDomAdapter();

        this.finishedLoading = false;
        this.htmlString      = "";
        this.valuesInJson    = [];
        this.inputValues     = [];
        this.valueID         = -1;
        this.newJsonContent  = "";
        this.arrCounter      = 0;
        this.objectId        = 0;
        this.buttonValues    = [];
        this.changesMessage  = "";
        this.skip            = true;


        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => {
                this.jsonContent = data;
            },
            ( err ) => {
                console.log(err)
            },
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();

                this.finishedLoading = true;

                let button = this.domAdapter.createElement('button');
                this.domAdapter.setInnerHTML(button, 'Test');
                this.domAdapter.on(button, 'click', () => {console.log('works')});
                // this.domAdapter.appendChild(this.elementRef.nativeElement.childNodes[0].childNodes[1], button);

            }
        );

    }


    ngOnInit() {

        // this.title.getData().subscribe(data => this.data = data);

    }

    ngAfterViewInit() {
        console.log(this.elementRef.nativeElement.childNodes.item(0).nextSibling);
    }


    private isArray( o ) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }


    private traverseArray( arr, level ) {

        if ( level == 99 ) {
            this.newJsonContent += "[";
        }

        this.arrCounter = arr.length;
        let counter     = 0;


        arr.forEach(( x ) => {
            this.traverse(x, level + "  ");
        });


        if ( level == 99 ) {
            this.newJsonContent += "],";
            this.newJsonContent = this.newJsonContent.replace(",]", "]");
        }
    }

    private traverseObject( obj, level ) {

        if ( level == 99 ) {
            this.newJsonContent += "{";
        }
        for ( var key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
                this.treeJson += '{"name":"' + key + '",';
                this.htmlString += '<strong>' + key + '</strong>';
                this.buttonValues.push(key);

                if ( level == 99 ) {
                    this.newJsonContent += '"' + key + '":';
                }
                this.treeJson += '"children":[';
                this.traverse(obj[ key ], level + "    ");
                this.treeJson += '],';
                this.treeJson += '},';
            }
        }
        if ( level == 99 ) {
            this.newJsonContent += "},";
        }
        if ( level == 99 ) {
            this.newJsonContent = this.newJsonContent.replace(",}", "}");
        }

    }


    private traverse( x, level ) {

        if ( this.isArray(x) ) {
            this.traverseArray(x, level);

        } else if ( (typeof x === 'object') && (x !== null) ) {
            this.htmlString += '<div class="btn-group" role="group" style="margin-left: 10px">';


            this.htmlString += `<button onclick="if(this.innerHTML=='+'){this.innerHTML='-';}else{this.innerHTML='+';}" class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample` + this.objectId + `"  
                                aria-expanded="false" aria-controls="collapseExample` + this.objectId + `">+</button>`;

            this.htmlString += '</div>';
            this.htmlString += '<div class="row collapse" id="collapseExample' + this.objectId + '" style="margin: 7px">';
            this.objectId += 1;

            this.htmlString += '<div class="card card-block form-group">';

            this.traverseObject(x, level);

            this.htmlString += '</div>';
            this.htmlString += "</div>";

        } else {

            this.valuesInJson.push(x);
            let inputString = '<input class="form-control" value="' + x + '" size="35" style="margin-bottom: 15px;"/>';
            this.htmlString += inputString;
            this.treeJson += '{"name":"' + x + '"},';
            if ( level == 99 ) {
                this.valueID += 1;
                this.newJsonContent += '"' + this.inputValues[ this.valueID ] + '",';
            }
        }
    }


    public get safeHtmlString(): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.htmlString);
    }

    private getStringifiedContent() {
        return JSON.stringify(this.jsonContent);
    }

    private alert() {
        window.alert('hi');
        console.log('fuck you abbas')
    }

    private setJsonLocally() {

        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.traverse(this.jsonContent, 2);

        while ( this.treeJson.includes(',]') ) {
            this.treeJson = this.treeJson.replace(',]', ']');
        }

        while ( this.treeJson.includes(',}') ) {
            this.treeJson = this.treeJson.replace(',}', '}');
        }
        this.treeJson = this.treeJson.substring(9, this.treeJson.length - 1);
        this.treeJson = '{"name":"Application","children":[' + this.treeJson;
        this.treeJson = this.treeJson + ']}';
    }


    private sendToServer(): Observable<void> {

        // send to server

        let headers = new Headers; // ... Set content type to JSON
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post('/sendJson', this.newJsonContent, options).map(( res: Response ) => {

            if ( res ) {
                this.changesMessage = res[ '_body' ];
            }

        });


        // return this.http.request(new Request(requestOptions))
        //     .map((res: Response) => {
        //         if (res) {
        //             this.changesMessage = res['_body'];
        //         }
        //     });

    }

    private log() {
        console.log(this.treeJson);
    }

    private saveChanges() {

        let inputs = document.getElementsByTagName('input');

        for ( let index = 0; index < inputs.length; ++index ) {
            this.inputValues.push(inputs[ index ][ 'value' ]);
        }

        this.traverse(this.jsonContent, 99);
        this.newJsonContent = this.newJsonContent.substring(0, this.newJsonContent.length - 1);


        this.sendToServer().subscribe(
            ( data ) => {},
            ( err ) => console.log(err),
            () => {}
        );


        this.objectId = 0;

        this.htmlString = "";

        this.jsonContent = JSON.parse(this.newJsonContent);

        this.newJsonContent = "";

        this.traverse(this.jsonContent, 2);


    }


}
