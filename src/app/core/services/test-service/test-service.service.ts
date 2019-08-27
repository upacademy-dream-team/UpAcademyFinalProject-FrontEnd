import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Test } from '../../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/tests/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public tests$: ReplaySubject<any[]> = new ReplaySubject(1);
  public test$: ReplaySubject<any[]> = new ReplaySubject(1);
  private currentTest: number = 0;
  private currentRecruiter: string;
  private recruiterEmail: string;
  private tests: any[];

  constructor(private http: HttpClient) { }

  public getAllTests(){
    return this.http.get(this.apiUrl).subscribe(
      (res: any) => {
        this.tests= res;
        this.tests$.next(res);
      }
    );
  }

  public getTest(id: number){
    return this.http.get(this.apiUrl + id).subscribe(
      (res:any) => {
        this.test$.next(res);
      }
    );
  }

  public getTestWithSolutions(id: number){
    return this.http.get(this.apiUrl + id+'/'+true)/*.subscribe(
      (res:any) => {
        this.test$.next(res);
      }
    );*/
  }

  public addTest(test: Test) {
    console.log(test);
    return this.http.post(this.apiUrl, test, {headers: this.header , responseType:'text'});
  }

  public removeTest(id: Number){
    return this.http.delete(this.apiUrl + id, {headers: this.header , responseType:'text'});
  }

  public editTest(test: Test){
    return this.http.put(this.apiUrl, test);
  }

  public getCurrentTest() {
    return this.currentTest;
  }

  public setCurrentTest(currentTest: number){
    this.currentTest = currentTest;
  }

  public getCurrentRecruiter() {
    return this.currentRecruiter;
  }

  public getRecruiterEmail(){
    return this.recruiterEmail;
  }

  public setRecruiterEmail(recruiterEmail: string){
    this.recruiterEmail=recruiterEmail;
  }

  public setCurrentRecruiter(currentRecruiter: string) {
    this.currentRecruiter = currentRecruiter;
  }

}
