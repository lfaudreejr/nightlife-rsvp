import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { YelpService } from './yelp.service'
import { LoadingComponent } from './loading/loading.component'

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, LoadingComponent],
  declarations: [LoadingComponent],
  providers: [YelpService]
})
export class SharedModule {}
