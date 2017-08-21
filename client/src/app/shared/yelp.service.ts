import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class YelpService {
  constructor(private http: HttpClient, public router: Router) {}

  public searchYelp(location: string): void {
    this.http
      .get(`http://localhost:3000/yelp/${location}`, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(res => {
        console.log(res)
        sessionStorage.setItem('results', JSON.stringify(res))
        sessionStorage.setItem('location', location)
        this.router.navigateByUrl('/results')
      })
  }
}
