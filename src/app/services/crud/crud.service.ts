import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "src/app/models/product";
import { HeadersService } from "../headers/headers.service";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  public articles$: Subject<Product[]>;

  constructor(private http: HttpClient, private headerSrv: HeadersService) {
    this.articles$ = new Subject();
    this.getArticles();
  }

  getArticles() {
    return this.http
      .get(`${environment.apiUrl}/articles`, this.headerSrv.getHeaders(true));
  }

  createArticles(body: any) {
    return this.http.post(
      `${environment.apiUrl}/articles`,
      body,
      this.headerSrv.getHeaders(true)
    );
  }

  editArticles(id: string, body: any) {
    return this.http.put(
      `${environment.apiUrl}/articles/${id}`,
      body,
      this.headerSrv.getHeaders(true)
    );
  }

  detailArticle(id: string) {
    return this.http.get(
      `${environment.apiUrl}/articles/${id}`,
      this.headerSrv.getHeaders(true)
    );
  }

  deleteArticle(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/articles/${id}`,
      this.headerSrv.getHeaders(true)
    );
  }

  getArticlesOberver$(): Observable<Product[]> {
    return this.articles$.asObservable();
  }
}
