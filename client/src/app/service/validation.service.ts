import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  matchPassword(password, confirmPassword) {
    if (password != confirmPassword) {
      return false;
    }
    return true;
  }
}
