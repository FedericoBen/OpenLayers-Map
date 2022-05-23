import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import { MarkModel } from '../models/marker';

@Injectable({
  providedIn: 'root'
})
export class InfoMapService {

  private markerModel: MarkModel
  private markerInfoSubject = new Subject<MarkModel>();
  markerInfObservable = this.markerInfoSubject.asObservable();

  constructor() {}
  
  setMarker(marker:MarkModel) {
    this.markerModel=marker;
    this.markerInfoSubject.next(marker);
  }

}
