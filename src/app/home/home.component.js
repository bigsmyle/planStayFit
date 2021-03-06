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
var router_1 = require('@angular/router');
var token_manager_1 = require('../service/token.manager');
var HomeComponent = (function () {
    function HomeComponent(router, authToken) {
        this.router = router;
        this.authToken = authToken;
        this.flip = 'inactive';
        this.duration = "0";
        this.distance = 0;
        this.calories = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.returnBack = function () {
        this.authToken.removeToken();
        this.router.navigateByUrl('/login');
    };
    HomeComponent.prototype.toggleFlip = function () {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    };
    HomeComponent.prototype.handleData = function ($event) {
        this.distance = $event.distance;
        this.duration = $event.time;
        this.calories = $event.calories;
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['home.component.css'],
            animations: [
                core_1.trigger('flipState', [
                    core_1.state('active', core_1.style({
                        transform: 'rotateY(179.9deg)'
                    })),
                    core_1.state('inactive', core_1.style({
                        transform: 'rotateY(0)'
                    })),
                    core_1.transition('active => inactive', core_1.animate('500ms ease-out')),
                    core_1.transition('inactive => active', core_1.animate('500ms ease-in'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, token_manager_1.TokenManager])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map