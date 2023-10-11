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

  /*verifyUser(email: string, password: string): Observable<any>{

    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`)

  }*/
}
