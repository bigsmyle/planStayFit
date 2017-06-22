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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var core_2 = require('angular2-google-maps/core');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var home_component_1 = require('./home/home.component');
var map_component_1 = require('./map/map.component');
var map_directive_1 = require('./map/map.directive');
var workout_schedule_component_1 = require('./workout-schedule/workout-schedule.component');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var core_3 = require('angular2-google-maps/core');
var auth_manager_1 = require('./service/auth.manager');
var note_manager_1 = require('./service/note.manager');
var token_manager_1 = require('./service/token.manager');
var home_guard_1 = require('./routes/home-guard');
var unauthenticated_guard_1 = require('./routes/unauthenticated-guard');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                core_2.AgmCoreModule.forRoot({ apiKey: 'AIzaSyCH8TaxKqTOP2ol0q7JJdZjEgmPTEvGrus' }),
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                map_component_1.MapComponent,
                map_directive_1.MapDirective,
                workout_schedule_component_1.WorkoutSchedule
            ],
            providers: [
                core_3.GoogleMapsAPIWrapper,
                auth_manager_1.AuthService,
                note_manager_1.NoteService,
                token_manager_1.TokenManager,
                home_guard_1.AuthGuard,
                unauthenticated_guard_1.UnauthenticatedGuard
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
// AIzaSyC4WjI8oNHDwr8CSsrqOfLsQRcInivIRRw 
//# sourceMappingURL=app.module.js.map