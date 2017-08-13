import { Component, OnInit } from "@angular/core";
import { YelpService } from "./shared/yelp.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  constructor(public yelp: YelpService) {}

  ngOnInit() {
    this.yelp.authYelp();
  }
}
