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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var token_manager_1 = require('../service/token.manager');
var auth_manager_1 = require('../service/auth.manager');
var LoginComponent = (function () {
    function LoginComponent(router, formBuilder, authService, authToken) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.authToken = authToken;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.theForm = this.formBuilder.group({
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(64)])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(32)])]
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("user ");
        this.authService.login(this.theForm.value)
            .subscribe(function (user) {
            console.log(user);
            _this.userNow = _this.authToken.getToken();
            if (_this.userNow) {
                _this.authToken.removeToken();
                _this.authToken.setToken(user);
                _this.router.navigateByUrl('/home');
            }
            else {
                _this.authToken.setToken(user);
                _this.router.navigateByUrl('/home');
            }
        }, function (error) {
            if (error)
                console.error(error);
        });
    };
    LoginComponent.prototype.register = function () {
        this.router.navigateByUrl('/register');
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['login.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_manager_1.AuthService, token_manager_1.TokenManager])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map