import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public productsInCart: number = 0;
  constructor(private _productDataService: ProductDataService) {}

  ngOnInit() {
    this._productDataService.cartCount.subscribe({
      next: (x) => (this.productsInCart = x),
    });
  }
}
