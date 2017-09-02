import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../home/home.component';
import { CallbackComponent } from './../callback/callback.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'results/:location',
    loadChildren: '../yelp-results/yelp-results.module#YelpResultsModule'
  },
  { path: 'callback', component: CallbackComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}
