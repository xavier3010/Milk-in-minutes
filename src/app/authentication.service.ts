// authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticated: boolean = false;
  private readonly correctPassword: string = 'asdf';

  constructor() { }

  authenticate(password: string): boolean {
    if (password === this.correctPassword) {
      this.authenticated = true;
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
