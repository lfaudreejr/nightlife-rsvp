import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class YelpService {
  constructor(private http: HttpClient) {}

  public authYelp(): void {
    this.http
      .get("http://localhost:3000/yelp/jacksonville", {
        headers: new HttpHeaders().set("content-type", "application/json")
      })
      .subscribe(res => console.log(res));
  }

  public searchYelp(location: string): void {
    this.http.get(`http://localhost:3000/yelp/${location}`);
  }
}
