import { CommentsSchema } from './../comments/comments.schema';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controller/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './service/cats.service';
import { MulterModule } from '@nestjs/platform-express';
import { Comments } from 'src/comments/comments.schema';


@Module({
  imports: [
    MulterModule.register({ dest: './upload' }),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema},
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}  
