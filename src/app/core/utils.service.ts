import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}

  getToday() {
    const date = new Date();
    return date.getDay();
  }
}
