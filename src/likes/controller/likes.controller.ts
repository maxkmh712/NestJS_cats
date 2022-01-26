import { Body, Controller, Post } from '@nestjs/common';
import { LikeRequestDto } from '../dto/like.request.dto';
import { LikesService } from '../service/likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('')
  async createLike(@Body() body: LikeRequestDto) {
    return await this.likesService.createLike(body)
  }
}
