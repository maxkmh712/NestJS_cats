import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Like } from './likes.schema';
import { create } from 'domain';
import { Model, Types } from 'mongoose';
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

    async existsLike(catId: string, productId: string): Promise<boolean> {
      const result = await this.LikeModel.exists({
        cat: catId,
        product: productId,
      });
      return result
    }

    async deleteLike(catId: string, productId: string): Promise<Like> {
      const deleteL = await this.LikeModel.findOneAndDelete(
        {
          cat: catId,
          product: productId
        }
        // {
        //   new: true,
        // }
      )
      return deleteL
    }
}