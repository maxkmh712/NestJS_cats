import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  constructor (@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}


  async findCatByIdwithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
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

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}

// 서비스에서 이 레포지토리를 사용하기 위해 모듈 프로바이더에다 등록해줘야 함