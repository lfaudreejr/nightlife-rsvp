import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { YelpResultsComponent } from '../../yelp-results/yelp-results.component';


const yelpResultsRouts: Routes = [
  {
    path: '',
    component: YelpResultsComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(yelpResultsRouts)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ChildRoutingModule { }
