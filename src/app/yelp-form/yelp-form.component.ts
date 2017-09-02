import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { YelpService } from './../shared/yelp.service';

@Component({
  selector: 'app-yelp-form',
  templateUrl: './yelp-form.component.html',
  styleUrls: ['./yelp-form.component.css']
})
export class YelpFormComponent implements OnInit {
  loading: boolean;
  error: boolean;
  errorMsg: string;

  constructor(private yelp: YelpService, private router: Router) {}

  ngOnInit() {
    this.loading = false;
  }

  getYelp(location: string) {
    this.loading = true;
    this.yelp.searchYelp(location).subscribe(
      data => {
        this.router.navigate(['/results', location]);
      },
      error => {
        this._handleError(error);
      }
    );
  }

  _removeAlert() {
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  _handleError(error) {
    this.error = true;
    this.loading = false;
    this.errorMsg = 'Search results not found.';
    this._removeAlert();
  }
}
