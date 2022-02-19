import { Price } from './price.model';

export class CartProduct {
  public id: number;

  public SKU: string;

  public name: string;

  public brandName: string;

  public mainImage: string;

  public price: Price;

  public colour: string;

  public size: number;

  public quantity: number;

  constructor(
    id: number,
    SKU: string,
    name: string,
    brandName: string,
    mainImage: string,
    price: Price,
    colour: string,
    size: number,
    quantity: number
  ) {
    this.id = id;
    this.SKU = SKU;
    this.name = name;
    this.brandName = brandName;
    this.mainImage = mainImage;
    this.price = price;
    this.colour = colour;
    this.size = size;
    this.quantity = quantity;
  }
}
