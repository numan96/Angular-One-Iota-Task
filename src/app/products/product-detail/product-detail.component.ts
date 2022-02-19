import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public currentProduct: Product[] = [];
  public addProductForm: FormGroup = new FormGroup({});

  constructor(
    private _route: ActivatedRoute,
    private _productDataService: ProductDataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._getProduct();
  }

  public addToCart() {
    this._productDataService.addProductToCart([this.addProductForm.value]);
    this._openSnackBar('Product added to Cart.', 'Dismiss');
    this.addProductForm.reset();
    this._initForm();
  }

  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private _initForm() {
    this.addProductForm = new FormGroup({
      id: new FormControl(this.currentProduct[0].id),
      SKU: new FormControl(this.currentProduct[0].SKU),
      name: new FormControl(this.currentProduct[0].name),
      brandName: new FormControl(this.currentProduct[0].brandName),
      mainImage: new FormControl(this.currentProduct[0].mainImage),
      price: new FormControl(this.currentProduct[0].price),
      colour: new FormControl(this.currentProduct[0].colour),
      size: new FormControl('', Validators.required),
      quantity: new FormControl('1', [Validators.min(1), Validators.required]),
    });
  }

  private _getProduct() {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._productDataService
      .getProductDetails(id)
      .subscribe((product: Product[]) => {
        this.currentProduct = product;
        this._initForm();
      });
  }
}
