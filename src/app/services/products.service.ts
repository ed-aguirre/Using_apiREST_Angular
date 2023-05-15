import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createProductDTO, updateProductDTO ,Product } from './../models/product.model';

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

  create(dto: createProductDTO){
    return this.http.post<Product>(this.url, dto);
  }

  update(dto: updateProductDTO, id: string){
    return this.http.put<Product>(`${this.url}/${id}`, dto); 
    //select the id of the product, and send the data via post
  }
}
