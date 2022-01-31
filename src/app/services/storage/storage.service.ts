import { Injectable } from '@angular/core';
import { IUserProfile } from 'src/app/models/userProfile.model';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(token:string): void{
    localStorage.setItem('token', token);
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser():IUserProfile {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  setProducts(products:Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts():Product[] {
    const product = JSON.parse(localStorage.getItem('product'));
    return product;
  }
}
