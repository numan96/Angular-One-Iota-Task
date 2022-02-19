import { Price } from './price.model';

export class RecentProduct {
  public id: number;

  public name: string;

  public mainImage: string;

  public price: Price;

  constructor(id: number, name: string, mainImage: string, price: Price) {
    this.id = id;
    this.name = name;
    this.mainImage = mainImage;
    this.price = price;
  }
}
