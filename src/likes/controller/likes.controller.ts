import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Cat } from 'src/cats/cats.schema';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { LikeRequestDto } from '../dto/like.request.dto';
import { LikesService } from '../service/likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('')
  async createLike(@Body() body: LikeRequestDto) {
    return await this.likesService.createLike(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllLike(@CurrentUser() cat: Cat) {
    return await this.likesService.getAllLike(cat._id)
  }
}
