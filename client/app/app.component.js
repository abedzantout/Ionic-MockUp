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
var iconfigGetter_service_1 = require('./services/iconfigGetter.service');
var AppComponent = (function () {
    function AppComponent(_service) {
        var _this = this;
        this._service = _service;
        this.FBinputList = [];
        this.jsonContent = this._service.getJson().subscribe(function (data) { _this.jsonContent = data; }, function (err) { console.log(err); }, function () {
            _this._service.setJsonContent(_this.jsonContent);
            _this.setJsonLocally();
        });
    }
    AppComponent.prototype.setJsonLocally = function () {
        this.jsonContent = JSON.parse(this._service.getJsonContent());
        this.getAUKeys();
        this.getFBKeys();
        this.getMKeys();
    };
    AppComponent.prototype.getFBKeys = function () {
        var content = this.jsonContent['Application']['pages'][1]['feedback'];
        this.FBtitle = content['title'];
        this.FBinputList = content['content'];
        this.FBbuttonList = content['buttons'];
        for (var _i = 0, _a = this.FBinputList; _i < _a.length; _i++) {
            var field = _a[_i];
            console.log(field.input);
        }
    };
    AppComponent.prototype.getAUKeys = function () {
        var content = this.jsonContent['Application']['pages'][3]['about-us'];
        this.AUheaderText = content['content']['headerText'];
        this.AUimage = content['content']['image'];
        this.AUdescription = content['content']['description'];
        this.AUtitle = content['title'];
        var content = this.jsonContent['Application']['pages'][3]['about-us']['content'];
        this.AUKEYS = Object.keys(content);
    };
    AppComponent.prototype.getMKeys = function () {
        var content = this.jsonContent['Application']['pages'][2]['menu'];
        this.Mtitle = content['title'];
        this.Mcards = content['content'];
    };
    AppComponent.prototype.saveChanges = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/home.html'
        }), 
        __metadata('design:paramtypes', [iconfigGetter_service_1.IconfigGetterService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map