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
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
