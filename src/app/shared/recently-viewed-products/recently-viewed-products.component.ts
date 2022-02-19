import { Component, OnInit } from '@angular/core';
import { RecentProduct } from 'src/app/models/recentproduct.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.css'],
})
export class RecentlyViewedProductsComponent implements OnInit {
  recentlyViewedProducts: RecentProduct[] = [];
  constructor(private _productDataService: ProductDataService) {}

  ngOnInit() {
    this.recentlyViewedProducts =
      this._productDataService.getRecentlyViewedProducts();
  }
}
