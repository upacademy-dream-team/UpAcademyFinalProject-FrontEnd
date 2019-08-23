import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { SolvedTest } from '../../models/solvedTest';

@Injectable({
  providedIn: 'root'
})
export class SolvedTestServiceService {
  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/solved/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public solvedTests$: ReplaySubject<any[]> = new ReplaySubject(1);
  private solvedTests: any[];

  constructor(private http: HttpClient) {}

  public getAllSolvedTests(){
    return this.http.get(this.apiUrl+"all").subscribe(
      (res: any) => {
        this.solvedTests= res;
        this.solvedTests$.next(res);
      }
    );
  }

  public addSolvedTest(solved: SolvedTest) {
    console.log(solved);
    return this.http.post(this.apiUrl + 'add', solved, {headers: this.header , responseType:'text'});
  }

  public addSolvedTestFromSession(solved: SolvedTest, idSession: number){
    return this.http.post(this.apiUrl + 'add/' + idSession, solved, {headers: this.header , responseType:'text'});
  }

  public removeSolvedTest(id: Number){
    return this.http.delete(this.apiUrl + 'remove/' + id, {headers: this.header , responseType:'text'});
  }

}
