import { ProductsRepository } from './products.repository';
import { CatsModule } from 'src/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { Product, ProductSchema } from './products.schema';


@Module({
  imports:[
    MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
  ]),
    CatsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService]
})
export class ProductsModule {}
