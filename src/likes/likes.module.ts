import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'src/cats/cats.module';
import { ProductsModule } from 'src/products/products.module';
import { LikesController } from './controller/likes.controller';
import { LikesRepository } from './likes.repository';
import { Like, LikeSchema } from './likes.schema';
import { LikesService } from './service/likes.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Like.name, schema: LikeSchema}
    ]),
    CatsModule,
    ProductsModule
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
  exports: [LikesService]
})
export class LikesModule {}
