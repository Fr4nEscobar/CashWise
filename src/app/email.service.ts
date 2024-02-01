import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3200/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const dataEmail = { to, subject, body };
    return this.http.post<any>(this.apiUrl, dataEmail);
  }
}
