import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtHelper {

  constructor(public jwtHelper: JwtHelperService) { }

  public setToken(token: string) : void {
    localStorage.setItem('access_token', token);
  }

  public getToken() : string | null {
    return localStorage.getItem('access_token');
  }

  public isTokenExpired() : boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  public decodeToken() : any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

}
