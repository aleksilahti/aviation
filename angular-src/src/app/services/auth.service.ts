import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FlashMessagesService } from 'angular2-flash-messages';

import { environment } from '../../environments/environment';



interface RegisterResponse {
  success: boolean;
  msg: string;
}

interface AuthResponse {
  success: boolean;
  msg: string;
  token: string;
  user: any;
}

interface DeleteResponse {
  success: boolean;
  msg: string | null;
}

interface ProfileResponse {
  user: any;
}

export interface OtherUser {
  name: string | null;
  username: string;
}

export interface UserResponse {
  success: boolean;
  msg?: string;
  user?: OtherUser;
}

export interface UsersResponse {
  success: boolean;
  msg: string | null;
  users: OtherUser[] | null;
}



@Injectable()
export class AuthService {
  authToken: any;
  user: any; /* mixed use: property and common parameter */
  api = environment.api;

  constructor(
    private flashMessage: FlashMessagesService,
    private http: HttpClient
    ) { }

  registerUser(user) {
    // returns RegisterResponse
    const headers = new HttpHeaders()
      .append('Authorization', this.authToken)
      .append('Content-Type', 'application/json');
    return this.http.post<RegisterResponse>( this.api + '/users/register', user, { headers });
  }

  authenticateUser(user) {
    // returns AuthResponse
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post<AuthResponse>( this.api + '/users/authenticate', user, { headers });
  }

  getProfile() {
    // returns AuthResponse
    this.loadToken();
    const headers = new HttpHeaders()
      .append('Authorization', this.authToken)
      .append('Content-Type', 'application/json');
    return this.http.get<ProfileResponse>( this.api + '/users/profile', { headers });
  }

  deleteUser(): Observable<DeleteResponse> | null { 
    this.loadToken();
    if (!this.user.username || this.user.username.length === 0) {
      return null;
    }

    return this.deleteOtherUser(this.user);
  }

  getOtherUser(_id): Observable<UserResponse> {
    this.loadToken();
    const headers = new HttpHeaders()
      .append('Authorization', this.authToken)
      .append('Content-Type', 'application/json');
    const body = {_id: _id};
    return this.http.post<UserResponse>( this.api + '/users/get', body, { headers });
  }

  listOtherUsers(): Observable<UsersResponse> {
    // returns UsersResponse
    this.loadToken();
    const headers = new HttpHeaders()
      .append('Authorization', this.authToken)
      .append('Content-Type', 'application/json');
    return this.http.get<UsersResponse>( this.api + '/users/list', { headers });
  }

  deleteOtherUser(user): Observable<DeleteResponse> { 
    this.loadToken();
    const headers = new HttpHeaders()
      .append('Authorization', this.authToken)
      .append('Content-Type', 'application/json');

    const body = {
      username: user.username,
    };

    return this.http.post<DeleteResponse>(this.api + '/users/delete', body, { headers } );
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getToken() {
    if (this.loggedIn()) {
      return this.authToken;
    } else {
      this.flashMessage.show('You need to be logged in to perform this action.', {cssClass: 'alert-danger', timeout: 4000});
      return '';
    }
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    // Checks if the users token is not expired
    this.loadToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken);
  }
}

