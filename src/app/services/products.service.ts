import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, throttleTime } from 'rxjs/operators';

import { createProductDTO, updateProductDTO ,Product } from './../models/product.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = "https://young-sands-07814.herokuapp.com/api/products";
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.url, { params })
    .pipe(retry(3));
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.url, {
      params: {limit, offset}
    });
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.url}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo salio mal en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized ){
          return throwError('No estas autorizado para ingresar');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }

  create(dto: createProductDTO){
    return this.http.post<Product>(this.url, dto);
  }

  update(dto: updateProductDTO, id: string){
    return this.http.put<Product>(`${this.url}/${id}`, dto); 
    //select the id of the product, and send the data via post
  }

  delete(id: string){
    return this.http.delete<Product>(`${this.url}/${id}`);
  }
}
