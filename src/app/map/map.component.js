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
var auth_manager_1 = require('../service/auth.manager');
var core_2 = require('angular2-google-maps/core');
var map_directive_1 = require('./map.directive');
var forms_1 = require('@angular/forms');
var MapComponent = (function () {
    function MapComponent(authService, mapsAPILoader, formBuilder) {
        var _this = this;
        this.authService = authService;
        this.mapsAPILoader = mapsAPILoader;
        this.formBuilder = formBuilder;
        this.title = 'Map project';
        this.markers = [];
        this.zoom = 17;
        this.distance = 0;
        this.duration = "0 min ";
        this.calories = 0;
        this.curentPosition = false;
        this.eEvent = { srcElement: { selectedIndex: 0 } };
        this.dataUpdated = new core_1.EventEmitter();
        navigator.geolocation.getCurrentPosition(function (position) {
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
        });
        this.type = [{ id: 0, value: "male" }, { id: 1, value: "female" }];
        this.pas = [{ id: 0, value: "normal" }, { id: 1, value: "brisk" }, { id: 2, value: "moderate" }, { id: 3, value: "slow" }];
    }
    MapComponent.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            gender: new forms_1.FormControl(),
            steps: new forms_1.FormControl(),
            age: ['', forms_1.Validators.minLength(3)],
            weight: ['', forms_1.Validators.minLength(3),],
        });
    };
    MapComponent.prototype.clearMarker = function () {
        this.markers = [];
    };
    MapComponent.prototype.ClearDisplay = function () {
        if (this.vc.directionsDisplay != null) {
            this.vc.directionsDisplay.setMap(null);
            this.vc.directionsDisplay = null;
        }
    };
    MapComponent.prototype.getPlaces = function (latitude, longitude) {
        var _this = this;
        this.authService.getPlaces({ latitude: latitude, longitude: longitude }).subscribe(function (place) {
            if (place.results[0].formatted_address)
                var newMarker = {
                    lat: latitude,
                    lng: longitude,
                    placeId: place.results[0].place_id,
                    location: place.results[0].formatted_address
                };
            if (_this.curentPosition) {
                _this.origin = newMarker;
            }
            _this.markers.push(newMarker);
        });
    };
    MapComponent.prototype.mapClicked = function ($event) {
        this.getPlaces($event.coords.lat, $event.coords.lng);
    };
    MapComponent.prototype.changeCurentPos = function () {
        this.curentPosition = !this.curentPosition;
        this.clearMarker();
        this.ClearDisplay();
        if (this.curentPosition) {
            this.getPlaces(this.lat, this.lng);
        }
    };
    MapComponent.prototype.handleUserUpdated = function ($event) {
        this.distance = $event.distance;
        this.min = $event.duration;
        var mina = Math.ceil(this.min / 60);
        if (this.genderId.nativeElement.value == "male") {
            if (this.stepsId.nativeElement.value == "normal") {
                this.time = Math.ceil(this.min / 60);
                this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (153 * 0.6309) - 55.0969) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "brisk") {
                this.time = (Math.ceil(this.distance / 1000 * 15));
                this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (120 * 0.6309) - 55.0969) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "moderate") {
                this.time = (Math.ceil(this.distance / 1000 * 20));
                this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (110 * 0.6309) - 55.0969) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "slow") {
                this.time = (Math.ceil(this.distance / 1000 * 30));
                this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (100 * 0.6309) - 55.0969) * this.time / 4.184;
            }
        }
        else if (this.genderId.nativeElement.value == "female") {
            if (this.stepsId.nativeElement.value == "normal") {
                this.time = Math.ceil(this.min / 60);
                this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (153 * 0.4472) - 20.4022) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "brisk") {
                this.time = (Math.ceil(this.distance / 1000 * 15));
                this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (120 * 0.4472) - 20.4022) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "moderate") {
                this.time = (Math.ceil(this.distance / 1000 * 20));
                this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (110 * 0.4472) - 20.4022) * this.time / 4.184;
            }
            else if (this.stepsId.nativeElement.value == "slow") {
                this.time = (Math.ceil(this.distance / 1000 * 30));
                this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (100 * 0.4472) - 20.4022) * this.time / 4.184;
            }
        }
        var hours = Math.floor(this.time / 60);
        var mins = this.time % 60;
        this.duration = " " + hours + " hour(s) " + mins + " min(s) ";
        this.dataUpdated.emit({ time: this.duration, distance: this.distance, calories: this.calories });
    };
    MapComponent.prototype.newupdateDirections = function () {
        var _this = this;
        this.mapsAPILoader.load().then(function () {
            if (_this.vc.directionsDisplay === undefined || _this.vc.directionsDisplay === null) {
                _this.mapsAPILoader.load().then(function () {
                    _this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                });
            }
            var origin = _this.markers[0];
            var destination = _this.markers[_this.markers.length - 1];
            var newMarkers = _this.markers;
            var go = newMarkers.slice(1, (_this.markers.length - 1));
            _this.vc.updateDirections(origin, destination, go);
        });
    };
    __decorate([
        core_1.ViewChild('steps'), 
        __metadata('design:type', core_1.ElementRef)
    ], MapComponent.prototype, "stepsId", void 0);
    __decorate([
        core_1.ViewChild('gender'), 
        __metadata('design:type', core_1.ElementRef)
    ], MapComponent.prototype, "genderId", void 0);
    __decorate([
        core_1.ViewChild(map_directive_1.MapDirective), 
        __metadata('design:type', map_directive_1.MapDirective)
    ], MapComponent.prototype, "vc", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapComponent.prototype, "dataUpdated", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map',
            templateUrl: './map.component.html',
            styleUrls: ['map.component.css'],
        }), 
        __metadata('design:paramtypes', [auth_manager_1.AuthService, core_2.MapsAPILoader, forms_1.FormBuilder])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map