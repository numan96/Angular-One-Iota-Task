import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Price } from '../models/price.model';
import { Product } from '../models/product.model';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private _productDataService: ProductDataService) {}

  public productsList: Product[] = [];
  private _productListSub: Subscription = new Subscription();

  ngOnInit() {
    this._productListSub = this._productDataService
      .getProducts()
      .subscribe((products) => {
        this.productsList = products;
      });
  }

  public addToRecentlyViewed(
    id: number,
    name: string,
    mainImage: string,
    price: Price
  ) {
    this._productDataService.addToRecentlyViewed(id, name, mainImage, price);
  }

  ngOnDestroy() {
    this._productListSub.unsubscribe();
  }
}
