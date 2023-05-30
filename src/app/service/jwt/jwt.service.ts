import { Injectable } from '@angular/core';
// import jwt_decode from "jwt-decode";
// import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // helper: JwtHelperService;

  constructor() {
    // this.helper = new JwtHelperService();
  }

  setJwtInLocalStorage(jwt:any) {
    sessionStorage.setItem("access_token", jwt);
  }

  removeJwtFromLocalStorage() {
    sessionStorage.removeItem("access_token");
  }

  loggedIn() {
    return sessionStorage.getItem("access_token") !== null;
  }

  getDecodedAccessToken(): any {
    try {

      var token = sessionStorage.getItem("access_token");
      // if(token != null && token != undefined) return jwt_decode(token!);
      // else return "Login token wasn't found"

    } catch (Error) {
      return Error;
    }
  }

  isTokenExpired() {
    var token = sessionStorage.getItem("access_token");
    // const isExpired = this.helper.isTokenExpired(token!);
    // return isExpired;
  }

}
