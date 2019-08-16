import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Test } from '../../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/test/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public tests$: ReplaySubject<any[]> = new ReplaySubject(1);
  private tests: any[];
  public currentTest: number;

  constructor(private http: HttpClient) { }

  public getAllTests(){
    return this.http.get(this.apiUrl+"all").subscribe(
      (res: any) => {
        this.tests= res;
        this.tests$.next(res);
      }
    );
  }

  public addTest(test: Test) {
    console.log(test);
    return this.http.post(this.apiUrl + 'add', test, {headers: this.header , responseType:'text'});
  }

  public removeTest(id: Number){
    return this.http.delete(this.apiUrl + 'remove/' + id, {headers: this.header , responseType:'text'});
  }

  public editTest(test: Test){
    return this.http.put(this.apiUrl + 'edit', test);
  }

  
}
