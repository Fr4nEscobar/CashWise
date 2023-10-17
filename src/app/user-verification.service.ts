import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updateUser(user: any, idUser: number): Observable<any> {
    const url = `${this.apiUrl}/${idUser}`
    console.log(url)
    return this.http.put(url, user)
  }
}
