import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YelpService } from "./yelp.service";

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  declarations: [],
  providers: [YelpService]
})
export class SharedModule {}
