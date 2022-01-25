import { ProductsService } from './../service/products.service';
import { Controller, Body, Post, Get, Query, Param } from '@nestjs/common';
import { ProductRequestDto } from '../dto/product.request.dto';
import { ProductFilterKeywordRequestDto } from '../dto/productFilterKeyword.request.dto';
import { QueryValidationPipe } from '../pipes/query.validation.pipe';
import { ObjectIdValidationPipe } from 'src/common/pipes/objectId.validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() body: ProductRequestDto) {
    return await this.productsService.createProduct(body)
  } 

  @Get('')
  getAllProduct(@Query(QueryValidationPipe) query: ProductFilterKeywordRequestDto) {
    console.log(query)
    return this.productsService.getAllProducts(query);
  }

  @Get(':id')
  async getOneProduct(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.productsService.getOneProduct(id)
  }
}
