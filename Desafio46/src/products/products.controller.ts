import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 200,
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    const newProduct = this.productsService.create(createProductDto);
    return {
      message: 'Product created',
      product: newProduct,
    };
  }

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return {
      message: 'Products found',
      products,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (product) {
      return {
        message: 'Product found',
        product,
      };
    }
    return {
      message: `Product #${id} not found`,
      product: null,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productsService.update(+id, updateProductDto);
    if (product) {
      return {
        message: 'Product updated',
        product,
      };
    }
    return {
      message: `Product #${id} not found`,
      product: null,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const product = this.productsService.remove(+id);
    if (product) {
      return {
        message: 'Product removed',
        product,
      };
    }
    return {
      message: `Product #${id} not found`,
      product: null,
    };
  }
}
