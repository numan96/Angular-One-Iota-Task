import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartProduct } from '../models/cartproduct.model';
import { Price } from '../models/price.model';
import { Product } from '../models/product.model';
import { RecentProduct } from '../models/recentproduct.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(private _http: HttpClient) {}

  private _endpointUrl: string =
    'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json';
  private _cartProducts: CartProduct[] = [];
  private _recentlyViewedProducts: RecentProduct[] = [];
  public cartCount = new BehaviorSubject(0);

  public getProducts() {
    return this._http.get<Product[]>(this._endpointUrl).pipe(
      map((products) =>
        products['data'].map((product: Product) => {
          return {
            id: product.id,
            SKU: product.SKU,
            name: product.name,
            brandName: product.brandName,
            mainImage: product.mainImage,
            price: product.price,
            sizes: product.sizes,
            stockStatus: product.stockStatus,
            colour: product.colour,
            description: product.description,
          };
        })
      )
    );
  }

  public getProductDetails(id: number) {
    return this.getProducts().pipe(
      map((products: Product[]) => {
        return products.filter((product: Product) => +product.id === +id);
      })
    );
  }

  public getCartProducts() {
    return this._cartProducts;
  }

  public addProductToCart(product: CartProduct[]) {
    const id = +product[0].id;
    const size = +product[0].size;
    const quantity = +product[0].quantity;

    for (let products of this._cartProducts) {
      if (+products.id === +id && +products.size === +size) {
        this.cartCount.next(this.cartCount.value + quantity);
        return (products.quantity = +products.quantity + +quantity);
      }
    }
    this.cartCount.next(this.cartCount.value + quantity);
    return this._cartProducts.push.apply(this._cartProducts, product);
  }

  public removeProductFromCart(
    id: number,
    size: number,
    quantity: number,
    index: number
  ) {
    for (let products of this._cartProducts) {
      if (+products.id === +id && +products.size === +size && quantity > 1) {
        this.cartCount.next(this.cartCount.value - 1);
        return (products.quantity = +products.quantity - 1);
      }
    }
    this.cartCount.next(this.cartCount.value - 1);
    return this._cartProducts.splice(index, 1);
  }

  public getRecentlyViewedProducts() {
    return this._recentlyViewedProducts;
  }

  public addToRecentlyViewed(
    id: number,
    name: string,
    mainImage: string,
    price: Price
  ) {
    const product = [{ id, name, mainImage, price }];

    for (let products of this._recentlyViewedProducts) {
      if (
        +products.id === +id ||
        (this._recentlyViewedProducts.length > 4 && +products.id === +id)
      ) {
        return;
      }
    }

    if (this._recentlyViewedProducts.length > 4) {
      this._recentlyViewedProducts.splice(0, 1);
      return this._recentlyViewedProducts.push.apply(
        this._recentlyViewedProducts,
        product
      );
    }

    return this._recentlyViewedProducts.push.apply(
      this._recentlyViewedProducts,
      product
    );
  }
}
