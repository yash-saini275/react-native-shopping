export default class Product {
  id: string;
  owner: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(
    id: string,
    owner: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number,
  ) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}
