import { Component, OnInit } from "@angular/core";
import { YelpService } from "./../shared/yelp.service";
import { ApiService } from "./../core/api.service";
import { AuthService } from "./../auth/auth.service";
import { RsvpModel } from "./../core/models/rsvp.model";

@Component({
  selector: "app-yelp-results",
  templateUrl: "./yelp-results.component.html",
  styleUrls: ["./yelp-results.component.css"]
})
export class YelpResultsComponent implements OnInit {
  public searchResults;
  private userRsvp: RsvpModel;

  constructor(
    public yelp: YelpService,
    private api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.searchResults = this.yelp.sharedSearch;
  }

  goTop() {
    document.body.scrollTop = 0;
  }
  rsvp(bar: string) {
    const user = this.auth.currentUser.sub.substring(
      this.auth.currentUser.sub.indexOf("|") + 1
    );
    this.userRsvp = {
      yelpId: bar,
      guestId: user
    };
    this.api.postRsvp$(this.userRsvp).subscribe(data => console.log(data));
  }
}
