import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { YelpResultsComponent } from './yelp-results.component';
import { ChildRoutingModule } from '../routing/child-routing/child-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChildRoutingModule
  ],
  declarations: [YelpResultsComponent]
})
export class YelpResultsModule { }
