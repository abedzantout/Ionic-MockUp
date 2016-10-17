import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {foodItem} from '../pages/foodItem';

/*
  Generated class for the FoodItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FoodItemsProvider {
  foodItems: any = null;

  constructor(public http: Http) {}

  load(){
    if(this.foodItems){
      return new Promise.resolve(this.foodItems);
    }

    // return new Promise(resolve => {
    //   this.http.get('https://api.github.com/users')
    //     .map(res => <Array<user>>(res.json()))
    //     .subscribe(users => {
    //       this.githubUsers = users;
    //       resolve(this.githubUsers);
    //     });
    // });
  }

}
