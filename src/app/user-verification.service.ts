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

  bringUser(email: string): Observable<any[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(user: any, email: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}`
    console.log(url)
    return this.http.put(url, user)
  }
}
