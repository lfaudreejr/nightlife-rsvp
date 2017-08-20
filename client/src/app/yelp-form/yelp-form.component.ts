import { Component, OnInit } from '@angular/core'

import { YelpService } from './../shared/yelp.service'

@Component({
  selector: 'app-yelp-form',
  templateUrl: './yelp-form.component.html',
  styleUrls: ['./yelp-form.component.css']
})
export class YelpFormComponent implements OnInit {
  loading: boolean

  constructor(private yelp: YelpService) {}

  ngOnInit() {
    this.loading = false
  }

  getYelp(location: string) {
    this.loading = true
    this.yelp.searchYelp(location)
  }
}
