import { ApiProperty } from '@nestjs/swagger';
export class Product {
  @ApiProperty({
    type: Number,
    description: 'This is the id of the product.',
  })
  id: number;
  @ApiProperty({
    type: String,
    description: 'This is the name of the product.',
  })
  name: string;
  @ApiProperty({
    type: Number,
    description: 'This is the price of the product.',
  })
  price: number;
  @ApiProperty({
    type: Number,
    description: 'This is the stock of the product. It is required',
  })
  stock: number;
}
