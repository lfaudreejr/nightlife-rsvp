import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { RoutingModule } from "./routing/routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { YelpFormComponent } from "./yelp-form/yelp-form.component";
import { YelpResultsComponent } from "./yelp-results/yelp-results.component";

import { AuthService } from "./auth/auth.service";
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YelpFormComponent,
    YelpResultsComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
