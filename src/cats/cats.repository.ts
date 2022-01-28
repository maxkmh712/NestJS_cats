import { SignUpRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  constructor ( @InjectModel(Cat.name) private readonly catModel: Model<Cat> ) {}

  async findCatByIdwithoutPassword( catId: string | Types.ObjectId): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: SignUpRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findAll() {
    const result = await this.catModel.find()
    return result
  }
}