import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class templateService {

    private templateID: number;

    setTemplateId(id){
        this.templateID = id;
    }


    getTemplateId(){
        return this.templateID;
    }


}