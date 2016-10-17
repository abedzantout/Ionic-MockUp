import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodItemsProvider } from '../../providers/food-items-provider';
import { foodItem } from '../foodItem';

/*
 Generated class for the Menu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
    providers: [ FoodItemsProvider ]
})

export class MenuPage {

    private title: string = "Menu";
    content: foodItem[];

    constructor( private navCtrl: NavController ) {
        this.content = [
            { name: "Lasagne", image: "../../assets/images/lasagne.jpg", description: "Italian Pasta." },
            { name: "kebab", image: "../../assets/images/kebab.jpg", description: "Turkish grilled meat." },
            { name: "humus", image: "../../assets/images/humus.jpg", description: "Lebanese cold starter." }
        ]
    }


}
