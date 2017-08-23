import { Component, OnInit } from '@angular/core'
import { YelpService } from './../shared/yelp.service'
import { ApiService } from './../core/api.service'
import { AuthService } from './../auth/auth.service'
import { RsvpModel } from './../core/models/rsvp.model'

import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'app-yelp-results',
  templateUrl: './yelp-results.component.html',
  styleUrls: ['./yelp-results.component.css']
})
export class YelpResultsComponent implements OnInit {
  public searchResults
  private userRsvp: RsvpModel
  loading: boolean
  error: boolean
  errorMsg: string
  user: string

  constructor(
    public yelp: YelpService,
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = false
    // this.error = false
    const results = JSON.parse(sessionStorage.getItem('results'))
    this.searchResults = results
    this.setUser()
  }

  setUser() {
    const curUser = localStorage.getItem('profile')
    if (curUser) {
      this.user = this.getUser()
    }
  }

  getUser() {
    const curUser = localStorage.getItem('profile')
    if (curUser) {
      return this.auth.userProfile.sub.substring(
        this.auth.userProfile.sub.indexOf('|') + 1
      )
    }
  }

  goTop() {
    document.body.scrollTop = 0
  }

  rsvp(bar: string) {
    this.loading = true
    if (!this.auth.userProfile) {
      this.auth.login()
    }
    this.userRsvp = {
      yelpId: bar,
      guestId: this.user
    }
    this.api.postRsvp$(this.userRsvp).subscribe(
      data => {
        this.yelp.searchYelp(sessionStorage.getItem('location')).subscribe(
          data => {
            this.ngOnInit()
            this.loading = false
          },
          error => {
            console.error(error)
            this._handleError(error)
          }
        )
      },
      error => {
        console.error(error)
        this._handleError(error)
      }
    )
  }

  removeRsvp(bar: string) {
    this.loading = true
    this.userRsvp = { yelpId: bar, guestId: this.user }
    this.api.deleteRsvp$(this.userRsvp).subscribe(
      data => {
        this.yelp.searchYelp(sessionStorage.getItem('location')).subscribe(
          data => {
            this.ngOnInit()
            this.loading = false
          },
          error => {
            console.error(error)
            this._handleError(error)
          }
        )
      },
      error => {
        console.error(error)
        this._handleError(error)
      }
    )
  }

  _removeAlert() {
    setTimeout(() => {
      this.error = false
    }, 3000)
  }

  _handleError(error) {
    const newError = new Error(error)
    this.error = true
    this.loading = false
    this.errorMsg = newError.message
    this.goTop()
    this._removeAlert()
  }
}
