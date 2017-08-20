import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'
import { AuthService } from './../auth/auth.service'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { RsvpModel } from './models/rsvp.model'

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private auth: AuthService,
    private authHttp: AuthHttp
  ) {}

  postRsvp$(rsvp: RsvpModel): Observable<RsvpModel> {
    return this.authHttp
      .post('http://localhost:3000/api/rsvp/new', rsvp)
      .map(this._handleSuccess)
      .catch(this._handleError)
  }

  private _handleSuccess(res: Response) {
    return res.json()
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.'
    if (err.message && err.message.indexOf('No JWT preset') > -1) {
      this.auth.login()
    }
    return Observable.throw(errorMsg)
  }
}
