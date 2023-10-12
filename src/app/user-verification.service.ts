import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  bringUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
