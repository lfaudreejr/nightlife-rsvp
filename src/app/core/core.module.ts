import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ApiService } from './api.service'
import { UtilsService } from './utils.service'

import { HeaderComponent } from './header/header.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [ApiService, UtilsService]
})
export class CoreModule {}
