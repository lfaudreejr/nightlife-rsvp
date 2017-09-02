import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ENV } from '../core/env.config';

@Injectable()
export class YelpService {
  constructor(private http: HttpClient, public router: Router) {}

  public searchYelp(location: string): Observable<any> {
    return this.http
      .get(`${ENV.YELP_URI}/${location}`, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .map(res => {
        sessionStorage.setItem('results', JSON.stringify(res));
        sessionStorage.setItem('location', location);
        // this.router.navigate(['/results', location])
        // console.log(res)
        return JSON.stringify(res);
      })
      .catch(this._handleError);
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }
}
