import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from './products.schema';
import { Model, Types } from 'mongoose';
import { ProductRequestDto } from './dto/product.request.dto';
import { ProductFilterKeywordRequestDto } from './dto/productFilterKeyword.request.dto';
import { query } from 'express';

@Injectable()
export class ProductsRepository {
  constructor (@InjectModel(Product.name) private readonly ProductModel: Model<Product>) {}

  async create(product: ProductRequestDto): Promise<Product> {
    return await this.ProductModel.create(product);
  }

  async findProductById(
    productId: string | Types.ObjectId,
  ): Promise<Product | null> {
    const product = await this.ProductModel.findById(productId);
      return product
  }

  async existsById( productId: string | Types.ObjectId ): Promise<boolean> {
    const result = await this.ProductModel.exists({productId})
    return result
  }

  async findById(id: string | Types.ObjectId): Promise<Product | null> {
    const product = await this.ProductModel.findById(id)
    return product
  }

  async findAllProduct(query: ProductFilterKeywordRequestDto): Promise<Product[]> {
    const { sort, offset = 0, limit = 10 } = query;
    const sortBy = {
      lowPrice: 'price',
      highPrice: '-price',
      latest: '-createdAt',
      old: 'createdAt'
    };
    const allProduct = await this.ProductModel
    .find()
    .select('-updatedAt -__v')
    .skip(offset)
    .limit(limit)
    .sort(sortBy[sort]);

    return allProduct
  }

  
}