import { Component, OnInit } from "@angular/core";
import { YelpService } from "./../shared/yelp.service";

@Component({
  selector: "app-yelp-results",
  templateUrl: "./yelp-results.component.html",
  styleUrls: ["./yelp-results.component.css"]
})
export class YelpResultsComponent implements OnInit {
  private searchResults;

  constructor(public yelp: YelpService) {}

  ngOnInit() {
    this.searchResults = this.yelp.sharedSearch;
  }
}
