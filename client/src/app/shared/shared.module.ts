import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { YelpService } from "./yelp.service";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule],
  declarations: [],
  providers: [YelpService]
})
export class SharedModule {}
