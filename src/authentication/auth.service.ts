import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtAuth, Login } from 'src/Models/users.model';
import { JwtHelper } from 'src/services/jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelper, private http: HttpClient) { }

  baseUrl = 'https://localhost:7071/api/User/Login';

  login(user: Login) : Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.baseUrl, user);
  }

  isLogin() : boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  isAdmin() : boolean {
    var data = this.jwtHelper.decodeToken();
    return data.UserType==='Admin';
  }

  logout() : void {
    localStorage.removeItem('access_token');
  }

  getUser() : any {
    return this.jwtHelper.decodeToken();
  }

}
