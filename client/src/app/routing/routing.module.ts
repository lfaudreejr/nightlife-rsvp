import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./../home/home.component";
import { YelpResultsComponent } from "./../yelp-results/yelp-results.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "results",
    component: YelpResultsComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}
