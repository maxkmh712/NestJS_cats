import { InjectModel } from '@nestjs/mongoose';
import { CommentsCreateDto } from './../dto/comments.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>, 
    private readonly catsRepository: CatsRepository
    // 질문! 이 두개의 차이점이 뭐지?????
  ) {}


  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    // 여기서 2번째 인자 comments는 서비스 입장에서 네이밍한 것
    try {
      const targetCat = await this.catsRepository.findCatByIdwithoutPassword(
        id,
      );
      const { contents, author } = commentData;

      const validatedAuthor =
        await this.catsRepository.findCatByIdwithoutPassword(author);
        
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch(error) {
      console.log(error)
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
