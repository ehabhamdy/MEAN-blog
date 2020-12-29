import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    console.log('sadfasdgf');
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post('http://localhost:9000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
        email: email,
        password: password,
      };

    this.http
      .post('http://localhost:9000/api/user/login', authData)
      .subscribe((response) => {
        console.log(response); // This will contain the JWT token
      });
  }
}
