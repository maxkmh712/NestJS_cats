import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
    ) {}
 
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) throw new UnauthorizedException('INVALID_EMAIL from auth.service')

    const isPasswordValidated: boolean = await bcrypt.compare( password, cat.password)
    
    if (!isPasswordValidated) throw new UnauthorizedException('INVALID_PASSWORD from auth.service')

    const payload = { email: email, id: cat.id };
    
    return { token: this.jwtService.sign(payload) }
  };
}
