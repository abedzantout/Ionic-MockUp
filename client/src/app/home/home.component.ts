import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { IconfigGetterService } from '../services/iconfigGetter.service';

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

    //The interface is still too static. I have too many variables, perhaps itll be more dynamic for the next release.

    Mtitle: string; //M = 'Menu' list of M variabls
    private Mcards: Array<any>;

    FBtitle: string; //FB = 'feed-back'  list of FB variables
    FBinputList: Array<{ input: string }> = [];
    private FBbuttonList: Array<any>;


    AUtitle: string; //AU = 'about-us'  list of AU variable
    AUheaderText: string;
    AUimage: string;
    AUdescription: string;
    AUKEYS: string[];

    // Set our default values
    localState = { value: '' };
    // TypeScript public modifiers
    constructor( public appState: AppState, public title: Title, private _service: IconfigGetterService ) {
        this.jsonContent = this._service.getJson().subscribe(
            ( data ) => { this.jsonContent = data; },
            ( err ) => { console.log(err) },
            () => {
                this._service.setJsonContent(this.jsonContent);
                this.setJsonLocally();
            }
        );
    }

    ngOnInit() {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState( value: string ) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }

    private setJsonLocally() {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        var file         = this._service.getJsonContent();
        var obj          = { name: 'JP' };

        // console.dir(jsonfile.readFileSync(file));
        // console.log(jsonfile.readFileSync(this._service.getJsonContent()));
        this.getAUKeys();
        this.getFBKeys();
        this.getMKeys();
    }

    private getFBKeys() {
        let content       = this.jsonContent[ 'Application' ][ 'pages' ][ 1 ][ 'feedback' ];
        this.FBtitle      = content[ 'title' ];
        this.FBinputList  = content[ 'content' ];
        this.FBbuttonList = content[ 'buttons' ];
        for ( let field of this.FBinputList ) {
            console.log(field.input);
        }
    }

    private getAUKeys() {
        let content        = this.jsonContent[ 'Application' ][ 'pages' ][ 3 ][ 'about-us' ];
        this.AUheaderText  = content[ 'content' ][ 'headerText' ];
        this.AUimage       = content[ 'content' ][ 'image' ];
        this.AUdescription = content[ 'content' ][ 'description' ];
        this.AUtitle       = content[ 'title' ];
        this.AUKEYS        = Object.keys(content[ 'content' ]);
    }

    private getMKeys() {
        let content = this.jsonContent[ 'Application' ][ 'pages' ][ 2 ][ 'menu' ];
        this.Mtitle = content[ 'title' ];
        this.Mcards = content[ 'content' ];

    }


    private saveChanges() { //This method to save changes back into the iconfig

    }

    /* private getPages(){
     let content = this.jsonContent['Application']['pages'][0]['hello-ionic'];
     console.log(Object.keys(content));
     for(var i =0; i< Object.keys(content).length;i++){
     // console.log(content[i]['title']);

     }
     }

     ionViewDidLoad() {}*/
}
