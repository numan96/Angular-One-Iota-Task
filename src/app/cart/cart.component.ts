import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from '../models/cartproduct.model';
import { ProductDataService } from '../services/product-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cartProducts: CartProduct[] = [];
  public cartTotal: number = 0;

  constructor(
    private _productDataService: ProductDataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._getCartProducts();
  }

  private _getCartProducts() {
    this.cartProducts = this._productDataService.getCartProducts();

    this._getCartTotal();
  }

  public removeFromCart(
    id: number,
    size: number,
    quantity: number,
    index: number
  ) {
    this._productDataService.removeProductFromCart(id, size, quantity, index);
    this._openSnackBar('Product removed from Cart.', 'Dismiss');
    this._getCartTotal();
  }

  private _getCartTotal() {
    this.cartTotal = 0;
    this.cartProducts.map((product) => {
      this.cartTotal = this.cartTotal + product.price.amount * product.quantity;
    });
  }

  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy() {
    this.cartProducts = [];
  }
}
