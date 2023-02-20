import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'This is the name of the product. It is required',
  })
  name: string;
  @ApiProperty({
    type: Number,
    description: 'This is the price of the product. It is required',
  })
  price: number;
  @ApiProperty({
    type: Number,
    description: 'This is the stock of the product. It is required',
  })
  stock: number;
}
