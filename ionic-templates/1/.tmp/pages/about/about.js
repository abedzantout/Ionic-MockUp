import { Component } from '@angular/core';
export var AboutPage = (function () {
    function AboutPage() {
        this.movieDate = '2016-05-17'; //DEFAULT INSTANCE
    }
    AboutPage.prototype.presentPopover = function (event) {
        console.log('gaelle is stupid');
    };
    AboutPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-about',
                    templateUrl: 'about.html'
                },] },
    ];
    /** @nocollapse */
    AboutPage.ctorParameters = [];
    return AboutPage;
}());
//# sourceMappingURL=about.js.map