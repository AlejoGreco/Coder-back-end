import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Array<Product>;

  constructor() {
    this.products = [];
  }

  create(createProductDto: CreateProductDto) {
    let id: number;

    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products.length + 1;
    }

    const newProduct = {
      id,
      ...createProductDto,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  findAll(): Array<Product> {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((p) => p.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
    };

    return this.products[index];
  }

  remove(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.products = this.products.filter((p) => p.id !== id);
    }
    return product;
  }
}
