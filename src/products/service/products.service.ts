import { InjectModel } from '@nestjs/mongoose';
import { ProductsRepository } from './../products.repository';
import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
import { ProductRequestDto } from '../dto/product.request.dto';
import { response, query } from 'express';
import { Product } from '../products.schema';
import { Model } from 'mongoose';
import { ProductFilterKeywordRequestDto } from '../dto/productFilterKeyword.request.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productsModel: Model<Product>,
    private readonly productsRepository: ProductsRepository
    ) {}

  async createProduct(body: ProductRequestDto) {
    const { name, price, color } = body;
    const product = await this.productsRepository.create({
      name,
      price,
      color
    })
    return product
  }

  async getAllProducts(query: ProductFilterKeywordRequestDto) {
      const allProducts = await this.productsRepository.findAllProduct(query);
      return allProducts;
    }

  async getOneProduct(id: string) {
    const existsProduct = await this.productsRepository.existsById(id);

    if (!existsProduct) throw new BadRequestException('product id 확인!! from products.service')

    const product = await this.productsRepository.findById(id);
    return product
  }
}
