import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = "https://young-sands-07814.herokuapp.com/api/products";
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
