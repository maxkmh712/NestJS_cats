import { CatsModule } from 'src/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';

@Module({
  imports:[
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CatsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
