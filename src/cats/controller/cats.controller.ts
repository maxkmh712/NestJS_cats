import { CurrentUser } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { PositiveIntPipe } from '../../common/pipes/positiveint.pipe';
import { 
  Controller, 
  Delete, 
  Body, 
  Get, 
  Patch, 
  Post, 
  Put, 
  HttpException, 
  UseFilters, 
  Param, 
  ParseIntPipe, 
  UseInterceptors, 
  UseGuards, 
  Req, 
  UploadedFiles 
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from '../service/cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SignUpRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cats.response.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Request } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    ) {}


  @ApiOperation({ summary: '회원가입!'})
  @Post()
  async signUp(@Body() body: SignUpRequestDto) {
    return await this.catsService.signUp(body)
  }



  @ApiOperation({ summary: '로그인!'})
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }



  @ApiOperation({ summary: '로그인한 유저 조회! 현재 고양이 가져오기. cats.controller에서 보냄'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }
  @ApiResponse({
    status: 500, 
    description: '서버에러!!! cats.controller에서 보냄 '
  })
  @ApiResponse({
    status: 200,
    description: '성공!!! cats.controller에서 보냄',
    type: ReadOnlyCatDto
  }) 

  

  @ApiOperation({ summary: '이미지 업로드 cats.controller에 위치'})
  @UseInterceptors(FilesInterceptor('image'))
  @Post('upload/cats')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    // console.log(files);
    return '고양이 사진!cats.controller에 위치 '
  }



  @ApiOperation({ summary: '모든 고양이 가져오기!!! cats.controller'})
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}