import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./../auth/auth.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/catch";
import { RsvpModel } from "./models/rsvp.model";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem("access_token")}`;
  }

  postRsvp$(rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .post("http://localhost:3000/api/rsvp/new", rsvp, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || "Error: Unable to complete request.";
    if (err.message && err.message.indexOf("No JWT preset") > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }
}
