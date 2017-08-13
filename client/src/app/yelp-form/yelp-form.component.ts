import { Component, OnInit } from "@angular/core";

import { YelpService } from "./../shared/yelp.service";

@Component({
  selector: "app-yelp-form",
  templateUrl: "./yelp-form.component.html",
  styleUrls: ["./yelp-form.component.css"]
})
export class YelpFormComponent implements OnInit {
  constructor(public yelp: YelpService) {}

  ngOnInit() {}

  getYelp(location: string) {
    this.yelp.searchYelp(location);
  }
}
