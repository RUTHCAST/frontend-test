import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private storageSrv:StorageService) { }

  getHeaders(token = false): any {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Accept', 'application/json');
    if (token) {
      const tkn = this.storageSrv.getToken();
      headers = headers.append('Authorization', `Bearer ${tkn}`);
    }
    return { headers };
  }
}
