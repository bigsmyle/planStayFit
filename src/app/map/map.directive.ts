import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.manager';



declare var google: any;

@Directive({
    selector: 'ste-google-map',
    
})
export class MapDirective {
    lat: number;
    lng: number;
   
    public distance:number;
    public duration: string;


@Output()  userUpdated :EventEmitter<any>= new EventEmitter();

     directionsDisplay: any;
     estimatedTime: any;
     estimatedDistance: any;

    constructor(private gmapsApi: GoogleMapsAPIWrapper,  private authService: AuthService) {
 

        navigator.geolocation.getCurrentPosition((position) => {

            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

        })
    }

    updateDirections(origin: any, destination: any, newMarkers: any) {
        var update=this.userUpdated;
        this.gmapsApi.getNativeMap().then(map => {

            var waypoints: Array<any> = [];
            for (var index = 0; index < newMarkers.length; index++) {
                waypoints[index] = { location: newMarkers[index].location };

            }


            var directionsService = new google.maps.DirectionsService;
            var me = this;
            var latLngA = new google.maps.LatLng({ lat: origin.latitude, lng: origin.longitude });
            var latLngB = new google.maps.LatLng({ lat: destination.latitude, lng: destination.longitude });
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 7,
                    strokeOpacity: 0.7,
                    strokeColor: '#00478c'
                }
            });
            this.directionsDisplay.setDirections({ routes: [] });
            directionsService.route({
                origin: { placeId: origin.placeId },
                destination: { placeId: destination.placeId },
                waypoints: waypoints,
                avoidHighways: true,
                travelMode: google.maps.DirectionsTravelMode.WALKING
                //travelMode: 'WALKING'
            }, function (response: any, status: any) {
                if (status === 'OK') {
                    me.directionsDisplay.setDirections(response);
                    map.setZoom(30);
                    
                   
                    var point: number = 0;
                    var duration: number = 0;
                    for (var index = 0; index < response.routes["0"].legs.length; index++) {
                        duration = duration + response.routes[0].legs[index].duration.value;
                        point = point + response.routes[0].legs[index].distance.value;

                    }
                    me.estimatedTime = duration;
                    me.estimatedDistance = point;
                    
                    this.distance = point;
                    
                   ;
                    update.emit({distance:this.distance,duration: duration});
                    
                    
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });

    }

}