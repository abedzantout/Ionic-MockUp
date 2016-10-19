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
var menu_1 = require('../menu/menu');
var about_us_1 = require('../about-us/about-us');
var feedback_1 = require('../feedback/feedback');
var service_1 = require("../../services/service");
var HelloIonicPage = (function () {
    function HelloIonicPage(navCtrl, _service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this._service = _service;
        this.jsonContent = this._service.getJson().subscribe(function (data) { _this.jsonContent = data; }, function (err) { console.log(err); }, function () {
            _this._service.setJsonContent(_this.jsonContent);
            _this.setJsonLocally();
        });
    }
    HelloIonicPage.prototype.setJsonLocally = function () {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.title = this.jsonContent['Application']['pages'][0]['hello-ionic']['title'];
        this.content = [
            {
                title: this.jsonContent['Application']['pages'][0]['hello-ionic']['content'][0]['title'],
                component: menu_1.MenuPage
            },
            {
                title: this.jsonContent['Application']['pages'][0]['hello-ionic']['content'][1]['title'],
                component: about_us_1.AboutUsPage
            },
            {
                title: this.jsonContent['Application']['pages'][0]['hello-ionic']['content'][2]['title'],
                component: feedback_1.FeedbackPage
            }
        ];
    };
    HelloIonicPage.prototype.getLocalContent = function () {
        return this.jsonContent;
    };
    HelloIonicPage.prototype.goToPage = function (page) {
        this.navCtrl.push(page.component);
    };
    HelloIonicPage = __decorate([
        core_1.Component({
            templateUrl: 'hello-ionic.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, service_1.Service])
    ], HelloIonicPage);
    return HelloIonicPage;
}());
exports.HelloIonicPage = HelloIonicPage;
//# sourceMappingURL=hello-ionic.js.map