import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { HeadersService } from '../headers/headers.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private headerSrv:HeadersService) {}

  login(body: IUser) {
    return this.http.post(`${environment.apiUrl}/login`, body, this.headerSrv.getHeaders());
  }

  getUser(token:boolean) {
    return this.http.get(`${environment.apiUrl}/profile`, this.headerSrv.getHeaders(token));
  }

  logout(token:boolean) {
    return this.http.get(`${environment.apiUrl}/sign-out`, this.headerSrv.getHeaders(token));
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token;
  }

  getDataUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? true : false;
  }

}
