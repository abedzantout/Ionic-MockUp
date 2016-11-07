import {
    Component, ViewChild, ElementRef, Renderer, Injector, ViewContainerRef, AfterContentInit
} from '@angular/core';

import { Http, RequestOptions, RequestMethod, Headers, Request, Response } from '@angular/http';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Observable } from 'rxjs/Rx';
import preventExtensions = Reflect.preventExtensions;

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


export class HomeComponent{

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

    private isInObject: boolean;
    private isInArray: boolean;
    private domAdapter: BrowserDomAdapter;

    private button: HTMLElement;
    private buttonGroup: HTMLElement;
    private collapsibleDiv: HTMLElement;
    private cardBlock: HTMLElement;

    private nodes: any;

    private jsonEditorContainer: HTMLElement;

    private nodeId: number;



    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService, private _sanitizer: DomSanitizer, private http: Http, private elementRef: ElementRef) {

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
        this.nodeId = 1;




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

                this.nodes = [JSON.parse(this.treeJson)];

                this.finishedLoading = true;


            }
        );

    }



    private searchById(root, id){


        if (root['id'] == id) return root;
        if (typeof root !== 'object') return null;
        var key, val;
        for (key in root) {
            val = this.searchById(root[key], id);
            if (val != null) return val;
        }
        return null;

    }


    // TODO: Add and delete nodes functionality


    private save(event, node){

        let input = event['srcElement']['parentElement']['children'][1];

        if(input['value'].trim() !== "") {

            if (node['isLeaf']) {

                node['data']['name'] = input['value'];
                input['value'] = "";

                // this.nodes is already modifed accordingly
                // convert this.nodes back into regular JSON format
                // upload this object back to the server

            }

        }else{

            input['placeholder'] = "Please enter something";

        }

    }


    ngOnInit() {

        // this.title.getData().subscribe(data => this.data = data);

    }

    ngAfterViewInit() {
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
                this.treeJson += '{"id": '+(this.nodeId)+',"name":"' + key + '",';
                this.nodeId += 1;
                this.htmlString += '<strong>' + key + '</strong>';

                //this.domAdapter.setInnerHTML(cardBlock, '<strong>'+key+'</strong>');
               // this.cardBlock.innerHTML = '<strong>'+key+'</strong>';

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

            // this.cardBlock = this.domAdapter.createElement('div');
            // this.domAdapter.setAttribute(this.cardBlock, 'class', 'card card-block form-group');

            this.htmlString += '<div class="btn-group" role="group" style="margin-left: 10px">'

            // this.buttonGroup = this.domAdapter.createElement('div');
            // this.domAdapter.setAttribute(this.buttonGroup, 'class', 'btn-group');
            // this.domAdapter.setAttribute(this.buttonGroup, 'role', 'group');
            // this.domAdapter.setAttribute(this.buttonGroup, 'style', 'margin-left: 10px;');



            this.htmlString += `<button onclick="if(this.innerHTML=='+'){this.innerHTML='-';}else{this.innerHTML='+';}" class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample` + this.objectId + `"
                                aria-expanded="false" aria-controls="collapseExample` + this.objectId + `">+</button>`;

            // this.button = this.domAdapter.createElement('button');
            // this.domAdapter.setInnerHTML(this.button, '+');
            // this.domAdapter.on(this.button, 'click', ()=>{
            //     if(this.domAdapter.getInnerHTML(this.button) == '+'){
            //         this.domAdapter.setInnerHTML(this.button, '-');
            //     }else{
            //         this.domAdapter.setInnerHTML(this.button, '+');
            //     }
            // });
            // this.domAdapter.setAttribute(this.button, 'class', 'btn btn-secondary');
            // this.domAdapter.setAttribute(this.button, 'type', 'button');
            // this.domAdapter.setAttribute(this.button, 'data-toggle', 'collapse');
            // this.domAdapter.setAttribute(this.button, 'data-target', '#collapse'+this.objectId);
            // this.domAdapter.setAttribute(this.button, 'aria-expanded', 'false');
            // this.domAdapter.setAttribute(this.button, 'aria-controls', 'collapse'+this.objectId);


                       this.htmlString += '</div>';

            this.htmlString += '<div class="row collapse" id="collapseExample' + this.objectId + '" style="margin: 7px">';

            // this.collapsibleDiv = this.domAdapter.createElement('div');
            // this.domAdapter.setAttribute(this.collapsibleDiv, 'class', 'row collapse');
            // this.domAdapter.setAttribute(this.collapsibleDiv, 'id', 'collapse'+this.objectId);
            // this.domAdapter.setAttribute(this.collapsibleDiv, 'style', 'margin: 7px;');

            this.objectId += 1;

            this.htmlString += '<div class="card card-block form-group">';



            this.traverseObject(x, level);


            this.htmlString += '</div>';
            this.htmlString += "</div>";



        } else {

            this.valuesInJson.push(x);

            let inputString = '<input class="form-control" value="' + x + '" size="35" style="margin-bottom: 15px;"/>';
            this.htmlString += inputString;

            //
            // let input = this.domAdapter.createElement('input');
            // this.domAdapter.setAttribute(input, 'class', 'form-control');
            // this.domAdapter.setAttribute(input, 'value', x);
            // this.domAdapter.setAttribute(input, 'size', '30');
            // this.domAdapter.setAttribute(input, 'style', 'margin-bottom: 15px;');

            //this.jsonEditorContainer.appendChild(input);


            this.treeJson += '{"id": '+(this.nodeId)+', "name":"' + x + '"},';
            this.nodeId +=1;

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


    private setJsonLocally() {

        this.jsonContent = JSON.parse(this._service.getJsonContent());

        // let containerDiv = this.domAdapter.createElement('div');
        // this.domAdapter.appendChild(this.elementRef.nativeElement, containerDiv);
        // this.jsonEditorContainer = containerDiv;

        this.traverse(this.jsonContent, 2);

        while ( this.treeJson.includes(',]') ) {
            this.treeJson = this.treeJson.replace(',]', ']');
        }

        while ( this.treeJson.includes(',}') ) {
            this.treeJson = this.treeJson.replace(',}', '}');
        }
        this.treeJson = this.treeJson.substring(9, this.treeJson.length - 1);
        this.treeJson = '{"id": 1, "name":"Application","children":[' + this.treeJson;
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
