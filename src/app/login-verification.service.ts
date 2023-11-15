import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginVerificationService {

  loginVer: boolean = false
  constructor() { }

  logIn() {
    this.loginVer = true
  }

  logOut() {
    this.loginVer = false
  }

  verLogin() {
    return this.loginVer
  }
}