import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleModule } from '../google.module';
declare var google : any;
import {Loader} from "@googlemaps/js-api-loader";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map : any;
  public googleMap : any;
  private uluru = { lat: -25.344, lng: 131.036 };

  @ViewChild('map',{static:false}) gmap : ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyC9QKGsQ_66idTDqzaLGCT-R_hQrnvMctI',
      version: "weekly",
      libraries: ["geometry"]
    });

    loader.load().then(() => {
      const myLatLng = { lat: -25.363, lng: 131.044 };
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let labelIndex = 0;

      const map = this.map = new google.maps.Map(this.gmap.nativeElement, {
        zoom: 4,
        center: myLatLng,
      });

      //TrafficLayer
      // const trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(map);

      //TransitLayer
      // const transitLayer = new google.maps.TransitLayer();
      // transitLayer.setMap(map);
      const img = "assets/images/beachflag.png";

      const svgMarker = {
        path:
          "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
      };

      let marker = new google.maps.Marker({
        position: myLatLng,
        animation: google.maps.Animation.DROP,
        map,
        icon : svgMarker,
        // title: "Hello World",
      });


      google.maps.event.addListener(map, "click", (e) => {
        console.log(e.latLng.toJSON());
        if(marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        // addMarker(e.latLng, map);
      })

      // const bikeLayer = new google.maps.BicyclingLayer();
      // bikeLayer.setMap(map);
      // var LatLngLiteral = google.maps.LatLngLiteral;
      const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
      };

      function addMarker(location: any, map: any) {
          new google.maps.Marker({
            position : location,
            // shape : shape,
            icon : svgMarker,
            label:labels[labelIndex++ % labels.length],
            map: map,
          });
      }
      
    });
    
  }

}