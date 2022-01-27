import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Cat } from 'src/cats/cats.schema';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ObjectIdValidationPipe } from 'src/common/pipes/objectId.validation.pipe';
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

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteLike(
    @Body('productId', ObjectIdValidationPipe) productId: string,
    @CurrentUser() cat: Cat,
    ) {
      return await this.likesService.deleteLike(cat._id, productId);
    }
}
