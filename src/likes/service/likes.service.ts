import { Like } from './../likes.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikesRepository } from '../likes.repository';
import { LikeRequestDto } from '../dto/like.request.dto';


@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likesModel: Model<Like>,
    private readonly likesRepository: LikesRepository
  ) {}

  async createLike(body: LikeRequestDto) {
    const { catId, productId } = body;
    
    // 고양이 아이디가 틀릴 경우 에러 핸들링
    // 상품 아이디가 틀릴 경우 에러 핸들링 


    const like = await this.likesRepository.create({
      catId,
      productId
    })
    return like
  }

  async getAllLike(catId: string) {
    const allLike = await this.likesRepository.findAll(catId);
    return allLike
  }

  async deleteLike( catId: string, productId: string ) {
    const existsLike = await this.likesRepository.existsLike(
      catId,
      productId
    );
    
    if (!existsLike) throw new BadRequestException('DOES_NOT_EXIST_PRODUCT');

    const deleteLike = await this.likesRepository.deleteLike(
      catId,
      productId
    )

    return deleteLike
  }
}
