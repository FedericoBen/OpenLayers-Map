import { Component, OnInit } from '@angular/core';
import { MarkModel } from 'src/app/models/marker';
import { InfoMapService } from 'src/app/services/info-map.service';

@Component({
  selector: 'popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.css']
})
export class PopupInfoComponent implements OnInit {

  activado:boolean = false;
  markerSelect: MarkModel;

  constructor(
    private servicioInfoMap: InfoMapService,
    ) {
    }

  ngOnInit(): void {

    this.servicioInfoMap.markerInfObservable.subscribe(marker=>{
      this.markerSelect=marker;
      this.activado=this.markerSelect.activado;
    });
    
  }
}
