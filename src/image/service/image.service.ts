import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  private readonly s3: AWS.S3;
  public readonly AWS_S3_BUCKET_NAME: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    this.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
  }

  async uploadImages(image: Express.Multer.File) {
    try {
      const key = `images/${Date.now()}_${path.basename(image.originalname)}`;

      await this.s3.putObject({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: image.buffer,
        ContentType: image.mimetype
      })
      .promise()

      return `https://${this.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } catch(error) {
      console.log('error');
      throw new BadRequestException('IMAGE_UPLOAD_FAILED from image.service')
    }
  }
}