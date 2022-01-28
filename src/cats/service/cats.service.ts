import { SignUpRequestDto } from '../dto/cats.request.dto';
import { CatsRepository } from '../cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from '../cats.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: SignUpRequestDto) {
    const { email, name, password } = body;
    
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) throw new UnauthorizedException('AlREADY_EXISTS_CAT from cats.service');
  

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword
    });
    
    return cat.readOnlyData;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }
}
