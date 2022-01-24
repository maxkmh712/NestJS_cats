import { CommentsSchema } from './../comments/comments.schema';
import { SignUpRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from "@nestjs/common";
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import * as mongoose from 'mongoose'

@Injectable()
export class CatsRepository {
  constructor (@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}


  async findCatByIdwithoutPassword(
    catId: string | Types.ObjectId,
    ): Promise<Cat | null> {
    // 이 함수는 catId를 인자로 받고 이 id에 해당하는 고양이를 받아온다
    const cat = await this.catModel.findById(catId).select('-password');
    // .select는 ORM 문법이다 password를 가져오고 싶지 않을 때
    // 이메일과 이름만 가져오고 싶을때는 .select('email name') 이렇게 쓴다 콤마가 아닌 그냥 띄어쓰기로
    return cat;
  }
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    // try {
    //   const result = await this.catModel.exists({ email });
    //   return result;
    // } catch (error) {
    //   throw new HttpException('디비 에러!! cats.repository에서 보냄!!!', 400)
    // }
    // 여기서 위처럼 트라이 캐치를 통해 직접적으로 에러 처리를 할 수 있음
    // 에러 처리가 잘 안됐을 때는 레포지토리에서 에러 처리 해줄 수 있다

    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: SignUpRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findAll() {
    const result = await this.catModel
    .find()
    // .populate('comments');
    //다른 document와 이어줄 수 있는 메소드

    return result
  }
}

// 서비스에서 이 레포지토리를 사용하기 위해 모듈 프로바이더에다 등록해줘야 함