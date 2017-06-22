import {
  Component, AfterContentChecked, OnInit,
  ViewChild, ElementRef, EventEmitter, Output,NgZone
} from '@angular/core';
import { Router } from '@angular/router'
import { TokenManager } from '../service/token.manager';
import { AuthService } from '../service/auth.manager';

import {
  GoogleMapsAPIWrapper,
  MapsAPILoader, MouseEvent,
} from '@agm/core';
import { MapDirective } from './map.directive'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  } from "@types/googlemaps";



declare var google: any;


@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css'],

})

export class MapComponent implements OnInit {

  title: string = 'Map project';
  lat: number;
  lng: number;
  markers: Array<any> = [];
  zoom: any = 17;
  origin: any;
  @ViewChild('steps') stepsId: ElementRef;
  @ViewChild('gender') genderId: ElementRef;
  distance: number = 0;
  min: number;
  time: number;
  duration: string = "0 min ";
  calories: any = 0;
  location: any;
  map: any;
  type: Array<any>;
  pas: Array<any>;
  myForm: FormGroup
  gender: any;
  steps: any;
  curentPosition: boolean = false;
  eEvent: any = { srcElement: { selectedIndex: 0 } };
  public searchControl: FormControl;
  @ViewChild(MapDirective) vc: MapDirective;
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  @ViewChild("search")  public searchElementRef: ElementRef;

  constructor(private authService: AuthService,private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader, private formBuilder: FormBuilder) {
    navigator.geolocation.getCurrentPosition((position) => {
      
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;


    });
    this.type = [{ id: 0, value: "male" }, { id: 1, value: "female" }]
    this.pas = [{ id: 0, value: "normal" }, { id: 1, value: "brisk" }, { id: 2, value: "moderate" }, { id: 3, value: "slow" }];

  }


  ngOnInit() {
    this.myForm = this.formBuilder.group({

      gender: new FormControl(),
      steps: new FormControl(),
      age: ['', Validators.minLength(3)],
      weight: ['', Validators.minLength(3),],


    });

     this.searchControl = new FormControl();

//load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

     
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.authService.getPlaces({ latitude: place.geometry.location.lat(), longitude:  place.geometry.location.lng() }).subscribe(places => {
         var newMarker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: places.results[0].place_id,
           
          
          location: place.formatted_address
        }
       
      if (this.curentPosition) {
        this.origin = newMarker;
      }
      this.markers.push(newMarker);
      this.lat=newMarker.lat;
      this.lng=newMarker.lng;
        
        });
        });
      });
    });
  }



  clearMarker() {
    this.markers = [];


  }

  ClearDisplay() {
    if (this.vc.directionsDisplay != null) {
      this.vc.directionsDisplay.setMap(null);
      this.vc.directionsDisplay = null;
    }
  }
  getPlaces(latitude: any, longitude: any) {
    this.authService.getPlaces({ latitude: latitude, longitude: longitude }).subscribe(place => {


      if (place.results[0].formatted_address)

        var newMarker = {
          lat: latitude,
          lng: longitude,
          placeId: place.results[0].place_id,
          location: place.results[0].formatted_address
        }
      if (this.curentPosition) {
        this.origin = newMarker;
      }
      this.markers.push(newMarker);
    })
  }

  mapClicked($event: MouseEvent) {
    this.getPlaces($event.coords.lat, $event.coords.lng);

  }
  changeCurentPos() {


    this.curentPosition = !this.curentPosition;
    this.clearMarker();
    this.ClearDisplay();
    if (this.curentPosition) {
      this.getPlaces(this.lat, this.lng);

    }
  }

  handleUserUpdated($event: any) {

    this.distance = $event.distance;
    this.min = $event.duration;
    var mina = Math.ceil(this.min / 60);



    if (this.genderId.nativeElement.value == "male") {
      if (this.stepsId.nativeElement.value == "normal") {
        this.time = Math.ceil(this.min / 60);
        this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (153 * 0.6309) - 55.0969) * this.time / 4.184;
      } else if (this.stepsId.nativeElement.value == "brisk") {
        this.time = (Math.ceil(this.distance / 1000 * 15));
        this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (120 * 0.6309) - 55.0969) * this.time / 4.184;

      } else if (this.stepsId.nativeElement.value == "moderate") {
        this.time = (Math.ceil(this.distance / 1000 * 20));
        this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (110 * 0.6309) - 55.0969) * this.time / 4.184;

      } else if (this.stepsId.nativeElement.value == "slow") {
        this.time = (Math.ceil(this.distance / 1000 * 30));
        this.calories = ((this.myForm.value.age * 0.2017) - (this.myForm.value.weight * 0.09036) + (100 * 0.6309) - 55.0969) * this.time / 4.184;

      }
    } else if (this.genderId.nativeElement.value == "female") {
      if (this.stepsId.nativeElement.value == "normal") {
        this.time = Math.ceil(this.min / 60);
        this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (153 * 0.4472) - 20.4022) * this.time / 4.184;
      } else if (this.stepsId.nativeElement.value == "brisk") {
        this.time = (Math.ceil(this.distance / 1000 * 15));
        this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (120 * 0.4472) - 20.4022) * this.time / 4.184;

      } else if (this.stepsId.nativeElement.value == "moderate") {
        this.time = (Math.ceil(this.distance / 1000 * 20));
        this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (110 * 0.4472) - 20.4022) * this.time / 4.184;

      } else if (this.stepsId.nativeElement.value == "slow") {
        this.time = (Math.ceil(this.distance / 1000 * 30));
        this.calories = ((this.myForm.value.age * 0.074) - (this.myForm.value.weight * 0.05741) + (100 * 0.4472) - 20.4022) * this.time / 4.184;

      }
    }

    var hours = Math.floor(this.time / 60);
    var mins = this.time % 60;
    this.duration = " " + hours + " hour(s) " + mins + " min(s) ";
    this.dataUpdated.emit({ time: this.duration, distance: this.distance, calories: this.calories });
  }

  newupdateDirections() {
    this.mapsAPILoader.load().then(() => {
      if (this.vc.directionsDisplay === undefined || this.vc.directionsDisplay === null) {
        this.mapsAPILoader.load().then(() => {
          this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
        });
      }
      var origin = this.markers[0];
      var destination = this.markers[this.markers.length - 1];
      var newMarkers = this.markers;

      var go = newMarkers.slice(1, (this.markers.length - 1));

      this.vc.updateDirections(origin, destination, go);

    });
  }
}


