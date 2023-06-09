import { Component, OnInit } from '@angular/core';

import { Product, createProductDTO, updateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'error' | 'success' | 'init' = 'init';
  
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.productChosen = data;
        this.statusDetail = 'success';
      }, response => {
        console.log(response);
        this.statusDetail = 'error';
      })
  }

  createNewProduct(){
    //DTO
    const product : createProductDTO = {
      title: 'Nuevo producto',
      price: 1000,
      description: 'bla bla bla',
      images: [''],
      categoryId: 2,
    }
    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      });
  }

  updateProduct(){
    const change: updateProductDTO = {
      title: 'nuevo titulo'
    }
    const id = this.productChosen.id;
    this.productsService.update(change, id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products[productIndex] = data;

    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
      console.log('delete', data);
    })
  }

}
