import {
    Component, ViewChild
} from '@angular/core';

import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Observable } from 'rxjs/Rx';
import preventExtensions = Reflect.preventExtensions;

import { TreeComponent, TreeNode } from 'angular2-tree-component';
import * as _ from 'lodash';


@Component({
    selector: 'home',
    providers: [
        Title,
        IconfigGetterService,
        BrowserDomAdapter
    ],
    styleUrls: [ './home.component.css' ],
    templateUrl: './home.component.html'
})


export class HomeComponent {

    private jsonContent: Object;
    private newJsonContent: string;
    private objectId: number;
    private buttonValues: Array<string>;
    private treeJson: string;

    private finishedLoading: boolean = false;

    private valuesInJson: Array<string>;
    private inputValues: Array<string>;

    private valueID: number;

    private arrCounter: number;

    private domAdapter: BrowserDomAdapter;


    private nodes: any;
    private originalJsonFormat: string;

    private nodeId: number;

    @ViewChild(TreeComponent)
    private tree: TreeComponent;

    private infoArray: Array<Object>;
    private infoArrayIndex: number;

    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService, private http: Http ) {

        this.domAdapter = new BrowserDomAdapter();

        this.finishedLoading    = false;
        this.valuesInJson       = [];
        this.inputValues        = [];
        this.valueID            = -1;
        this.newJsonContent     = "";
        this.arrCounter         = 0;
        this.objectId           = 0;
        this.buttonValues       = [];
        this.nodeId             = 2;
        this.originalJsonFormat = "";
        this.infoArray          = [];
        this.infoArrayIndex     = -1;


        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => {this.jsonContent = data;},
            ( err ) => {console.log(err)},
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();
                this.nodes = [ JSON.parse(this.treeJson) ];
                this.finishedLoading = true;

            }
        );
    }

    private searchById( root, id ) {
        if ( root[ 'id' ] == id ) return root;
        if ( typeof root !== 'object' ) return null;
        var key, val;
        for ( key in root ) {
            val = this.searchById(root[ key ], id);
            if ( val != null ) return val;
        }
        return null;

    }

    private clearPlaceholder( e ) {
        e[ 'srcElement' ][ 'placeholder' ] = "";
    }

    private static clone( obj ) {
        if ( null == obj || "object" != typeof obj ) return obj;
        let copy = obj.constructor();
        for ( let attr in obj ) {
            if ( obj.hasOwnProperty(attr) ) copy[ attr ] = obj[ attr ];
        }
        return copy;
    }

    private addInstance( node ) {

        let child     = HomeComponent.clone(node[ 'data' ][ 'children' ][ 0 ]);
        this.nodeId += 1;
        child[ 'id' ] = this.nodeId;
        node[ 'data' ][ 'children' ].push(child);
        this.tree.treeModel.update();
        this.convertToInitialJson();
    }

    private removeNode( node: TreeNode ) {
        let parentNode = node.realParent
            ? node.realParent
            : node.treeModel.virtualRoot;

        _.remove(parentNode.data.children, function ( child ) {
            return child === node.data;
        });
    }

    private removeInstance( node ) {

        this.removeNode(this.tree.treeModel.getNodeById(node[ 'data' ][ 'id' ]));
        this.tree.treeModel.update();
        this.convertToInitialJson();

    }

    private save( event, node ) {

        let input = event[ 'srcElement' ][ 'parentElement' ][ 'children' ][ 1 ];
        if ( input[ 'value' ].trim() !== "" ) {
            if ( node[ 'isLeaf' ] ) {
                node[ 'data' ][ 'name' ] = input[ 'value' ];
                input[ 'value' ]         = "";
                this.convertToInitialJson();
            }
        } else {
            input[ 'placeholder' ] = "Please enter something";
        }
    }

    private isArray( o ) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    private traverseArray( arr, level ) {

        if ( level == 99 ) {
            this.newJsonContent += "[";
        }

        this.arrCounter = arr.length;

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

                if ( level != 69 ) {

                    this.infoArrayIndex += 1;
                    this.infoArray.push({ name: key, type: null });

                    if ( this.isArray(obj[ key ]) ) {
                        this.infoArray[ this.infoArrayIndex ][ 'type' ] = 'array';

                    } else if ( (typeof obj[ key ] === 'object') && (obj[ key ] !== null) ) {
                        this.infoArray[ this.infoArrayIndex ][ 'type' ] = 'object';

                    } else {
                        this.infoArray[ this.infoArrayIndex ][ 'type' ] = 'string';
                    }
                }

                this.treeJson += '{"id": ' + (this.nodeId) + ', "type":" ' + this.infoArray[ this.infoArrayIndex ][ 'type' ] + '","name":"' + key + '",';
                this.nodeId += 1;
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

            this.objectId += 1;
            this.traverseObject(x, level);

        } else {

            this.valuesInJson.push(x);
            this.treeJson += '{"id": ' + (this.nodeId) + ', "name":"' + x + '", "type":"string"},';
            this.nodeId += 1;

            if ( level == 99 ) {
                this.valueID += 1;
                this.newJsonContent += '"' + this.inputValues[ this.valueID ] + '",';
            }
        }
    }


    private getStringifiedContent() {
        return JSON.stringify(this.jsonContent);
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
        this.treeJson = '{"id": 1, "name":"Application","type":"object","children":[' + this.treeJson;
        this.treeJson = this.treeJson + ']}';
    }

    private convertToInitialJson() {

        this.originalJsonFormat = "";
        this.infoArrayIndex     = -1;
        let traverse            = ( x, parentIsArray ) => {
            if ( this.isArray(x) ) {
                x.forEach(a => {
                    if ( a[ 'type' ] == 'array' ) {
                        traverse(a, true);
                    } else {
                        traverse(a, false);
                    }
                });
            } else if ( (typeof x === 'object') && (x !== null) ) {
                if ( x[ 'type' ].includes('object') ) {
                    this.originalJsonFormat += '{"' + x[ 'name' ] + '":{';
                    traverse(x[ 'children' ], false);
                    this.originalJsonFormat += '}},';
                } else if ( x[ 'type' ].includes('array') ) {
                    if ( parentIsArray ) {
                        this.originalJsonFormat += '{"' + x[ 'name' ] + '":[';
                        traverse(x[ 'children' ], true);
                        this.originalJsonFormat += ']},';
                    } else {
                        this.originalJsonFormat += '"' + x[ 'name' ] + '":[';
                        traverse(x[ 'children' ], false);
                        this.originalJsonFormat += '],';
                    }
                } else if ( x[ 'type' ].includes('string') ) {
                    if ( x[ 'children' ] !== undefined ) {
                        if ( parentIsArray ) {
                            this.originalJsonFormat += '{"' + x[ 'name' ] + '":' + '"' + x[ 'children' ][ 0 ][ 'name' ] + '"},';
                        }
                        else {
                            this.originalJsonFormat += '"' + x[ 'name' ] + '":' + '"' + x[ 'children' ][ 0 ][ 'name' ] + '",';
                        }
                    } else {
                        this.originalJsonFormat += '"' + x[ 'name' ] + '",';
                    }
                }
            }
        };

        traverse(this.nodes[ 0 ], false);

        while ( this.originalJsonFormat.includes(',]') ) {
            this.originalJsonFormat = this.originalJsonFormat.replace(',]', ']');
        }

        while ( this.originalJsonFormat.includes(',}') ) {
            this.originalJsonFormat = this.originalJsonFormat.replace(',}', '}');
        }

        this.originalJsonFormat = this.originalJsonFormat.substring(16, this.originalJsonFormat.length - 3);

        this.sendToServer().subscribe(
            ( data ) => {},
            ( err ) => {console.log(err);},
            () => {}
        );
    }

    private sendToServer(): Observable<void> {
        // send to server
        let headers = new Headers; // ... Set content type to JSON
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post('/sendJson', this.originalJsonFormat, options).map(( res: Response ) => {});
    }
}
