import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/test/session';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public addSession(sessionAdd, idTest){
    return this.http.post(this.apiUrl + 'add/'+idTest, sessionAdd);
  }

  public beginSession(idSession){
    return this.http.get(this.apiUrl + 'begin/'+idSession);
  }

  public getSession(idSession){
    return this.http.get(this.apiUrl + 'get/'+idSession);
  }
}
