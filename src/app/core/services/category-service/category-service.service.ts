import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/categories/';
  header: HttpHeaders | { [header: string]: string | string[]; };

  public Category = new Category();
  public categories$: ReplaySubject<any[]> = new ReplaySubject(1);
  private categories: any[];

  constructor(private http: HttpClient) {}

  public getAllCategories() {
    return this.http.get(this.apiUrl).subscribe(
      (res: any) => {
        // console.log(res);
        this.categories = res;
        this.categories$.next(res);
      }
    );
  }

  public addCategory(category: Category) {
    console.log(category);
    return this.http.post(this.apiUrl, category, {headers: this.header , responseType: 'text'});
  }

  // tslint:disable-next-line: ban-types
  public removeCategory(id: Number) {
    return this.http.delete(this.apiUrl + id, {headers: this.header , responseType: 'text'});
  }

  public editCategory(category: Category) {
    return this.http.put(this.apiUrl, category);
  }
}

