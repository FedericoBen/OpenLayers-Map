import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OlMapComponent} from './components/ol-map/ol-map.component'

const routes: Routes = [
  {path:'', component:OlMapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
