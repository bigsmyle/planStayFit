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
var core_1 = require('angular2-google-maps/core');
var core_2 = require('@angular/core');
var auth_manager_1 = require('../service/auth.manager');
var MapDirective = (function () {
    function MapDirective(gmapsApi, authService) {
        var _this = this;
        this.gmapsApi = gmapsApi;
        this.authService = authService;
        this.userUpdated = new core_2.EventEmitter();
        navigator.geolocation.getCurrentPosition(function (position) {
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
        });
    }
    MapDirective.prototype.updateDirections = function (origin, destination, newMarkers) {
        var _this = this;
        var update = this.userUpdated;
        this.gmapsApi.getNativeMap().then(function (map) {
            var waypoints = [];
            for (var index = 0; index < newMarkers.length; index++) {
                waypoints[index] = { location: newMarkers[index].location };
            }
            var directionsService = new google.maps.DirectionsService;
            var me = _this;
            var latLngA = new google.maps.LatLng({ lat: origin.latitude, lng: origin.longitude });
            var latLngB = new google.maps.LatLng({ lat: destination.latitude, lng: destination.longitude });
            _this.directionsDisplay.setMap(map);
            _this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 7,
                    strokeOpacity: 0.7,
                    strokeColor: '#00478c'
                }
            });
            _this.directionsDisplay.setDirections({ routes: [] });
            directionsService.route({
                origin: { placeId: origin.placeId },
                destination: { placeId: destination.placeId },
                waypoints: waypoints,
                avoidHighways: true,
                travelMode: google.maps.DirectionsTravelMode.WALKING
            }, function (response, status) {
                if (status === 'OK') {
                    me.directionsDisplay.setDirections(response);
                    map.setZoom(30);
                    var point = 0;
                    var duration = 0;
                    for (var index = 0; index < response.routes["0"].legs.length; index++) {
                        duration = duration + response.routes[0].legs[index].duration.value;
                        point = point + response.routes[0].legs[index].distance.value;
                    }
                    me.estimatedTime = duration;
                    me.estimatedDistance = point;
                    this.distance = point;
                    ;
                    update.emit({ distance: this.distance, duration: duration });
                }
                else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });
    };
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], MapDirective.prototype, "userUpdated", void 0);
    MapDirective = __decorate([
        core_2.Directive({
            selector: 'ste-google-map',
        }), 
        __metadata('design:paramtypes', [core_1.GoogleMapsAPIWrapper, auth_manager_1.AuthService])
    ], MapDirective);
    return MapDirective;
}());
exports.MapDirective = MapDirective;
//# sourceMappingURL=map.directive.js.map