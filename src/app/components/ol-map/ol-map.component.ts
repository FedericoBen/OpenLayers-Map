import { Component, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as Proj from 'ol/proj';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import * as VectorLayer from 'ol/layer'
import { InfoMapService } from 'src/app/services/info-map.service';
import { MarkModel } from 'src/app/models/marker';

import markers_data from '../../data/markers.json'

declare var $: any;

const DEFAULT_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAyVBMVEUAAADnTDznTDvnTDvnTDvAOCrnTDznSzvnTDvAOCvnTDznTDznTDvnTDzAOCrnTDvnTDvnTDvnTDznTDvAOSrnTDznTDzTQjLSQjPnTDzpTDvnSzvAOCrnTDvAOSvAOCvnSzvnTDzAOCvnSzznTDznTDvnTDy/OCvnTDznTDvnTDznSzvmSzvAOCvnTDzAOCvnTDvmTDvAOCq+OCrpTDzkSzrbRjbWRDTMPi+8NinrTT3EOy3gSDjTQjPPQDLHPS/DOiu5NCjHPC5jSfbDAAAAMHRSTlMAKPgE4hr8CfPy4NzUt7SxlnpaVlRPIhYPLgLt6ebOysXAwLmej4iGgGtpYkpAPCBw95QiAAAB50lEQVQ4y42T13aDMAxAbVb2TrO6927lwQhktf//UZWVQ1sIJLnwwBEXWZYwy1Lh/buG5TXu+rzC9nByDQCCbrg+KdUmLUsgW08IqzUp9rgDf5Ds8CJv1KS3mNL3fbGlOdr1Kh1AtFgs15vke7kQGpDO7pYGtJgfbRSxiXxaf7AjgsFfy1/WPu0r73WpwGiu1Fn78bF9JpWKUBTQzYlNQIK5lDcuQ9wbKeeBiTWz3vgUv44TpS4njJhcKpXEuMzpOCN+VE2FmPA9jbxjSrOf6kdG7FvYmkBJ6aYRV0oVYIusfkZ8xeHpUMna+LeYmlShxkG+Zv8GyohLf6aRzzRj9t+YVgWaX1IO08hQyi9tapxmB3huxJUp8q/EVYzB89wQr0y/FwqrHLqoDWsoLsxQr1iWNxp1iCnlRbt9IdELwfDGcrSMKJbGxLx4LenTFsszFSYehwl6aCZhTNPnO6LdBYOGYBVFqwAfDF27+CQIvLUGrTU9lpyFBw9yeA+sCNsRkJ5WQjg2K+QFcrywEjoCBHVpe3VYGZyk9NQCLxXte/jHvc1K4XXKSNQ520PPtIhcr8f2MXPShNiavTyn4jM7wK0g75YdYgTE6KA465nN9GbsILwhoMHZETx53hM7Brtet9lRDAYFwR80rG+sfAnbpQAAAABJRU5ErkJggg==';
const LAT_INIT =  -76.594693;
const LON_INIT = 2.459562;

@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterContentInit {


  map: Map;
  view: View;

  constructor(
    private servicioInfoMap: InfoMapService,
    private elementRef: ElementRef,
    ) {}



  ngOnInit(): void {}

  ngAfterContentInit(): void {

    const servInfMap = this.servicioInfoMap;
    
    //Map
    this.createMap();

    //Feature
    this.createMarkers(markers_data);
    


    //Popup showing the position the user clicked
    const popup = new Overlay({
      element: this.elementRef.nativeElement.querySelector('#popup')
    });

    //Click acction
    this.clickAction(popup,servInfMap);


    //Move the map
    this.moveMap(popup,servInfMap);

    //Move the pointer
    this.movePointer();
    

  }

  movePointer(){
    this.map.on('pointermove', function(evt){
      const pixel = evt.map.getEventPixel(evt.originalEvent);
      const hit = evt.map.hasFeatureAtPixel(pixel);
      evt.map.getTarget();

    });
  }

  moveMap(popup: any, servInfMap:InfoMapService){
    this.map.on('movestart', function (evt) {
      const element = popup.getElement();
      $(element).popover('dispose');
      let markerSelect = new MarkModel('','','','','',false);
      servInfMap.setMarker(markerSelect)
    });
  }

  clickAction(popup: any, servInfMap:InfoMapService){
    
    this.map.addOverlay(popup);

   this.map.on('click', function (evt) {
      const element = popup.getElement();
      $(element).popover('dispose');
      const feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature) {

        let prop = feature.getProperties();
        let mk = markers_data.find(m => m['name'] == prop['name']);
        let markerSelect = new MarkModel(prop['name'],mk['lat'].toString(),mk['lon'].toString(),mk['foto'],mk['descripcion'],true);
        servInfMap.setMarker(markerSelect)


        const coordinate = evt.coordinate;       
        popup.setPosition(coordinate); 

        $(element).popover({
          placement: 'top',
          animation: true,
          html: true,
          content: prop['name'],
        });        

        $(element).popover('show');
        
      } else {
        let markerSelect = new MarkModel('','','','','',false);
        servInfMap.setMarker(markerSelect)
        $(element).popover('dispose');
      }
    });
  }

  createMarkers(markers_data:any){ 

    let all_markes = [];

    markers_data.forEach(marker_data=>{

    const marker = new Feature({
      geometry: new Point(Proj.fromLonLat([marker_data.lat, marker_data.lon])),
      name: marker_data.name,
      population: 4000,
      rainfall: 500,
    });

    const icon = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: DEFAULT_ICON,
      }),
    });


    marker.setStyle(icon);

    all_markes.push(marker);

    })

  let capa = new VectorLayer.Vector({
      source: new VectorSource({
          features: all_markes,
      }),
  });

    this.map.addLayer(capa)
  }

  createMap(){
    this.map = new Map({
      layers: [new TileLayer({
        source: new OSM(),
      })],
      target: 'ol-map',
      view: new View({
        center: Proj.fromLonLat([LAT_INIT, LON_INIT]),
        zoom: 13,
      }),
    });

  }

}
