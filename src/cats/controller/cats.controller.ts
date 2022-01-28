import { CurrentUser } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { Controller, Body, Get, Post, UseInterceptors, UseGuards, UploadedFiles } from '@nestjs/common';
import { CatsService } from '../service/cats.service';
import { SignUpRequestDto } from '../dto/cats.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    ) {}

  @Post('signup')
  async signUp(@Body() body: SignUpRequestDto) {
    return await this.catsService.signUp(body)
  }

  @Post('login')
  async logIn(@Body() data: LoginRequestDto) {
    return await this.authService.jwtLogIn(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentCat(@CurrentUser() cat) {
    return await cat.readOnlyData;
  }

  @UseInterceptors(FilesInterceptor('image'))
  @Post('upload/cats')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    return '고양이 사진!cats.controller에 위치 '
  }

  @Get('all')
  async getAllCat() {
    return await this.catsService.getAllCat();
  }
}