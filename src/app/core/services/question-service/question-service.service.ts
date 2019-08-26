import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Question } from '../../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/questions/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public questions$: ReplaySubject<any[]> = new ReplaySubject(1);
  private questions: any[];
  public randomQuestions: any[];
  public allRandomQuestions: any[]= [];
  public randomQuestions$: ReplaySubject<any[]> = new ReplaySubject(1);

  constructor(private http: HttpClient) { }

  public getAllQuestions(){
    return this.http.get(this.apiUrl).subscribe(
      (res: any) => {
        this.questions= res;
        this.questions$.next(res);
      }
    );
  }

  public getAllQuestionsOfCategory(category){
    return this.http.get(this.apiUrl+"filter?category="+category)/*.subscribe(
      (res: any) => {
        this.questions= res;
        this.questions$.next(res);
      }
    );*/
  }

  public addQuestion(question: Question) {
    console.log(question);
    return this.http.post(this.apiUrl, question, {headers: this.header , responseType:'text'});
  }

  public removeQuestion(id: Number){
    return this.http.delete(this.apiUrl + id, {headers: this.header , responseType:'text'});
  }

  public editQuestion(question: Question){
    return this.http.put(this.apiUrl, question);
  }

  public getRandomQuestions(category: String, numberOfQuestions: number){
    return this.http.get(this.apiUrl+category+"/"+numberOfQuestions);
  }
}
