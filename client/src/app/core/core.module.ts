import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ApiService } from "./api.service";

import { HeaderComponent } from "./header/header.component";

@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [ApiService]
})
export class CoreModule {}
