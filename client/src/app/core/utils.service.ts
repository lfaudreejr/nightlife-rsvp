import { Injectable } from '@angular/core'

@Injectable()
export class UtilsService {
  constructor() {}

  getCurrentDay(date: any) {
    return date.getDay()
  }

  getNewDate(date: any) {
    return date.Date()
  }
}
