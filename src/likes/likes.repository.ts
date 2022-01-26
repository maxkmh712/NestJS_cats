import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Like } from './likes.schema';
import { create } from 'domain';
import { Model } from 'mongoose';
import { LikeRequestDto } from './dto/like.request.dto';

@Injectable()
export class LikesRepository {
  constructor (@InjectModel(Like.name) private readonly LikeModel: Model<Like>) {}

    async create(like: LikeRequestDto): Promise<Like> {
      const {catId, productId} = like
      return await this.LikeModel.create({
        cat: catId,
        product: productId
      });
    }

    async findAll(catId: string) {
      const result = await this.LikeModel
      .find({cat : catId})
      .populate('product')
      .select('-createdAt -__v')
      return result
    }
}