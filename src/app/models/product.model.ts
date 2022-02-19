import { Price } from './price.model';

export class Product {
  public id: number;

  public SKU: string;

  public name: string;

  public brandName: string;

  public mainImage: string;

  public price: Price;

  public sizes: Array<number>;

  public stockStatus: string;

  public colour: string;

  public description: string;

  constructor(
    id: number,
    SKU: string,
    name: string,
    brandName: string,
    mainImage: string,
    price: Price,
    sizes: Array<number>,
    stockStatus: string,
    colour: string,
    description: string
  ) {
    this.id = id;

    this.SKU = SKU;

    this.name = name;

    this.brandName = brandName;

    this.mainImage = mainImage;

    this.price = price;

    this.sizes = sizes;

    this.stockStatus = stockStatus;

    this.colour = colour;

    this.description = description;
  }
}
