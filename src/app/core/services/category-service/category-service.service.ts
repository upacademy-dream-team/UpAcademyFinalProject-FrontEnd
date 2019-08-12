import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/category/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public categories$: ReplaySubject<any[]> = new ReplaySubject(1);
  private categories: any[];

  constructor(private http: HttpClient) {}

  public getAllCategories(){
    return this.http.get(this.apiUrl+"all").subscribe(
      (res: any) => {
        this.categories= res;
        this.categories$.next(res);
      }
    );
  }
}
