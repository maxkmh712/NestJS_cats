import { 
  Controller, 
  Post, 
  UploadedFile, 
  UploadedFiles, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/image.service';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';
import { multerOptions } from 'src/common/utils/multer.options';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from 'src/cats/cats.schema';

const s3 = new AWS.S3()

@Controller('image')
export class ImageController {
  constructor ( private readonly imageService: ImageService ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @CurrentUser() cat: Cat,
    @UploadedFile() image: Express.Multer.File,
    ) {
    console.log(image)
    return this.imageService.uploadImages(image)
  }
}
