"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var food_items_provider_1 = require('../../providers/food-items-provider');
var service_1 = require("../../services/service");
/*
 Generated class for the Menu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var MenuPage = (function () {
    function MenuPage(navCtrl, _service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this._service = _service;
        this.jsonContent = this._service.getJson().subscribe(function (data) { _this.jsonContent = data; }, function (err) { console.log(err); }, function () {
            _this._service.setJsonContent(_this.jsonContent);
            _this.setJsonLocally();
        });
    }
    MenuPage.prototype.setJsonLocally = function () {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        var content = this.jsonContent['Application']['pages'][2]['menu'];
        this.title = content['title'];
        this.content = content['content'];
    };
    MenuPage = __decorate([
        core_1.Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
            providers: [food_items_provider_1.FoodItemsProvider]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, service_1.Service])
    ], MenuPage);
    return MenuPage;
}());
exports.MenuPage = MenuPage;
//# sourceMappingURL=menu.js.map