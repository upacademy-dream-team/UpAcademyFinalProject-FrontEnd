import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Email } from '../../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/email/';
  header: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private http: HttpClient) { }

  public sendEmail(email: Email) {
    console.log(email);
    return this.http.post(this.apiUrl + 'send', email, {headers: this.header , responseType: 'text'});
  }
}
