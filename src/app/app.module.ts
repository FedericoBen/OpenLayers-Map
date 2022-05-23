import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OlMapComponent } from './components/ol-map/ol-map.component';
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import { InfoMapService } from './services/info-map.service';

@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    PopupInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [InfoMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
