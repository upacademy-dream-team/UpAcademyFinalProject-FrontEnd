import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Question } from '../../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/question/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public questions$: ReplaySubject<any[]> = new ReplaySubject(1);
  private questions: any[];

  constructor(private http: HttpClient) { }

  public getAllQuestions(){
    return this.http.get(this.apiUrl+"all").subscribe(
      (res: any) => {
        this.questions= res;
        this.questions$.next(res);
      }
    );
  }

  public addQuestion(question: Question) {
    console.log(question);
    return this.http.post(this.apiUrl + 'add', question, {headers: this.header , responseType:'text'});
  }

  public removeQuestion(id: Number){
    return this.http.delete(this.apiUrl + 'remove/' + id, {headers: this.header , responseType:'text'});
  }

  public editQuestion(question: Question){
    return this.http.put(this.apiUrl + 'edit', question);
  }
}
