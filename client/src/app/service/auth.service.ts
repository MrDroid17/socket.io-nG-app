// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token: any;
  user_id: string;
  regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  signupForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  loginForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /***
   * urls
   */
  LOGIN_URL: string = environment.serverUrl + '/users/api/authenticate';
  REGISTER_URL: string = environment.serverUrl + '/users/api/register';
  GET_USER_PROFILE_URL: string = environment.serverUrl + '/users/api/profile';

  constructor(
    private http: Http
  ) { }


  // store admin data to local storage
  storeAdminData(access_token) {
    localStorage.setItem('access_token', access_token);
  }

  // load token
  private loadToken() {
    if (localStorage.getItem('access_token') !== null) {
      this.access_token = localStorage.getItem('access_token');
    } else {
      this.access_token = '';
    }
  }

  logout() {
    this.access_token = null;
    localStorage.clear();
  }

  // get headers
  getHeaders(): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  // get token
  getToken() {
    this.loadToken();
    return this.access_token;
  }

  // authenticate
  userLogin(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.LOGIN_URL, user, { headers: headers }).pipe(map(res => res.json()));
  }

  // sign up
  userRegister(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.REGISTER_URL, user, { headers: headers }).pipe(map(res => res.json()));
  }

  getProfile() {
    this.loadToken();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.access_token);
    return this.http.get(this.GET_USER_PROFILE_URL, { headers: headers }).pipe(map(res => res.json()));
  }

}
